'use client';

import { motion } from 'framer-motion';
import { Target, Search, CreditCard, LayoutDashboard, Database, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  return (
    <div className="flex h-screen bg-[#030303] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-md hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="font-heading font-bold text-xl">
            Launch<span className="text-primary-400">Engine</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2 relative">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 text-white rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-accent-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Database className="w-5 h-5" /> Saved Blueprints
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-accent-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <CreditCard className="w-5 h-5" /> Subscription
          </button>
        </div>
        <div className="p-4 border-t border-white/5">
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <p className="text-xs text-accent-400 uppercase tracking-widest font-bold mb-2">Current Plan</p>
            <p className="font-heading font-black text-xl mb-4 text-gradient">Pro Tier</p>
            <div className="w-full h-1 bg-white/10 rounded-full mb-2">
              <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 w-[60%] rounded-full shadow-[0_0_10px_rgba(174,82,255,0.8)]"></div>
            </div>
            <p className="text-[10px] text-accent-500">60/100 validations used</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <header className="px-8 py-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#030303]/80 backdrop-blur-xl z-10">
          <h1 className="text-2xl font-heading font-bold">Welcome back, Creator</h1>
          <div className="flex items-center gap-4">
            <Link href="/validate" className="hidden sm:flex bg-gradient-to-r from-primary-600 to-secondary-600 hover:opacity-90 px-5 py-2.5 rounded-xl font-bold items-center gap-2 shadow-lg transition-all">
               <Target className="w-4 h-4" /> New Validation
            </Link>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold font-heading">
              C
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
           
           <div className="grid md:grid-cols-3 gap-6">
             <div className="glass-card p-6 rounded-2xl border-t-4 border-t-secondary-500">
               <span className="text-secondary-400 font-bold uppercase text-[10px] tracking-widest pl-1 mb-2 block">Total Validations</span>
               <div className="text-4xl font-heading font-black mb-1">42</div>
               <span className="text-sm text-accent-400">+12 this month</span>
             </div>
             <div className="glass-card p-6 rounded-2xl border-t-4 border-t-yellow-500 relative">
               <Star className="absolute top-6 right-6 w-5 h-5 text-yellow-500/50" />
               <span className="text-yellow-500 font-bold uppercase text-[10px] tracking-widest pl-1 mb-2 block">High Potential</span>
               <div className="text-4xl font-heading font-black mb-1">8</div>
               <span className="text-sm text-accent-400">Demand scorces {'>'} 8</span>
             </div>
             <div className="glass-card p-6 rounded-2xl border-t-4 border-t-primary-500">
               <span className="text-primary-400 font-bold uppercase text-[10px] tracking-widest pl-1 mb-2 block">Market Size Captured</span>
               <div className="text-4xl font-heading font-black mb-1">$2.4B</div>
               <span className="text-sm text-accent-400">Estimated TAM sum</span>
             </div>
           </div>

           <div>
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                  <Database className="w-5 h-5 text-accent-500" /> Recent Blueprints
               </h2>
               <div className="relative group w-64 max-w-full">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-500" />
                 <input type="text" placeholder="Search saved..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary-500/50" />
               </div>
             </div>
             
             <div className="space-y-4">
               {[
                 { title: "Figma Templates Marketplace", score: 9, prob: 87, verdict: "Strong", verdictColor: "text-emerald-400 border-emerald-500/30" },
                 { title: "B2B Outreach Automation", score: 6, prob: 52, verdict: "Saturated", verdictColor: "text-yellow-400 border-yellow-500/30" },
                 { title: "AI Recipe Generator", score: 3, prob: 18, verdict: "Red Ocean", verdictColor: "text-red-400 border-red-500/30" }
               ].map((idea, i) => (
                 <Link href="/results" key={i} className="glass-card p-4 rounded-xl flex items-center justify-between hover:border-primary-500/50 hover:bg-white/[0.08] transition-all group block">
                   <div className="flex items-center gap-4">
                     <div className="hidden sm:block">
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-heading font-bold ${idea.verdictColor}`}>
                          {idea.score}
                        </div>
                     </div>
                     <div>
                       <h3 className="font-bold text-lg group-hover:text-primary-300 transition-colors">{idea.title}</h3>
                       <p className="text-sm text-accent-400">Generated on Mar 12, 2026</p>
                     </div>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border bg-black/50 ${idea.verdictColor}`}>
                        {idea.verdict}
                      </span>
                      <span className="text-accent-500 text-xs hidden sm:block flex items-center">
                        View Details <ArrowRight className="w-3 h-3 ml-1 inline" />
                      </span>
                   </div>
                 </Link>
               ))}
             </div>
           </div>

        </div>
      </main>
    </div>
  );
}
