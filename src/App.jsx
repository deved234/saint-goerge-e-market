import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { DataProvider } from './contexts/DataContext';
import PerformanceMonitor from './components/PerformanceMonitor';
import SaintGeorgeHeader from './components/SaintGeorgeHeader';
import SaintGeorgeFooter from './components/SaintGeorgeFooter';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Contact from './pages/Contact';
import BestSellers from './pages/BestSellers';
import Offers from './pages/Offers';
import Suggestions from './pages/Suggestions';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import AddCategory from './pages/AddCategory';
import ManageProducts from './pages/ManageProducts';
import ManageSpecialSection from './pages/ManageSpecialSection';
import ManageHeroAds from './pages/ManageHeroAds';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/category/:slug" element={<PageTransition><Category /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/bestsellers" element={<PageTransition><BestSellers /></PageTransition>} />
        <Route path="/offers" element={<PageTransition><Offers /></PageTransition>} />
        <Route path="/suggestions" element={<PageTransition><Suggestions /></PageTransition>} />
        <Route path="/admin-login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/admin-home" element={<PageTransition><AdminHome /></PageTransition>} />
        <Route path="/admin/add-category" element={<PageTransition><AddCategory /></PageTransition>} />
        <Route path="/admin/manage-products/:slug" element={<PageTransition><ManageProducts /></PageTransition>} />
        <Route path="/admin/manage-bestsellers" element={<PageTransition><ManageSpecialSection /></PageTransition>} />
        <Route path="/admin/manage-offers" element={<PageTransition><ManageSpecialSection /></PageTransition>} />
        <Route path="/admin/manage-suggestions" element={<PageTransition><ManageSpecialSection /></PageTransition>} />
        <Route path="/admin/manage-hero-ads" element={<PageTransition><ManageHeroAds /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ToastProvider>
          <DataProvider>
            <PerformanceMonitor />
            <Router basename="/e-commerse-market">
              <div className="App">
                <SaintGeorgeHeader />
                <main className="main-content">
                  <AnimatedRoutes />
                </main>
                <SaintGeorgeFooter />
              </div>
            </Router>
          </DataProvider>
        </ToastProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;