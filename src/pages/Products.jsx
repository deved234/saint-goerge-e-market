import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, priceRanges, sortOptions } from '../data/sampleData';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import './Products.css';

const Products = () => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    priceRange: '',
    sortBy: 'featured',
    inStock: false,
    onSale: false
  });

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // On sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.originalPrice);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [filters]);


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priceRange: '',
      sortBy: 'featured',
      inStock: false,
      onSale: false
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.priceRange) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    return count;
  };

  return (
    <div className="products-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className="products-header">
          <div className="breadcrumb">
            <span>{t('homepage', language)}</span>
            <span>/</span>
            <span>{t('products', language)}</span>
          </div>
          <h1>{t('allProducts', language)}</h1>
          <p>{t('discoverProducts', language)}</p>
        </div>

        <div className="products-content">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="filters-header">
              <h3>{t('filters', language)}</h3>
              <button 
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="filters-content">
              {/* Search */}
              <div className="filter-group">
                <label>{t('search', language)}</label>
                <div className="search-input-container">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder={t('searchProducts', language)}
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="filter-group">
                <label>{t('category', language)}</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">{t('allCategories', language)}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name.ar}>
                      {category.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label>{t('priceRange', language)}</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">{t('allPrices', language)}</option>
                  {priceRanges.map(range => (
                    <option key={range.label} value={range.label}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="filter-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                  <span>{t('inStockOnly', language)}</span>
                </label>
              </div>

              <div className="filter-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                  />
                  <span>{t('onSale', language)}</span>
                </label>
              </div>

              {/* Clear Filters */}
              {getActiveFiltersCount() > 0 && (
                <button className="clear-filters" onClick={clearFilters}>
                  {t('clearAllFilters', language)}
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="results-info">
                <span>{filteredProducts.length} {t('productsFound', language)}</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="active-filters">
                    ({getActiveFiltersCount()} {t('filtersApplied', language)})
                  </span>
                )}
              </div>

              <div className="toolbar-actions">
                <button
                  className="filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} />
                  {t('filters', language)}
                  {getActiveFiltersCount() > 0 && (
                    <span className="filter-count">{getActiveFiltersCount()}</span>
                  )}
                </button>

                <div className="sort-group">
                  <label>{t('sortByLabel', language)}</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`products-container ${viewMode}`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-products">
                  <h3>{t('noProductsFound', language)}</h3>
                  <p>{t('tryAdjustingFilters', language)}</p>
                  <button className="btn btn-primary" onClick={clearFilters}>
                    {t('resetFilters', language)}
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;