import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  Users, 
  CheckCircle2, 
  Activity, 
  FileCheck, 
  Target, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { AdSection } from '../components/AdSection';

const DOCTOR_IMG = '/src/assets/images/health_checkup_doctor_1792386289237.jpg';
const LAB_IMG = '/src/assets/images/hero_diagnostic_lab_1792386288085.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About DiagnosticsFocus
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Delivering gold-standard clinical pathology, diagnostic precision, and compassionate healthcare to millions of families across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full flex-1 space-y-16">
        
        {/* Intro Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
              Our Clinical Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003366] leading-snug">
              Every Diagnostic Result Drives a Critical Clinical Decision
            </h2>
            <p>
              At DiagnosticsFocus, we believe that more than 70% of medical diagnoses and patient treatment plans depend directly on laboratory investigations. That is why we treat every sample tube with paramount precision and scientific rigor.
            </p>
            <p>
              From our automated Central Reference Laboratories to our network of 150+ regional hubs and collection centers, we maintain unbroken cold-chain logistics, two-dimensional barcoding, and daily two-tier internal quality checks.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-2xl font-black text-[#003366] font-mono">150+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Automated Labs & Centers</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-2xl font-black text-orange-600 font-mono">3,000+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Tests & Specialized Assays</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={DOCTOR_IMG}
                alt="Doctor Consultation and Diagnostic Review"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-orange-400">Dr. Sarah Jenkins & Medical Board</span>
                <p className="text-xs text-slate-200 mt-0.5">
                  Every report is verified by certified MD Pathologists before digital authorization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Standards & Accreditations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
              Quality Assurance Benchmarks
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#003366] mt-1">
              Rigorous Quality Protocols at Every Step
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Our laboratories operate under internationally recognized benchmarks for clinical competence and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <Award className="w-8 h-8 text-orange-500" />
              <h4 className="text-sm font-bold text-slate-900">NABL & CAP Accreditations</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accredited under ISO 15189:2012 by the National Accreditation Board for Testing and Calibration Laboratories and College of American Pathologists.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#003366]" />
              <h4 className="text-sm font-bold text-slate-900">Dual Level IQC & EQAS</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daily multi-level internal quality controls coupled with global external proficiency testing panels (Bio-Rad / CMC Vellore) ensure 99.98% accuracy.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <Activity className="w-8 h-8 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">Automated Analyzers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipped with gold-standard high-throughput systems from Roche Cobas, Abbott Architect, Sysmex, and Siemens Advia.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#003366] text-white p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-orange-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To democratize high-accuracy clinical diagnostics across urban and regional communities. By combining temperature-controlled doorstep phlebotomy with same-day digital reporting, we make preventative healthcare accessible to all.
            </p>
          </div>

          <div className="bg-[#f37023] text-white p-8 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Our Vision</h3>
            <p className="text-xs sm:text-sm text-orange-50 leading-relaxed">
              To be the most trusted diagnostic brand in India, recognized for clinical excellence, ethical medical practice, patient-centric phlebotomy, and seamless digital access to health records.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#003366]">Experience the DiagnosticsFocus Standard</h3>
          <p className="text-xs text-slate-600">
            Book a test or full body health checkup package today with complimentary home sample collection.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/tests"
              className="px-5 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors"
            >
              Browse All Tests
            </Link>
            <Link
              to="/home-collection"
              className="px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-lg transition-colors"
            >
              Book Home Collection
            </Link>
          </div>
        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
