"use client";

import { Heart } from 'lucide-react';

export function PulseRing() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Outer rings */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
      <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
      <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s' }} />

      {/* Center heart */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Heart className="w-8 h-8 text-primary animate-pulse" style={{ animationDuration: '1s' }} />
      </div>
    </div>
  );
}
