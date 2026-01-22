"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, AlertTriangle, CheckCircle, ArrowRight, Stethoscope, Clock, Shield, Activity, Search, User, Calendar, Heart, Upload, X, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

export default function SymptomCheckerPage() {
  const [analysis, setAnalysis] = useState<SymptomAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

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
    } catch (e) {
      return explanation;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-50 to-white py-12">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Powered by Google Gemini AI
            </div>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-2xl mb-6">
              <Stethoscope className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Symptom Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Describe your symptoms and get instant AI-powered health insights.
              This tool provides guidance but does not replace professional medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    Describe Symptoms
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Be as detailed as possible for accurate analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="symptoms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium text-gray-900">
                              What symptoms are you experiencing?
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., 'I have a persistent cough, fever, and feel very tired. The cough is worse at night...'"
                                className="min-h-[140px] resize-none text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Image Upload */}
                      <div className="space-y-3">
                        <FormLabel className="text-base font-medium text-gray-900">
                          Upload a photo (optional)
                        </FormLabel>

                        {imagePreview ? (
                          <div className="relative rounded-xl overflow-hidden border-2 border-emerald-200 bg-emerald-50">
                            <img
                              src={imagePreview}
                              alt="Symptom preview"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="relative block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-200 hover:border-emerald-400 rounded-xl p-6 text-center transition-all hover:bg-emerald-50 group">
                              <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-emerald-600 transition-colors mb-2" />
                              <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </label>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg"
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
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/find-practitioner"
                  className="w-full h-12 text-base border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 font-medium rounded-xl transition-all flex items-center px-4"
                >
                  <User className="mr-3 h-5 w-5 text-emerald-600" />
                  Find Healthcare Provider
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
                <Link
                  href="/contact-gp"
                  className="w-full h-12 text-base border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 font-medium rounded-xl transition-all flex items-center px-4"
                >
                  <Calendar className="mr-3 h-5 w-5 text-emerald-600" />
                  Contact Your GP
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              {/* Analysis Results */}
              {analysis && (
                <div className="space-y-6">
                  <Card className={`shadow-xl border-2 ${
                    analysis.isSerious
                      ? 'border-red-200 bg-gradient-to-br from-red-50 to-white'
                      : 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white'
                  }`}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold">
                        {analysis.isSerious ? (
                          <>
                            <div className="p-3 bg-red-100 rounded-xl">
                              <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <span className="text-red-700">Medical Attention Recommended</span>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-emerald-100 rounded-xl">
                              <CheckCircle className="h-6 w-6 text-emerald-600" />
                            </div>
                            <span className="text-emerald-700">Likely Not Serious</span>
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {analysis.suggestImmediateAction && (
                        <div className="bg-red-600 text-white rounded-xl p-5 shadow-lg">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                              <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">Seek Medical Care</h4>
                              <p className="text-red-100">
                                Based on your symptoms, we recommend consulting a healthcare provider promptly.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-inner">
                        <div className="prose prose-base max-w-none">
                          <ReactMarkdown
                            components={{
                              h1: ({children}) => (
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Shield className="h-4 w-4 text-emerald-600" />
                                  </div>
                                  <h1 className="text-lg font-bold text-gray-900 m-0">
                                    {children}
                                  </h1>
                                </div>
                              ),
                              h2: ({children}) => (
                                <div className="flex items-center gap-3 mb-3 mt-6">
                                  <div className="p-1.5 bg-gray-100 rounded-lg">
                                    <Clock className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <h2 className="text-base font-semibold text-gray-900 m-0">
                                    {children}
                                  </h2>
                                </div>
                              ),
                              ul: ({children}) => (
                                <ul className="space-y-2 mt-3 ml-6">
                                  {children}
                                </ul>
                              ),
                              li: ({children}) => (
                                <li className="text-gray-600 leading-relaxed text-base flex items-start gap-2">
                                  <span className="text-emerald-600 mt-1.5">•</span>
                                  <span>{children}</span>
                                </li>
                              ),
                              p: ({children}) => (
                                <p className="text-gray-600 leading-relaxed mb-3 text-base">
                                  {children}
                                </p>
                              )
                            }}
                          >
                            {parseExplanation(analysis.explanation)}
                          </ReactMarkdown>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                          href="/find-practitioner"
                          className="h-12 text-base font-medium border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-all flex items-center justify-center gap-2 px-4"
                        >
                          <Stethoscope className="h-5 w-5 text-emerald-600" />
                          Find Provider
                          <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                        </Link>
                        <Link
                          href="/contact-gp"
                          className="h-12 text-base font-medium border-2 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-all flex items-center justify-center gap-2 px-4"
                        >
                          <Clock className="h-5 w-5 text-emerald-600" />
                          Contact GP
                          <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                        </Link>
                      </div>

                      <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <Shield className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-emerald-700 mb-1">
                              Important Notice
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              This is an AI-powered preliminary analysis and should not replace professional medical advice.
                              If you're experiencing severe symptoms or are unsure, always consult a healthcare provider.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <Card className="shadow-xl border-0 bg-white">
                  <CardContent className="flex flex-col items-center justify-center py-20">
                    <div className="relative w-24 h-24 mb-8">
                      <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="absolute inset-4 rounded-full border-4 border-emerald-200 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                          <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      Analyzing Your Symptoms
                    </h3>
                    <p className="text-gray-600 text-center max-w-md text-base leading-relaxed">
                      Our AI is carefully reviewing your symptoms to provide the most accurate analysis possible.
                    </p>
                    <div className="flex gap-1.5 mt-6">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {!analysis && !isLoading && (
                <Card className="shadow-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
                  <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                      <Search className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      Ready to Analyze
                    </h3>
                    <p className="text-gray-600 max-w-md leading-relaxed">
                      Describe your symptoms in the form and click "Analyze Symptoms" to get an AI-powered preliminary analysis.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-sm text-emerald-700">
                        <Shield className="w-4 h-4" />
                        Private & Secure
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-sm text-emerald-700">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-sm text-emerald-700">
                        <Clock className="w-4 h-4" />
                        Instant Results
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Bottom Info Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <Shield className="h-5 w-5 text-emerald-600" /> How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 text-sm">
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Describe your symptoms in your own words</li>
                  <li>Our AI analyzes your input for possible causes</li>
                  <li>Get a clear, actionable summary and next steps</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Deirdre"
                    alt="Deirdre K."
                    className="rounded-full w-12 h-12 bg-emerald-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Deirdre K.</p>
                    <p className="text-xs text-gray-500">Dublin</p>
                  </div>
                </div>
                <blockquote className="italic text-gray-600 text-sm">
                  "The analysis was surprisingly accurate and helped me decide to see a doctor sooner."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="flex items-center gap-3 p-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Shield className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">Your privacy is protected</p>
                  <p className="text-xs text-gray-500">We never store your personal health data.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
