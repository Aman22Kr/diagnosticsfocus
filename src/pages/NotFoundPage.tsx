import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, Home, Search, FileText } from 'lucide-react';
import { AdSection } from '../components/AdSection';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center my-auto">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#f37023] flex items-center justify-center mx-auto mb-6 shadow-xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-mono">
          404 Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#003366] tracking-tight mt-2 mb-3">
          We couldn't locate this page
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
          The requested URL <code className="bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-800 text-xs font-mono">{location.pathname}</code> does not exist on DiagnosticsFocus or has been relocated.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/tests"
            className="px-5 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Diagnostic Tests</span>
          </Link>
          <Link
            to="/download-reports"
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download Reports</span>
          </Link>
        </div>
      </div>

      <AdSection />
    </div>
  );
};
