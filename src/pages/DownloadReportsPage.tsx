import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Download, 
  Printer, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { SAMPLE_REPORTS, PatientReport } from '../data/mockReportsData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/AdSection';

export const DownloadReportsPage: React.FC = () => {
  const { bookings, showToast } = useApp();
  const [query, setQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<PatientReport | null>(SAMPLE_REPORTS[0]);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<PatientReport[]>(SAMPLE_REPORTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) {
      setResults(SAMPLE_REPORTS);
      setSelectedReport(SAMPLE_REPORTS[0]);
      return;
    }

    // Search mock reports and user bookings
    const matched = SAMPLE_REPORTS.filter(
      r => r.mobile.includes(clean) || 
           r.bookingId.toLowerCase().includes(clean) ||
           r.patientName.toLowerCase().includes(clean)
    );

    // Also check user's bookings from local storage
    const matchingBookings = bookings.filter(
      b => b.bookingId.toLowerCase().includes(clean) || b.patientPhone.includes(clean)
    );

    matchingBookings.forEach(b => {
      if (!matched.some(m => m.bookingId === b.bookingId)) {
        matched.push({
          id: `REP-${b.bookingId}`,
          bookingId: b.bookingId,
          patientName: b.patientName,
          age: parseInt(b.patientAge) || 30,
          gender: b.patientGender,
          mobile: b.patientPhone,
          email: b.patientEmail,
          referringDoctor: 'Self / DiagnosticsFocus Health Panel',
          collectionDate: `${b.preferredDate} 08:00 AM`,
          reportingDate: `${b.preferredDate} 04:00 PM`,
          testTitle: b.items.map(i => i.name).join(' & ') || 'Routine Diagnostics Check',
          barCode: `DF-BAR-${b.bookingId.replace(/\D/g, '') || '992019'}`,
          labLocation: `DiagnosticsFocus Hub - ${b.city}`,
          pathologist: 'Dr. Sunita V. Deshmukh, MD Pathology',
          pathologistReg: 'MCI-REG-847291',
          status: 'Report Ready',
          overallSummary: 'All vital clinical parameters evaluated by automated analyzers. Values are verified and electronically authorized.',
          parameters: [
            { name: 'Hemoglobin (Hb)', observedValue: '14.2', unit: 'g/dL', referenceInterval: '13.0 - 17.0', flag: 'NORMAL' },
            { name: 'Total Leukocyte Count (TLC)', observedValue: '7,100', unit: 'cells/cu.mm', referenceInterval: '4,000 - 11,000', flag: 'NORMAL' },
            { name: 'Platelet Count', observedValue: '260,000', unit: 'cells/cu.mm', referenceInterval: '150,000 - 450,000', flag: 'NORMAL' },
            { name: 'Fasting Blood Sugar', observedValue: '92', unit: 'mg/dL', referenceInterval: '70 - 99', flag: 'NORMAL' },
            { name: 'Serum Creatinine', observedValue: '0.9', unit: 'mg/dL', referenceInterval: '0.7 - 1.3', flag: 'NORMAL' }
          ]
        });
      }
    });

    setResults(matched);
    setSelectedReport(matched.length > 0 ? matched[0] : null);
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Digital PDF Report downloaded to your device!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Banner */}
      <section className="bg-[#003366] text-white py-10 px-4 sm:px-6 print:hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white">Download Patient Reports</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Download Online Diagnostic Test Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Access secure, NABL accredited digital laboratory reports. Enter your registered Mobile Number or Booking Reference ID below.
          </p>
        </div>
      </section>

      {/* Lookup Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        
        {/* Search Bar Box */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 print:hidden">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Mobile Number (e.g. 9876543210) or Booking ID (e.g. DF-884920)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors shrink-0"
            >
              Lookup Reports
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Test Samples:</span>
            <button
              type="button"
              onClick={() => { setQuery('9876543210'); }}
              className="text-orange-600 hover:underline font-mono"
            >
              9876543210
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => { setQuery('DF-884920'); }}
              className="text-orange-600 hover:underline font-mono"
            >
              DF-884920
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Report List (Hidden in Print) */}
          <div className="lg:col-span-4 space-y-3 print:hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
              <span>Available Reports ({results.length})</span>
            </div>

            {results.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-800">No reports found for "{query}"</p>
                <p className="text-[11px] mt-1">Please verify the 10-digit mobile number or booking reference.</p>
              </div>
            ) : (
              results.map((report) => {
                const isSelected = selectedReport?.id === report.id;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#003366] shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#003366]">{report.bookingId}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {report.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{report.patientName}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">{report.testTitle}</div>
                    <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{report.reportingDate}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: High Fidelity Digital Pathology Report Document Preview */}
          <div className="lg:col-span-8">
            {selectedReport ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                
                {/* Actions Toolbar (Hidden on print) */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 print:hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Digital Report Preview</span>
                    <span className="text-[11px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded">
                      Authorized by MD Pathologist
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>Print</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-3.5 py-1.5 bg-[#f37023] hover:bg-[#e05f13] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Printable Pathology Report Sheet */}
                <div className="p-6 sm:p-10 space-y-6 text-slate-900" id="printable-report">
                  
                  {/* Letterhead */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#003366]">
                    <div>
                      <div className="text-2xl font-black tracking-tight text-[#003366]">
                        Diagnostics<span className="text-[#f37023]">Focus</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                        National Clinical Reference Laboratory Network
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-sm">
                        {selectedReport.labLocation} • NABL ISO 15189:2012 Certified
                      </p>
                    </div>

                    <div className="text-left sm:text-right font-mono text-xs">
                      <div className="text-slate-400 text-[10px] uppercase tracking-wider">Sample Barcode</div>
                      <div className="font-bold text-slate-900 text-sm tracking-widest">{selectedReport.barCode}</div>
                      <div className="text-emerald-600 text-[11px] font-bold mt-1">NABL ACCREDITED: MC-4891</div>
                    </div>
                  </div>

                  {/* Patient Info Strip */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Patient Name</span>
                      <strong className="text-slate-900">{selectedReport.patientName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Age / Gender</span>
                      <span className="text-slate-800">{selectedReport.age} Yrs / {selectedReport.gender}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Booking ID</span>
                      <span className="font-mono font-bold text-[#003366]">{selectedReport.bookingId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Referring Doctor</span>
                      <span className="text-slate-800 truncate block">{selectedReport.referringDoctor}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Sample Collected</span>
                      <span className="text-slate-700 font-mono text-[11px]">{selectedReport.collectionDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Report Generated</span>
                      <span className="text-slate-700 font-mono text-[11px]">{selectedReport.reportingDate}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Investigation Title</span>
                      <strong className="text-slate-900 truncate block">{selectedReport.testTitle}</strong>
                    </div>
                  </div>

                  {/* Clinical Test Results Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-200">
                      <thead className="bg-[#003366] text-white">
                        <tr>
                          <th className="py-2.5 px-3 font-semibold">Investigation Parameter</th>
                          <th className="py-2.5 px-3 font-semibold text-center">Observed Value</th>
                          <th className="py-2.5 px-3 font-semibold">Unit</th>
                          <th className="py-2.5 px-3 font-semibold">Biological Reference Interval</th>
                          <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {selectedReport.parameters.map((param, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                            <td className="py-2.5 px-3 font-medium text-slate-900">
                              {param.name}
                              {param.interpretation && (
                                <div className="text-[10px] text-slate-500 font-normal mt-0.5 italic">
                                  Note: {param.interpretation}
                                </div>
                              )}
                            </td>
                            <td className="py-2.5 px-3 font-mono font-bold text-center text-slate-900">
                              {param.observedValue}
                            </td>
                            <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{param.unit}</td>
                            <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{param.referenceInterval}</td>
                            <td className="py-2.5 px-3 text-center">
                              {param.flag === 'HIGH' ? (
                                <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[10px]">
                                  HIGH
                                </span>
                              ) : param.flag === 'LOW' ? (
                                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[10px]">
                                  LOW
                                </span>
                              ) : (
                                <span className="font-semibold text-emerald-700 text-[10px]">
                                  NORMAL
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pathologist Conclusion & Doctor Signature */}
                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <div className="p-3 bg-blue-50/60 rounded-lg text-xs text-slate-700 leading-relaxed">
                      <strong>Clinical Impression:</strong> {selectedReport.overallSummary}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <p>End of Diagnostic Investigation Report.</p>
                        <p>This report has been digitally signed and validated.</p>
                      </div>

                      <div className="text-left sm:text-right space-y-0.5">
                        <div className="font-serif italic text-base text-[#003366] font-bold">
                          {selectedReport.pathologist}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-700">Senior Consultant Pathologist</div>
                        <div className="text-[10px] text-slate-400 font-mono">Reg No: {selectedReport.pathologistReg}</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Select a report to preview</h3>
                <p className="mt-1">Choose a report from the left panel or search by your mobile number.</p>
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
