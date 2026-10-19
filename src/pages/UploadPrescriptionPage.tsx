import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/labsData';
import { AdSection } from '../components/AdSection';

export const UploadPrescriptionPage: React.FC = () => {
  const { prescriptions, addPrescription, selectedCity, showToast } = useApp();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [city, setCity] = useState(selectedCity);
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      showToast('Please provide your name and 10-digit mobile number', 'error');
      return;
    }

    const prescriptionRecord = {
      id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
      uploadedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      fileName: fileName || 'Doctor_Prescription_Document.pdf',
      patientName,
      patientPhone,
      city,
      notes,
      status: 'Under Review' as const
    };

    addPrescription(prescriptionRecord);
    setSubmitted(true);
    setFileName(null);
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Upload Prescription</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Upload Doctor's Prescription
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Don't worry about deciphering handwriting. Upload your doctor's slip and our certified pathology team will identify the prescribed tests and schedule your home visit.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        
        {/* How It Works Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Upload Prescription</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Attach a photo or scan of your doctor's prescription slip.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#003366] font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Pharmacist Verification</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Our clinical team reviews the Rx and maps exact tests within 15 mins.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Doorstep Phlebotomy</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">We call you to confirm your preferred home sample collection slot.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Upload Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-slate-900">Submit Prescription Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ensure doctor's clinic stamp or medical registration number is clearly visible.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Prescription Uploaded Successfully!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Our medical coordinators will contact you at <strong>{patientPhone}</strong> shortly to confirm tests and slot.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#003366] text-white text-xs font-bold rounded-lg"
                >
                  Upload Another Prescription
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* File Upload Drop Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Upload Prescription File (JPG, PNG, PDF) <span className="text-rose-500">*</span>
                  </label>
                  
                  <div className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 relative">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    {fileName ? (
                      <div className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1.5">
                        <FileCheck className="w-4 h-4" />
                        <span>Attached: {fileName}</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-xs font-bold text-slate-800">
                          Click to browse or drag and drop prescription file
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Up to 15 MB supported</p>
                      </>
                    )}
                  </div>
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Mobile Number <span className="text-rose-500">*</span>
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
                </div>

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
                    Doctor's Instructions or Patient Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Doctor said fasting required for lipid profile; please schedule for tomorrow 7:30 AM"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all"
                >
                  Submit Prescription & Request Callback
                </button>
              </form>
            )}
          </div>

          {/* Upload History & Privacy Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Previously uploaded Rx list */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Your Prescriptions ({prescriptions.length})
              </h3>

              {prescriptions.length === 0 ? (
                <p className="text-xs text-slate-400">No prescriptions uploaded yet.</p>
              ) : (
                <div className="space-y-3">
                  {prescriptions.map((p) => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#003366]">{p.id}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {p.status}
                        </span>
                      </div>
                      <div className="font-semibold text-slate-800 mt-1">{p.fileName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Uploaded on {p.uploadedAt}</div>
                      {p.notes && (
                        <div className="text-[11px] text-slate-500 mt-1 italic">"{p.notes}"</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy notice */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Medical Privacy Guaranteed</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Prescriptions are encrypted and strictly reviewed by registered pathologists and clinical pharmacists to ensure patient safety and compliance with medical standards.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Ad Section at Bottom of Page */}
      <AdSection />
    </div>
  );
};
