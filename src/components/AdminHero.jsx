import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { useData } from '../contexts/DataContext';
import { getImagePath } from '../utils/imagePath';
import './SaintGeorgeHero.css';

const AdminHero = () => {
  const { language } = useLanguage();
  const { products } = useData();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);


  // Get offer products for the slider
  const offerProducts = (products && Array.isArray(products))
    ? products
        .filter(product => product && (product.discount || product.isNew))
        .sort((a, b) => (b.discount || 0) - (a.discount || 0))
        .slice(0, 6)
    : []; // Show up to 6 offer products

  // Define different slides with offer products
  const slides = offerProducts.length > 0 
    ? offerProducts.map((product, index) => ({
        id: product.id,
        product: product,
        title: product.name,
        subtitle: product.description || `${product.category} - ${language === 'ar' ? 'عرض خاص' : 'Special Offer'}`,
        mainImage: product.image,
        secondaryImage: "/e1930ec6555e442f8646b2636ee70c22removebgpreview25329-x4p-500h.png",
        bgColor: product.discount 
          ? "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)" 
          : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
      }))
    : [{
        id: 'default',
        product: {
          id: 'default',
          name: language === 'ar' ? 'منتج افتراضي' : 'Default Product',
          category: language === 'ar' ? 'عام' : 'General',
          price: 0,
          rating: 0,
          reviewCount: 0,
          discount: 0,
          isNew: false,
          image: '/default-product.png'
        },
        title: language === 'ar' ? 'منتج افتراضي' : 'Default Product',
        subtitle: language === 'ar' ? 'لا توجد منتجات متاحة' : 'No products available',
        mainImage: '/default-product.png',
        secondaryImage: "/e1930ec6555e442f8646b2636ee70c22removebgpreview25329-x4p-500h.png",
        bgColor: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
      }];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleEditAds = () => {
    navigate('/admin/manage-hero-ads');
  };

  const currentSlideData = slides[currentSlide] || slides[0];

  return (
    <div className="saint-george-hero admin-hero">
      {/* Edit Button */}
      <div className="hero-edit-controls">
        <button 
          className="edit-hero-btn"
          onClick={handleEditAds}
          title={language === 'ar' ? 'تعديل الإعلانات' : 'Edit Ads'}
        >
          <span className="edit-icon">✏️</span>
          <span className="edit-text">
            {language === 'ar' ? 'تعديل الإعلانات' : 'Edit Ads'}
          </span>
        </button>
      </div>

      <div 
        className="hero-background"
        style={{ background: currentSlideData.bgColor }}
      >
        <img
          src={getImagePath("/rectangle555329-w7np.svg")}
          alt="Background decoration"
          className="hero-bg-rectangle-1"
        />
        <img
          src={getImagePath("/rectangle555329-rnef.svg")}
          alt="Background decoration"
          className="hero-bg-rectangle-2"
        />
      </div>

      <div className="hero-content">
        {/* Modern Product Card Design */}
        <div className="hero-product-card">
          <div className="product-image-container-hero">
            <img
              src={getImagePath(currentSlideData.mainImage)}
              alt={currentSlideData.title}
              className="product-hero-image"
            />
            {currentSlideData.product.discount && (
              <div className="discount-badge-hero">
                -{currentSlideData.product.discount}%
              </div>
            )}
            {currentSlideData.product.isNew && !currentSlideData.product.discount && (
              <div className="new-badge-hero">
                {language === 'ar' ? 'جديد' : 'NEW'}
              </div>
            )}
          </div>
          
          <div className="product-info-hero">
            <h1 className="product-title-hero">
              {currentSlideData.title}
            </h1>
            <p className="product-category-hero">
              {currentSlideData.product.category}
            </p>
            
            <div className="product-rating-hero">
              <div className="stars-hero">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={index < Math.floor(currentSlideData.product.rating) ? 'star-hero filled' : 'star-hero'}>★</span>
                ))}
              </div>
              <span className="rating-count-hero">({currentSlideData.product.reviewCount})</span>
            </div>
            
            <div className="product-price-hero">
              {currentSlideData.product.discount && (
                <span className="original-price-hero">${currentSlideData.product.price}</span>
              )}
              <span className="current-price-hero">
                ${currentSlideData.product.discount 
                  ? (currentSlideData.product.price * (1 - currentSlideData.product.discount / 100)).toFixed(2)
                  : currentSlideData.product.price
                }
              </span>
            </div>
            
            <Link to={`/product/${currentSlideData.product.id}`} className="shop-now-btn-hero">
              {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="hero-navigation">
        <button className="nav-btn prev-btn" onClick={goToPrevious}>
          <span>‹</span>
        </button>
        <button className="nav-btn next-btn" onClick={goToNext}>
          <span>›</span>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHero;
