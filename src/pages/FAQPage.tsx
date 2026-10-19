import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { FAQS, FAQItem } from '../data/faqData';
import { AdSection } from '../components/AdSection';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const toggleFaq = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Home Collection', 'Reports & Accuracy', 'Fasting & Prep', 'Booking & Payment'];

  const filteredFaqs = FAQS.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesQuery = !searchFilter || 
      f.question.toLowerCase().includes(searchFilter.toLowerCase()) || 
      f.answer.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Find immediate answers regarding home blood sample collection, report delivery timeframes, fasting instructions, and NABL accreditation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full flex-1 space-y-8">
        
        {/* Search & Category Filter */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search frequently asked questions (e.g. fasting, home collection, reports)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
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

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-800">No questions found matching "{searchFilter}"</p>
              <button
                onClick={() => { setSearchFilter(''); setSelectedCategory('All'); }}
                className="mt-3 px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                        Category: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Need Help Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Still have unanswered questions?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Our 24x7 customer support desk is happy to help you.</p>
          </div>
          <a
            href="tel:18004250777"
            className="px-4 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors shrink-0 shadow-xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1800-425-0777</span>
          </a>
        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
