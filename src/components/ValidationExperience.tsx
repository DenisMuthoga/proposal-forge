'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2, Bot, CheckCircle, Lightbulb } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const deepDiveStatements = [
  "Analyzing market demand...",
  "Scanning competitors...",
  "Predicting profitability...",
  "Structuring go-to-market strategy...",
  "Generating launch blueprint..."
];

const mockGeneratedIdeas = [
  {
    title: "AI CRM for Real Estate",
    desc: "A tool that automates lead nurturing for agents using conversational AI."
  },
  {
    title: "Marketing Agency OS",
    desc: "All-in-one workspace for client onboarding, reporting, and asset sharing."
  },
  {
    title: "Niche B2B Lead Scraper",
    desc: "Extract highly accurate leads from targeted industry directories automatically."
  }
];

export function ValidationExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledIdea = searchParams.get('idea');
  
  const [prompt, setPrompt] = useState(prefilledIdea || "");
  const [step, setStep] = useState<'input' | 'generating-ideas' | 'picking' | 'synthesizing'>(prefilledIdea ? 'synthesizing' : 'input');
  const [loadingStep, setLoadingStep] = useState(0);

  const handleGenerateIdeas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setStep('generating-ideas');
    
    // Simulate AI generation of ideas
    setTimeout(() => {
      setStep('picking');
    }, 2000);
  };

  const handlePickIdea = (ideaTitle: string) => {
    setStep('synthesizing');
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'synthesizing') {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= deepDiveStatements.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              router.push('/results?id=test-idea');
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [step, router]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-24 pb-24">
      <AnimatePresence mode="wait">
        
        {step === 'input' && (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="w-full flex flex-col items-center text-center space-y-12"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold">What niche or problem are you exploring?</h1>
              <p className="text-accent-300 text-lg">Tell our AI your focus, and we'll generate high-potential SaaS ideas for you to build.</p>
            </div>

            <form onSubmit={handleGenerateIdeas} className="w-full relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-600/50 to-secondary-600/50 opacity-20 group-focus-within:opacity-50 blur-xl transition-opacity duration-500"></div>
              <div className="relative glass-card rounded-2xl p-2 flex flex-col md:flex-row gap-2">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. I want to build a tool for freelance designers..."
                  className="w-full bg-transparent border-none text-white p-6 text-xl focus:outline-none focus:ring-0 placeholder:text-accent-600 resize-none min-h-[120px]"
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={!prompt.trim()}
                  className="w-full md:w-auto self-end bg-white text-black hover:bg-accent-200 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Brainstorm Ideas
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <p className="text-sm font-medium tracking-widest uppercase text-accent-500">Or try these</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Tools for real estate agents", "Software for indie podcast creators", "B2B SaaS for HR departments"].map((example) => (
                  <button 
                    key={example}
                    onClick={() => { setPrompt(example); setStep('generating-ideas'); setTimeout(() => setStep('picking'), 2000); }}
                    className="px-4 py-2 rounded-full border border-border-subtle bg-white/5 hover:bg-white/10 text-sm text-accent-300 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'generating-ideas' && (
          <motion.div
            key="generating-ideas"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.2 } }}
            className="w-full flex flex-col items-center text-center space-y-8"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-primary-500 animate-spin-slow"></div>
              <Lightbulb className="text-primary-400 w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Synthesizing Market Gaps...</h2>
            <p className="text-accent-400 max-w-md">Scanning recent trends and underserved niches based on your prompt.</p>
          </motion.div>
        )}

        {step === 'picking' && (
          <motion.div
            key="picking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="w-full flex flex-col items-center text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-heading font-bold">Select an Idea to Validate</h2>
              <p className="text-accent-300 text-lg max-w-2xl mx-auto">We identified these high-potential SaaS concepts. Pick the one that excites you the most to generate a deep-dive feasibility blueprint.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full text-left">
              {mockGeneratedIdeas.map((idea, idx) => (
                 <motion.button
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.15 }}
                   key={idx}
                   onClick={() => handlePickIdea(idea.title)}
                   className="glass-card p-6 flex flex-col h-full rounded-2xl group hover:border-primary-500/50 transition-all text-left relative overflow-hidden"
                 >
                   <div className="absolute inset-x-0 -bottom-32 h-32 bg-primary-500/20 rounded-full blur-3xl group-hover:bg-primary-500/30 transition-colors"></div>
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <TargetIcon className="w-5 h-5 text-secondary-400" />
                   </div>
                   <h3 className="text-xl font-bold font-heading mb-3 text-white">{idea.title}</h3>
                   <p className="text-accent-300 text-sm mb-6 flex-1">{idea.desc}</p>
                   <span className="text-primary-400 text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                     Run Deep Analysis <ArrowRight className="w-4 h-4" />
                   </span>
                 </motion.button>
              ))}
            </div>
            
            <button onClick={() => setStep('input')} className="text-sm text-accent-500 hover:text-white transition-colors underline decoration-border-subtle underline-offset-4">
              None of these? Let's try another prompt.
            </button>
          </motion.div>
        )}

        {step === 'synthesizing' && (
          <motion.div
            key="loading-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md flex flex-col items-center text-center space-y-12"
          >
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-primary-500 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border-4 border-white/5 border-b-secondary-500 animate-[spin_4s_linear_infinite_reverse]"></div>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(174,82,255,0.5)]">
                 <Bot className="text-white w-8 h-8" />
              </div>
            </div>

            <div className="space-y-6 w-full">
              <h2 className="text-2xl font-bold font-heading">Generating Blueprint</h2>
              <div className="space-y-3">
                {deepDiveStatements.map((stm, idx) => (
                  <div key={stm} className="flex items-center gap-4">
                    <div className="w-6 flex justify-center">
                      {idx < loadingStep ? (
                        <CheckCircle className="w-5 h-5 text-secondary-400" />
                      ) : idx === loadingStep ? (
                        <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-accent-600" />
                      )}
                    </div>
                    <span className={`text-left transition-colors duration-300 ${
                      idx < loadingStep ? 'text-accent-400' :
                      idx === loadingStep ? 'text-white font-medium' : 'text-accent-600'
                    }`}>
                      {stm}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TargetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
