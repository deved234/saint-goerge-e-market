import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { products } from '../data/sampleData';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeOffers.css';

const SaintGeorgeOffers = () => {
  const { language } = useLanguage();
  // Get products with discounts and special offers
  const offers = products
    .filter(product => product.discount || product.isNew)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 3);

  return (
    <section id="offers" className="saint-george-offers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('offers', language)}</h2>
          <Link to="/offers" className="see-all-link">{t('viewAll', language)}</Link>
        </div>
        
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="product-card">
              <Link to={`/product/${offer.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={getImagePath(offer.image)} alt={offer.name} className="product-image" />
                  <div className="product-badge">
                    {offer.discount ? (
                      <span className="discount-badge">-{offer.discount}%</span>
                    ) : (
                      <span className="new-badge">{t('new', language)}</span>
                    )}
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{offer.name}</h3>
                  <p className="product-category">{offer.category}</p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={index < Math.floor(offer.rating) ? 'star filled' : 'star'}>⭐</span>
                      ))}
                    </div>
                    <span className="rating-count">({offer.reviewCount})</span>
                  </div>
                  
                  <div className="product-price">
                    {offer.discount && (
                      <span className="original-price">${offer.price}</span>
                    )}
                    <span className="current-price">
                      ${offer.discount ? (offer.price * (1 - offer.discount / 100)).toFixed(2) : offer.price}
                    </span>
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

export default SaintGeorgeOffers;