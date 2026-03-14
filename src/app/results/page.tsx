'use client';

import { ResultsDashboard } from '@/components/ResultsDashboard';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Loader2, Save } from 'lucide-react';

export default function ResultsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const stored = localStorage.getItem('launch_engine_blueprint');
      if (!stored) throw new Error('No blueprint found');
      
      const blueprint = JSON.parse(stored);
      
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title: blueprint.title || 'My SaaS Idea', // title might need to be stored separately or passed from validation flow
            blueprint 
        })
      });

      if (res.status === 401) {
          router.push('/login?callbackUrl=/results');
          return;
      }

      if (!res.ok) throw new Error('Failed to save');
      
      setSaved(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to save. Make sure you are logged in.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <nav className="border-b border-border-subtle bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-xl">
            Launch<span className="text-secondary-400">Engine</span>
          </Link>
          <div className="flex items-center gap-4">
            <button 
                onClick={handleSave}
                disabled={isSaving || saved}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save to Dashboard'}
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-sm font-bold transition-colors">
              Share Report
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Suspense fallback={<div className="text-accent-400">Loading analysis...</div>}>
          <ResultsDashboard />
        </Suspense>
      </main>
    </div>
  );
}
