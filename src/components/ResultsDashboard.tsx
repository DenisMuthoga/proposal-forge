'use client';

import { motion } from 'framer-motion';
import { Download, Share2, Target, TrendingUp, AlertTriangle, CheckCircle2, Zap, Rocket, Globe, DollarSign, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ResultsDashboard() {
  const [meterValue, setMeterValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMeterValue(87);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> Go Verdict: Strong Signal
            </span>
            <span className="text-accent-400 text-sm">Generated just now</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-2">Figma Templates Marketplace</h1>
          <p className="text-accent-300 max-w-2xl">A marketplace for freelance designers to sell highly optimized, component-driven Figma templates to startups and agencies.</p>
        </div>
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:opacity-90 font-bold flex items-center justify-center gap-2 text-white shadow-lg transition-all hover:scale-105 active:scale-95">
            <Download className="w-4 h-4" /> Export PDF Blueprint
          </button>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>
      </motion.div>

      {/* Primary Metrics Row */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        {/* Success Probability Meter */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
          <h3 className="text-sm font-medium text-accent-400 uppercase tracking-wider absolute top-6 left-6">Success Probability</h3>
          
          <div className="relative w-40 h-40 mt-6">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <motion.circle 
                cx="50" cy="50" r="45" fill="transparent" 
                stroke="url(#successGradient)" 
                strokeWidth="10" 
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 300" }}
                animate={{ strokeDasharray: `${meterValue * 2.83} 300` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              />
              <defs>
                <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#ae52ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-heading font-bold">{meterValue}%</span>
              <span className="text-xs text-secondary-400 font-medium tracking-widest uppercase">High</span>
            </div>
          </div>
        </div>

        {/* Market Demand Score */}
        <div className="glass-card p-6 rounded-3xl flex flex-col relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl"></div>
          <h3 className="text-sm font-medium text-accent-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Target className="w-4 h-4 text-secondary-400" /> Market Demand
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-6xl font-heading font-black mb-2 text-white">9<span className="text-3xl text-accent-500">/10</span></div>
            <p className="text-accent-300">Extremely high search volume with low saturation for "UI Kit for Startup" keywords.</p>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-sm">
            <div className="flex flex-col">
              <span className="text-accent-500 uppercase tracking-wider text-[10px]">Est. Market Size</span>
              <span className="font-bold text-white">$450M TAM</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-accent-500 uppercase tracking-wider text-[10px]">Trend</span>
              <span className="text-emerald-400 font-bold flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +24% YoY</span>
            </div>
          </div>
        </div>

        {/* Competitive Landscape Summary */}
        <div className="glass-card p-6 rounded-3xl flex flex-col relative overflow-hidden">
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
          <h3 className="text-sm font-medium text-accent-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary-400" /> Competitor Threat
          </h3>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-5xl font-heading font-black mb-2 text-primary-300">Moderate</div>
            <p className="text-accent-300">Incumbents exist but are bloated. Opportunity to win on developer experience (DX) and modern aesthetics.</p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs p-2 rounded bg-white/5">
              <span className="font-medium">UI8</span>
              <span className="text-red-400">High Threat</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2 rounded bg-white/5">
              <span className="font-medium">ThemeForest</span>
              <span className="text-yellow-400">Medium Threat</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Metrics Row */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        
        {/* Recommended Tech Stack & Features */}
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-secondary-400" /> Blueprint Essentials
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-accent-500 uppercase tracking-wider mb-3">MVP Feature List</h4>
              <ul className="space-y-2">
                {[
                  "Figma Component Previewer",
                  "Direct Stripe Checkout Integration",
                  "Creator Dashboards & Analytics",
                  "Automated Version Syncing"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm text-accent-500 uppercase tracking-wider mb-3">Tech Stack Strategy</h4>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Stripe Connect", "AWS S3"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-accent-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Strategy */}
        <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
           <div className="absolute right-0 top-0 w-64 h-64 bg-primary-900/10 rounded-full blur-3xl mix-blend-screen"></div>
           <h3 className="text-lg font-heading font-bold mb-6 flex items-center gap-2 relative z-10">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Optimal Pricing Strategy
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 flex items-center justify-between">
              <div>
                <p className="font-bold text-white mb-1">Standard License</p>
                <p className="text-xs text-accent-400">Single project use</p>
              </div>
              <div className="text-xl font-heading font-bold text-white">$49</div>
            </div>
            <div className="p-4 rounded-xl border border-primary-500/50 bg-primary-500/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-white mb-1">Extended License <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-primary-500 text-white uppercase tracking-wider">Recommended</span></p>
                <p className="text-xs text-accent-400">Unlimited agency projects</p>
              </div>
              <div className="text-xl font-heading font-bold text-primary-300">$149</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 flex items-center justify-between">
              <div>
                <p className="font-bold text-white mb-1">Lifetime Access</p>
                <p className="text-xs text-accent-400">All current & future UI kits</p>
              </div>
              <div className="text-xl font-heading font-bold text-white">$499</div>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Landing Page Copy & Launch Plan */}
      <motion.div variants={itemVariants} className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 bg-[#0a0f1e]/80">
          <div className="flex items-center gap-2 text-sm text-primary-400 font-bold uppercase tracking-wider mb-6">
            <Zap className="w-4 h-4" /> Landing Page Hook
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4 leading-tight">Stop reinventing<br/>the wheel. Start building.</h2>
          <p className="text-lg text-accent-300 mb-8">Premium, production-ready Figma templates crafted for modern startups. Ship your MVP 10x faster with components designed for Tailwind mapping.</p>
          <div className="flex gap-4">
            <div className="px-6 py-3 rounded-lg bg-white text-black font-bold text-sm">Browse UI Kits</div>
            <div className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold text-sm">Become a Creator</div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="flex items-center gap-2 text-sm text-secondary-400 font-bold uppercase tracking-wider mb-6">
            <Rocket className="w-4 h-4" /> 7-Day Launch Plan
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {[
              { day: 1, title: "Next.js & Supabase Setup" },
              { day: 3, title: "Stripe Connect Integration" },
              { day: 5, title: "UI Components Build" },
              { day: 7, title: "Product Hunt Launch" }
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-[#0a0f1e] text-accent-400 group-[.is-active]:border-secondary-500 group-[.is-active]:text-secondary-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-[10px] font-bold">{i+1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-accent-500 font-bold uppercase tracking-wider block mb-1">Day {step.day}</span>
                  <span className="text-sm font-medium text-white">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
