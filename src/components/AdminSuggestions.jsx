import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import './SaintGeorgeSuggestions.css';

const AdminSuggestions = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const navigate = useNavigate();
  
  // Get suggested products
  const suggestions = products
    .filter(product => 
      product.isNew || 
      product.rating >= 4.5 || 
      product.reviewCount >= 150 ||
      product.category === 'منتجات طازجة' ||
      product.category === 'Fresh Produce'
    )
    .slice(0, 6);

  return (
    <section id="suggestions" className="saint-george-suggestions">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('recommendations', language)}</h2>
          <div className="admin-header-actions">
            <Link to="/suggestions" className="see-all-link">{t('viewAll', language)}</Link>
            <button 
              className="admin-edit-btn"
              onClick={() => navigate('/admin/manage-suggestions')}
            >
              ✏️ {language === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          </div>
        </div>
        
        <div className="suggestions-grid">
          {suggestions.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  {product.isNew && (
                    <div className="new-badge">{language === 'ar' ? 'جديد' : 'New'}</div>
                  )}
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

export default AdminSuggestions;

