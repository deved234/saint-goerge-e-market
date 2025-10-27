import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { products } from '../data/sampleData';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeBestSellers.css';

const SaintGeorgeBestSellers = () => {
  const { language } = useLanguage();
  // Get best selling products from the actual data
  const bestSellers = products
    .filter(product => product.rating >= 4.3 && product.reviewCount >= 100)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section id="best-sellers" className="saint-george-bestsellers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('bestSellersThisWeek', language)}</h2>
          <Link to="/bestsellers" className="see-all-link">{t('viewAll', language)}</Link>
        </div>
        
        <div className="bestsellers-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={getImagePath(product.image)} alt={product.name} className="product-image" />
                  <div className="product-badge">
                    <span className="rating-badge">⭐ {product.rating}</span>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={index < Math.floor(product.rating) ? 'star filled' : 'star'}>⭐</span>
                      ))}
                    </div>
                    <span className="rating-count">({product.reviewCount})</span>
                  </div>
                  
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
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

export default SaintGeorgeBestSellers;