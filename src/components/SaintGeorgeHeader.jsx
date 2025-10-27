import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeHeader.css';

const SaintGeorgeHeader = React.memo(() => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { categories } = useData();


  const toggleCategories = useCallback(() => {
    setIsCategoriesOpen(prev => !prev);
  }, []);

  const closeCategories = useCallback(() => {
    setIsCategoriesOpen(false);
  }, []);

  const toggleOthers = useCallback(() => {
    setIsOthersOpen(prev => !prev);
  }, []);

  const closeOthers = useCallback(() => {
    setIsOthersOpen(false);
  }, []);

  // Enhanced close functions that also close other dropdowns
  const closeAllDropdowns = useCallback(() => {
    setIsCategoriesOpen(false);
    setIsOthersOpen(false);
    setIsLanguageOpen(false);
  }, []);

  const toggleLanguageDropdown = useCallback(() => {
    setIsLanguageOpen(prev => !prev);
  }, []);

  const selectLanguage = useCallback((lang) => {
    setLanguage(lang);
    closeAllDropdowns();
  }, [setLanguage, closeAllDropdowns]);


  // No need for complex useEffect - we're using conditional rendering now

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close language dropdown if clicking outside language selector and dropdown
      if (isLanguageOpen && !event.target.closest('.language-selector-container')) {
        setIsLanguageOpen(false);
      }
      
      // Close categories dropdown if clicking outside categories nav item and dropdown
      if (isCategoriesOpen && !event.target.closest('.categories-nav-item') && !event.target.closest('.categories-dropdown')) {
        setIsCategoriesOpen(false);
      }
      
      // Close others dropdown if clicking outside others nav item and dropdown
      if (isOthersOpen && !event.target.closest('.others-nav-item') && !event.target.closest('.others-dropdown')) {
        setIsOthersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen, isCategoriesOpen, isOthersOpen]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      showSuccess(language === 'ar' ? 'تم البحث بنجاح!' : 'Search completed successfully!');
      setSearchQuery('');
    } else {
      showError(language === 'ar' ? 'يرجى إدخال كلمة البحث' : 'Please enter a search term');
    }
  }, [searchQuery, navigate, showSuccess, showError, language]);

  const handleSearchInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Categories dropdown
  const categoriesDropdown = isCategoriesOpen ? (
    <div className="categories-dropdown">
      <div className="categories-dropdown-content">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/category/${category.slug}`} 
            className="category-dropdown-link" 
            onClick={closeAllDropdowns}
          >
            {category.name[language]}
          </Link>
        ))}
      </div>
    </div>
  ) : null;

  // Others dropdown
  const othersDropdown = isOthersOpen ? (
    <div className="others-dropdown">
      <div className="others-dropdown-content">
        <Link to="/bestsellers" className="others-dropdown-link" onClick={closeAllDropdowns}>
          <span className="others-icon">🏆</span>
          {t('bestSellers', language)}
        </Link>
        <Link to="/offers" className="others-dropdown-link" onClick={closeAllDropdowns}>
          <span className="others-icon">🎯</span>
          {t('offers', language)}
        </Link>
        <Link to="/suggestions" className="others-dropdown-link" onClick={closeAllDropdowns}>
          <span className="others-icon">💡</span>
          {t('suggestions', language)}
        </Link>
      </div>
    </div>
  ) : null;

  // Language dropdown
  const languageDropdown = isLanguageOpen ? (
    <div className="language-dropdown">
      <div className="language-dropdown-content">
        <button 
          className={`language-option ${language === 'ar' ? 'active' : ''}`} 
          onClick={() => selectLanguage('ar')}
        >
          <span className="language-flag">🇸🇦</span>
          العربية
        </button>
        <button 
          className={`language-option ${language === 'en' ? 'active' : ''}`} 
          onClick={() => selectLanguage('en')}
        >
          <span className="language-flag">🇺🇸</span>
          English
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="saint-george-header">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="top-content">
            <div className="language-selector-container">
              <div className="language-selector" onClick={toggleLanguageDropdown}>
                <span className="language-text">{language === 'ar' ? 'العربية' : 'English'}</span>
                <img
                  src={getImagePath("/iconamoonarrowup2light5391-pygq.svg")}
                  alt="language"
                  className="language-arrow"
                />
              </div>
              {isLanguageOpen && languageDropdown}
            </div>
            <Link to="/admin-login" className="admin-login-btn" onClick={closeAllDropdowns}>
              {t('adminLogin', language)}
            </Link>
            <div className="logo-section">
              <Link to="/" className="logo-link" onClick={closeAllDropdowns}>
                <div className="logo-container">
                  <img src={getImagePath("/photos/logo.PNG")} alt="Saint George Market Logo" className="header-logo-image" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="main-content">
            {/* Search Section */}
            <div className="search-section">
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-box">
                  <img
                    src={getImagePath("/materialsymbolslightsearch5329-9t2h.svg")}
                    alt="search"
                    className="search-icon"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder={t('searchPlaceholder', language)}
                    className="search-input"
                  />
                </div>
              </form>
            </div>
            
            {/* Navigation */}
            <div className="main-nav">
              <Link to="/contact" className="nav-text" onClick={closeAllDropdowns}>{t('contact', language)}</Link>
              <div className="nav-item others-nav-item" onClick={toggleOthers}>
                <span className="nav-text">{t('others', language)}</span>
                <img
                  src={getImagePath("/fluentiosarrow24filled5329-qbri.svg")}
                  alt="arrow"
                  className="nav-arrow"
                />
                {isOthersOpen && othersDropdown}
              </div>
              <div className="nav-item categories-nav-item" onClick={toggleCategories}>
                <span className="nav-text">{t('categories', language)}</span>
                <img
                  src={getImagePath("/fluentiosarrow24filled5329-qbri.svg")}
                  alt="arrow"
                  className="nav-arrow"
                />
                {isCategoriesOpen && categoriesDropdown}
              </div>
              <Link 
                to="/" 
                className={`nav-text ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeAllDropdowns}
              >
                {t('homepage', language)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SaintGeorgeHeader.displayName = 'SaintGeorgeHeader';

export default SaintGeorgeHeader;