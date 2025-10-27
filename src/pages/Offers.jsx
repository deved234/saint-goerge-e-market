import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import ProductCard from '../components/ProductCard';
import './Offers.css';

const Offers = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const [sortBy, setSortBy] = useState('discount');

  // Get products with discounts and special offers
  const offers = useMemo(() => {
    return products
      .filter(product => product.discount || product.isNew)
      .sort((a, b) => {
        if (sortBy === 'discount') {
          return (b.discount || 0) - (a.discount || 0);
        } else if (sortBy === 'price-low') {
          return a.price - b.price;
        } else if (sortBy === 'price-high') {
          return b.price - a.price;
        } else if (sortBy === 'newest') {
          return b.isNew - a.isNew;
        }
        return 0;
      });
  }, [sortBy]);

  return (
    <div className="offers-page">
      <div className="container">
        {/* Header Section */}
        <div className="page-header">
          <h1 className="page-title">{t('offers', language)}</h1>
          <p className="page-subtitle">
            {language === 'ar' 
              ? 'اكتشف أفضل العروض والخصومات على منتجاتنا المختارة' 
              : 'Discover the best offers and discounts on our selected products'
            }
          </p>
        </div>

        {/* Special Banner */}
        <div className="special-banner">
          <div className="banner-content">
            <h2 className="banner-title">
              {language === 'ar' ? 'خصم يصل إلى 50%' : 'Up to 50% Off'}
            </h2>
            <p className="banner-subtitle">
              {language === 'ar' 
                ? 'على مجموعة مختارة من المنتجات الطازجة' 
                : 'On selected fresh products'
              }
            </p>
          </div>
          <div className="banner-image">
            <img src={getImagePath('/unsplashx4zrlinfdqgi518-gny-300w.png')} alt="Special Offer" />
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
              <option value="discount">{language === 'ar' ? 'أعلى خصم' : 'Highest Discount'}</option>
              <option value="price-low">{t('priceLow', language)}</option>
              <option value="price-high">{t('priceHigh', language)}</option>
              <option value="newest">{t('newest', language)}</option>
            </select>
          </div>
          
          <div className="results-count">
            {offers.length} {language === 'ar' ? 'عرض' : 'offers'} {language === 'ar' ? 'متاح' : 'available'}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {offers.map((product) => (
            <ProductCard key={product.id} product={product} showDiscount={true} />
          ))}
        </div>

        {/* Empty State */}
        {offers.length === 0 && (
          <div className="empty-state">
            <h3>{language === 'ar' ? 'لا توجد عروض متاحة حالياً' : 'No offers available at the moment'}</h3>
            <p>{language === 'ar' ? 'تحقق مرة أخرى قريباً للحصول على عروض جديدة' : 'Check back soon for new offers'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
