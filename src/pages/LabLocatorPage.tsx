import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Navigation, 
  CheckCircle2, 
  ExternalLink,
  Home
} from 'lucide-react';
import { LAB_LOCATIONS, CITIES, LabLocation } from '../data/labsData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const LabLocatorPage: React.FC = () => {
  const { selectedCity, setSelectedCity } = useApp();
  const [cityFilter, setCityFilter] = useState<string>(selectedCity);
  const [searchPincode, setSearchPincode] = useState<string>('');
  const [selectedLab, setSelectedLab] = useState<LabLocation | null>(LAB_LOCATIONS[0]);

  const filteredLabs = LAB_LOCATIONS.filter((lab) => {
    const matchesCity = cityFilter === 'All Cities' || lab.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesPin = !searchPincode || lab.pincode.includes(searchPincode) || lab.address.toLowerCase().includes(searchPincode.toLowerCase()) || lab.name.toLowerCase().includes(searchPincode.toLowerCase());
    return matchesCity && matchesPin;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Pathology Centers & Lab Locator</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            DiagnosticsFocus Pathology Hubs & Centers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Locate our NABL and CAP accredited reference laboratories and neighborhood collection centers across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        
        {/* Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* City Selector */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Select City</label>
              <select
                value={cityFilter}
                onChange={(e) => {
                  setCityFilter(e.target.value);
                  if (e.target.value !== 'All Cities') {
                    setSelectedCity(e.target.value);
                  }
                }}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Pincode / Area Search */}
            <div className="md:col-span-7 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Search by Pincode or Locality</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchPincode}
                  onChange={(e) => setSearchPincode(e.target.value)}
                  placeholder="e.g. 400053, Andheri, Indiranagar, FC Road..."
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Labs List & Interactive Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Labs List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Found <strong className="text-slate-900">{filteredLabs.length}</strong> DiagnosticsFocus Centers</span>
              <span>Sorted by Proximity</span>
            </div>

            {filteredLabs.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-800">No centers found matching your query</p>
                <p className="text-[11px] mt-1">Try resetting the city filter to "All Cities".</p>
                <button
                  onClick={() => { setCityFilter('All Cities'); setSearchPincode(''); }}
                  className="mt-3 px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
                >
                  Show All Labs
                </button>
              </div>
            ) : (
              filteredLabs.map((lab) => {
                const isSelected = selectedLab?.id === lab.id;
                return (
                  <div
                    key={lab.id}
                    onClick={() => setSelectedLab(lab)}
                    className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 shadow-md ring-1 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                            {lab.centerType}
                          </span>
                          {lab.nablCertified && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              NABL Accredited
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">{lab.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{lab.address}</p>
                      </div>

                      {lab.distanceKm && (
                        <span className="text-xs font-mono font-bold text-[#003366] bg-blue-50 px-2 py-1 rounded shrink-0">
                          {lab.distanceKm} km away
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lab.timings}</span>
                      </span>
                      <span>·</span>
                      <a
                        href={`tel:${lab.phone}`}
                        className="flex items-center gap-1 text-[#003366] font-semibold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
                        <span>{lab.phone}</span>
                      </a>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2">
                      <div className="flex flex-wrap gap-1">
                        {lab.services.slice(0, 3).map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>

                      <Link
                        to="/home-collection"
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Home className="w-3 h-3" />
                        <span>Book Home Sample</span>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Lab Detail & Directions Card */}
          <div className="lg:col-span-5 sticky top-24">
            {selectedLab ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                    Diagnostics Center Profile
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedLab.name}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px]">
                      ISO 15189:2012 Certified
                    </span>
                    <span className="text-slate-400 font-mono">Pincode: {selectedLab.pincode}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Address:</strong>
                      <span>{selectedLab.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Working Hours:</strong>
                      <span>{selectedLab.timings}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Helpdesk Contact:</strong>
                      <span className="font-mono">{selectedLab.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Available Services */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 mb-2">Available Diagnostic Facilities:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLab.services.map((svc, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-[#003366] font-semibold px-2.5 py-1 rounded-md">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive Map Display */}
                <div className="aspect-video w-full rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="w-8 h-8 text-rose-500 animate-bounce mb-1" />
                  <div className="text-xs font-bold text-slate-800">{selectedLab.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{selectedLab.city}, India</div>
                  <span className="mt-2 text-[10px] bg-white px-2 py-0.5 rounded shadow-xs text-slate-600 font-medium">
                    Verified GPS Coordinates Available
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    to="/home-collection"
                    className="w-full py-2.5 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Home className="w-4 h-4" />
                    <span>Book Home Collection From This Lab</span>
                  </Link>
                  <a
                    href={`tel:${selectedLab.phone}`}
                    className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Center Reception</span>
                  </a>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
