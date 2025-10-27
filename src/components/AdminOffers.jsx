import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import './SaintGeorgeOffers.css';

const AdminOffers = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const navigate = useNavigate();
  
  // Get products with discount
  const offers = products
    .filter(product => product.discount || product.isNew)
    .slice(0, 6);

  return (
    <section id="offers" className="saint-george-offers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('specialOffers', language)}</h2>
          <div className="admin-header-actions">
            <Link to="/offers" className="see-all-link">{t('viewAll', language)}</Link>
            <button 
              className="admin-edit-btn"
              onClick={() => navigate('/admin/manage-offers')}
            >
              ✏️ {language === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          </div>
        </div>
        
        <div className="offers-grid">
          {offers.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  {product.discount && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  
                  <div className="product-footer">
                    <div className="price-info">
                      <span className="product-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
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

export default AdminOffers;

