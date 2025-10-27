import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeCategories.css';

const SaintGeorgeCategories = () => {
  const { language } = useLanguage();
  const { categories } = useData();
  // Map category slugs to their corresponding images
  const categoryImages = {
    'fresh-produce': getImagePath('/unsplashqvkaqtnj4zki518-br8h-300w.png'),
    'meat-poultry': getImagePath('/unsplashxgffjkspknki518-pzl-300w.png'),
    'seafood': getImagePath('/unsplashkraq7kfg7i8i518-ggk8-300w.png'),
    'dairy-cheese': getImagePath('/unsplashx4zrlinfdqgi518-gny-300w.png'),
    'bakery-sweets': getImagePath('/unsplashltcybocukgci518-wnjq-300w.png'),
    'spices-seasonings': getImagePath('/unsplashqvkaqtnj4zki518-br8h-300w.png'),
    'canned-foods': getImagePath('/unsplashjxz2ggdbefwi518-wly6-300w.png'),
    'frozen-foods': getImagePath('/unsplashl8pjwy8n2jai518-iwnn-300h.png'),
    'beverages': getImagePath('/unsplashlwicl8bu4ei518-ur9p-300h.png'),
    'nuts-seeds': getImagePath('/unsplashltcybocukgci518-wnjq-300w.png'),
    'vegetables': getImagePath('/unsplashqvkaqtnj4zki518-br8h-300w.png')
  };

  // Map category slugs to their corresponding icon images
  const categoryIcons = {
    'fresh-produce': getImagePath('/ellipse14i518-3ai-300h.png'),
    'meat-poultry': getImagePath('/ellipse14i518-achh-300h.png'),
    'seafood': getImagePath('/ellipse14i518-klg-300h.png'),
    'dairy-cheese': getImagePath('/ellipse14i518-y5av-300h.png'),
    'bakery-sweets': getImagePath('/ellipse14i518-vhu-300h.png'),
    'spices-seasonings': getImagePath('/ellipse14i518-3ai-300h.png'),
    'canned-foods': getImagePath('/ellipse14i518-2f3l-300h.png'),
    'frozen-foods': getImagePath('/ellipse14i518-4i9-300h.png'),
    'beverages': getImagePath('/ellipse14i518-tw8t-300h.png'),
    'nuts-seeds': getImagePath('/ellipse14i518-vhu-300h.png'),
    'vegetables': getImagePath('/ellipse14i518-3ai-300h.png')
  };

  return (
    <div className="saint-george-categories">
      <div className="container">
        <div className="categories-header">
          <h2 className="categories-title">{t('allCategories', language)}</h2>
        </div>
        
        <div className="categories-grid">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`} className="category-card">
              <div className="category-image-container">
                <img
                  src={category.image || categoryImages[category.slug] || getImagePath('/unsplashqvkaqtnj4zki518-br8h-300w.png')}
                  alt={category.name[language]}
                  className="category-image-img"
                />
                <div className="category-overlay">
                  <div className="category-icon">
                    <img
                      src={categoryIcons[category.slug] || getImagePath('/ellipse14i518-3ai-300h.png')}
                      alt={category.name[language]}
                      className="category-icon-image"
                    />
                  </div>
                </div>
              </div>
              
              <div className="category-content">
                <h3 className="category-name">{category.name[language]}</h3>
                <p className="category-description">{category.description[language]}</p>
                <div className="category-stats">
                  <span className="product-count">{category.productCount} {language === 'ar' ? 'منتج' : 'products'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaintGeorgeCategories;