import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DesignSequence from './pages/Sequence/DesignSequence';
import DashboardLayout from "./components/layout/DashboardLayout";
import ContactsCentre from './pages/Dashboard/ContactsCentre';
import ContactsManager from './pages/Dashboard/ContactsManager';
import AnalyticsReporting from './pages/Dashboard/AnalyticsReporting';
import Updates from './pages/Dashboard/Updates';
import AutoDialerPage from './pages/Dialer/AutoDialerPage';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contacts-centre" element={<ContactsCentre />} />
        <Route path="/analytics-reporting" element={<AnalyticsReporting />} />
        <Route path="/contacts-manager" element={<ContactsManager />} />
        <Route path="/design-sequence" element={<DesignSequence />} />
        <Route path="/app" element={<DashboardLayout />} />
        <Route path="/updates" element={<Updates />} />  
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/auto-dialer" element={<AutoDialerPage />} />
  <Route path="/about" element={<About />} />
  <Route path="/features" element={<Features />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}
