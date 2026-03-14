'use client';

import { ShieldAlert, Users, CreditCard, Activity, Search, AlertCircle, BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-[#030303] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="font-heading font-bold text-xl flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="text-red-500">Admin</span>Panel
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2 text-sm text-accent-400">
          <div className="px-4 py-2 uppercase tracking-widest text-[10px] font-bold text-accent-600 mb-2">Management</div>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl font-medium transition-colors border border-red-500/20">
             <Activity className="w-4 h-4" /> Overview
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <Users className="w-4 h-4" /> Users
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors border border-transparent">
            <CreditCard className="w-4 h-4" /> Subscriptions
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
            <AlertCircle className="w-4 h-4" /> Moderation
          </button>
        </div>
      </aside>

      {/* Main Content Areas */}
      <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
         <header className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2 text-white">System Metrics</h1>
              <p className="text-accent-400">Manage Launch Engine platform stats and abusive content.</p>
            </div>
            
            <div className="px-4 py-2 bg-red-500 rounded-xl font-bold flex items-center gap-2">
               Admin Active
            </div>
         </header>

         {/* KPIs */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <span className="text-accent-400 text-xs font-bold uppercase tracking-wider mb-2 block">Total MRR</span>
              <div className="text-3xl font-heading font-black mb-1">$42,500</div>
              <span className="text-emerald-400 text-xs font-bold flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+14.2%</span>
           </div>
           <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <span className="text-accent-400 text-xs font-bold uppercase tracking-wider mb-2 block">Active Subs</span>
              <div className="text-3xl font-heading font-black mb-1">1,420</div>
              <span className="text-emerald-400 text-xs font-bold flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+8.4%</span>
           </div>
           <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              <span className="text-accent-400 text-xs font-bold uppercase tracking-wider mb-2 block">Total Ideas</span>
              <div className="text-3xl font-heading font-black mb-1">84.2k</div>
              <span className="text-emerald-400 text-xs font-bold flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+122 today</span>
           </div>
           <div className="glass-card p-6 rounded-2xl border-t-2 border-t-red-500 border-x-white/10 border-b-white/10">
              <span className="text-accent-400 text-xs font-bold uppercase tracking-wider mb-2 block">Moderation Queue</span>
              <div className="text-3xl font-heading font-black mb-1 text-red-500">24</div>
              <span className="text-red-400 text-xs font-bold flex items-center">Requires attention</span>
           </div>
         </div>

         {/* Recent Validations & Flags */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 glass-card rounded-2xl p-6">
               <h2 className="text-lg font-heading font-bold mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary-400" /> Recent Activity</h2>
               <div className="space-y-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <div>
                           <p className="font-bold text-sm">New Pro Subscription</p>
                           <p className="text-xs text-accent-500">user_{Math.floor(Math.random() * 1000)}@gmail.com upgraded to Pro</p>
                        </div>
                      </div>
                      <span className="text-xs text-accent-500">{i * 15}m ago</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-red-500/10">
               <h2 className="text-lg font-heading font-bold mb-6 flex items-center gap-2 text-red-400"><ShieldAlert className="w-5 h-5" /> Flagged Content</h2>
               
               <div className="space-y-4">
                 {[1,2].map(i => (
                   <div key={i} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-red-400 uppercase">Spam Report</span>
                        <span className="text-[10px] text-accent-500">2h ago</span>
                      </div>
                      <p className="text-sm font-medium text-white mb-3">"Crypto Ponzi Scheme Engine v4"</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 rounded text-white transition-colors">Ignore</button>
                        <button className="flex-1 py-1.5 text-xs font-bold bg-red-500 hover:bg-red-600 rounded text-white transition-colors">Ban User</button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}
