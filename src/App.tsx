import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { QuickSettingsModal } from './components/QuickSettingsModal';

// Pages
import { HomePage } from './pages/HomePage';
import { TestsPage } from './pages/TestsPage';
import { TestDetailPage } from './pages/TestDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { HomeCollectionPage } from './pages/HomeCollectionPage';
import { DownloadReportsPage } from './pages/DownloadReportsPage';
import { LabLocatorPage } from './pages/LabLocatorPage';
import { UploadPrescriptionPage } from './pages/UploadPrescriptionPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <AppProvider>
      {/* 
        HashRouter guarantees reliable navigation, direct links, and browser refreshes 
        on static GitHub Pages without requiring server-side rewrite rules.
      */}
      <HashRouter>
        <div className="flex flex-col min-h-screen text-slate-900 bg-white selection:bg-orange-100 selection:text-orange-900">
          <Navbar onOpenSettings={() => setSettingsOpen(true)} />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tests" element={<TestsPage />} />
              <Route path="/tests/:slug" element={<TestDetailPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/packages/:slug" element={<PackageDetailPage />} />
              <Route path="/home-collection" element={<HomeCollectionPage />} />
              <Route path="/download-reports" element={<DownloadReportsPage />} />
              <Route path="/locate-lab" element={<LabLocatorPage />} />
              <Route path="/upload-prescription" element={<UploadPrescriptionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
          <ToastContainer />
          <QuickSettingsModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
