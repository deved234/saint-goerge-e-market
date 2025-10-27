import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sortOptions, priceRanges } from '../data/sampleData';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import './Category.css';

const Category = () => {
  const { language } = useLanguage();
  const { categories } = useData();
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const { products: allProducts } = useData();
  const category = categories.find(cat => cat.slug === slug);
  
  
  let products = allProducts?.filter(p => p.categorySlug === slug) || [];

  if (!category) {
    return (
      <div className="category-not-found">
        <h2>{language === 'ar' ? 'الفئة غير موجودة' : 'Category not found'}</h2>
        <p>{language === 'ar' ? 'الفئة التي تبحث عنها غير موجودة.' : 'The category you are looking for does not exist.'}</p>
        <Link to="/" className="btn btn-primary">{t('backToHome', language)}</Link>
      </div>
    );
  }

  // Apply price filter
  if (priceRange !== 'all') {
    const range = priceRanges.find(r => r.label === priceRange);
    if (range) {
      products = products.filter(product => 
        product.price >= range.min && product.price <= range.max
      );
    }
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-low':
      products = [...products].sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products = [...products].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products = [...products].sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      products = [...products].sort((a, b) => b.isNew - a.isNew);
      break;
    case 'name':
      products = [...products].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
      break;
    default:
      // Keep original order for 'featured'
      break;
  }

  return (
    <div className="category-page">
      {/* Header */}
      <div className="category-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">{t('homepage', language)}</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">{category.name[language]}</span>
          </div>
          
          <div className="category-info">
            <div className="category-title-section">
              <span className="category-icon">{category.icon}</span>
              <h1 className="category-title">{category.name[language]}</h1>
              <p className="category-description">{category.description[language]}</p>
            </div>
            <div className="category-stats">
              <span className="product-count">{products.length} {t('productLabel', language)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="category-controls">
        <div className="container">
          <div className="controls-content">
            <div className="filters-section">
              <button 
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>{t('filterProducts', language)}</span>
                <span className={`filter-arrow ${showFilters ? 'open' : ''}`}>▼</span>
              </button>
              
              {showFilters && (
                <div className="filters-dropdown">
                  <div className="filter-group">
                    <label className="filter-label">{t('priceRange', language)}:</label>
                    <select 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">{t('allPrices', language)}</option>
                      {priceRanges.map((range, index) => (
                        <option key={index} value={range.label}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="sort-section">
              <label className="sort-label">{t('sortByLabel', language)}</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="category-products">
        <div className="container">
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-content">
                <span className="no-products-icon">🔍</span>
                <h3>{t('noProducts', language)}</h3>
                <p>{t('noProductsDesc', language)}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setPriceRange('all');
                    setSortBy('featured');
                  }}
                >
                  {t('resetFilters', language)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Categories */}
      <div className="category-footer">
        <div className="container">
          <Link to="/" className="back-to-categories">
            ← {language === 'ar' ? 'العودة إلى جميع الأقسام' : 'Back to All Categories'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;