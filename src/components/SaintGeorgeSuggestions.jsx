import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { products } from '../data/sampleData';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeSuggestions.css';

const SaintGeorgeSuggestions = () => {
  const { language } = useLanguage();
  // Get recommended products based on various criteria
  const suggestions = products
    .filter(product => 
      product.isNew || 
      product.rating >= 4.5 || 
      product.reviewCount >= 150 ||
      product.category === 'منتجات طازجة' ||
      product.category === 'Fresh Produce'
    )
    .sort((a, b) => {
      const scoreA = (a.rating * 0.7) + (a.reviewCount / 100 * 0.3);
      const scoreB = (b.rating * 0.7) + (b.reviewCount / 100 * 0.3);
      return scoreB - scoreA;
    })
    .slice(0, 3);

  return (
    <section id="suggestions" className="saint-george-suggestions">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('suggestions', language)}</h2>
          <Link to="/suggestions" className="see-all-link">{t('viewAll', language)}</Link>
        </div>
        
        <div className="suggestions-grid">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="product-card">
              <Link to={`/product/${suggestion.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={getImagePath(suggestion.image)} alt={suggestion.name} className="product-image" />
                  <div className="product-badge">
                    {suggestion.isNew ? (
                      <span className="new-badge">{t('new', language)}</span>
                    ) : (
                      <span className="rating-badge">⭐ {suggestion.rating}</span>
                    )}
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{suggestion.name}</h3>
                  <p className="product-category">{suggestion.category}</p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={index < Math.floor(suggestion.rating) ? 'star filled' : 'star'}>⭐</span>
                      ))}
                    </div>
                    <span className="rating-count">({suggestion.reviewCount})</span>
                  </div>
                  
                  <div className="product-price">
                    <span className="current-price">${suggestion.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaintGeorgeSuggestions;