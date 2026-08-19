"use client";

import { ArrowRight, Mail, Calendar } from "lucide-react";

export function LegalAndContactSections() {
  return (
    <div className="bg-black text-white">
      {/* 1. Contact Section */}
      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 border-t border-foreground/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Contact
          </span>
          <h2 className="text-5xl md:text-6xl font-display tracking-tight mb-8">
            Get in touch directly.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
            Reach out via discovery call or email to discuss your workflow requirements and get a fixed project scope.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="https://cal.com/sanjeevanxgenautomations-jgbcm1/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-black px-8 h-14 text-base rounded-full font-semibold group transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book a Call
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:sanjeevan@xgenautomations.com"
              className="inline-flex items-center justify-center h-14 px-8 text-base rounded-full border border-foreground/20 hover:bg-foreground/5 font-medium transition-all text-white"
            >
              <Mail className="w-5 h-5 mr-2" />
              sanjeevan@xgenautomations.com
            </a>
          </div>
        </div>
      </section>

      {/* 2. Privacy Section */}
      <section id="privacy" className="py-24 lg:py-32 px-6 lg:px-12 border-t border-foreground/10 relative">
        <div className="max-w-[1400px] mx-auto">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Privacy Policy
          </span>
          <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-8">
            Privacy & Data Security
          </h2>
          <div className="p-5 sm:p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              XGen Automations does not run a shared platform or collect your business data by default. Every solution is deployed inside your own Azure tenant — your documents, records, and workflows stay on your infrastructure, not ours. The only information we collect directly is what you provide when you reach out — your name, email, and anything you share on a discovery call. We use this solely to respond to you and scope your project. We don't sell, share, or use this information for anything else. If you have questions about how your data is handled during a project, we're happy to answer them directly — just ask.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Terms Section */}
      <section id="terms" className="py-24 lg:py-32 px-6 lg:px-12 border-t border-foreground/10 relative">
        <div className="max-w-[1400px] mx-auto">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Terms of Service
          </span>
          <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-8">
            Working Relationship & Terms
          </h2>
          <div className="p-5 sm:p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] max-w-4xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              By reaching out to XGen Automations, you're agreeing to a straightforward working relationship: we scope your project on a free discovery call, provide a fixed quote, and you pay only once the solution is deployed and working — not before. All solutions are custom-built for your specific use case and deployed inside your own Azure tenant. Ownership of the deployed solution and any data it processes remains entirely yours. Full contract terms are agreed upon individually per project before any work begins. This page is a plain-language summary of how we operate, not a substitute for a signed agreement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
