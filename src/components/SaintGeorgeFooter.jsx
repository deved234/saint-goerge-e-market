import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeFooter.css';

const SaintGeorgeFooter = () => {
  const { language } = useLanguage();
  return (
    <footer className="saint-george-footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Social Media */}
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-text">Saint GEORGE MARKET</span>
            </div>
            <div className="social-media">
              <a href="#" className="social-link" aria-label="Email">
                <img src={getImagePath("/materialsymbolslightemail5391-ki0j.svg")} alt="Email" />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <img src={getImagePath("/deviconplainfacebook5391-ki0j.svg")} alt="Facebook" />
              </a>
            </div>
            <p className="copyright">
              © 2005 {t('copyright', language)}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-right">
            <div className="footer-links">
              <div className="links-column">
                <h4 className="column-title">{t('contactUs', language)}</h4>
                <Link to="/about" className="footer-link">{t('aboutUs', language)}</Link>
                <Link to="/location" className="footer-link">{t('location', language)}</Link>
                <Link to="/hours" className="footer-link">{t('workingHoursFooter', language)}</Link>
                <Link to="/contact" className="footer-link">{t('contacts', language)}</Link>
                <Link to="/privacy" className="footer-link">{t('privacyPolicy', language)}</Link>
              </div>
              <div className="links-column">
                <h4 className="column-title">{t('main', language)}</h4>
                <Link to="/products" className="footer-link">{t('allSections', language)}</Link>
                <Link to="/offers" className="footer-link">{t('offers', language)}</Link>
                <Link to="/suggestions" className="footer-link">{t('suggestions', language)}</Link>
                <Link to="/bestsellers" className="footer-link">{t('bestSellers', language)}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SaintGeorgeFooter;