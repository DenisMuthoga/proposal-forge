import { ResultsDashboard } from '@/components/ResultsDashboard';

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <nav className="border-b border-border-subtle bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-heading font-bold text-xl">
            Launch<span className="text-secondary-400">Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
              Save to Dashboard
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-sm font-bold transition-colors">
              Share Report
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <ResultsDashboard />
      </main>
    </div>
  );
}
