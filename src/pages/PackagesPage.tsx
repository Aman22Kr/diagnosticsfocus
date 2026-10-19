import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Users, 
  Filter,
  Droplet
} from 'lucide-react';
import { HEALTH_PACKAGES, HealthPackage } from '../data/testsData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const PackagesPage: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'All' | 'Men' | 'Women' | 'Senior'>('All');
  const { addToCart } = useApp();

  const filteredPackages = HEALTH_PACKAGES.filter((pkg) => {
    if (selectedGender === 'All') return true;
    return pkg.gender === selectedGender || pkg.gender === 'All';
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Health Checkup Packages</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Preventative Health & Full Body Checkup Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Curated by leading clinicians to detect lifestyle risks, metabolic imbalances, and silent conditions early. Includes free phlebotomist home visit and doctor consultation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        
        {/* Gender / Demographic Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl border border-slate-200 mb-8 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Filter By Audience:</span>
            <div className="flex items-center gap-1.5">
              {(['All', 'Men', 'Women', 'Senior'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedGender(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedGender === filter
                      ? 'bg-[#003366] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter === 'All' ? 'All Packages' : filter === 'Senior' ? 'Seniors (60+)' : `For ${filter}`}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredPackages.length}</strong> Curated Health Packages
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:border-orange-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
                    {pkg.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#003366] font-mono block">
                      {pkg.parametersCount} Parameters
                    </span>
                    <span className="text-[11px] text-slate-400">Target: {pkg.ageGroup}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#003366] transition-colors leading-snug">
                  <Link to={`/packages/${pkg.slug}`}>{pkg.name}</Link>
                </h2>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pkg.overview}
                </p>

                {/* Categories Accordion / Grid */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Package Organ Breakdown:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {pkg.testCategories.map((cat, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{cat.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {cat.tests.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Report: {pkg.tat}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Droplet className="w-3.5 h-3.5 text-rose-400" />
                    <span>{pkg.sampleType}</span>
                  </span>
                  <span>·</span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium text-[11px]">
                    {pkg.fastingDuration}
                  </span>
                </div>
              </div>

              {/* Pricing & Call to Action */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#003366] font-mono">
                      ₹{pkg.price}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 line-through font-mono">
                      ₹{pkg.originalPrice}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    Save {pkg.discountPercent}% • Free Phlebotomist Home Visit
                  </span>
                </div>

                <div className="flex items-center gap-2">
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
                    className="px-4 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="View Package Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
