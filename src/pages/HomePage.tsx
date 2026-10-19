import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  PhoneCall, 
  FileText, 
  Home, 
  Upload, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Building2, 
  Award,
  Bookmark,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { PATHOLOGY_TESTS, HEALTH_PACKAGES } from '../data/testsData';
import { useApp } from '../context/AppContext';
import { BlankVideoPlaceholder } from '../components/BlankVideoPlaceholder';
import { AdSection } from '../components/AdSection';

// Generated image assets
const HERO_LAB_IMG = '/src/assets/images/hero_diagnostic_lab_1792386288085.jpg';
const HOME_COLLECTION_IMG = '/src/assets/images/home_blood_collection_1792386288283.jpg';
const DOCTOR_CONSULT_IMG = '/src/assets/images/health_checkup_doctor_1792386289237.jpg';
const LAB_PATHOLOGY_IMG = '/src/assets/images/lab_pathology_testing_1792386288826.jpg';

export const HomePage: React.FC = () => {
  const { addToCart, isItemSaved, toggleSaveItem, recordSearch, selectedCity } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Routine' | 'Diabetes' | 'Thyroid' | 'Cardiac' | 'Vitamins'>('All');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      recordSearch(searchTerm);
      navigate(`/tests?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const filteredTests = PATHOLOGY_TESTS.filter(test => {
    if (activeCategory === 'All') return true;
    return test.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Hero & Quick Booking Banner */}
      <section className="relative bg-gradient-to-br from-[#003366] via-[#042d57] to-[#011d38] text-white py-12 md:py-16 overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
                <Award className="w-3.5 h-3.5 text-orange-400" />
                <span>NABL & CAP Certified Pathology Labs in {selectedCity}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white text-balance">
                Precision Pathology & Accurate Diagnostics for Your Entire Family
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Book over 3,000+ pathology blood tests and preventative health checkups. Enjoy free doorstep sample collection, barcoded safety, and same-day digital reports.
              </p>

              {/* Instant Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
                <div className="flex items-center bg-white rounded-xl shadow-xl overflow-hidden p-1.5 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                  <div className="pl-3 pr-2 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search CBC, Thyroid, HbA1c, Vitamin D, Full Body..."
                    className="w-full py-2.5 px-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-lg transition-all shrink-0 shadow-sm"
                  >
                    Search Tests
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                  <span className="text-slate-400 font-medium">Trending:</span>
                  <button 
                    type="button" 
                    onClick={() => { setSearchTerm('CBC'); navigate('/tests?q=CBC'); }}
                    className="hover:text-orange-300 underline"
                  >
                    CBC
                  </button>
                  <span>·</span>
                  <button 
                    type="button" 
                    onClick={() => { setSearchTerm('Thyroid'); navigate('/tests?q=Thyroid'); }}
                    className="hover:text-orange-300 underline"
                  >
                    Thyroid Profile
                  </button>
                  <span>·</span>
                  <button 
                    type="button" 
                    onClick={() => { setSearchTerm('HbA1c'); navigate('/tests?q=HbA1c'); }}
                    className="hover:text-orange-300 underline"
                  >
                    HbA1c
                  </button>
                  <span>·</span>
                  <button 
                    type="button" 
                    onClick={() => { setSearchTerm('Vitamin D'); navigate('/tests?q=Vitamin D'); }}
                    className="hover:text-orange-300 underline"
                  >
                    Vitamin D
                  </button>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-orange-400 font-mono">100%</div>
                  <div className="text-xs text-slate-300">Barcoded Safety</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-orange-400 font-mono">2,500+</div>
                  <div className="text-xs text-slate-300">Phlebotomists</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-orange-400 font-mono">&lt; 12h</div>
                  <div className="text-xs text-slate-300">Report Turnaround</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src={HERO_LAB_IMG}
                  alt="DiagnosticsFocus Clinical Pathology Laboratory"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>DiagnosticsFocus Central Reference Lab</span>
                  </div>
                  <p className="text-white text-sm font-medium mt-1">
                    Equipped with automated Roche Cobas & Abbott clinical chemistry platforms.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Apollo Diagnostics Quick Action Cards */}
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Book Home Sample Collection */}
          <Link
            to="/home-collection"
            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-1 group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-xs">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                Book Home Collection
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Phlebotomist visits your doorstep at scheduled time slot.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 mt-2">
                <span>Schedule Free Visit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 2: Download Reports */}
          <Link
            to="/download-reports"
            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-1 group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center shrink-0 group-hover:bg-[#003366] group-hover:text-white transition-colors shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#003366] transition-colors">
                Download Reports
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Lookup test reports instantly using Mobile or Booking ID.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#003366] mt-2">
                <span>View Digital PDF</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 3: Find a Diagnostic Lab Center */}
          <Link
            to="/locate-lab"
            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-1 group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Find Nearest Lab
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                150+ NABL accredited pathology hubs & centers across India.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-2">
                <span>Find in {selectedCity}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 4: Upload Prescription */}
          <Link
            to="/upload-prescription"
            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-1 group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Upload Prescription
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Let our clinical pharmacists select tests & call you back.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 mt-2">
                <span>Upload Doctor Rx</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* Featured Health Packages (Apollo Diagnostics Style) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#f37023] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Preventive Wellness Checks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] tracking-tight mt-1">
              Popular Comprehensive Health Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Routine diagnostic screening packages crafted by clinical experts to evaluate organ functions, vitamin stores, and cardiovascular markers.
            </p>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#003366] hover:text-orange-600 transition-colors whitespace-nowrap"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEALTH_PACKAGES.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                    {pkg.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    {pkg.parametersCount} Parameters
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#003366] transition-colors leading-snug">
                  <Link to={`/packages/${pkg.slug}`}>{pkg.name}</Link>
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Inclusions summary */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Key Test Inclusions:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.testCategories.slice(0, 3).map((cat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{cat.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#003366] font-mono">
                      ₹{pkg.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-mono">
                      ₹{pkg.originalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600">
                    Save {pkg.discountPercent}% Today
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
                    className="px-4 py-2 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routine & Specialized Pathology Tests */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#f37023] uppercase tracking-wider">
                Individual Pathology Tests
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] tracking-tight mt-1">
                Frequently Booked Blood Tests
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Performed on automated analyzers with strict two-level quality controls.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {(['All', 'Routine', 'Diabetes', 'Thyroid', 'Cardiac', 'Vitamins'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#003366] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.slice(0, 6).map((test) => {
              const saved = isItemSaved(test.id);
              return (
                <div
                  key={test.id}
                  className="rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between group bg-slate-50/50 hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-mono text-[11px] text-slate-400">{test.code}</span>
                      <button
                        onClick={() => toggleSaveItem(test.id)}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                          saved ? 'text-orange-600' : 'text-slate-400'
                        }`}
                        title={saved ? 'Remove Bookmark' : 'Bookmark Test'}
                      >
                        <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#003366] leading-snug">
                      <Link to={`/tests/${test.slug}`}>{test.name}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {test.overview}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-3 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{test.tat}</span>
                      </span>
                      <span>·</span>
                      <span>{test.sampleType}</span>
                    </div>

                    {test.fastingRequired && (
                      <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded inline-block font-medium">
                        Fasting: {test.fastingDuration || '8-10 Hours'}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#003366] font-mono">
                          ₹{test.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-mono">
                          ₹{test.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {test.discountPercent}% OFF
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          id: test.id,
                          type: 'test',
                          name: test.name,
                          price: test.price,
                          originalPrice: test.originalPrice,
                          discountPercent: test.discountPercent,
                          fastingRequired: test.fastingRequired,
                          tat: test.tat,
                          sampleType: test.sampleType,
                        })
                      }
                      className="px-3.5 py-1.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                    >
                      Book Test
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/tests"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#003366] hover:bg-[#002244] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all"
            >
              <span>Explore All 250+ Diagnostic Tests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Why Choose DiagnosticsFocus (Bento Showcase with Generated Images & Blank Video Area) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#f37023] uppercase tracking-wider">
            Clinical Quality & Trust
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] tracking-tight mt-1">
            Why Millions Trust DiagnosticsFocus
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Built on stringent hospital-grade diagnostic benchmarks, automated cold-chain logistics, and compassionate patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Bento Card 1: Home Phlebotomy with Real Generated Image */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between">
            <img
              src={HOME_COLLECTION_IMG}
              alt="Certified Phlebotomist Home Blood Collection"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                Doorstep Convenience
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Vaccinated & Certified Phlebotomists
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Temperature-controlled cold-chain specimen carriers ensure cellular stability from your home to our clinical chemistry analyzers.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#003366]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Painless, single-prick blood draw</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Pathology Testing Precision with Real Generated Image */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between">
            <img
              src={LAB_PATHOLOGY_IMG}
              alt="Pathology Barcoded Blood Sample Automation"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <span className="text-[11px] font-bold text-[#003366] uppercase tracking-wider">
                Accredited Reliability
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                100% Barcoded Sample Integrity
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Every blood vacutainer is scanned with unique two-dimensional barcodes. Zero manual transposition errors or specimen mismatch.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#003366]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dual internal quality control calibration</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Patient Tour & VIDEO AREA REQUIRED TO BE BLANK SQUARE */}
          {/* Note requirement: "If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there." */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Laboratory Tour
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Virtual Tour & Process Transparency
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Watch how our certified pathology team processes your samples through automated chemistry, hematology, and molecular diagnostics.
              </p>
            </div>

            {/* BLANK SQUARE SPACE REQUIREMENT */}
            <div className="my-4">
              <BlankVideoPlaceholder label="DiagnosticsFocus Laboratory Tour Video Space" />
            </div>

            <div className="pt-2 border-t border-slate-100 text-center">
              <Link
                to="/about"
                className="text-xs font-bold text-[#f37023] hover:underline"
              >
                Learn more about our Quality Standards &rarr;
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* Patient Testimonials & Trust */}
      <section className="py-14 bg-slate-100 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003366]">
              Real Patient Experiences
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Feedback from individuals who book routine and specialized tests with DiagnosticsFocus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "The phlebotomist was on time at 7 AM sharp in Mumbai. Painless blood sample collection for my elderly parents. Downloaded the CBC and HbA1c reports by 4 PM on WhatsApp!"
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Dr. Sunita K.</div>
                  <div className="text-[11px] text-slate-400">Andheri West, Mumbai</div>
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Patient
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Booked the Vital Advanced package. The report parameter breakdowns and normal range interpretations were extremely clear to understand. Great service by DiagnosticsFocus."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Rajiv Verma</div>
                  <div className="text-[11px] text-slate-400">South Extension, Delhi</div>
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Patient
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Very impressed with the barcoded sample tracking and NABL quality standard. No hassle with prescription reading—uploaded it and got my tests mapped in 10 minutes."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Kavita Swaminathan</div>
                  <div className="text-[11px] text-slate-400">Indiranagar, Bengaluru</div>
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Patient
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section at Bottom of Page */}
      <AdSection />

    </div>
  );
};
