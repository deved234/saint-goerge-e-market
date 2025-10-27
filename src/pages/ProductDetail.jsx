import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/sampleData';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { getImagePath } from '../utils/imagePath';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>{t('productNotFound', language)}</h2>
        <p>{t('productNotFoundDesc', language)}</p>
        <Link to="/products" className="btn btn-primary">{t('backToProducts', language)}</Link>
      </div>
    );
  }

  // Product images - using multiple images for gallery
  const productImages = [
    getImagePath(product.image),
    getImagePath("/unsplashx4zrlinfdqgi518-gny-300w.png"),
    getImagePath("/unsplashkraq7kfg7i8i518-ggk8-300w.png"),
    getImagePath("/unsplashltcybocukgci518-wnjq-300w.png")
  ];
  
  // Find category for display
  const productCategory = categories.find(cat => 
    cat.name.ar === product.category || cat.name.en === product.category
  );

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">{t('homepage', language)}</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <Link to="/products" className="breadcrumb-link">{t('allCategories', language)}</Link>
          <span className="breadcrumb-separator">&gt;</span>
          {productCategory && (
            <>
              <Link to={`/category/${productCategory.slug}`} className="breadcrumb-link">
                {productCategory.name[language]}
              </Link>
              <span className="breadcrumb-separator">&gt;</span>
            </>
          )}
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        {/* Product Content */}
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images-section">
            <div className="main-image-container">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="main-product-image"
              />
            </div>
            
            <div className="thumbnail-images">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail-container ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-price-badge">
              <span className="price-amount">${product.price.toFixed(2)}</span>
            </div>
            
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <span className="meta-label">{t('category', language)}:</span>
              <span className="meta-value">
                {productCategory ? productCategory.name[language] : product.category}
              </span>
            </div>
            
            <div className="product-description-section">
              <h3 className="description-title">{t('description', language)}:</h3>
              <p className="description-text">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;