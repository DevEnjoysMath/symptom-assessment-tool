"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, AlertTriangle, CheckCircle, ArrowRight, Stethoscope, Clock, Shield, Activity, Search, User, Calendar, Upload, X, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { analyzeSymptoms, type SymptomAnalysisOutput } from "@/lib/ai-helpers";
import ReactMarkdown from 'react-markdown';

const symptomCheckerSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

type SymptomCheckerFormValues = z.infer<typeof symptomCheckerSchema>;

const exampleSymptoms = [
  "Headache and fatigue",
  "Sore throat",
  "Back pain",
  "Dizziness",
];

export default function SymptomCheckerPage() {
  const [analysis, setAnalysis] = useState<SymptomAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<SymptomCheckerFormValues>({
    resolver: zodResolver(symptomCheckerSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 10MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  async function onSubmit(data: SymptomCheckerFormValues) {
    setIsLoading(true);
    setAnalysis(null);

    try {
      const result = await analyzeSymptoms({
        symptoms: data.symptoms,
        photoDataUri: imagePreview || undefined,
      });
      setAnalysis(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "An error occurred while analyzing symptoms. Please try again later.",
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const parseExplanation = (explanation: string) => {
    try {
      const markdownStart = explanation.indexOf('# Likely Cause');
      if (markdownStart !== -1) {
        return explanation.substring(markdownStart);
      }
      return explanation;
    } catch {
      return explanation;
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    form.reset();
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-white to-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Symptom Checker</span>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid lg:grid-cols-5 gap-8 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

          {/* Left Panel - Input Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Describe your symptoms</h2>
                <p className="text-sm text-gray-500">Be specific for better analysis</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., I've had a persistent headache for 3 days, worse in the morning..."
                            className="min-h-[140px] resize-none border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quick symptom tags */}
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Quick add:</p>
                    <div className="flex flex-wrap gap-2">
                      {exampleSymptoms.map((symptom) => (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => {
                            const current = form.getValues("symptoms");
                            form.setValue("symptoms", current ? `${current}, ${symptom.toLowerCase()}` : symptom);
                          }}
                          className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                        >
                          + {symptom}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Photo (optional):</p>
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-emerald-200 bg-emerald-50">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-gray-200 hover:border-emerald-300 rounded-xl p-4 text-center transition-all hover:bg-emerald-50/50 group">
                          <Upload className="w-6 h-6 mx-auto text-gray-400 group-hover:text-emerald-600 transition-colors mb-1" />
                          <p className="text-sm text-gray-500 group-hover:text-gray-700">
                            Upload image
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Analyze Symptoms
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <Link
                href="/find-practitioner"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Find a doctor</p>
                  <p className="text-xs text-gray-500">GPs, hospitals, specialists</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/contact-gp"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Contact GP</p>
                  <p className="text-xs text-gray-500">Emergency & telehealth</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
            </div>

            {/* Trust indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
              <Shield className="w-3.5 h-3.5" />
              <span>Your data stays private</span>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3">
            {/* Analysis Results */}
            {analysis && (
              <div className={`space-y-6 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {/* Status Banner */}
                <div className={`rounded-2xl p-6 ${
                  analysis.isSerious
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-100'
                    : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      analysis.isSerious ? 'bg-red-100' : 'bg-emerald-100'
                    }`}>
                      {analysis.isSerious ? (
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold mb-1 ${
                        analysis.isSerious ? 'text-red-900' : 'text-emerald-900'
                      }`}>
                        {analysis.isSerious ? 'Consider seeing a doctor' : 'Likely not serious'}
                      </h2>
                      <p className={`text-sm ${analysis.isSerious ? 'text-red-700' : 'text-emerald-700'}`}>
                        {analysis.isSerious
                          ? 'Based on your symptoms, a medical professional should evaluate this.'
                          : 'Your symptoms suggest something manageable, but monitor for changes.'}
                      </p>
                    </div>
                  </div>

                  {analysis.suggestImmediateAction && (
                    <div className="mt-4 bg-red-600 text-white rounded-xl p-4 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">Seek medical attention promptly</span>
                    </div>
                  )}
                </div>

                {/* Detailed Analysis */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Detailed Analysis</h3>
                  </div>
                  <div className="p-6">
                    <div className="prose prose-gray prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({children}) => (
                            <h2 className="text-lg font-bold text-gray-900 mb-3 mt-0 pb-2 border-b border-gray-100">
                              {children}
                            </h2>
                          ),
                          h2: ({children}) => (
                            <h3 className="text-base font-semibold text-gray-800 mt-6 mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {children}
                            </h3>
                          ),
                          ul: ({children}) => (
                            <ul className="space-y-1.5 my-3">
                              {children}
                            </ul>
                          ),
                          li: ({children}) => (
                            <li className="text-gray-600 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gray-300">
                              {children}
                            </li>
                          ),
                          p: ({children}) => (
                            <p className="text-gray-600 leading-relaxed mb-3">
                              {children}
                            </p>
                          ),
                          strong: ({children}) => (
                            <strong className="font-semibold text-gray-900">{children}</strong>
                          ),
                        }}
                      >
                        {parseExplanation(analysis.explanation)}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-gray-50 border-t border-gray-100 p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/find-practitioner"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        Find a doctor
                      </Link>
                      <button
                        onClick={resetAnalysis}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Check different symptoms
                      </button>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 text-xs text-gray-500 bg-gray-50 rounded-xl p-4">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                  <p>
                    This is an AI-powered preliminary assessment. It does not replace professional medical advice.
                    If you're concerned about your health, please consult a healthcare provider.
                  </p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full border-4 border-emerald-100" />
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Stethoscope className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing symptoms</h3>
                  <p className="text-gray-500 text-sm">This usually takes a few seconds...</p>
                  <div className="flex gap-1 mt-6">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!analysis && !isLoading && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                    <Activity className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to analyze</h3>
                  <p className="text-gray-500 max-w-md mb-8">
                    Describe your symptoms in the form on the left and we'll provide an AI-powered preliminary analysis.
                  </p>

                  {/* Info cards */}
                  <div className="w-full max-w-lg space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-left">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">100% Private</p>
                        <p className="text-xs text-gray-500">Your data never leaves your device</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-left">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Powered by Gemini 2.5</p>
                        <p className="text-xs text-gray-500">Google's most advanced AI model</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-left">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Instant Results</p>
                        <p className="text-xs text-gray-500">Get your analysis in seconds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
