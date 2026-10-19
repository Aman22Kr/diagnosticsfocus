import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Droplet, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShoppingBag, 
  Bookmark, 
  HelpCircle,
  FileText,
  PhoneCall
} from 'lucide-react';
import { PATHOLOGY_TESTS } from '../data/testsData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const TestDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, isItemSaved, toggleSaveItem } = useApp();

  const test = PATHOLOGY_TESTS.find(t => t.slug === slug);

  if (!test) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Test Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The requested pathology test could not be located. It may have been updated or moved.
        </p>
        <Link
          to="/tests"
          className="mt-4 px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
        >
          Back to Tests Catalog
        </Link>
      </div>
    );
  }

  const saved = isItemSaved(test.id);
  const relatedTests = PATHOLOGY_TESTS.filter(t => t.id !== test.id && t.category === test.category).slice(0, 3);

  const handleBookNow = () => {
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
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Breadcrumb & Header */}
      <section className="bg-[#003366] text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-3">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/tests" className="hover:underline">Diagnostic Tests</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{test.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-white/10 text-orange-300 px-2 py-0.5 rounded">
                  {test.code}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  Department: {test.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {test.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {test.overview}
              </p>
            </div>

            {/* Quick Price Card */}
            <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100 shrink-0 lg:w-72">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-2xl font-black text-[#003366] font-mono">
                  ₹{test.price}
                </span>
                <span className="text-xs text-slate-400 line-through font-mono">
                  ₹{test.originalPrice}
                </span>
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mb-4">
                Special Online Discount: {test.discountPercent}% OFF
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleBookNow}
                  className="w-full py-2.5 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  Book Home Collection Now
                </button>
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
                  className="w-full py-2 px-4 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  NABL Certified Lab
                </span>
                <button
                  onClick={() => toggleSaveItem(test.id)}
                  className={`flex items-center gap-1 hover:text-slate-900 ${saved ? 'text-orange-600 font-bold' : ''}`}
                >
                  <Bookmark className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2-Columns: Detailed Specimen, Parameters, Clinical Use */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Test Facts Bar */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Sample Type</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{test.sampleType}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Turnaround Time</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{test.tat}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Fasting Requirement</span>
                <span className={`font-bold mt-0.5 block ${test.fastingRequired ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {test.fastingRequired ? (test.fastingDuration || '8-10 Hours Fasting') : 'No Fasting Required'}
                </span>
              </div>
            </div>

            {/* Test Parameters Breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Included Test Parameters ({test.parameters.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">Normal clinical reference intervals and descriptions</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#003366] bg-blue-50 px-2 py-1 rounded">
                  {test.code}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {test.parameters.map((param, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="sm:max-w-md">
                      <div className="font-bold text-slate-900">{param.name}</div>
                      <p className="text-slate-500 text-[11px] mt-0.5">{param.description}</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-mono text-slate-800 font-semibold">{param.normalRange}</div>
                      <div className="text-[11px] text-slate-400">{param.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Significance */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Clinical Significance & Diagnostic Purpose
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {test.clinicalSignificance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who Should Take This Test */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Who Should Take This Test?
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {test.whoShouldTake.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Guidelines */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Patient Preparation & Guidelines
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {test.preparationInstructions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar: Need Assistance / Related Tests */}
          <div className="space-y-6">
            
            {/* Assistance card */}
            <div className="bg-gradient-to-br from-[#003366] to-[#042442] text-white p-6 rounded-2xl shadow-md space-y-4">
              <h4 className="text-base font-bold">Have Questions About This Test?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our certified pathology counselors are available 24x7 to help you understand test requirements and schedule home visits.
              </p>
              <a
                href="tel:18004250777"
                className="w-full py-2.5 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                Call Helpline: 1800-425-0777
              </a>
            </div>

            {/* Related Tests */}
            {relatedTests.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Related {test.category} Tests
                </h4>
                <div className="space-y-3">
                  {relatedTests.map((rel) => (
                    <div key={rel.id} className="pt-3 first:pt-0 border-t first:border-0 border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <Link
                          to={`/tests/${rel.slug}`}
                          className="text-xs font-bold text-slate-800 hover:text-[#003366] block leading-snug"
                        >
                          {rel.name}
                        </Link>
                        <span className="text-[11px] font-mono font-bold text-[#003366]">₹{rel.price}</span>
                      </div>
                      <Link
                        to={`/tests/${rel.slug}`}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
