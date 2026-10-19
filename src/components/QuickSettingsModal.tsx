import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check, Github, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/labsData';

interface QuickSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettingsModal: React.FC<QuickSettingsModalProps> = ({ isOpen, onClose }) => {
  const { animSettings, setAnimSettings, selectedCity, setSelectedCity, showToast } = useApp();

  if (!isOpen) return null;

  const handleResetData = () => {
    if (window.confirm('Reset all saved bookings, cart items, and test history to defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 id="settings-title" className="text-sm font-bold text-slate-900">
                Application Controls
              </h3>
              <p className="text-[11px] text-slate-500">DiagnosticsFocus Configuration & Info</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          
          {/* Animation Controls (As requested: Speed NORMAL, Intensity STRONG) */}
          <div className="space-y-2">
            <label className="font-bold text-slate-900 block">
              Animation Speed (Configured: <span className="text-orange-600 font-mono">{animSettings.speed}</span>)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['SLOW', 'NORMAL', 'FAST'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setAnimSettings({ ...animSettings, speed: spd })}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                    animSettings.speed === spd
                      ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-slate-900 block">
              Animation Intensity (Configured: <span className="text-orange-600 font-mono">{animSettings.intensity}</span>)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['STRONG', 'BALANCED', 'OFF'] as const).map((intn) => (
                <button
                  key={intn}
                  onClick={() => setAnimSettings({ ...animSettings, intensity: intn })}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                    animSettings.intensity === intn
                      ? 'bg-[#003366] text-white border-[#003366] shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {intn}
                </button>
              ))}
            </div>
          </div>

          {/* Active Diagnostic City */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="font-bold text-slate-900 block">
              Active Regional Center
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
            >
              {CITIES.filter(c => c !== 'All Cities').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Project & GitHub Pages Specs */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Original Reference:</span>
              <span className="font-semibold text-slate-800">Apollo Diagnostics</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">GitHub Repository Owner:</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 font-mono">
                <Github className="w-3.5 h-3.5 text-slate-700" />
                Aman22kr
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Hosting Target:</span>
              <span className="font-semibold text-slate-800">GitHub Pages (Hash Routing)</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Client Storage:</span>
              <span className="text-emerald-700 font-semibold">Active (Browser LocalStorage)</span>
            </div>
          </div>

          {/* Reset cache */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleResetData}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1.5 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Local Storage Data</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
