"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone, Clock, MapPin, ArrowLeft, AlertCircle, CheckCircle2, Calendar,
  Video, Stethoscope, Shield, ExternalLink, Copy, ArrowRight,
  PhoneCall, Star, Building2
} from "lucide-react";

const emergencyNumbers = [
  { name: 'Emergency', number: '999', desc: 'Life-threatening emergencies', urgent: true },
  { name: 'HSE Live', number: '1800 700 700', desc: 'Health information line', urgent: false },
  { name: 'Samaritans', number: '116 123', desc: '24/7 emotional support', urgent: false },
  { name: 'Poisons', number: '01 809 2166', desc: 'Poisoning emergencies', urgent: false },
];

const telehealthOptions = [
  { name: 'VideoDoc', desc: 'Video consultations with Irish GPs, 7 days a week', url: 'https://www.videodoc.ie', price: 'From €45' },
  { name: 'Webdoctor', desc: 'Online GP consultations with same-day prescriptions', url: 'https://www.webdoctor.ie', price: 'From €35' },
  { name: 'Laya Healthcare', desc: 'Virtual GP for Laya members, 24/7 access', url: 'https://www.layahealthcare.ie', price: 'With plan' },
];

const gpPractices = [
  { name: 'Merrion Square Medical', address: '15 Merrion Square, Dublin 2', phone: '+353 1 676 7544', hours: 'Mon-Fri: 8:30am - 6pm', rating: 4.8, acceptingNew: true },
  { name: 'Dame Street Family Practice', address: '42 Dame Street, Dublin 2', phone: '+353 1 670 8899', hours: 'Mon-Fri: 9am - 5:30pm', rating: 4.6, acceptingNew: true },
  { name: 'Ballsbridge Medical Centre', address: '88 Pembroke Road, Dublin 4', phone: '+353 1 668 1234', hours: 'Mon-Sat: 8am - 8pm', rating: 4.7, acceptingNew: false },
];

export default function ContactGPPage() {
  const [mounted, setMounted] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number.replace(/\s/g, ''));
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
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
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Contact GP</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid lg:grid-cols-5 gap-8 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

          {/* Left Panel - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Emergency Numbers</h2>
                    <p className="text-sm text-gray-500">For urgent situations</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {emergencyNumbers.map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl flex items-center justify-between ${
                      item.urgent
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-50 hover:bg-emerald-50 transition-colors'
                    }`}
                  >
                    <div>
                      <p className={`font-semibold text-sm ${item.urgent ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${item.urgent ? 'text-red-100' : 'text-gray-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${item.number.replace(/\s/g, '')}`}
                        className={`font-bold text-lg ${item.urgent ? 'text-white' : 'text-emerald-600'}`}
                      >
                        {item.number}
                      </a>
                      <button
                        onClick={() => copyToClipboard(item.number)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.urgent ? 'hover:bg-red-500' : 'hover:bg-gray-200'
                        }`}
                        title="Copy number"
                      >
                        {copiedNumber === item.number ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className={`w-4 h-4 ${item.urgent ? 'text-red-200' : 'text-gray-400'}`} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <Link
                href="/symptom-checker"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Symptom Checker</p>
                  <p className="text-xs text-gray-500">AI-powered analysis</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </Link>

              <Link
                href="/find-practitioner"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Find Provider</p>
                  <p className="text-xs text-gray-500">Search by location</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
            </div>

            {/* When to see GP */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">When to see your GP</h3>
              <ul className="space-y-2.5">
                {[
                  'Symptoms lasting more than a few days',
                  'Recurring health issues',
                  'Prescription renewals',
                  'Referrals to specialists',
                  'Annual health check-ups'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical Card Info */}
            <div className="bg-blue-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Have a Medical Card?</h3>
              <p className="text-xs text-gray-600 mb-3">
                Medical card holders can access free GP visits. Check your eligibility on HSE.ie
              </p>
              <a
                href="https://www2.hse.ie/services/medical-cards/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Telehealth Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Video className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Online GP Consultations</h2>
                  <p className="text-sm text-gray-500">Video consultations with licensed Irish doctors</p>
                </div>
              </div>

              <div className="space-y-3">
                {telehealthOptions.map((option, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-emerald-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900">{option.name}</h3>
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {option.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{option.desc}</p>
                      </div>
                      <a
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors flex-shrink-0"
                      >
                        Visit
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GP Practices Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">GP Practices in Dublin</h2>
                  <p className="text-sm text-gray-500">Local practices accepting patients</p>
                </div>
              </div>

              <div className="space-y-3">
                {gpPractices.map((gp, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-emerald-200 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{gp.name}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                                <span className="text-xs text-gray-600">{gp.rating}</span>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                gp.acceptingNew
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {gp.acceptingNew ? 'Accepting patients' : 'Not accepting'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{gp.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>{gp.hours}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={`tel:${gp.phone}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                          >
                            <PhoneCall className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(gp.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-emerald-200 transition-colors"
                          >
                            <MapPin className="w-4 h-4" />
                            Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Not sure if you need a GP?</h2>
              <p className="text-emerald-100 mb-6">
                Use our AI symptom checker for a preliminary assessment and guidance.
              </p>
              <Link
                href="/symptom-checker"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <Stethoscope className="w-5 h-5" />
                Check Your Symptoms
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
