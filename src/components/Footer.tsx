import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  PhoneCall, 
  Mail, 
  FileCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CITIES } from '../data/labsData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#041c33] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Badges / Quality Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">NABL & CAP Certified</h4>
              <p className="text-[11px] text-slate-400">ISO 15189:2012 Quality Standard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">100% Barcoded Track</h4>
              <p className="text-[11px] text-slate-400">Zero Sample Mix-up Guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Same-Day Digital Reports</h4>
              <p className="text-[11px] text-slate-400">Instant SMS & WhatsApp Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">2500+ Phlebotomists</h4>
              <p className="text-[11px] text-slate-400">Vaccinated & Certified Experts</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#003366] to-[#0a4b8f] flex items-center justify-center text-white border border-blue-400/30">
                <Activity className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Diagnostics<span className="text-[#f37023]">Focus</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              DiagnosticsFocus is a national leader in pathology, clinical biochemistry, and preventive wellness checkups. Utilizing automated high-throughput analyzers, barcoded sample integrity, and cold-chain phlebotomy, we deliver diagnostic accuracy you can trust.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-white font-medium">1800-425-0777</span>
                <span className="text-slate-500">(24x7 Customer Care)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-white font-medium">care@diagnosticsfocus.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tests" className="text-slate-400 hover:text-white transition-colors">Book a Blood Test</Link>
              </li>
              <li>
                <Link to="/packages" className="text-slate-400 hover:text-white transition-colors">Health Packages</Link>
              </li>
              <li>
                <Link to="/home-collection" className="text-slate-400 hover:text-white transition-colors">Home Sample Collection</Link>
              </li>
              <li>
                <Link to="/download-reports" className="text-slate-400 hover:text-white transition-colors">Download Patient Report</Link>
              </li>
              <li>
                <Link to="/locate-lab" className="text-slate-400 hover:text-white transition-colors">Find Diagnostics Center</Link>
              </li>
              <li>
                <Link to="/upload-prescription" className="text-slate-400 hover:text-white transition-colors">Upload Prescription</Link>
              </li>
            </ul>
          </div>

          {/* Popular Tests */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Popular Tests</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tests/complete-blood-count-cbc" className="text-slate-400 hover:text-white transition-colors">CBC with ESR</Link>
              </li>
              <li>
                <Link to="/tests/thyroid-profile-total-t3-t4-tsh" className="text-slate-400 hover:text-white transition-colors">Thyroid Profile (T3, T4, TSH)</Link>
              </li>
              <li>
                <Link to="/tests/hba1c-glycated-hemoglobin" className="text-slate-400 hover:text-white transition-colors">HbA1c Blood Sugar</Link>
              </li>
              <li>
                <Link to="/tests/lipid-profile-complete-cardiac" className="text-slate-400 hover:text-white transition-colors">Lipid Profile Cardiac</Link>
              </li>
              <li>
                <Link to="/tests/liver-function-test-lft" className="text-slate-400 hover:text-white transition-colors">Liver Function Test (LFT)</Link>
              </li>
              <li>
                <Link to="/tests/kidney-function-test-kft-rft" className="text-slate-400 hover:text-white transition-colors">Kidney Function Test (KFT)</Link>
              </li>
              <li>
                <Link to="/tests/vitamin-d-25-hydroxy" className="text-slate-400 hover:text-white transition-colors">Vitamin D (25-OH)</Link>
              </li>
            </ul>
          </div>

          {/* Major Cities Covered */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Operational Cities</h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {CITIES.filter(c => c !== 'All Cities').map((city) => (
                <span
                  key={city}
                  className="px-2 py-1 rounded bg-slate-800/80 text-slate-300 text-[11px]"
                >
                  {city}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <Link
                to="/locate-lab"
                className="text-xs text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>View all 150+ Lab Locations</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 text-xs text-slate-500 space-y-4">
          <p className="text-[11px] leading-relaxed text-slate-400">
            <strong>Medical Disclaimer:</strong> DiagnosticsFocus is a clinical pathology laboratory service. Content, test overviews, and normal reference ranges provided on this portal are for informational purposes only and must not be taken as a diagnosis or medical prescription. Always consult a certified medical practitioner regarding your symptoms and laboratory test results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} DiagnosticsFocus. All rights reserved. Recreated from Apollo Diagnostics reference for GitHub Pages by <strong>Aman22kr</strong>.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQs</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
