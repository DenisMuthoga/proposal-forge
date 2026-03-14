'use client';

import { motion } from 'framer-motion';
import { Bot, ArrowRight, Zap, Target, Lock, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary-500 selection:text-white flex flex-col items-center">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 md:px-12 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-[1px]">
            <div className="bg-black w-full h-full rounded-[7px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-400" />
            </div>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">Launch<span className="text-gradient">Engine</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-accent-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/discover" className="hover:text-white transition-colors">Discover Ideas</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-accent-300 hover:text-white transition-colors">Log in</Link>
          <Link href="/validate" className="text-sm font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-accent-200 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl px-4 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center relative z-10">
        <div className="absolute inset-0 -z-10 h-[600px] w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/40 via-background to-background opacity-70"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-4 h-4" /> The New Standard for Idea Validation
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-8 leading-[1.1] max-w-5xl"
        >
          Turn any idea into a <br className="hidden md:block" />
          <span className="text-gradient">Launch-Ready Blueprint.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-accent-300 max-w-3xl mb-12"
        >
          Our AI analyzes market demand, predicts success probability, and generates your complete step-by-step launch plan in seconds.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full max-w-xl"
        >
          <Link href="/validate" className="flex-1 glass-card p-6 rounded-3xl border border-white/5 hover:border-primary-500/50 transition-all group relative overflow-hidden text-left">
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all"></div>
            <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">I need an idea</h3>
            <p className="text-accent-400 text-sm mb-4">AI will brainstorm high-potential SaaS concepts for you.</p>
            <span className="text-primary-400 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Start Brainstorming <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link href="/validate?mode=validate" className="flex-1 glass-card p-6 rounded-3xl border border-white/5 hover:border-secondary-500/50 transition-all group relative overflow-hidden text-left">
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl group-hover:bg-secondary-500/20 transition-all"></div>
            <div className="w-12 h-12 rounded-2xl bg-secondary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-secondary-400" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">I have an idea</h3>
            <p className="text-accent-400 text-sm mb-4">Run a deep-dive validation on your own concept.</p>
            <span className="text-secondary-400 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Validate Idea <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </main>

      {/* Features Showcase */}
      <section id="features" className="w-full py-24 bg-card/50 border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">From <span className="text-secondary-400">Concept</span> to <span className="text-primary-400">Company</span></h2>
             <p className="text-accent-300 text-lg max-w-2xl mx-auto">Skip weeks of research. Get data-driven validation and a strategic roadmap in under 30 seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-6 h-6 text-primary-400" />}
              title="Demand Scoring"
              desc="Real-time analysis of search volume, competitor density, and market readiness."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-secondary-400" />}
              title="Instant Blueprints"
              desc="Complete roadmap including MVP features, tech stack, and go-to-market strategy."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-yellow-400" />}
              title="Pricing Models"
              desc="AI-recommended optimal pricing tiers to maximize your MRR from day one."
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 border-t border-border-subtle bg-black text-center text-accent-500">
        <p>© 2026 SaaS Launch Engine. Turn Ideas Into Empires.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-card p-8 rounded-2xl text-left border border-white/5 hover:border-primary-500/30 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-heading mb-3 text-white">{title}</h3>
      <p className="text-accent-300 leading-relaxed">{desc}</p>
    </div>
  )
}
