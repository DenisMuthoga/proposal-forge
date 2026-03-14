'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4 selection:bg-primary-500 selection:text-white">
      <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-[1px] group-hover:scale-110 transition-transform">
          <div className="bg-black w-full h-full rounded-[7px] flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-400" />
          </div>
        </div>
        <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">Launch<span className="text-gradient">Engine</span></span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden text-center shadow-2xl"
      >
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        
        <h1 className="text-3xl font-heading font-bold mb-2">Welcome Back</h1>
        <p className="text-accent-400 text-sm mb-8">Sign in to access your validated blueprints.</p>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-accent-200 transition-colors">
            <Mail className="w-5 h-5" /> Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1e293b] border border-white/5 text-white font-semibold rounded-xl hover:bg-[#334155] transition-colors">
            <Github className="w-5 h-5" /> Continue with GitHub
          </button>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-accent-500 font-medium uppercase tracking-wider">Or email magic link</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); /* mock submission */ }} className="space-y-4 text-left">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-accent-300 ml-1">Email Address</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="founders@startup.com" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 placeholder:text-accent-600 transition-all"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold px-4 py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(174,82,255,0.39)] hover:shadow-[0_6px_20px_rgba(174,82,255,0.23)] hover:-translate-y-0.5">
            Send Magic Link
          </button>
        </form>
        
        <p className="mt-8 text-xs text-accent-500 text-center">
          By continuing, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
