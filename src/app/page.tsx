"use client";

import { ArrowRight, Activity, Stethoscope, MapPin, Clock, Star, ExternalLink, Shield, Heart, Users, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const hospitals = [
  { name: 'Beacon Hospital', rating: 3.5, address: 'Bracken Rd, Sandyford', phone: '(01) 293 6600', isOpen: false, website: 'https://www.beaconhospital.ie' },
  { name: "St. Vincent's University", rating: 3.2, address: 'Elm Park, Dublin 4', phone: '(01) 221 4000', isOpen: true, website: 'https://www.stvincents.ie' },
  { name: "St James's Hospital", rating: 3.6, address: 'James St, Dublin 8', phone: '(01) 410 3000', isOpen: true, website: 'https://www.stjames.ie' },
  { name: 'Beaumont Hospital', rating: 3.4, address: 'Beaumont Rd, Dublin 9', phone: '(01) 809 3000', isOpen: true, website: 'https://www.beaumont.ie' },
];

// Intersection observer for scroll animations
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

// Animated counter
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView();
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{displayed.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Activity,
      title: 'Intelligent Symptom Analysis',
      desc: 'Describe your symptoms in everyday language. Our AI understands context and provides meaningful health insights.'
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      desc: 'Your health data stays on your device. No accounts required, no data stored on servers.'
    },
    {
      icon: Heart,
      title: 'Trusted by Irish Families',
      desc: 'Built specifically for the Irish healthcare system, connecting you with local providers and services.'
    },
    {
      icon: Users,
      title: 'Healthcare Network',
      desc: 'Access our network of 500+ verified healthcare providers across all 26 counties.'
    },
  ];

  const steps = [
    { num: '1', title: 'Describe Your Symptoms', desc: 'Tell us how you feel using plain language. No medical terminology needed.', icon: Stethoscope },
    { num: '2', title: 'Get AI Analysis', desc: 'Receive an assessment of your symptoms with potential conditions to discuss with your doctor.', icon: Activity },
    { num: '3', title: 'Find Care Nearby', desc: 'Connect with healthcare providers in your area who can help with your specific needs.', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                Trusted by 50,000+ Irish users
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Understand your health with{' '}
                <span className="text-emerald-600">confidence</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Get instant, private symptom analysis powered by advanced AI.
                Connect with healthcare providers across Ireland when you need them most.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/symptom-checker"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
                >
                  Check Your Symptoms
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/find-practitioner"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  Find a Doctor
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600">Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600">No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-gray-600">100% private</span>
                </div>
              </div>
            </div>

            {/* Right content - Stats card */}
            <div className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                    <Heart className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Empowering Irish Healthcare</h3>
                  <p className="text-gray-500 mt-2">Real-time health insights for everyone</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: 52847, label: 'Symptom Analyses', suffix: '+' },
                    { value: 98, label: 'User Satisfaction', suffix: '%' },
                    { value: 523, label: 'Healthcare Providers', suffix: '+' },
                    { value: 26, label: 'Counties Covered', suffix: '' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-gray-50">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why families across Ireland trust us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with care for the Irish healthcare system, ensuring you get the support you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const { ref, inView } = useInView();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-emerald-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to better understand your health
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => {
              const { ref, inView } = useInView();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`flex flex-col md:flex-row items-start gap-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold text-2xl flex-shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100">
                    <step.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Partner hospitals in Dublin
              </h2>
              <p className="text-gray-600 text-lg">
                Connect with leading healthcare facilities near you
              </p>
            </div>
            <Link
              href="/find-practitioner"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              View all providers
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitals.map((hospital, i) => {
              const { ref, inView } = useInView();
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-emerald-200 transition-all duration-300 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">{hospital.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {hospital.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span className={hospital.isOpen ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                        {hospital.isOpen ? 'Open now' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
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
      <section className="py-24 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to take control of your health?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join over 50,000 Irish users who trust Emerald Health for reliable symptom analysis and healthcare connections.
          </p>
          <Link
            href="/symptom-checker"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-emerald-600 font-semibold text-lg rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Start Your Free Analysis
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="mt-6 text-emerald-200 text-sm">
            No signup required. Your data stays private.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-semibold text-xl">Emerald Health</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Empowering Irish families with intelligent health insights.
                We believe everyone deserves access to quality healthcare information.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <nav className="space-y-3">
                <Link href="/symptom-checker" className="block text-gray-400 hover:text-white transition-colors">
                  Symptom Checker
                </Link>
                <Link href="/find-practitioner" className="block text-gray-400 hover:text-white transition-colors">
                  Find Healthcare
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <nav className="space-y-3">
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
              © {new Date().getFullYear()} Emerald Health. Made with care in Ireland.
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="inline-block w-6 h-4 rounded-sm overflow-hidden">
                <div className="h-full flex">
                  <div className="w-1/3 bg-emerald-600" />
                  <div className="w-1/3 bg-white" />
                  <div className="w-1/3 bg-orange-500" />
                </div>
              </span>
              Serving all 26 counties
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
