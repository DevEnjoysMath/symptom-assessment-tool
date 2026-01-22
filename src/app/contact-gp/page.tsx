"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone, Clock, MapPin, ArrowLeft, AlertCircle, CheckCircle2, Calendar,
  MessageSquare, Video, Stethoscope, Shield, ExternalLink, Copy,
  PhoneCall, Star, Building2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const emergencyNumbers = [
  { name: 'Emergency Services', number: '999 / 112', desc: 'For life-threatening emergencies', urgent: true },
  { name: 'HSE Live', number: '1800 700 700', desc: 'Health information & advice line', urgent: false },
  { name: 'Samaritans', number: '116 123', desc: '24/7 emotional support', urgent: false },
  { name: 'Poisons Centre', number: '01 809 2166', desc: 'Poisoning emergencies', urgent: false },
];

const gpServices = [
  { icon: Stethoscope, title: 'General Consultations', desc: 'Routine check-ups, illness diagnosis, and treatment plans' },
  { icon: Calendar, title: 'Appointment Booking', desc: 'Schedule in-person or phone consultations with your GP' },
  { icon: Shield, title: 'Chronic Disease Management', desc: 'Ongoing care for diabetes, heart conditions, and more' },
  { icon: CheckCircle2, title: 'Vaccinations', desc: 'Flu shots, travel vaccines, and childhood immunizations' },
];

const gpPractices = [
  { name: 'Merrion Square Medical Practice', address: '15 Merrion Square, Dublin 2', phone: '+353 1 676 7544', hours: 'Mon-Fri: 8:30am - 6:00pm', rating: 4.8, acceptingNew: true },
  { name: 'Dame Street Family Practice', address: '42 Dame Street, Dublin 2', phone: '+353 1 670 8899', hours: 'Mon-Fri: 9:00am - 5:30pm', rating: 4.6, acceptingNew: true },
  { name: 'Ballsbridge Medical Centre', address: '88 Pembroke Road, Dublin 4', phone: '+353 1 668 1234', hours: 'Mon-Sat: 8:00am - 8:00pm', rating: 4.7, acceptingNew: false },
];

const telehealthOptions = [
  { name: 'VideoDoc', desc: 'Video consultations with Irish GPs, available 7 days a week', url: 'https://www.videodoc.ie', price: 'From €45' },
  { name: 'Webdoctor', desc: 'Online GP consultations with same-day prescriptions', url: 'https://www.webdoctor.ie', price: 'From €35' },
  { name: 'Laya Healthcare GP', desc: 'Virtual GP for Laya members, 24/7 access', url: 'https://www.layahealthcare.ie', price: 'Included with plan' },
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
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-b from-emerald-50 to-white py-16">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className={`text-center ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-2xl mb-6">
              <Phone className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Contact Your GP</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find GP contact information, book appointments, or access telehealth services across Ireland.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-red-50 border-y border-red-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Emergency & Helpline Numbers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyNumbers.map((item, i) => (
              <div key={i} className={`p-4 rounded-xl ${item.urgent ? 'bg-red-600 text-white' : 'bg-white border border-gray-200'}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold ${item.urgent ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                  <button onClick={() => copyToClipboard(item.number)} className={`p-1 rounded ${item.urgent ? 'hover:bg-red-500' : 'hover:bg-gray-100'}`} title="Copy number">
                    {copiedNumber === item.number ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-60" />}
                  </button>
                </div>
                <a href={`tel:${item.number.replace(/\s/g, '')}`} className={`text-2xl font-bold block mb-1 hover:underline ${item.urgent ? 'text-white' : 'text-emerald-600'}`}>
                  {item.number}
                </a>
                <p className={`text-sm ${item.urgent ? 'text-red-100' : 'text-gray-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Your GP Can Help With</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {gpServices.map((service, i) => (
                    <div key={i} className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-emerald-200 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Video className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Online GP Consultations</h2>
                </div>
                <p className="text-gray-600 mb-6">Can't visit your GP in person? These telehealth services offer video consultations with licensed Irish doctors.</p>
                <div className="space-y-4">
                  {telehealthOptions.map((option, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-emerald-200 transition-all">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{option.name}</h3>
                        <p className="text-gray-600 text-sm">{option.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-emerald-600 font-semibold whitespace-nowrap">{option.price}</span>
                        <a href={option.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap">
                          Visit Site <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">GP Practices in Dublin</h2>
                <div className="space-y-4">
                  {gpPractices.map((gp, i) => (
                    <div key={i} className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-emerald-200 transition-all">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{gp.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-sm text-gray-600">{gp.rating}</span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${gp.acceptingNew ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                  {gp.acceptingNew ? 'Accepting new patients' : 'Not accepting new patients'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600 ml-15">
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" />{gp.address}</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" />{gp.hours}</div>
                          </div>
                        </div>
                        <a href={`tel:${gp.phone}`} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                          <PhoneCall className="w-4 h-4" />Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-6 shadow-lg border-0 bg-gradient-to-b from-emerald-50 to-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a href="tel:999" className="flex items-center gap-3 p-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                      <Phone className="w-5 h-5" />
                      <div><div className="font-semibold">Emergency</div><div className="text-sm text-red-100">Call 999 or 112</div></div>
                    </a>
                    <a href="tel:1800700700" className="flex items-center gap-3 p-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <div><div className="font-semibold">HSE Live</div><div className="text-sm text-emerald-100">Health advice line</div></div>
                    </a>
                    <Link href="/find-practitioner" className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      <div><div className="font-semibold text-gray-900">Find Provider</div><div className="text-sm text-gray-500">Search by location</div></div>
                    </Link>
                    <Link href="/symptom-checker" className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                      <Stethoscope className="w-5 h-5 text-emerald-600" />
                      <div><div className="font-semibold text-gray-900">Symptom Checker</div><div className="text-sm text-gray-500">AI health analysis</div></div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">When to See Your GP</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    {['Symptoms lasting more than a few days', 'Recurring health issues or concerns', 'Prescription renewals or medication reviews', 'Referrals to specialists', 'Annual health check-ups'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Have a Medical Card?</h3>
                  <p className="text-sm text-gray-600 mb-4">Medical card holders can access free GP visits. Check your eligibility or find a GP who accepts medical cards.</p>
                  <a href="https://www2.hse.ie/services/medical-cards/" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                    Learn more on HSE.ie <ExternalLink className="w-3 h-3" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Not sure if you need to see a GP?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">Use our AI symptom checker to get a preliminary assessment and guidance on whether you should seek medical attention.</p>
          <Link href="/symptom-checker" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
            <Stethoscope className="w-5 h-5" />
            Check Your Symptoms
          </Link>
        </div>
      </section>
    </div>
  );
}
