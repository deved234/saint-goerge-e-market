import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import ProductCard from '../components/ProductCard';
import './Suggestions.css';

const Suggestions = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const [sortBy, setSortBy] = useState('recommended');

  // Get recommended products based on various criteria
  const suggestions = useMemo(() => {
    return products
      .filter(product => 
        product.isNew || 
        product.rating >= 4.5 || 
        product.reviewCount >= 150 ||
        product.category === 'منتجات طازجة' ||
        product.category === 'Fresh Produce'
      )
      .sort((a, b) => {
        if (sortBy === 'recommended') {
          // Sort by combination of rating and review count
          const scoreA = (a.rating * 0.7) + (a.reviewCount / 100 * 0.3);
          const scoreB = (b.rating * 0.7) + (b.reviewCount / 100 * 0.3);
          return scoreB - scoreA;
        } else if (sortBy === 'newest') {
          return b.isNew - a.isNew;
        } else if (sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        return 0;
      });
  }, [sortBy]);

  return (
    <div className="suggestions-page">
      <div className="container">
        {/* Header Section */}
        <div className="page-header">
          <h1 className="page-title">{t('suggestions', language)}</h1>
          <p className="page-subtitle">
            {language === 'ar' 
              ? 'منتجات مختارة خصيصاً لك بناءً على تفضيلاتك وتقييمات العملاء' 
              : 'Products specially selected for you based on your preferences and customer ratings'
            }
          </p>
        </div>

        {/* Recommendation Categories */}
        <div className="recommendation-categories">
          <div className="category-card">
            <div className="category-icon">⭐</div>
            <h3 className="category-title">
              {language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}
            </h3>
            <p className="category-desc">
              {language === 'ar' 
                ? 'منتجات حصلت على أعلى التقييمات من عملائنا' 
                : 'Products with the highest ratings from our customers'
              }
            </p>
          </div>
          
          <div className="category-card">
            <div className="category-icon">🆕</div>
            <h3 className="category-title">
              {language === 'ar' ? 'منتجات جديدة' : 'New Products'}
            </h3>
            <p className="category-desc">
              {language === 'ar' 
                ? 'أحدث المنتجات المضافة إلى متجرنا' 
                : 'Latest products added to our store'
              }
            </p>
          </div>
          
          <div className="category-card">
            <div className="category-icon">🔥</div>
            <h3 className="category-title">
              {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
            </h3>
            <p className="category-desc">
              {language === 'ar' 
                ? 'المنتجات الأكثر طلباً من عملائنا' 
                : 'Most requested products from our customers'
              }
            </p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="filters-section">
          <div className="sort-controls">
            <label className="sort-label">{t('sortBy', language)}:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recommended">{language === 'ar' ? 'موصى به' : 'Recommended'}</option>
              <option value="newest">{t('newest', language)}</option>
              <option value="rating">{t('customerRating', language)}</option>
              <option value="price-low">{t('priceLow', language)}</option>
            </select>
          </div>
          
          <div className="results-count">
            {suggestions.length} {language === 'ar' ? 'اقتراح' : 'suggestions'} {language === 'ar' ? 'متاح' : 'available'}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {suggestions.map((product) => (
            <ProductCard key={product.id} product={product} showBadge={true} />
          ))}
        </div>

        {/* Empty State */}
        {suggestions.length === 0 && (
          <div className="empty-state">
            <h3>{language === 'ar' ? 'لا توجد اقتراحات متاحة حالياً' : 'No suggestions available at the moment'}</h3>
            <p>{language === 'ar' ? 'تحقق مرة أخرى قريباً للحصول على اقتراحات جديدة' : 'Check back soon for new suggestions'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;
