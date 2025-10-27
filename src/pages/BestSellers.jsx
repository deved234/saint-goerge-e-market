import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import ProductCard from '../components/ProductCard';
import './BestSellers.css';

const BestSellers = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const [sortBy, setSortBy] = useState('rating');

  // Get best selling products (products with highest ratings and review counts)
  const bestSellers = useMemo(() => {
    return products
      .filter(product => product.rating >= 4.3 && product.reviewCount >= 100)
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (sortBy === 'reviews') {
          return b.reviewCount - a.reviewCount;
        } else if (sortBy === 'price-low') {
          return a.price - b.price;
        } else if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [sortBy]);

  return (
    <div className="bestsellers-page">
      <div className="container">
        {/* Header Section */}
        <div className="page-header">
          <h1 className="page-title">{t('bestSellersThisWeek', language)}</h1>
          <p className="page-subtitle">
            {language === 'ar' 
              ? 'اكتشف المنتجات الأكثر مبيعاً والأعلى تقييماً من عملائنا' 
              : 'Discover our best-selling and highest-rated products from our customers'
            }
          </p>
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
              <option value="rating">{t('customerRating', language)}</option>
              <option value="reviews">{t('reviews', language)}</option>
              <option value="price-low">{t('priceLow', language)}</option>
              <option value="price-high">{t('priceHigh', language)}</option>
            </select>
          </div>
          
          <div className="results-count">
            {bestSellers.length} {language === 'ar' ? 'منتج' : 'products'} {language === 'ar' ? 'موجود' : 'found'}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {bestSellers.length === 0 && (
          <div className="empty-state">
            <h3>{t('noProducts', language)}</h3>
            <p>{t('noProductsDesc', language)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
