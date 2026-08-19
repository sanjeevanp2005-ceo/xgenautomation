"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-5 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1 w-full">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-display tracking-tight mb-6 sm:mb-8 leading-[0.95]">
                  Ready to solve your
                  <br />
                  operational bottlenecks?
                </h2>

                <p className="text-base sm:text-xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed max-w-xl">
                  Book a 30-minute strategy call. We map your workflow, design your custom Azure AI agent, and deploy inside your own cloud tenant.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href="https://cal.com/sanjeevanxgenautomations-jgbcm1/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full font-medium group transition-all"
                  >
                    Get a free scope call
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="mailto:sanjeevan@xgenautomations.com"
                    className="inline-flex items-center justify-center h-14 px-6 text-sm sm:text-base rounded-full border border-foreground/20 hover:bg-foreground/5 font-medium transition-all text-foreground break-all sm:break-normal text-center"
                  >
                    sanjeevan@xgenautomations.com
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mt-8 font-mono">
                  Private Azure AI Deployment &bull; 100% Client Ownership
                </p>
              </div>

              {/* Right image */}
              <div className="hidden lg:flex items-end justify-center w-[600px] h-[650px] -mr-16">
                <img
                  src="/images/bridge.png"
                  alt="Two trees connected by glowing arcs"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
