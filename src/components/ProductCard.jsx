import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Eye } from 'lucide-react';
import LazyImage from './LazyImage';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import { categories } from '../data/sampleData';
import { getImagePath } from '../utils/imagePath';
import './ProductCard.css';

const ProductCard = React.memo(({ product }) => {
  const { language } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);


  const renderStars = useMemo(() => {
    return (rating) => Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < rating ? 'star filled' : 'star'}
      />
    ));
  }, []);

  return (
    <motion.div 
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <LazyImage 
            src={getImagePath(product.image)} 
            alt={product.name}
            className="product-image"
          />
          <div className="product-badge">
            {product.discount && <span className="discount-badge">-{product.discount}%</span>}
            {product.isNew && <span className="new-badge">{t('new', language)}</span>}
          </div>
          <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
            <button 
              className="action-btn like-btn"
              onClick={handleLike}
              title="Add to Wishlist"
            >
              <Heart size={16} className={isLiked ? 'liked' : ''} />
            </button>
            <button 
              className="action-btn view-btn"
              title="Quick View"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">
            {categories.find(cat => cat.name.ar === product.category || cat.name.en === product.category)?.name[language] || product.category}
          </p>
          
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-count">({product.reviewCount})</span>
          </div>
          
          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;