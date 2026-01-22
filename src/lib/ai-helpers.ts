import { GoogleGenerativeAI } from '@google/generative-ai';

function getGenAI() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GOOGLE_AI_API_KEY is not set. Please add it to your .env.local file.');
  }
  return new GoogleGenerativeAI(apiKey);
}

export interface SymptomAnalysisInput {
  symptoms: string;
  photoDataUri?: string;
}

export interface SymptomAnalysisOutput {
  isSerious: boolean;
  explanation: string;
  suggestImmediateAction: boolean;
}

export async function analyzeSymptoms(input: SymptomAnalysisInput): Promise<SymptomAnalysisOutput> {
  const genAI = getGenAI();
  // Use Gemini 2.5 Flash
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
    }
  });

  const prompt = `As a medical expert, analyze these symptoms concisely and determine if they indicate a potentially serious condition requiring immediate attention.

Symptoms: ${input.symptoms}

First, determine:
1. If the condition is potentially serious (true/false)
2. If immediate medical attention is recommended (true/false)

Then, provide a brief explanation in this format:

# Likely Cause
[One clear sentence about the most likely cause]

# What You Should Do
- [One specific action recommendation]
- [Any immediate steps to take at home, if applicable]

# When to Seek Help
- [1-2 specific warning signs that would require medical attention]

Keep the explanation very concise and action-oriented. Use simple, clear language.

Your response should be split into two parts:
1. A JSON object with just the boolean flags:
{
  "isSerious": boolean,
  "suggestImmediateAction": boolean
}

2. The markdown formatted explanation as plain text.

Separate these with three dashes (---) on a new line.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    // Split the response into JSON and markdown parts
    const [jsonPart, markdownPart] = text.split('---').map(part => part.trim());
    const { isSerious, suggestImmediateAction } = JSON.parse(jsonPart);
    
    return {
      isSerious,
      explanation: markdownPart,
      suggestImmediateAction
    };
  } catch (e) {
    // Fallback parsing if the format is not as expected
    const isSerious = text.toLowerCase().includes('serious') || text.toLowerCase().includes('severe');
    const suggestImmediateAction = text.toLowerCase().includes('immediate') || text.toLowerCase().includes('emergency');
    
    return {
      isSerious,
      explanation: text,
      suggestImmediateAction
    };
  }
} 