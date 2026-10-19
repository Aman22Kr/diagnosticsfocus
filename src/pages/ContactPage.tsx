import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Home Collection Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been sent to DiagnosticsFocus Support', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact DiagnosticsFocus
          </h1>
          <p className="text-xs sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Have questions about a blood test, need home phlebotomy assistance, or seeking your test report? Our clinical support desk is ready 24x7.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toll-Free Helpline</h3>
            <p className="text-base font-extrabold text-[#003366] font-mono">1800-425-0777</p>
            <p className="text-[11px] text-slate-500">Available 24x7 for booking & inquiries</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Support</h3>
            <p className="text-sm font-bold text-slate-900">care@diagnosticsfocus.in</p>
            <p className="text-[11px] text-slate-500">Average response within 1 hour</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample Collection Hours</h3>
            <p className="text-sm font-bold text-slate-900">6:30 AM - 8:30 PM</p>
            <p className="text-[11px] text-slate-500">All 7 days a week including Sundays</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Corporate Headquarters</h3>
            <p className="text-xs font-bold text-slate-900">DiagnosticsFocus Tower</p>
            <p className="text-[11px] text-slate-500">Andheri West, Mumbai 400053</p>
          </div>

        </div>

        {/* Contact Form and Map Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Send an Inquiry or Feedback</h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Our clinical coordinator will get back to you promptly.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Inquiry Received!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. A DiagnosticsFocus representative has been assigned and will call you at <strong>{phone}</strong>.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  className="mt-4 px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aman Kumar"
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Mobile Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aman@example.com"
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Inquiry Category</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    >
                      <option value="Home Collection Inquiry">Home Collection Inquiry</option>
                      <option value="Report Delivery / Missing Report">Report Delivery / Missing Report</option>
                      <option value="Test Preparation & Fasting Guidance">Test Preparation & Fasting Guidance</option>
                      <option value="Corporate / Bulk Health Checkups">Corporate / Bulk Health Checkups</option>
                      <option value="Feedback / Other">Feedback / Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Message Details *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your query or test requirements..."
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#003366] text-white p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="text-base font-bold">Need Immediate Help?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you have an urgent blood test request or need phlebotomist sample collection within 2 hours, call our rapid response hotline directly.
              </p>
              <a
                href="tel:18004250777"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                Call 1800-425-0777
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm">Frequently Visited Laboratories</h4>
              <p className="text-[11px] text-slate-500">
                You can also visit any of our 150+ walk-in diagnostic collection hubs across Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, and Kolkata.
              </p>
              <Link
                to="/locate-lab"
                className="text-xs font-bold text-orange-600 hover:underline inline-block pt-1"
              >
                Find nearest lab location &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
