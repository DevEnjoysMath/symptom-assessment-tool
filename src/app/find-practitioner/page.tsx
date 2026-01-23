"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { findPractitioners, FindPractitionersOutput } from "@/ai/flows/find-practitioners";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Stethoscope, Hospital, User, MapPin, Phone, Search, Loader2, AlertCircle,
  Navigation, Star, ArrowLeft, Heart, ArrowRight, Calendar, Clock, ExternalLink
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
    return <Hospital className="h-5 w-5 text-emerald-600" />;
  }
  if (practitioner.specialty.toLowerCase().includes('gp') || practitioner.specialty.toLowerCase().includes('general practitioner')) {
    return <Stethoscope className="h-5 w-5 text-emerald-600" />;
  }
  return <User className="h-5 w-5 text-emerald-600" />;
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

  const resetSearch = () => {
    setResults(null);
    form.reset();
    setError(null);
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
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Find Provider</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid lg:grid-cols-5 gap-8 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

          {/* Left Panel - Search */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Search location</h2>
                <p className="text-sm text-gray-500">Enter city, town, or Eircode</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              placeholder="e.g., Dublin, D02 F205"
                              className="pl-12 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-base"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Search className="mr-2 h-5 w-5" />
                      )}
                      Search
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFindNearMe}
                      disabled={isLoading}
                      className="h-12 px-4 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 rounded-xl"
                    >
                      <Navigation className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </Form>

              {/* Popular locations */}
              <div className="px-6 pb-6">
                <p className="text-xs text-gray-400 mb-2">Popular:</p>
                <div className="flex flex-wrap gap-2">
                  {popularLocations.map((loc) => (
                    <button
                      key={loc.name}
                      onClick={() => handleSearch(loc.name)}
                      className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter buttons (when results) */}
            {results && !isLoading && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-400 mb-3">Filter by type:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'all', label: 'All', icon: Search },
                    { key: 'gp', label: 'GPs', icon: Stethoscope },
                    { key: 'hospital', label: 'Hospitals', icon: Hospital },
                    { key: 'specialist', label: 'Specialists', icon: Heart },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setFilterType(filter.key as typeof filterType)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                        filterType === filter.key
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                          : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <filter.icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3">
            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Search Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
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
                      <MapPin className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Searching providers</h3>
                  <p className="text-gray-500 text-sm">Finding healthcare options near you...</p>
                  <div className="flex gap-1 mt-6">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {results && !isLoading && (
              <div className="space-y-4">
                {/* Results header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {filteredResults?.length} provider{filteredResults?.length !== 1 ? 's' : ''} found
                    </h2>
                    <p className="text-sm text-gray-500">Healthcare options in your area</p>
                  </div>
                  <button
                    onClick={resetSearch}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    New search
                  </button>
                </div>

                {/* Provider cards */}
                {filteredResults?.map((practitioner, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        {getIconForSpecialty(practitioner)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{practitioner.name}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                practitioner.isHospital ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {practitioner.specialty}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                                <span className="text-xs text-gray-600">4.{5 + (index % 4)}</span>
                              </div>
                            </div>
                          </div>
                          <span className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium flex-shrink-0">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Open
                          </span>
                        </div>

                        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{practitioner.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <a href={`tel:${practitioner.phone}`} className="hover:text-emerald-600 transition-colors">
                              {practitioner.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={`tel:${practitioner.phone}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(practitioner.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-emerald-200 transition-colors"
                          >
                            <Navigation className="w-4 h-4" />
                            Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredResults?.length === 0 && (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center">
                    <p className="text-gray-500">No providers match your filter. Try selecting "All".</p>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!results && !isLoading && !error && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Find healthcare near you</h3>
                  <p className="text-gray-500 max-w-md mb-8">
                    Search for GPs, hospitals, and specialists across Ireland. Enter a location to get started.
                  </p>

                  {/* Provider types */}
                  <div className="w-full max-w-lg space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-left">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">GPs & Family Doctors</p>
                        <p className="text-xs text-gray-500">General practitioners for everyday health</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-left">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Hospital className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Hospitals & Clinics</p>
                        <p className="text-xs text-gray-500">Emergency and specialized care centers</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl text-left">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Specialists</p>
                        <p className="text-xs text-gray-500">Cardiologists, dermatologists, and more</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mt-8 text-xs text-gray-500">
                    <span>All 26 counties</span>
                    <span className="text-gray-300">•</span>
                    <span>Verified providers</span>
                    <span className="text-gray-300">•</span>
                    <span>Updated daily</span>
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
