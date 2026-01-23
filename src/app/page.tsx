"use client";

import { ArrowRight, Activity, Stethoscope, MapPin, Clock, Star, ExternalLink, Shield, Heart, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const hospitals = [
  { name: 'Beacon Hospital', rating: 3.5, address: 'Bracken Rd, Sandyford', phone: '(01) 293 6600', isOpen: false, website: 'https://www.beaconhospital.ie' },
  { name: "St. Vincent's University", rating: 3.2, address: 'Elm Park, Dublin 4', phone: '(01) 221 4000', isOpen: true, website: 'https://www.stvincents.ie' },
  { name: "St James's Hospital", rating: 3.6, address: 'James St, Dublin 8', phone: '(01) 410 3000', isOpen: true, website: 'https://www.stjames.ie' },
  { name: 'Beaumont Hospital', rating: 3.4, address: 'Beaumont Rd, Dublin 9', phone: '(01) 809 3000', isOpen: true, website: 'https://www.beaumont.ie' },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { num: '1', title: 'Describe Your Symptoms', desc: 'Tell us how you feel using plain language. Upload a photo if it helps.', icon: Stethoscope },
    { num: '2', title: 'Get AI Analysis', desc: 'Receive an instant assessment with potential conditions to discuss with your doctor.', icon: Activity },
    { num: '3', title: 'Find Care Nearby', desc: 'Connect with healthcare providers in your area who can help.', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center">
        {/* Background with gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50" />

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Main content */}
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-8 tracking-tight">
                Your health,
                <br />
                <span className="relative">
                  <span className="text-emerald-600">understood</span>
                  <span className="text-emerald-600">.</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="animate-draw" style={{ strokeDasharray: 300, strokeDashoffset: 300, animation: 'draw 1.5s ease forwards 0.5s' }} />
                  </svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                Describe your symptoms in plain English. Get instant AI analysis.
                Find the right healthcare provider near you.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/symptom-checker"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 text-white font-semibold text-lg rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5"
                >
                  Check Your Symptoms
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/find-practitioner"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-gray-700 font-semibold text-lg rounded-2xl border-2 border-gray-200 hover:border-emerald-400 hover:text-emerald-700 transition-all hover:-translate-y-0.5"
                >
                  <MapPin className="w-5 h-5" />
                  Find a Doctor
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-500 text-sm">
                <span>No signup</span>
                <span className="text-gray-300">•</span>
                <span>Free forever</span>
                <span className="text-gray-300">•</span>
                <span>Data stays on your device</span>
              </div>
            </div>

            {/* Right - Interactive Demo Preview */}
            <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                {/* Subtle glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 rounded-[2.5rem] blur-2xl scale-105" />

                {/* Main card - Mock symptom checker interface */}
                <div className="relative bg-white rounded-3xl shadow-2xl shadow-emerald-900/10 border border-gray-200/80 overflow-hidden">
                  {/* Browser-like header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono border border-gray-200">
                      emerald-health.vercel.app
                    </div>
                  </div>

                  {/* App content */}
                  <div className="p-6">
                    {/* Mini header */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                      <span className="font-bold text-gray-900">Symptom Checker</span>
                    </div>

                    {/* Fake input */}
                    <div className="mb-5">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          <span className="text-gray-400">I've been having </span>
                          <span className="text-gray-900 font-medium">headaches and feeling tired</span>
                          <span className="text-gray-400"> for the past few days...</span>
                          <span className="inline-block w-0.5 h-4 bg-emerald-500 ml-1 animate-pulse align-middle" />
                        </p>
                      </div>
                    </div>

                    {/* Fake AI response */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 border border-emerald-200/60">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-emerald-700 mb-1">AI Analysis</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Based on your symptoms, this could be related to <span className="font-semibold text-gray-900">tension headaches</span> or <span className="font-semibold text-gray-900">fatigue</span>...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-4">
                      <div className="flex-1 bg-emerald-600 text-white text-xs font-semibold py-2.5 rounded-lg text-center">
                        Find a Doctor
                      </div>
                      <div className="flex-1 bg-gray-100 text-gray-700 text-xs font-semibold py-2.5 rounded-lg text-center">
                        Learn More
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal Journey */}
      <section className="py-32 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-500 max-w-lg mx-auto">
              From symptoms to solutions in three steps
            </p>
          </div>

          {/* Steps as horizontal cards */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-0 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300 -translate-y-1/2 z-0" />

            {steps.map((step, i) => {
              const { ref, inView } = useInView();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="bg-white rounded-3xl p-8 mx-auto max-w-sm border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300">
                    {/* Step number + icon row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-6xl font-black text-emerald-100">{step.num}</span>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{step.desc}</p>

                    {/* Arrow indicator for non-last items on mobile */}
                    {i < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-6">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-emerald-600 rotate-90" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/symptom-checker"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              Try it now — it's free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Emerald - Split layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Healthcare guidance
              <br />
              <span className="text-emerald-600">that actually helps.</span>
            </h2>
            <p className="text-xl text-gray-500">
              We built this because navigating healthcare in Ireland shouldn't require a medical degree.
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Main feature */}
            <div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-10 h-full text-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <span className="text-emerald-100 text-sm font-medium">Powered by Gemini 2.5</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Describe symptoms like you'd tell a friend.
                </h3>
                <p className="text-emerald-100 text-lg leading-relaxed mb-8">
                  No medical jargon. No forms to fill. Just type what's wrong and get a clear,
                  helpful assessment in seconds.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1.5 bg-white/20 rounded-lg">Text input</span>
                  <span className="px-3 py-1.5 bg-white/20 rounded-lg">Photo upload</span>
                  <span className="px-3 py-1.5 bg-white/20 rounded-lg">Instant analysis</span>
                </div>
              </div>
            </div>

            {/* Right - Feature list */}
            <div className="space-y-6">
              {[
                {
                  title: 'Your data stays yours',
                  desc: 'Nothing leaves your browser. No accounts, no tracking, no selling your health info.',
                  tag: 'Privacy-first'
                },
                {
                  title: 'All 26 counties covered',
                  desc: 'Find GPs, hospitals, and specialists anywhere in Ireland. One search, real results.',
                  tag: 'Nationwide'
                },
                {
                  title: 'Know when to worry',
                  desc: 'Get clear guidance on urgency. Should you call a GP? Go to A&E? Wait it out?',
                  tag: 'Smart triage'
                },
                {
                  title: 'Always free',
                  desc: 'No premium tier, no hidden costs. Quality healthcare guidance for everyone.',
                  tag: 'No catch'
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all bg-white">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{item.tag}</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-emerald-600 font-semibold text-sm tracking-wide uppercase mb-4 block">Our Network</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Dublin hospitals
              </h2>
              <p className="text-gray-600 text-lg">
                Connect with leading healthcare facilities
              </p>
            </div>
            <Link
              href="/find-practitioner"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 transition-colors"
            >
              View all providers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitals.map((hospital, i) => {
              const { ref, inView } = useInView();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-900 leading-tight">{hospital.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold">{hospital.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className={`font-medium ${hospital.isOpen ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {hospital.isOpen ? 'Open now' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                  >
                    Visit website
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/5 rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-emerald-100 text-sm font-medium mb-8 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4" />
            No signup required
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to understand
            <br />your health better?
          </h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Take the first step. It's free, private, and takes less than a minute.
          </p>
          <Link
            href="/symptom-checker"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-600 font-bold text-lg rounded-2xl hover:bg-emerald-50 transition-all shadow-2xl hover:-translate-y-1"
          >
            Start Your Free Check
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="font-bold text-2xl">Emerald Health</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
                AI-powered health insights for Irish families.
                Built with care during the Google Student AI Hackathon in Dublin.
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-5 rounded overflow-hidden shadow">
                  <div className="h-full flex">
                    <div className="w-1/3 bg-emerald-500" />
                    <div className="w-1/3 bg-white" />
                    <div className="w-1/3 bg-orange-500" />
                  </div>
                </span>
                <span className="text-gray-500 text-sm">Made in Ireland</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <nav className="space-y-4">
                <Link href="/symptom-checker" className="block text-gray-400 hover:text-white transition-colors">
                  Symptom Checker
                </Link>
                <Link href="/find-practitioner" className="block text-gray-400 hover:text-white transition-colors">
                  Find Healthcare
                </Link>
                <Link href="/contact-gp" className="block text-gray-400 hover:text-white transition-colors">
                  Contact GP
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <nav className="space-y-4">
                <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Emerald Health. All rights reserved.
            </span>
            <span className="text-gray-600 text-sm">
              Serving all 26 counties
            </span>
          </div>
        </div>
      </footer>

      {/* CSS for underline animation */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
