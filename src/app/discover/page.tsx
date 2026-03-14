'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, TrendingUp, Filter, Sparkles, ArrowRight, Lightbulb, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DiscoverPage() {
  const [niche, setNiche] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  const router = useRouter();

  const handleDiscover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: niche, flow: 'brainstorm' })
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = (title: string) => {
    router.push(`/validate?idea=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-primary-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-400" />
            Launch<span className="text-gradient">Engine</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-accent-300 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/validate?mode=validate" className="px-4 py-2 rounded-xl bg-white text-black text-sm font-bold transition-all hover:bg-accent-200">
              Validate My Idea
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">Discover <span className="text-gradient">Market Gaps</span></h1>
          <p className="text-accent-300 text-lg mb-10">Enter a niche or industry, and our AI will uncover high-potential SaaS opportunities for you to build.</p>
          
          <form onSubmit={handleDiscover} className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 opacity-20 group-focus-within:opacity-40 blur-xl transition-all"></div>
            <div className="relative glass-card rounded-2xl p-2 flex flex-col md:flex-row gap-2">
              <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Real Estate, Health Tech, Developer Tools..." 
                className="flex-1 bg-transparent border-none text-white px-6 py-4 text-xl focus:outline-none focus:ring-0 placeholder:text-accent-600"
              />
              <button 
                type="submit" 
                disabled={isGenerating || !niche.trim()}
                className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-w-[180px]"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Find Gaps
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {ideas.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {ideas.map((idea, idx) => (
                <div 
                  key={idx}
                  className="glass-card p-8 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all group flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary-400 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 text-white group-hover:text-primary-300 transition-colors">{idea.title}</h3>
                  <p className="text-accent-300 leading-relaxed mb-8 flex-1">{idea.desc}</p>
                  <button 
                    onClick={() => handleAnalyze(idea.title)}
                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white text-black hover:border-white transition-all font-bold flex items-center justify-center gap-2 group/btn"
                  >
                    Analyze Blueprint
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </motion.div>
          ) : !isGenerating && (
            <div className="grid md:grid-cols-3 gap-8 opacity-40">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-8 rounded-3xl border border-white/5 h-64 flex flex-col justify-end">
                   <div className="w-12 h-4 bg-white/10 rounded mb-4"></div>
                   <div className="w-full h-8 bg-white/5 rounded"></div>
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
