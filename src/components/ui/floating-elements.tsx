"use client";

import { Heart, Activity, Pill, Stethoscope, Brain, Eye, Bone } from 'lucide-react';

const icons = [
  { Icon: Heart, delay: '0s', duration: '20s', left: '5%', size: 24 },
  { Icon: Activity, delay: '2s', duration: '25s', left: '15%', size: 20 },
  { Icon: Pill, delay: '4s', duration: '22s', left: '25%', size: 18 },
  { Icon: Stethoscope, delay: '1s', duration: '28s', left: '75%', size: 22 },
  { Icon: Brain, delay: '3s', duration: '24s', left: '85%', size: 20 },
  { Icon: Eye, delay: '5s', duration: '26s', left: '65%', size: 16 },
  { Icon: Bone, delay: '2.5s', duration: '23s', left: '45%', size: 18 },
];

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, duration, left, size }, index) => (
        <div
          key={index}
          className="absolute opacity-[0.07] text-primary"
          style={{
            left,
            animation: `float-up ${duration} ease-in-out infinite`,
            animationDelay: delay,
            bottom: '-50px',
          }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  );
}
