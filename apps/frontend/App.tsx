import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Security from './pages/Security';
import About from './pages/About';
import Contact from './pages/Contact';
import UltraCRM from './pages/UltraCRM';
import ReportGenerator from './pages/ReportGenerator';
import TestPage from './pages/TestPage';
import UltraNews from './pages/UltraNews'; // Added UltraNews import

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Modal state handler to be passed to context if needed
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode='wait'>
        <Routes>
          {/* Public Routes wrapped in Layout */}
          <Route element={<Layout onOpenModal={openModal} isModalOpen={isModalOpen} onCloseModal={closeModal} />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/security" element={<Security />} />
            <Route path="/news" element={<UltraNews />} /> {/* Added /news route */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test" element={<TestPage />} />
          </Route>

          {/* CRM & Admin Routes (Standalone Layout or Internal) */}
          <Route path="/ultracrm/*" element={<UltraCRM />} />

          {/* Report Generator Route */}
          <Route path="/reports" element={<ReportGenerator />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
