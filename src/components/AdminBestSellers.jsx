import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import './SaintGeorgeBestSellers.css';

const AdminBestSellers = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const navigate = useNavigate();
  
  // Get best selling products
  const bestSellers = products
    .filter(product => product.rating >= 4.3 && product.reviewCount >= 100)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section id="best-sellers" className="saint-george-bestsellers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('bestSellersThisWeek', language)}</h2>
          <div className="admin-header-actions">
            <Link to="/bestsellers" className="see-all-link">{t('viewAll', language)}</Link>
            <button 
              className="admin-edit-btn"
              onClick={() => navigate('/admin/manage-bestsellers')}
            >
              ✏️ {language === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          </div>
        </div>
        
        <div className="bestsellers-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-badge">
                    <span className="rating-badge">⭐ {product.rating}</span>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {'⭐'.repeat(Math.round(product.rating))}
                    </div>
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                  
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    {product.discount && <span className="discount-badge">-{product.discount}%</span>}
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

export default AdminBestSellers;

