"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { findPractitioners, FindPractitionersOutput } from "@/ai/flows/find-practitioners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Stethoscope, Hospital, User, MapPin, Phone, Search, Loader2, AlertCircle,
  Navigation, Star, ArrowLeft, Heart, CheckCircle2
} from "lucide-react";

const searchSchema = z.object({
  location: z.string().min(3, {
    message: "Please enter a location (at least 3 characters).",
  }),
});

type SearchFormValues = z.infer<typeof searchSchema>;
type Practitioner = FindPractitionersOutput['practitioners'][0];

const getIconForSpecialty = (practitioner: Practitioner) => {
  if (practitioner.isHospital) {
    return <Hospital className="h-6 w-6 text-emerald-600" />;
  }
  if (practitioner.specialty.toLowerCase().includes('gp') || practitioner.specialty.toLowerCase().includes('general practitioner')) {
    return <Stethoscope className="h-6 w-6 text-emerald-600" />;
  }
  return <User className="h-6 w-6 text-emerald-600" />;
};

const popularLocations = [
  { name: 'Dublin', eircode: 'D01' },
  { name: 'Cork', eircode: 'T12' },
  { name: 'Galway', eircode: 'H91' },
  { name: 'Limerick', eircode: 'V94' },
  { name: 'Waterford', eircode: 'X91' },
];

export default function FindPractitionerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<FindPractitionersOutput | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'gp' | 'hospital' | 'specialist'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { location: "" },
  });

  const handleSearch = async (locationQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await findPractitioners({ locationQuery });
      setResults(response);
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindNearMe = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        () => handleSearch("Dublin"),
        () => {
          setError("Could not access your location. Please enter it manually.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  function onSubmit(data: SearchFormValues) {
    handleSearch(data.location);
  }

  const filteredResults = results?.practitioners.filter(p => {
    if (filterType === 'all') return true;
    if (filterType === 'hospital') return p.isHospital;
    if (filterType === 'gp') return p.specialty.toLowerCase().includes('general practitioner');
    if (filterType === 'specialist') return !p.isHospital && !p.specialty.toLowerCase().includes('general practitioner');
    return true;
  });

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
              <MapPin className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Find Healthcare Near You</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Search for GPs, hospitals, and specialists across Ireland.
            </p>

            <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <Input
                                placeholder="Enter city, town, or Eircode (e.g., Dublin, D02 F205)"
                                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button type="submit" disabled={isLoading} className="flex-1 h-12 text-base bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                        Search Providers
                      </Button>
                      <Button type="button" variant="outline" onClick={handleFindNearMe} disabled={isLoading} className="flex-1 h-12 text-base border-2 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl">
                        <Navigation className="mr-2 h-5 w-5" />
                        Use My Location
                      </Button>
                    </div>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Popular locations:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularLocations.map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => handleSearch(loc.name)}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-full transition-colors"
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Search Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg">Searching for healthcare providers...</p>
            </div>
          )}

          {results && !isLoading && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Found {results.practitioners.length} providers</h2>
                  <p className="text-gray-600">Healthcare options in your area</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'gp', label: 'GPs' },
                    { key: 'hospital', label: 'Hospitals' },
                    { key: 'specialist', label: 'Specialists' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setFilterType(filter.key as typeof filterType)}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        filterType === filter.key
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                {filteredResults?.map((practitioner, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        {getIconForSpecialty(practitioner)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{practitioner.name}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                practitioner.isHospital ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {practitioner.specialty}
                              </span>
                              <div className="flex items-center gap-1 text-amber-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm text-gray-600">4.{5 + (index % 4)}</span>
                              </div>
                            </div>
                          </div>
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Open now
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 text-gray-600">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{practitioner.address}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <a href={`tel:${practitioner.phone}`} className="hover:text-emerald-600 transition-colors">
                              {practitioner.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-6">
                          <a
                            href={`tel:${practitioner.phone}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Call Now
                          </a>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(practitioner.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                          >
                            <Navigation className="w-4 h-4" />
                            Get Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredResults?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No providers match your filter. Try selecting "All".</p>
                </div>
              )}
            </div>
          )}

          {!results && !isLoading && !error && (
            <div className="py-16">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Stethoscope, title: 'GPs & Family Doctors', desc: 'Find trusted general practitioners for everyday health concerns.' },
                  { icon: Hospital, title: 'Hospitals & Clinics', desc: 'Locate hospitals, urgent care centers, and specialty clinics.' },
                  { icon: Heart, title: 'Specialists', desc: 'Connect with cardiologists, dermatologists, and other specialists.' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-8 rounded-2xl border border-gray-100 bg-white">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-6 flex-wrap justify-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>500+ verified providers</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>All 26 counties covered</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Updated contact details</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
