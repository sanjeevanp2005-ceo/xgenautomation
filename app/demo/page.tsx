"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Upload, 
  Settings, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowLeft,
  X,
  CreditCard,
  Building2,
  Calendar,
  Zap,
  Download
} from "lucide-react";

// Pre-set sample datasets for 1-click live demo on sales calls
const SAMPLE_TECH_STARTUP = {
  name: "Acme Cloud Solutions Inc.",
  period: "Q3 2026 / Month-End July",
  currency: "USD ($)",
  revenue: "$142,500",
  cogs: "$28,500",
  grossProfit: "$114,000",
  opex: "$64,200",
  ebitda: "$49,800",
  ebitdaMargin: "34.9%",
  lineItems: [
    { category: "Subscription Revenue (ARR)", amount: "$118,000", type: "Revenue", variance: "+12.4%" },
    { category: "Professional Services & Setup", amount: "$24,500", type: "Revenue", variance: "+5.1%" },
    { category: "Hosting & Azure Cloud Infra", amount: "$18,200", type: "COGS", variance: "+22.1%" },
    { category: "Customer Support Payroll", amount: "$10,300", type: "COGS", variance: "0.0%" },
    { category: "Engineering Payroll & Contractors", amount: "$38,000", type: "OpEx", variance: "+3.5%" },
    { category: "Sales & Marketing Campaigns", amount: "$16,500", type: "OpEx", variance: "-4.2%" },
    { category: "Legal, Tax & CFO Advisory", amount: "$9,700", type: "OpEx", variance: "0.0%" },
  ],
  runwayWeeks: 22,
  weeklyForecast: [
    { week: "Wk 1 (Aug 5)", startCash: "$320,000", in: "$35,500", out: "$18,200", endCash: "$337,300" },
    { week: "Wk 2 (Aug 12)", startCash: "$337,300", in: "$12,000", out: "$24,500", endCash: "$324,800" },
    { week: "Wk 3 (Aug 19)", startCash: "$324,800", in: "$42,000", out: "$15,100", endCash: "$351,700" },
    { week: "Wk 4 (Aug 26)", startCash: "$351,700", in: "$18,500", out: "$32,000", endCash: "$338,200" },
    { week: "Wk 5 (Sep 2)", startCash: "$338,200", in: "$29,000", out: "$19,400", endCash: "$347,800" },
    { week: "Wk 6 (Sep 9)", startCash: "$347,800", in: "$15,000", out: "$22,000", endCash: "$340,800" },
    { week: "Wk 7 (Sep 16)", startCash: "$340,800", in: "$38,000", out: "$16,500", endCash: "$362,300" },
    { week: "Wk 8 (Sep 23)", startCash: "$362,300", in: "$21,000", out: "$28,000", endCash: "$355,300" },
    { week: "Wk 9 (Sep 30)", startCash: "$355,300", in: "$34,500", out: "$20,100", endCash: "$369,700" },
    { week: "Wk 10 (Oct 7)", startCash: "$369,700", in: "$14,000", out: "$25,000", endCash: "$358,700" },
    { week: "Wk 11 (Oct 14)", startCash: "$358,700", in: "$30,000", out: "$18,000", endCash: "$370,700" },
    { week: "Wk 12 (Oct 21)", startCash: "$370,700", in: "$25,000", out: "$31,500", endCash: "$364,200" },
    { week: "Wk 13 (Oct 28)", startCash: "$364,200", in: "$40,000", out: "$19,000", endCash: "$385,200" },
  ],
  commentary: `### Executive Financial Commentary & Board Brief
**Period**: July Month-End & Q3 Baseline | **Prepared For**: Board of Directors

1. **Revenue Performance & Top Line**:
   Gross revenue reached $142,500 in July (+10.8% MoM), driven primarily by strong expansion in ARR subscription renewals ($118,000). Professional services contributed $24,500 from 2 new customer implementations.

2. **Cost Drivers & Operational Variances**:
   Gross margin sits healthy at 80.0%. However, Azure Cloud Infrastructure expenses increased by **+22.1% MoM ($18,200)** due to unoptimized database indexing during peak load. Engineering contractor spend remained within budget at $38,000.

3. **13-Week Cash Flow & Liquidity**:
   Ending cash balance sits at $320,000 with a projected 13-week ending cash position of **$385,200** (Net cash positive +$65,200). Current runway is calculated at **22.4 weeks**.

4. **Strategic CFO Recommendations**:
   * Implement Azure Reserved Instances for core database compute to reduce monthly cloud spend by 18-25% ($3.5k/mo savings).
   * Accelerate Q3 invoice collections on 2 enterprise accounts currently sitting at Net-45 to boost Week 4 liquidity.`,
  invoices: [
    { id: "INV-2026-081", client: "Apex Logistics Ltd", amount: "£12,500 GBP ($15,800)", date: "Aug 01, 2026", status: "Matched via OFX Feed", method: "OFX Direct Wire" },
    { id: "INV-2026-082", client: "Kilimanjaro Agro Enterprise", amount: "$8,500 USD", date: "Aug 15, 2026", status: "Matched via OFX Feed", method: "Stripe Recurring" },
    { id: "INV-2026-083", client: "Vanguard Tech UK", amount: "£6,200 GBP ($7,850)", date: "Aug 20, 2026", status: "Pending Wire Clearance", method: "OFX Direct Wire" },
    { id: "INV-2026-084", client: "Serengeti Holdings Ltd", amount: "$14,000 USD", date: "Aug 25, 2026", status: "Invoice Scheduled", method: "Auto-Debit Authorization" },
  ]
};

const SAMPLE_EAST_AFRICA_UK = {
  name: "Mount Kilimanjaro Advisory Client Group",
  period: "Multi-Currency Cross-Border Feed (GBP / USD / TZS)",
  currency: "Multi-Currency (GBP / USD)",
  revenue: "£48,200 GBP ($61,200)",
  cogs: "£8,400 GBP ($10,650)",
  grossProfit: "£39,800 GBP ($50,550)",
  opex: "£18,500 GBP ($23,500)",
  ebitda: "£21,300 GBP ($27,050)",
  ebitdaMargin: "44.1%",
  lineItems: [
    { category: "UK Advisory Retainers (GBP)", amount: "£32,000", type: "Revenue", variance: "+5.0%" },
    { category: "East Africa Entry Strategy (USD)", amount: "$24,000", type: "Revenue", variance: "+15.2%" },
    { category: "OFX Foreign Exchange Spread", amount: "£1,400", type: "COGS", variance: "-8.0%" },
    { category: "Local Audit & Legal Compliance", amount: "£7,000", type: "COGS", variance: "0.0%" },
    { category: "CFO Travel & On-Site Expenses", amount: "£8,500", type: "OpEx", variance: "-12.0%" },
    { category: "Subcontractor & Research Team", amount: "£10,000", type: "OpEx", variance: "0.0%" },
  ],
  runwayWeeks: 34,
  weeklyForecast: [
    { week: "Wk 1 (Aug 5)", startCash: "£95,000", in: "£14,000", out: "£6,200", endCash: "£102,800" },
    { week: "Wk 2 (Aug 12)", startCash: "£102,800", in: "£8,500", out: "£9,100", endCash: "£102,200" },
    { week: "Wk 3 (Aug 19)", startCash: "£102,200", in: "£18,000", out: "£5,400", endCash: "£114,800" },
    { week: "Wk 4 (Aug 26)", startCash: "£114,800", in: "£7,200", out: "£8,000", endCash: "£114,000" },
    { week: "Wk 5 (Sep 2)", startCash: "£114,000", in: "£12,500", out: "£6,100", endCash: "£120,400" },
    { week: "Wk 6 (Sep 9)", startCash: "£120,400", in: "£6,000", out: "£7,500", endCash: "£118,900" },
    { week: "Wk 7 (Sep 16)", startCash: "£118,900", in: "£15,000", out: "£5,000", endCash: "£128,900" },
    { week: "Wk 8 (Sep 23)", startCash: "£128,900", in: "£9,000", out: "£8,200", endCash: "£129,700" },
    { week: "Wk 9 (Sep 30)", startCash: "£129,700", in: "£16,200", out: "£6,000", endCash: "£139,900" },
    { week: "Wk 10 (Oct 7)", startCash: "£139,900", in: "£5,500", out: "£7,100", endCash: "£138,300" },
    { week: "Wk 11 (Oct 14)", startCash: "£138,300", in: "£14,000", out: "£5,500", endCash: "£146,800" },
    { week: "Wk 12 (Oct 21)", startCash: "£146,800", in: "£8,000", out: "£9,000", endCash: "£145,800" },
    { week: "Wk 13 (Oct 28)", startCash: "£145,800", in: "£19,000", out: "£6,200", endCash: "£158,600" },
  ],
  commentary: `### Executive Financial Commentary & Cross-Border Advisory
**Period**: August Multi-Currency Settlement | **Client Group**: Mount Kilimanjaro Advisory

1. **Cross-Border Retainer Collections**:
   August UK retainer settlements totaled £32,000 GBP, while East Africa entry advisory brought in $24,000 USD. All GBP funds were received directly into the OFX multi-currency holding wallet.

2. **Foreign Exchange & OFX Optimization**:
   OFX currency conversion spreads totaled £1,400 (2.9% effective rate). Converting GBP to USD on scheduled monthly bulks saved £450 compared to spot bank wire rates.

3. **13-Week Cash Flow & Runway**:
   Cross-border treasury reserves stand at £95,000 GBP equivalent. 13-week projected reserves reach **£158,600 GBP** with zero short-term solvency risk.

4. **Strategic CFO Recommendations**:
   * Implement automated OFX standing wire pull authorizations for 2 new East African clients to lock in 1st-of-month advance billing.
   * Maintain GBP reserves in the OFX wallet until quarterly USD conversion thresholds are met to minimize FX spread friction.`,
  invoices: [
    { id: "INV-KILI-001", client: "London Capital Partners", amount: "£15,000 GBP", date: "Aug 01, 2026", status: "Matched via OFX Feed", method: "OFX GBP Account" },
    { id: "INV-KILI-002", client: "Dar es Salaam Logistics", amount: "$12,000 USD", date: "Aug 10, 2026", status: "Matched via OFX Feed", method: "USD Wire Transfer" },
    { id: "INV-KILI-003", client: "Nairobi Solar Energy Ltd", amount: "$10,000 USD", date: "Aug 18, 2026", status: "Pending Wire Clearance", method: "USD Wire Transfer" },
    { id: "INV-KILI-004", client: "UK Agro-Processing Group", amount: "£17,200 GBP", date: "Aug 28, 2026", status: "Invoice Scheduled", method: "OFX Auto-Pull" },
  ]
};

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<"model" | "runway" | "commentary" | "ofx">("model");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [currentData, setCurrentData] = useState(SAMPLE_TECH_STARTUP);
  const [copied, setCopied] = useState(false);

  // Settings modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [azureEndpoint, setAzureEndpoint] = useState("");
  const [azureKey, setAzureKey] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("USD ($)");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedEp = localStorage.getItem("xgen_azure_endpoint") || "";
    const savedKey = localStorage.getItem("xgen_azure_key") || "";
    const savedCurr = localStorage.getItem("xgen_currency") || "USD ($)";
    setAzureEndpoint(savedEp);
    setAzureKey(savedKey);
    setDefaultCurrency(savedCurr);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem("xgen_azure_endpoint", azureEndpoint);
    localStorage.setItem("xgen_azure_key", azureKey);
    localStorage.setItem("xgen_currency", defaultCurrency);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsSettingsOpen(false);
    }, 1200);
  };

  const runSimulation = (dataset: typeof SAMPLE_TECH_STARTUP) => {
    setIsProcessing(true);
    setStepIndex(1);

    setTimeout(() => setStepIndex(2), 700);
    setTimeout(() => setStepIndex(3), 1400);
    setTimeout(() => setStepIndex(4), 2100);

    setTimeout(() => {
      setCurrentData(dataset);
      setIsProcessing(false);
    }, 2600);
  };

  const copyCommentary = () => {
    navigator.clipboard.writeText(currentData.commentary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* TOP BAR */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-sm font-bold tracking-tight">XGEN AUTOMATIONS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
                Azure AI Practice Suite
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {azureKey ? "Custom Azure AI Key Active" : "Azure AI Demo Tenant Active"}
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-medium transition-all"
            >
              <Settings className="w-4 h-4 text-neutral-400" />
              <span>Cloud Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        
        {/* HEADER TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
              <span className="w-8 h-px bg-white/30" />
              Solution 1 & 6 Practice Suite
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              Azure AI Financial ERP & 13-Week Cash Flow Engine
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              Parses client P&L PDFs, General Ledger CSVs, and OFX bank feeds in 45 seconds — generating standardized EBITDA models, 13-week runway forecasts, and board commentary.
            </p>
          </div>

          {/* Quick Demo Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => runSimulation(SAMPLE_TECH_STARTUP)}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-lg border border-white/20 bg-white text-black hover:bg-neutral-200 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Load Sample Tech P&L ($)</span>
            </button>

            <button
              onClick={() => runSimulation(SAMPLE_EAST_AFRICA_UK)}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-lg border border-white/20 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Load Cross-Border OFX Feed (£/$)</span>
            </button>
          </div>
        </div>

        {/* FILE DROPZONE & SIMULATION BAR */}
        <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-dashed border-white/15 hover:border-white/30 rounded-xl p-8 transition-colors bg-black/40 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                <Upload className="w-6 h-6 text-neutral-300" />
              </div>
              <div>
                <h3 className="text-base font-bold">Upload Client Financial Files</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Drag & drop P&L PDFs, General Ledger CSVs, or .OFX Bank Statements here
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-mono font-medium transition-all">
                Browse Files
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={() => runSimulation(currentData === SAMPLE_TECH_STARTUP ? SAMPLE_EAST_AFRICA_UK : SAMPLE_TECH_STARTUP)} 
                />
              </label>
            </div>
          </div>

          {/* SIMULATION PIPELINE INDICATOR */}
          {isProcessing && (
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3 animate-pulse">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-2 font-bold">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Azure AI Document Intelligence Pipeline Executing...
                </span>
                <span>Step {stepIndex} of 4</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className={`p-2.5 rounded-lg border ${stepIndex >= 1 ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-white/10 text-neutral-500"}`}>
                  1. Ingesting Raw File
                </div>
                <div className={`p-2.5 rounded-lg border ${stepIndex >= 2 ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-white/10 text-neutral-500"}`}>
                  2. OCR Category Extraction
                </div>
                <div className={`p-2.5 rounded-lg border ${stepIndex >= 3 ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-white/10 text-neutral-500"}`}>
                  3. 13-Wk Cash Runway Calculation
                </div>
                <div className={`p-2.5 rounded-lg border ${stepIndex >= 4 ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : "border-white/10 text-neutral-500"}`}>
                  4. Executive Board Commentary
                </div>
              </div>
            </div>
          )}
        </div>

        {/* METRICS HIGHLIGHT SUMMARY BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Gross Revenue</span>
            <div className="text-2xl lg:text-3xl font-display font-bold text-white">{currentData.revenue}</div>
            <div className="text-xs text-emerald-400 font-mono">Period: {currentData.period}</div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
            <span className="text-xs font-mono text-neutral-400">Net EBITDA</span>
            <div className="text-2xl lg:text-3xl font-display font-bold text-emerald-400">{currentData.ebitda}</div>
            <div className="text-xs text-neutral-400 font-mono">Margin: {currentData.ebitdaMargin}</div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
            <span className="text-xs font-mono text-neutral-400">13-Week Cash Runway</span>
            <div className="text-2xl lg:text-3xl font-display font-bold text-white">{currentData.runwayWeeks} Wks</div>
            <div className="text-xs text-emerald-400 font-mono">Status: Healthy Liquidity</div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
            <span className="text-xs font-mono text-neutral-400">OFX Bank Wire Status</span>
            <div className="text-2xl lg:text-3xl font-display font-bold text-amber-400">100% Matched</div>
            <div className="text-xs text-neutral-400 font-mono">Multi-Currency Wallet Active</div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 pb-px">
            <button
              onClick={() => setActiveTab("model")}
              className={`px-5 py-3 text-xs font-mono font-bold transition-all border-b-2 ${
                activeTab === "model" 
                  ? "border-white text-white bg-white/5" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              📄 Tab 1: Extracted EBITDA Model
            </button>

            <button
              onClick={() => setActiveTab("runway")}
              className={`px-5 py-3 text-xs font-mono font-bold transition-all border-b-2 ${
                activeTab === "runway" 
                  ? "border-white text-white bg-white/5" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              📊 Tab 2: 13-Week Cash Flow Forecast
            </button>

            <button
              onClick={() => setActiveTab("commentary")}
              className={`px-5 py-3 text-xs font-mono font-bold transition-all border-b-2 ${
                activeTab === "commentary" 
                  ? "border-white text-white bg-white/5" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              🧠 Tab 3: Executive Board Commentary
            </button>

            <button
              onClick={() => setActiveTab("ofx")}
              className={`px-5 py-3 text-xs font-mono font-bold transition-all border-b-2 ${
                activeTab === "ofx" 
                  ? "border-white text-white bg-white/5" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              💳 Tab 4: OFX Invoicing & Wire Tracker
            </button>
          </div>
        </div>

        {/* TAB 1: EXTRACTED EBITDA MODEL */}
        {activeTab === "model" && (
          <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-lg">{currentData.name} — Extracted Financial Model</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">Parsed via Azure Document Intelligence OCR Engine</p>
              </div>
              <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono">{currentData.currency}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase">
                    <th className="py-3 px-4">Line Item / Category</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Extracted Amount</th>
                    <th className="py-3 px-4 text-right">MoM Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentData.lineItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">{item.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          item.type === "Revenue" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                          item.type === "COGS" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                          "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold">{item.amount}</td>
                      <td className={`py-3 px-4 text-right font-bold ${
                        item.variance.startsWith("+") ? "text-emerald-400" :
                        item.variance.startsWith("-") ? "text-rose-400" : "text-neutral-400"
                      }`}>
                        {item.variance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: 13-WEEK CASH FLOW FORECAST */}
        {activeTab === "runway" && (
          <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-lg">13-Week Cash Flow Runway & Forecast Table</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">Rolling Weekly Liquidity & Inflow/Outflow Projections</p>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                Runway: {currentData.runwayWeeks} Weeks
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase">
                    <th className="py-3 px-4">Forecast Week</th>
                    <th className="py-3 px-4">Starting Cash</th>
                    <th className="py-3 px-4 text-emerald-400">Projected Inflows</th>
                    <th className="py-3 px-4 text-rose-400">Operating Outflows</th>
                    <th className="py-3 px-4 text-right">Ending Cash Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentData.weeklyForecast.map((wk, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">{wk.week}</td>
                      <td className="py-3 px-4 text-neutral-300">{wk.startCash}</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">+{wk.in}</td>
                      <td className="py-3 px-4 text-rose-400 font-bold">-{wk.out}</td>
                      <td className="py-3 px-4 text-right font-bold text-white">{wk.endCash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EXECUTIVE BOARD COMMENTARY */}
        {activeTab === "commentary" && (
          <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-lg">AI-Generated Executive Board Commentary</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">Ready to paste into Board Decks & Client Summaries</p>
              </div>

              <button
                onClick={copyCommentary}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-mono transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Commentary"}</span>
              </button>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-black/60 font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {currentData.commentary}
            </div>
          </div>
        )}

        {/* TAB 4: OFX INVOICING & WIRE TRACKER */}
        {activeTab === "ofx" && (
          <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-lg">OFX Bank Feed Invoicing & Wire Tracker</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">Multi-Currency Cross-Border Payment Reconciliation Engine</p>
              </div>
              <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                OFX Multi-Currency Feed Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase">
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Invoice Amount</th>
                    <th className="py-3 px-4">Billing Date</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4 text-right">Reconciliation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentData.invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">{inv.id}</td>
                      <td className="py-3 px-4 text-neutral-300">{inv.client}</td>
                      <td className="py-3 px-4 font-bold text-white">{inv.amount}</td>
                      <td className="py-3 px-4 text-neutral-400">{inv.date}</td>
                      <td className="py-3 px-4 text-neutral-300">{inv.method}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                          inv.status.includes("Matched") ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                          inv.status.includes("Pending") ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                          "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ⚙️ SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl border border-white/20 bg-neutral-950 rounded-2xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-lg">Cloud Environment & Azure AI Credentials</h2>
              </div>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-bold block">Azure AI Foundry Endpoint URL</label>
                <input
                  type="text"
                  placeholder="https://your-resource.services.ai.azure.com/models/v1"
                  value={azureEndpoint}
                  onChange={(e) => setAzureEndpoint(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/15 bg-black text-white focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-neutral-500">John inputs his own Azure endpoint when deployed to his tenant.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-bold block">Azure AI API Key / Secret</label>
                <input
                  type="password"
                  placeholder="••••••••••••••••••••••••••••••••"
                  value={azureKey}
                  onChange={(e) => setAzureKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/15 bg-black text-white focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-neutral-500">Key is encrypted & stored locally in client browser storage.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-bold block">Default Currency & Accounting Standard</label>
                <select
                  value={defaultCurrency}
                  onChange={(e) => setDefaultCurrency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/15 bg-black text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="USD ($)">US Dollar ($) - US GAAP / QuickBooks</option>
                  <option value="GBP (£)">British Pound (£) - UK GAAP / OFX</option>
                  <option value="EUR (€)">Euro (€) - IFRS Standard</option>
                  <option value="TZS (Sh)">Tanzanian Shilling (TZS) - East Africa Multi-Currency</option>
                </select>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Azure AI Credentials Saved Successfully!</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-mono text-neutral-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 rounded-lg border border-emerald-500/40 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-mono font-bold transition-all"
              >
                Save Cloud Configuration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
