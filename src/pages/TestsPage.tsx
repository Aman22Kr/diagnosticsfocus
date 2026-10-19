import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Droplet, 
  AlertCircle, 
  Bookmark, 
  Check, 
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PATHOLOGY_TESTS, PathologyTest } from '../data/testsData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const TestsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [fastingFilter, setFastingFilter] = useState<'all' | 'fasting' | 'non-fasting'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  const { addToCart, isItemSaved, toggleSaveItem, recordSearch } = useApp();

  const categories = useMemo(() => {
    const cats = new Set(PATHOLOGY_TESTS.map(t => t.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredTests = useMemo(() => {
    return PATHOLOGY_TESTS.filter(test => {
      // Search match
      const q = searchTerm.toLowerCase();
      const matchesSearch = 
        !q || 
        test.name.toLowerCase().includes(q) || 
        test.code.toLowerCase().includes(q) || 
        test.category.toLowerCase().includes(q) ||
        test.overview.toLowerCase().includes(q) ||
        test.parameters.some(p => p.name.toLowerCase().includes(q));

      // Category match
      const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;

      // Fasting match
      let matchesFasting = true;
      if (fastingFilter === 'fasting') matchesFasting = test.fastingRequired;
      if (fastingFilter === 'non-fasting') matchesFasting = !test.fastingRequired;

      return matchesSearch && matchesCategory && matchesFasting;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [searchTerm, selectedCategory, fastingFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Diagnostic Pathology Tests</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Comprehensive Pathology Blood Tests
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Book certified individual blood and urine tests. 100% automated analyzers with stringent internal quality control and free doorstep sample collection.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        
        {/* Controls Bar: Search & Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search tests by name, parameter (e.g. Platelets, TSH), or code..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Fasting Toggle & Sort */}
            <div className="flex items-center gap-3 shrink-0 text-xs">
              
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setFastingFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    fastingFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFastingFilter('fasting')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    fastingFilter === 'fasting' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Fasting
                </button>
                <button
                  onClick={() => setFastingFilter('non-fasting')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    fastingFilter === 'non-fasting' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Non-Fasting
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

            </div>

          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">
              Department:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#003366] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>Showing <strong className="text-slate-800">{filteredTests.length}</strong> Diagnostic Tests</span>
          {searchTerm && (
            <span>Filtered by "{searchTerm}"</span>
          )}
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching pathology tests found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with alternative medical terms (e.g. "Sugar", "Cholesterol", "CBC", "Liver") or clear active filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setFastingFilter('all');
                setSearchParams({});
              }}
              className="mt-4 px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTests.map((test) => {
              const saved = isItemSaved(test.id);
              return (
                <div
                  key={test.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {test.code}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {test.parametersCount} Parameters
                        </span>
                        <button
                          onClick={() => toggleSaveItem(test.id)}
                          className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                            saved ? 'text-orange-600' : 'text-slate-400'
                          }`}
                          title={saved ? 'Remove Bookmark' : 'Save Test'}
                        >
                          <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#003366] transition-colors leading-snug">
                      <Link to={`/tests/${test.slug}`}>{test.name}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {test.overview}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{test.tat}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                        <Droplet className="w-3 h-3 text-rose-400" />
                        <span className="truncate max-w-[150px]">{test.sampleType}</span>
                      </span>
                    </div>

                    {test.fastingRequired ? (
                      <div className="mt-2 text-[11px] text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded font-medium">
                        {test.fastingDuration || 'Overnight Fasting Required'}
                      </div>
                    ) : (
                      <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded font-medium">
                        No Fasting Required
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
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

                    <div className="flex items-center gap-2">
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
                      <Link
                        to={`/tests/${test.slug}`}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Full Test Information"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
