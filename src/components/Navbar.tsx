import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PhoneCall, 
  MapPin, 
  FileText, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  Activity,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/labsData';

interface NavbarProps {
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings }) => {
  const { cartCount, selectedCity, setSelectedCity } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Book a Test', href: '/tests' },
    { label: 'Health Packages', href: '/packages' },
    { label: 'Home Collection', href: '/home-collection' },
    { label: 'Download Reports', href: '/download-reports' },
    { label: 'Find a Lab', href: '/locate-lab' },
    { label: 'Prescription', href: '/upload-prescription' },
    { label: 'About Us', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100">
      {/* Top Notification & Utility Bar */}
      <div className="bg-[#042442] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">NABL & CAP Certified Labs</span>
              <span className="sm:hidden">NABL Certified</span>
            </span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <a 
              href="tel:18004250777" 
              className="hidden md:flex items-center gap-1.5 text-white hover:text-orange-400 font-medium transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>Toll Free: 1800-425-0777</span>
            </a>
            <span className="text-slate-500 hidden lg:inline">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Sample Collection: 6:30 AM - 8:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-white transition-colors"
                title="Select City"
              >
                <MapPin className="w-3 h-3 text-orange-400" />
                <span className="font-semibold text-xs">{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setCityDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Select City
                    </div>
                    {CITIES.filter(c => c !== 'All Cities').map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between ${
                          selectedCity === city ? 'font-bold text-orange-600 bg-orange-50/60' : 'text-slate-700'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick Report Link */}
            <Link
              to="/download-reports"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-xs"
            >
              <FileText className="w-3 h-3 text-orange-400" />
              <span className="hidden sm:inline">Reports</span>
            </Link>

            {/* Animation / Settings Button */}
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="text-slate-300 hover:text-white p-1 transition-colors"
                title="App Settings & Animation Controls"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (3-Zone Design Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Zone 1: Brand Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003366] to-[#0a4b8f] flex items-center justify-center text-white shadow-md shadow-blue-950/15 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#003366] leading-none">
                Diagnostics<span className="text-[#f37023]">Focus</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                Precision Pathology Network
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    active ? 'text-[#f37023] font-bold' : 'hover:text-[#003366]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f37023] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search, Cart, CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Quick Launcher */}
            <Link
              to="/tests"
              className="p-2 text-slate-500 hover:text-[#003366] hover:bg-slate-100 rounded-lg transition-colors"
              title="Search Tests & Packages"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-[#003366] hover:bg-slate-100 rounded-lg transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f37023] text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Primary Action Button */}
            <Link
              to="/home-collection"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs md:text-sm font-bold text-white bg-[#f37023] hover:bg-[#e05f13] active:bg-[#c9520e] rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap"
            >
              Book Home Collection
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/home-collection"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 bg-[#f37023] text-white text-sm font-bold rounded-lg shadow-sm"
            >
              Book Home Sample Collection
            </Link>
            <a
              href="tel:18004250777"
              className="w-full text-center py-2 px-4 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-orange-500" />
              Call Helpline: 1800-425-0777
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
