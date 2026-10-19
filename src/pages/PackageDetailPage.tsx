import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  ShoppingBag, 
  PhoneCall, 
  FileCheck,
  Check
} from 'lucide-react';
import { HEALTH_PACKAGES } from '../data/testsData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();

  const pkg = HEALTH_PACKAGES.find(p => p.slug === slug);

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Health Package Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The requested health package could not be found. Please browse all available packages.
        </p>
        <Link
          to="/packages"
          className="mt-4 px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
        >
          View All Health Packages
        </Link>
      </div>
    );
  }

  const handleBookNow = () => {
    addToCart({
      id: pkg.id,
      type: 'package',
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      discountPercent: pkg.discountPercent,
      fastingRequired: true,
      tat: pkg.tat,
      sampleType: pkg.sampleType,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-3">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/packages" className="hover:underline">Health Packages</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{pkg.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-orange-300 bg-white/10 px-3 py-1 rounded-md">
                {pkg.badge} • {pkg.parametersCount} Parameters Included
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1">
                {pkg.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {pkg.overview}
              </p>
            </div>

            {/* Quick Pricing Card */}
            <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100 shrink-0 lg:w-72">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-3xl font-black text-[#003366] font-mono">
                  ₹{pkg.price}
                </span>
                <span className="text-xs text-slate-400 line-through font-mono">
                  ₹{pkg.originalPrice}
                </span>
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mb-4">
                Save {pkg.discountPercent}% • 100% Free Doorstep Collection
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleBookNow}
                  className="w-full py-2.5 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  Book Package Now
                </button>
                <button
                  onClick={() =>
                    addToCart({
                      id: pkg.id,
                      type: 'package',
                      name: pkg.name,
                      price: pkg.price,
                      originalPrice: pkg.originalPrice,
                      discountPercent: pkg.discountPercent,
                      fastingRequired: true,
                      tat: pkg.tat,
                      sampleType: pkg.sampleType,
                    })
                  }
                  className="w-full py-2 px-4 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Free Home Sample Collection
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Free General Physician Consultation
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-Col Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Metrics */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Total Parameters</span>
                <span className="font-bold text-slate-800 mt-0.5 block font-mono text-sm">{pkg.parametersCount} Tests</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Turnaround Time</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{pkg.tat}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Fasting Requirement</span>
                <span className="font-bold text-amber-600 mt-0.5 block">{pkg.fastingDuration}</span>
              </div>
            </div>

            {/* In-depth Test Categories & Inclusions */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">
                  Comprehensive Organ & System Coverage
                </h3>
                <p className="text-[11px] text-slate-500">All tests included under {pkg.name}</p>
              </div>

              <div className="p-6 space-y-6">
                {pkg.testCategories.map((cat, idx) => (
                  <div key={idx} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <h4 className="text-xs font-bold text-[#003366] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pl-6">
                      {cat.tests.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Why Choose DiagnosticsFocus For This Package?
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {pkg.keyBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Preparation Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Package Preparation Tips</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                  <span>Strict overnight 10-12 hours fasting is required before sample collection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                  <span>Drink 1-2 glasses of plain drinking water to stay hydrated before phlebotomy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                  <span>Avoid heavy alcohol, nicotine, or fatty foods 24 hours prior.</span>
                </li>
              </ul>
            </div>

            {/* Helpline Assistance */}
            <div className="bg-gradient-to-br from-[#003366] to-[#042442] text-white p-6 rounded-2xl shadow-md space-y-4">
              <h4 className="text-base font-bold">Need Help Deciding?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Call our medical team to know if this package is best aligned with your symptoms or health goals.
              </p>
              <a
                href="tel:18004250777"
                className="w-full py-2.5 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                Call Helpline: 1800-425-0777
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
