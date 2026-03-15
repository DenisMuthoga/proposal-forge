'use client';

import { motion } from 'framer-motion';
import { Download, Share2, Target, TrendingUp, AlertTriangle, CheckCircle2, Zap, Rocket, Globe, DollarSign, Layers, Lightbulb, Users, Shield, Cpu, Gauge, BarChart3, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2, Save, Check, ExternalLink, Lock } from 'lucide-react';

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
  const [blueprint, setBlueprint] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get('id');

  useEffect(() => {
    async function loadBlueprint() {
      if (ideaId && ideaId !== 'generated') {
          // Fetch from DB
          try {
              const res = await fetch(`/api/ideas/${ideaId}`);
              if (!res.ok) throw new Error('Blueprint not found');
              const data = await res.json();
              setBlueprint(data);
              setIsSaved(true);
              setIsPublic(data.isPublic || false);
              setTimeout(() => setMeterValue(data.probability || data.successProbability || 0), 500);
          } catch (err) {
              console.error(err);
              setError('Could not load the requested blueprint.');
          }
      } else {
          // Load from LocalStorage
          const stored = localStorage.getItem('launch_engine_blueprint');
          if (stored) {
            try {
              const data = JSON.parse(stored);
              if (!data || typeof data !== 'object') {
                throw new Error('Invalid analysis format');
              }
              setBlueprint(data);
              // Animate the meter to the success probability
              setTimeout(() => {
                setMeterValue(data.successProbability || 0);
              }, 500);
            } catch (e) {
              console.error('Error parsing blueprint:', e);
              setError('The analysis data was corrupted or incomplete.');
            }
          } else {
            setError('No analysis was found. Please go back and generate a new one.');
          }
      }
    }
    loadBlueprint();
  }, [ideaId]);

  const handleSave = async () => {
    if (!session) {
      router.push('/login');
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blueprint.title || 'Untitled Blueprint',
          blueprint: blueprint
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setIsSaved(true);
        router.replace(`/results?id=${data.id}`);
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (err) {
      console.error(err);
      alert('Could not save to dashboard. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublic = async () => {
    if (!ideaId || ideaId === 'generated') return;
    
    try {
      const res = await fetch(`/api/ideas/${ideaId}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic: !isPublic })
      });
      
      if (res.ok) {
        setIsPublic(!isPublic);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (!isSaved) {
      alert('Please save your blueprint to the dashboard before sharing.');
      return;
    }
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };





  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-heading">Something went wrong</h2>
          <p className="text-accent-400 max-w-sm">{error}</p>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-accent-200 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!blueprint) {
      return (
          <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-accent-400 animate-pulse">Loading analysis...</div>
          </div>
      );
  }

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
            <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2",
                blueprint.verdict === 'Go' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
            )}>
              {blueprint.verdict === 'Go' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />} 
              {blueprint.verdict} Verdict: {blueprint.verdict === 'Go' ? 'Strong Market Signal' : 'High Risk Level'}
            </span>
            <span className="text-accent-400 text-sm">Real-time AI Validation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-2 text-white">
            Market Analysis Dashboard
          </h1>
          <p className="text-accent-400 text-sm">Comprehensive feasibility blueprint for your SaaS concept.</p>
        </div>
        
        <div className="flex flex-col gap-3 min-w-[200px]">
          {isSaved ? (
            <button 
              onClick={togglePublic}
              className={cn(
                "w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-white",
                isPublic ? "bg-emerald-600 hover:bg-emerald-500" : "bg-white/10 hover:bg-white/20"
              )}
            >
              {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {isPublic ? 'Make Private' : 'Make Public'}
            </button>
          ) : (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:opacity-90 font-bold flex items-center justify-center gap-2 text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save to Dashboard
            </button>
          )}
          
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> PDF
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
              <span className="text-xs text-secondary-400 font-medium tracking-widest uppercase">
                  {meterValue > 70 ? 'High' : meterValue > 40 ? 'Moderate' : 'Low'}
              </span>
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
            <div className="text-6xl font-heading font-black mb-2 text-white">{(blueprint.marketDemandScore || blueprint.demandScore) / 10}<span className="text-3xl text-accent-500">/10</span></div>
            <p className="text-accent-300">AI-predicted market appetite based on current sector trends.</p>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-sm">
            <div className="flex flex-col">
              <span className="text-accent-500 uppercase tracking-wider text-[10px]">Sector Sentiment</span>
              <span className="font-bold text-white">{blueprint.verdict === 'Go' ? 'Bullish' : 'Cautions'}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-accent-500 uppercase tracking-wider text-[10px]">Confidence</span>
              <span className="text-emerald-400 font-bold flex items-center">High</span>
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
            <div className="text-5xl font-heading font-black mb-2 text-primary-300">Analysis</div>
            <p className="text-accent-300">We identified {blueprint.competitors?.length || 0} primary market incumbents.</p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {blueprint.competitors?.slice(0, 3).map((comp: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-white shrink-0">{comp.name}</span>
                  <span className="text-accent-500 italic truncate ml-4 font-medium">{comp.weakness}</span>
                </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SWO Analysis & Granular Scores */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-8">
            <BarChart3 className="w-5 h-5 text-primary-400" />
            <h3 className="text-xl font-heading font-bold">Performance Breakdown</h3>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Technical Complexity', val: blueprint.granularScores?.technicalComplexity, color: 'bg-primary-500' },
              { label: 'Time to Market', val: blueprint.granularScores?.timeToMarket, color: 'bg-secondary-500' },
              { label: 'Scalability Potential', val: blueprint.granularScores?.scalability, color: 'bg-emerald-500' },
              { label: 'Defensibility', val: blueprint.granularScores?.defensibility, color: 'bg-amber-500' }
            ].map((score) => (
              <div key={score.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-accent-400 font-medium">{score.label}</span>
                  <span className="text-white font-bold">{score.val || 0}/10</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(score.val || 0) * 10}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={cn("h-full rounded-full", score.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { tag: 'Strengths', data: blueprint.swot?.strengths, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { tag: 'Weaknesses', data: blueprint.swot?.weaknesses, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { tag: 'Opportunities', data: blueprint.swot?.opportunities, icon: TrendingUp, color: 'text-primary-400', bg: 'bg-primary-500/10' },
            { tag: 'Threats', data: blueprint.swot?.threats, icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10' }
          ].map((s) => (
            <div key={s.tag} className="glass-card p-4 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <s.icon className={cn("w-4 h-4", s.color)} />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-300">{s.tag}</span>
              </div>
              <ul className="space-y-1">
                {s.data?.slice(0, 2).map((item: string, i: number) => (
                  <li key={i} className="text-[10px] leading-tight text-accent-400">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Extended Strategic Justification */}
      <motion.div variants={itemVariants} className="space-y-8">
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <h2 className="text-2xl md:text-4xl font-heading font-black text-white px-4">
              Strategic Blueprint
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-[2.5rem] blur-xl opacity-10 group-hover:opacity-20 transition duration-1000 animate-gradient-slow"></div>
          <div className="relative glass-card bg-[#0a0c10]/90 border border-white/10 rounded-[2.5rem] p-10 md:p-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shadow-inner">
                  <Lightbulb className="w-7 h-7 text-primary-400" />
                </div>
                <div>
                  <span className="text-xs font-heading font-black uppercase tracking-[0.3em] text-primary-500 mb-1 block">
                    Core Thesis
                  </span>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                    Why the market needs this
                  </h3>
                </div>
              </div>
              
              <div className="flex gap-4">
                {['Hyper-Growth', 'Low Friction', 'Proven Gap'].map((tag) => (
                  <div key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-accent-400">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-12 items-start">
                <div className="md:col-span-3">
                    <p className="text-xl md:text-2xl leading-[1.6] text-accent-100 font-medium">
                        {blueprint.analysis || blueprint.description}
                    </p>
                </div>
                <div className="space-y-8 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 block mb-4">Market Potential</span>
                        <div className="text-4xl font-heading font-black text-white">Massive</div>
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary-500 block mb-4">Investment Logic</span>
                        <p className="text-xs text-accent-400 leading-relaxed">High scalability with relatively low initial capital intensity makes this a prime venture candidate.</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Time to Value', val: 'Fast', color: 'text-emerald-400' },
                { label: 'Retention Moat', val: 'Proprietary AI', color: 'text-primary-400' },
                { label: 'CAC/LTV Ratio', val: 'Highly Optimal', color: 'text-secondary-400' },
                { label: 'Exit Strategy', val: 'Strategic M&A', color: 'text-amber-400' }
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <span className="text-[10px] font-bold text-accent-500 uppercase tracking-widest">{item.label}</span>
                  <p className={cn("text-lg font-bold", item.color)}>{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Market Sizing: TAM/SAM/SOM */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-xl font-heading font-bold flex items-center gap-2 px-1">
          <Globe className="w-5 h-5 text-secondary-400" /> Market Sizing (TAM/SAM/SOM)
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: 'tam', icon: <Globe className="w-5 h-5" />, color: 'from-blue-500/20 to-blue-600/5', ring: 'border-blue-500/30', text: 'text-blue-400' },
            { key: 'sam', icon: <Target className="w-5 h-5" />, color: 'from-primary-500/20 to-primary-600/5', ring: 'border-primary-500/30', text: 'text-primary-400' },
            { key: 'som', icon: <TrendingUp className="w-5 h-5" />, color: 'from-emerald-500/20 to-emerald-600/5', ring: 'border-emerald-500/30', text: 'text-emerald-400' }
          ].map((m) => {
            const data = blueprint.marketSize?.[m.key as keyof typeof blueprint.marketSize] || { value: 'N/A', label: m.key.toUpperCase(), desc: 'Data pending generation' };
            return (
              <div key={m.key} className={cn("glass-card p-6 rounded-3xl border bg-gradient-to-br transition-all hover:scale-[1.02]", m.color, m.ring)}>
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-xl bg-black/40", m.text)}>{m.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent-500">{data.label}</span>
                </div>
                <div className={cn("text-3xl font-heading font-black mb-2", m.text)}>{data.value}</div>
                <p className="text-xs text-accent-400 leading-relaxed font-medium">{data.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* User Persona & Market Gap */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 glass-card p-8 rounded-3xl border-primary-500/20 bg-primary-500/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-white">Target Persona</h3>
              <p className="text-xs text-primary-400 font-medium">Ideal Early Adopter</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent-500">Profile</span>
              <p className="text-white font-bold">{blueprint.userPersona?.name || 'Power User'}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent-500">Core Motivation</span>
              <p className="text-sm text-accent-200 leading-relaxed italic">"{blueprint.userPersona?.motivation}"</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent-500">Key Pain Points</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {blueprint.userPersona?.painPoints?.map((p: string) => (
                  <span key={p} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-accent-400">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Rocket className="w-32 h-32 text-secondary-500" />
          </div>
          <div className="flex items-center gap-2 mb-6 text-secondary-400 uppercase tracking-widest font-bold text-xs">
            <Info className="w-4 h-4" /> Underserved Market Gap
          </div>
          <h3 className="text-2xl font-heading font-bold mb-4 text-white">Why now?</h3>
          <p className="text-accent-300 text-lg leading-relaxed relative z-10 max-w-xl">
            {blueprint.marketGap || "This solution identifies a critical friction point in the current workflow that major incumbents have overlooked. By focusing on deep integration and user-centric automation, we can capture the evolving market demand."}
          </p>
          <div className="mt-8 flex gap-3">
             {blueprint.revenueStreams?.map((stream: string) => (
                <div key={stream} className="px-4 py-2 bg-secondary-500/10 border border-secondary-500/20 rounded-xl text-xs font-bold text-secondary-400 flex items-center gap-2">
                  <DollarSign className="w-3 h-3" /> {stream}
                </div>
             ))}
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
                {blueprint.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm text-accent-500 uppercase tracking-wider mb-3">Tech Stack Strategy</h4>
              <div className="flex flex-wrap gap-2">
                {blueprint.techStack && Object.values(blueprint.techStack).map((tech: any) => (
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
            <DollarSign className="w-5 h-5 text-emerald-400" /> AI Pricing Strategy
          </h3>

          <div className="space-y-4 relative z-10">
            {blueprint.pricing?.map((p: any, i: number) => (
                <div key={i} className={cn(
                    "p-4 rounded-xl border flex items-center justify-between",
                    i === 1 ? "border-primary-500/50 bg-primary-500/10" : "border-white/10 bg-black/40"
                )}>
                  <div>
                    <p className="font-bold text-white mb-1">{p.tier} {i === 1 && <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-primary-500 text-white uppercase tracking-wider">Recommended</span>}</p>
                    <p className="text-xs text-accent-400">{p.target}</p>
                  </div>
                  <div className="text-xl font-heading font-bold text-white">{p.price}</div>
                </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Landing Page Copy & Launch Plan */}
      <motion.div variants={itemVariants} className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 bg-[#0a0f1e]/80 relative overflow-hidden">
          <div className="absolute inset-x-0 -bottom-32 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-2 text-sm text-primary-400 font-bold uppercase tracking-wider mb-6">
            <Zap className="w-4 h-4" /> Landing Page Hook
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4 leading-tight">{blueprint.landingPageCopy?.hero}</h2>
          <p className="text-lg text-accent-300 mb-8">{blueprint.landingPageCopy?.subheadline}</p>
          <div className="flex gap-4">
            <div className="px-6 py-3 rounded-lg bg-white text-black font-bold text-sm">Get Started</div>
            <div className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold text-sm">Learn More</div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 bg-black/20">
          <div className="flex items-center gap-2 text-sm text-secondary-400 font-bold uppercase tracking-wider mb-6">
            <Rocket className="w-4 h-4" /> Go-to-Market Sequence
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {blueprint.launchPlan?.map((step: string, i: number) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-[#0a0f1e] text-accent-400 group-[.is-active]:border-secondary-500 group-[.is-active]:text-secondary-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-[10px] font-bold">{i+1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-accent-500 font-bold uppercase tracking-wider block mb-1">Step {i + 1}</span>
                  <span className="text-sm font-medium text-white">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
