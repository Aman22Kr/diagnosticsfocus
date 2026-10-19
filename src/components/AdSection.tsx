import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdSection: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <aside aria-label="Advertisement Banner" className="bg-slate-50 border-t border-b border-slate-200/60 py-2 px-4 text-center text-xs text-slate-500">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 mr-2">Advertisement</span>
        <button 
          onClick={() => setDismissed(false)}
          className="text-orange-600 hover:underline font-medium"
        >
          View DiagnosticsFocus Care Plus Partner Offers
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Advertisement Banner" className="w-full bg-gradient-to-r from-orange-50/80 via-white to-blue-50/80 border-y border-slate-200/80 py-4 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Ad Content */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Sponsored Partner Ad
              </span>
              <span className="text-xs font-bold text-orange-600">Limited Time Privilege</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
              DiagnosticsFocus Care Plus Annual Pass: <span className="text-slate-600 font-normal">Get 20% off all blood tests + Unlimited Free Home Sample Collections for up to 4 family members.</span>
            </p>
          </div>
        </div>

        {/* Ad Action & Close */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>Explore Passes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            title="Dismiss advertisement"
            aria-label="Dismiss ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
