"use client";

export function DNAHelix() {
  const strands = 12;

  return (
    <div className="relative w-16 h-64 mx-auto">
      {Array.from({ length: strands }).map((_, i) => {
        const delay = i * 0.15;
        const y = (i / strands) * 100;
        return (
          <div key={i} className="absolute w-full" style={{ top: `${y}%` }}>
            {/* Left strand */}
            <div
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{
                animation: `dna-left 2s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                left: '0',
              }}
            />
            {/* Connector */}
            <div
              className="absolute h-0.5 bg-primary/30 top-1.5"
              style={{
                animation: `dna-connector 2s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                left: '12px',
                width: '40px',
              }}
            />
            {/* Right strand */}
            <div
              className="absolute w-3 h-3 rounded-full bg-accent"
              style={{
                animation: `dna-right 2s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                right: '0',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
