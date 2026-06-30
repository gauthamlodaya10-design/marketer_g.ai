import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import SolutionsPage from '@/pages/SolutionsPage';
import DemosPage from '@/pages/DemosPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTopOnNavigate from '@/components/ScrollToTopOnNavigate';
import ScrollToTop from '@/components/ScrollToTop';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/demos" element={<DemosPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header />
          <main className="flex-grow pt-20">
            <ScrollToTopOnNavigate>
              <AnimatedRoutes />
            </ScrollToTopOnNavigate>
          </main>
          <Footer />
          <Toaster />
          <ScrollToTop />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
