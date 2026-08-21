"use client";

import { useEffect, useState, useRef } from "react";

const words = ["automate", "extract", "verify", "deploy"];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;      // ms between each letter
  const DURATION = 500;    // blur+opacity fade duration per letter
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // reset
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    // stagger each letter
    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    // remove gradient once all letters are settled
    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // gradient colours cycling across letter positions
  const gradientColors = ["#eca8d6", "#a78bfa", "#67e8f9", "#fbbf24", "#eca8d6"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        // lerp hex colours
        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

function SeamlessVideoLoop({ src }: { src: string }) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const handleTimeUpdate = () => {
      const currentV = activeVideo === 1 ? v1 : v2;
      const nextV = activeVideo === 1 ? v2 : v1;

      if (currentV.duration && currentV.currentTime >= currentV.duration - 1.2) {
        if (nextV.paused) {
          nextV.currentTime = 0;
          nextV.play().catch(() => {});
          setActiveVideo(activeVideo === 1 ? 2 : 1);
        }
      }
    };

    v1.addEventListener("timeupdate", handleTimeUpdate);
    v2.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate);
      v2.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [activeVideo]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        src={src}
        className={`absolute inset-0 w-full h-full object-cover [object-position:80%_top] sm:[object-position:center_top] transition-opacity duration-1000 ${
          activeVideo === 1 ? "opacity-85" : "opacity-0"
        }`}
      />
      <video
        ref={video2Ref}
        muted
        playsInline
        aria-hidden="true"
        src={src}
        className={`absolute inset-0 w-full h-full object-cover [object-position:80%_top] sm:[object-position:center_top] transition-opacity duration-1000 ${
          activeVideo === 2 ? "opacity-85" : "opacity-0"
        }`}
      />
    </div>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Static gradient fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
        <SeamlessVideoLoop src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" />
        {/* Soft overlay gradients */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/15 via-transparent to-transparent sm:hidden pointer-events-none" />
      </div>




      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-32 sm:py-32 lg:py-40">
        <div className="relative z-10 w-full sm:max-w-none lg:max-w-[55%]">
        {/* Eyebrow */}
        <div 
          className={`mb-6 sm:mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/60">
            <span className="w-6 sm:w-8 h-px bg-white/30 shrink-0" />
            Private AI agents, deployed on your own Azure cloud
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-8">
          <h1 
            className={`text-left text-[clamp(2.2rem,8vw,7rem)] font-display leading-[0.95] tracking-tight text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Private AI agents,</span>
            <span className="block">
              that{" "}
              <span className="relative inline-block">
                <BlurWord word={words[wordIndex]} trigger={wordIndex} />
              </span>
            </span>
          </h1>
        </div>

        {/* Hero CTA buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <a
            href="https://cal.com/sanjeevanxgenautomations-jgbcm1/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-xl shadow-white/10 text-center"
          >
            Book a 30-min Call →
          </a>
          <a
            href="mailto:sanjeevan@xgenautomations.com"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all text-center"
          >
            sanjeevan@xgenautomations.com
          </a>
        </div>

        {/* Stats — always inline, no absolute positioning */}
        <div 
          className={`flex items-start flex-wrap gap-6 sm:gap-10 lg:gap-20 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            { value: "100%", label: "Private deployment" },
            { value: "Fixed", label: "No hourly billing" },
            { value: "1-2 wks", label: "Delivery time" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white">{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-white/50 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
        </div>
      </div>

    </section>
  );
}



