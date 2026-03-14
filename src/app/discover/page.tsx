'use client';

import { motion } from 'framer-motion';
import { Search, Flame, TrendingUp, Filter, ThumbsUp, MessageSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const IDEAS_MOCK = [
  {
    id: 1,
    title: "AI-Powered SDR for Boring B2B Niches",
    creator: "alex_builds",
    score: 9,
    probability: 88,
    votes: 342,
    verdict: "Strong Signal",
    tags: ["SalesTech", "AI", "B2B"],
    time: "2h ago"
  },
  {
    id: 2,
    title: "Micro-SaaS for podcast show notes generation",
    creator: "creator_jen",
    score: 8,
    probability: 76,
    votes: 189,
    verdict: "Viable",
    tags: ["Creator Economy", "Audio"],
    time: "4h ago"
  },
  {
    id: 3,
    title: "Uber for dog walking but strictly for corgis",
    creator: "corgi_fanatic",
    score: 2,
    probability: 12,
    votes: 45,
    verdict: "Red Ocean",
    tags: ["Marketplace", "Pets"],
    time: "6h ago"
  }
];

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Navbar */}
      <nav className="border-b border-border-subtle bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl">
            Launch<span className="text-secondary-400">Engine</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/validate" className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-sm font-bold transition-colors">
              Submit Idea
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Discover <span className="text-gradient">Blueprints</span></h1>
            <p className="text-accent-300 text-lg">Explore top-validated SaaS ideas, track market trends, and find your next venture.</p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto">
             <div className="relative flex-1 group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-500" />
               <input type="text" placeholder="Search ideas..." className="bg-transparent border-none text-white pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-0 text-sm" />
             </div>
             <button className="px-3 py-2 text-accent-400 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5 flex items-center gap-2 text-sm ml-2">
               <Filter className="w-4 h-4" /> Filters
             </button>
          </div>
        </div>

        {/* Filters/Nav */}
        <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-hide">
          <button className="px-4 py-2 rounded-full bg-white text-black font-bold text-sm tracking-wide whitespace-nowrap flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" /> Trending Weekly
          </button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-accent-300 hover:text-white hover:bg-white/5 font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-colors">
            <TrendingUp className="w-4 h-4" /> Highest Demand
          </button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-accent-300 hover:text-white hover:bg-white/5 font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-colors">
            <ShieldCheck className="w-4 h-4" /> Strong Signals Only
          </button>
        </div>

        {/* Ideas Feed */}
        <div className="grid lg:grid-cols-2 gap-6">
          {IDEAS_MOCK.map((idea, idx) => (
            <motion.div 
              key={idea.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 group cursor-pointer hover:border-primary-500/30 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-700 to-secondary-700 flex items-center justify-center font-bold text-xs">
                    {idea.creator[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-accent-300">@{idea.creator}</span>
                    <span className="text-[10px] text-accent-500">{idea.time}</span>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  idea.score >= 8 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  idea.score >= 5 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                  'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {idea.verdict}
                </div>
              </div>

              <h2 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-300 transition-colors">{idea.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {idea.tags.map(tag => (
                  <span key={tag} className="text-xs bg-white/5 text-accent-400 px-2.5 py-1 rounded-md border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-accent-500 uppercase tracking-wider">Demand Score</span>
                    <span className="font-heading font-bold text-lg">{idea.score}<span className="text-accent-500 text-sm">/10</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-accent-500 uppercase tracking-wider">Win Prob.</span>
                    <span className="font-heading font-bold text-lg text-secondary-400">{idea.probability}%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-accent-400 hover:text-white transition-colors group/btn">
                    <MessageSquare className="w-4 h-4" /> <span className="text-sm font-medium">12</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white group/btn">
                    <ThumbsUp className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" /> 
                    <span className="text-sm font-bold">{idea.votes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
