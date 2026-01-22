<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/logo.png" alt="Emerald Health Logo" width="120"/>
</p>

<h1 align="center">🍀 Emerald Health</h1>

<p align="center">
  <strong>AI-Powered Healthcare for Ireland</strong><br/>
  <em>Built with heart at the Google Student AI Hackathon, Dublin</em>
</p>

<p align="center">
  <a href="#the-story">The Story</a> •
  <a href="#what-we-built">What We Built</a> •
  <a href="#demo">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#my-role">My Role</a> •
  <a href="#lessons-learned">Lessons Learned</a> •
  <a href="#the-team">The Team</a>
</p>

---

## The Story

**January 2025. Dublin. Google's European Headquarters.**

Picture this: 48 hours, 200+ students, one mission — build something meaningful with AI.

When our team of 5 strangers met at the hackathon kickoff, we had no idea we'd end up creating something we're genuinely proud of. The theme was **"AI for Healthcare"**, and as we brainstormed in the Google Docs office overlooking the River Liffey, one thing became clear:

> *"Healthcare in Ireland can be confusing. What if AI could make it simpler?"*

That's when **Emerald Health** was born.

Named after Ireland's nickname — the Emerald Isle — we set out to build an AI symptom checker that actually understands you. Not a cold, clinical tool, but something that feels like talking to a knowledgeable friend.

---

## What We Built

<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/hero-screenshot.png" alt="Emerald Health Homepage" width="800"/>
</p>

### 🩺 AI Symptom Checker
Describe your symptoms in plain English. Upload a photo if it helps. Our AI (powered by Google's Gemini 2.5 Flash) analyzes everything and gives you:
- A preliminary assessment
- Possible conditions to discuss with your doctor
- Clear recommendations on next steps
- Whether you should seek immediate care

<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/symptom-checker.png" alt="Symptom Checker" width="800"/>
</p>

### 📍 Find Healthcare Providers
Search by location, Eircode, or let us find providers near you. Filter by:
- GPs & Family Doctors
- Hospitals & Clinics
- Specialists

One tap to call. One tap for directions.

<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/find-provider.png" alt="Find Provider" width="800"/>
</p>

### 📞 Contact GP
Emergency numbers at your fingertips. Telehealth options. GP practices with real contact details. Because when you need help, you need it fast.

<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/contact-gp.png" alt="Contact GP" width="800"/>
</p>

---

## Demo

🌐 **Live Site**: [emerald-health.vercel.app](https://emerald-health.vercel.app)

<details>
<summary>📸 Click to see more screenshots</summary>

### Homepage
Clean, professional, Irish — green and white throughout.
![Homepage](https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/homepage-full.png)

### Mobile Responsive
Works beautifully on any device.
![Mobile View](https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/mobile-view.png)

### AI Analysis Result
Detailed, actionable health insights.
![Analysis Result](https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/analysis-result.png)

</details>

---

## Tech Stack

We didn't just throw technologies together — every choice was deliberate:

| Layer | Technology | Why We Chose It |
|-------|------------|-----------------|
| **Framework** | Next.js 16 | Server-side rendering, file-based routing, production-ready |
| **Language** | TypeScript | Type safety for healthcare data — bugs here could mislead users |
| **Styling** | Tailwind CSS | Rapid prototyping crucial in a 48-hour hackathon |
| **UI Components** | Radix UI + shadcn/ui | Accessible, beautiful, customizable |
| **AI** | Google Gemini 2.5 Flash | Fast, accurate, multimodal (can analyze images!) |
| **Forms** | React Hook Form + Zod | Bulletproof validation for symptom input |
| **Icons** | Lucide React | Consistent, healthcare-appropriate iconography |
| **Deployment** | Vercel | One-click deploys, perfect for hackathon speed |

<p align="center">
  <img src="https://skillicons.dev/icons?i=typescript,react,nextjs,tailwind,vercel,firebase&theme=light" alt="Tech Stack Icons"/>
</p>

### The AI Brain 🧠

```typescript
// The prompt engineering that powers our symptom analysis
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,  // Balanced creativity and accuracy
    topP: 0.9,
    maxOutputTokens: 4096,
  }
});
```

We spent hours crafting the system prompt to ensure responses are:
- **Medically responsible** — never diagnosing, always recommending professional consultation
- **Clear and actionable** — no medical jargon
- **Appropriately cautious** — erring on the side of "see a doctor" when unsure

---

## My Role

As the **Backend & AI Integration Lead**, I was responsible for:

### 🔌 API Architecture
- Designed the symptom analysis flow from user input to AI response
- Implemented error handling and graceful degradation
- Set up environment-based API key validation

### 🤖 LLM Prompt Engineering
- Crafted the system prompt for medically-responsible AI responses
- Balanced helpfulness with appropriate caution
- Tested edge cases (what happens with vague symptoms? alarming ones?)

### 🔗 Integration Work
- Connected the frontend to Google's Generative AI SDK
- Implemented image analysis for photo-based symptom checking
- Built the practitioner search functionality

### ⚡ Production Optimization
- Fixed hydration issues and hook violations
- Optimized for Vercel deployment
- Resolved the Next.js CVE vulnerability

```
The best part? Watching our AI correctly identify that
"I have a rash that appeared after hiking"
might need a tick bite check. That's when I knew we built something real.
```

---

## Lessons Learned

### What Worked ✅
- **Dividing by expertise** — letting each person own their domain
- **Starting with the AI** — we validated the core feature before building UI
- **Keeping scope tight** — we said no to 10 features to ship 3 great ones

### What Was Hard 🔥
- **API rate limits** — Gemini has quotas, and we hit them during testing
- **Medical accuracy pressure** — knowing real people might use this raised the stakes
- **Sleep deprivation** — 4 hours of sleep over 48 hours is... an experience

### What I'd Do Differently 🔄
- Set up CI/CD earlier — we deployed manually too long
- Add unit tests for the AI parsing logic
- Build a feedback mechanism to improve the AI over time

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/DevEnjoysMath/symptom-assessment-tool.git
cd symptom-assessment-tool

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GOOGLE_GENAI_API_KEY

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in!

---

## The Team

We came as strangers. We left as friends.

<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/team-photo.jpg" alt="Team Photo at Google Dublin" width="600"/>
</p>

<p align="center">
  <em>5 students, 48 hours, 1 mission, countless cups of coffee ☕</em>
</p>

**Special thanks to:**
- Google Developer Student Clubs for organizing
- The Google Dublin team for hosting us
- All the mentors who guided us through the chaos

---

## What's Next?

This hackathon project became something we actually want to continue building:

- [ ] Multi-language support (Irish Gaeilge!)
- [ ] Integration with Irish healthcare APIs
- [ ] Mental health support features
- [ ] Symptom history tracking

**Want to contribute?** PRs are welcome!

---

<p align="center">
  <img src="https://raw.githubusercontent.com/DevEnjoysMath/symptom-assessment-tool/main/public/demo/irish-flag.png" alt="Irish Flag" width="60"/>
</p>

<p align="center">
  <strong>Built with 💚 in Dublin, Ireland</strong><br/>
  <em>For the Google Student AI Hackathon 2025</em>
</p>

<p align="center">
  <a href="https://emerald-health.vercel.app">View Live</a> •
  <a href="https://github.com/DevEnjoysMath/symptom-assessment-tool/issues">Report Bug</a> •
  <a href="https://github.com/DevEnjoysMath/symptom-assessment-tool/pulls">Contribute</a>
</p>

---

<p align="center">
  <sub>⭐ If this project inspired you, consider giving it a star!</sub>
</p>
