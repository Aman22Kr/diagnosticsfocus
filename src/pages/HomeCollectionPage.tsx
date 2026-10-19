import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PATHOLOGY_TESTS, HEALTH_PACKAGES } from '../data/testsData';
import { CITIES } from '../data/labsData';
import { CartItem, BookingRecord } from '../utils/storage';
import { AdSection } from '../components/AdSection';

const TIME_SLOTS = [
  '06:30 AM - 07:30 AM (Fasting Preferred)',
  '07:30 AM - 08:30 AM (Fasting Preferred)',
  '08:30 AM - 09:30 AM (Fasting Preferred)',
  '09:30 AM - 10:30 AM',
  '10:30 AM - 11:30 AM',
  '11:30 AM - 12:30 PM',
  '04:00 PM - 05:00 PM (Non-fasting tests)',
  '05:00 PM - 06:00 PM (Non-fasting tests)'
];

export const HomeCollectionPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart, selectedCity, addBooking, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [city, setCity] = useState(selectedCity);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Date & Slot
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [preferredDate, setPreferredDate] = useState(defaultDateStr);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(TIME_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'Pay on Collection' | 'UPI / Online'>('Pay on Collection');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const homeCollectionFee = subtotal >= 499 || cart.length === 0 ? 0 : 100;
  const totalAmount = subtotal + homeCollectionFee;

  const handleQuickAdd = (testId: string) => {
    const test = PATHOLOGY_TESTS.find(t => t.id === testId);
    if (test) {
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
    }
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (cart.length === 0) {
        showToast('Please add at least one test or health package to continue', 'error');
        return;
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      if (!preferredDate || !preferredTimeSlot) {
        showToast('Please choose a collection date and time slot', 'error');
        return;
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 3) {
      if (!patientName.trim() || !patientAge || !patientPhone.trim() || !address.trim()) {
        showToast('Please fill in all mandatory patient contact details', 'error');
        return;
      }
      if (patientPhone.replace(/\D/g, '').length < 10) {
        showToast('Please enter a valid 10-digit mobile number', 'error');
        return;
      }

      // Generate confirmed booking
      const newBookingId = `DF-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: BookingRecord = {
        bookingId: newBookingId,
        createdAt: new Date().toLocaleString(),
        patientName,
        patientAge,
        patientGender,
        patientPhone,
        patientEmail: patientEmail || `${patientPhone}@sms.diagnosticsfocus.in`,
        city,
        address: `${address}, Pincode: ${pincode}`,
        preferredDate,
        preferredTimeSlot,
        items: [...cart],
        subtotal,
        discount: 0,
        totalAmount,
        paymentMethod,
        status: 'Confirmed',
        isHomeCollection: true
      };

      addBooking(newBooking);
      setConfirmedBooking(newBooking);
      clearCart();
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Home Sample Collection</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Schedule Free Home Blood Sample Collection
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            A certified DiagnosticsFocus phlebotomist will arrive at your home with temperature-controlled cold boxes and barcoded tubes.
          </p>
        </div>
      </section>

      {/* Main Process Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        
        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
            
            {[
              { num: 1, label: 'Select Tests' },
              { num: 2, label: 'Date & Slot' },
              { num: 3, label: 'Patient Info' },
              { num: 4, label: 'Confirmation' },
            ].map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#f37023] text-white shadow-md'
                        : 'bg-white border-2 border-slate-300 text-slate-500'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${isCurrent ? 'text-[#003366]' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Forms */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          
          {/* STEP 1: Select Tests / Review Cart */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Step 1: Selected Tests & Health Packages</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review the tests you want the phlebotomist to collect at your doorstep.
                </p>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-6">
                  <Home className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-slate-700">No tests selected yet</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Quickly add popular routine tests below or browse our complete catalog.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleQuickAdd('t1')}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-orange-500 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-orange-600" />
                      Add CBC (₹349)
                    </button>
                    <button
                      onClick={() => handleQuickAdd('t2')}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-orange-500 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-orange-600" />
                      Add Thyroid Profile (₹499)
                    </button>
                    <button
                      onClick={() => handleQuickAdd('t3')}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-orange-500 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-orange-600" />
                      Add HbA1c (₹399)
                    </button>
                    <button
                      onClick={() => handleQuickAdd('t7')}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:border-orange-500 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-orange-600" />
                      Add Vitamin D (₹699)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {cart.map((item) => (
                      <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{item.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>{item.sampleType}</span>
                            <span>·</span>
                            <span className={item.fastingRequired ? 'text-amber-600 font-medium' : 'text-emerald-600'}>
                              {item.fastingRequired ? 'Fasting Required' : 'No Fasting'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-mono font-bold text-slate-900 text-sm">₹{item.price}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Remove Test"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl text-xs">
                    <div>
                      <span className="text-slate-500 font-medium">Estimated Order Subtotal:</span>
                      <div className="font-black text-slate-900 text-base font-mono">₹{subtotal}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-emerald-600 block">
                        {subtotal >= 499 ? '✓ Free Home Sample Collection' : '₹100 Phlebotomy Visit Fee (Orders < ₹499)'}
                      </span>
                      <Link to="/tests" className="text-xs text-orange-600 hover:underline font-semibold mt-1 inline-block">
                        + Add More Tests
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleStepSubmit}
                  disabled={cart.length === 0}
                  className="px-6 py-2.5 bg-[#f37023] hover:bg-[#e05f13] disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all"
                >
                  Proceed to Date & Slot &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Pick Date & Time Slot */}
          {step === 2 && (
            <form onSubmit={handleStepSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Step 2: Preferred Collection Schedule</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a convenient morning date and 1-hour time window for blood draw.
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Collection Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full sm:w-72 p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Select 1-Hour Arrival Slot <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = preferredTimeSlot === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setPreferredTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-orange-50/80 border-orange-500 text-orange-950 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-600' : 'text-slate-400'}`} />
                          <span>{slot}</span>
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Fasting Instruction Reminder</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  If any test in your order requires fasting (e.g., Blood Sugar, Lipid Profile), we recommend an early morning slot between 06:30 AM - 08:30 AM after 10-12 hours of overnight fasting.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm"
                >
                  Next: Patient Details &rarr;
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Patient Information & Address */}
          {step === 3 && (
            <form onSubmit={handleStepSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Step 3: Patient Information & Address</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter patient credentials for barcoding and phlebotomist home navigation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Aman Kumar"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={patientAge}
                      min="1"
                      max="115"
                      onChange={(e) => setPatientAge(e.target.value)}
                      placeholder="e.g. 32"
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as any)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Mobile Number (For Reports SMS & WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Email Address (For Digital PDF Copy)
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="e.g. patient@example.com"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Doorstep Collection Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    >
                      {CITIES.filter(c => c !== 'All Cities').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Pincode <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 400053"
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Complete House / Flat / Society Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / House number, Wing, Society Name, Street Landmark..."
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Payment Preference</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Pay on Collection')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      paymentMethod === 'Pay on Collection'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Pay on Collection (Cash/UPI)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI / Online')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      paymentMethod === 'UPI / Online'
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Online UPI / Card (Demo)
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm"
                >
                  Confirm & Place Booking (₹{totalAmount})
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Booking Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Booking Confirmed Successfully
                </span>
                <h2 className="text-2xl font-black text-[#003366] mt-1">
                  Thank You, {confirmedBooking.patientName}!
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Your home sample collection request has been registered in the DiagnosticsFocus system.
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Booking Reference ID:</span>
                  <span className="font-mono text-base font-black text-orange-600">
                    {confirmedBooking.bookingId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking.preferredDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Arrival Window:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking.preferredTimeSlot}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-medium text-slate-800 text-right truncate max-w-xs">{confirmedBooking.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-mono font-bold text-slate-800">{confirmedBooking.patientPhone}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="font-bold text-slate-700">Total Payable ({confirmedBooking.paymentMethod}):</span>
                  <span className="font-mono text-base font-black text-[#003366]">₹{confirmedBooking.totalAmount}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/download-reports"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Track / Download Reports
                </Link>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                >
                  Return to Home
                </Link>
              </div>

              <p className="text-[11px] text-slate-400">
                Notice: Data is saved to your browser's local storage and will persist through refreshes.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
