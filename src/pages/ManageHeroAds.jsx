import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useData } from '../contexts/DataContext';
import { t } from '../data/translations';
import './ManageHeroAds.css';

const ManageHeroAds = () => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const navigate = useNavigate();

  const [mode, setMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productNameAr, setProductNameAr] = useState('');
  const [productNameEn, setProductNameEn] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productInStock, setProductInStock] = useState(true);
  const [productRating, setProductRating] = useState('');
  const [productReviewCount, setProductReviewCount] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [productIsNew, setProductIsNew] = useState(false);

  // Get hero products (products with discount or isNew)
  const heroProducts = products.filter(product => product.discount || product.isNew);

  useEffect(() => {
    if (mode === 'edit' && selectedProductId) {
      const product = products.find(p => p.id === parseInt(selectedProductId));
      if (product) {
        setProductNameAr(product.name.ar || '');
        setProductNameEn(product.name.en || '');
        setProductPrice(product.price.toString());
        setProductDescription(product.description || '');
        setProductImagePreview(product.image || '');
        setProductBrand(product.brand || '');
        setProductInStock(product.inStock !== false);
        setProductRating(product.rating?.toString() || '');
        setProductReviewCount(product.reviewCount?.toString() || '');
        setProductDiscount(product.discount?.toString() || '');
        setProductIsNew(product.isNew || false);
      }
    } else if (mode === 'add') {
      // Reset form for add mode
      setProductNameAr('');
      setProductNameEn('');
      setProductPrice('');
      setProductDescription('');
      setProductImage(null);
      setProductImagePreview('');
      setProductBrand('');
      setProductInStock(true);
      setProductRating('');
      setProductReviewCount('');
      setProductDiscount('');
      setProductIsNew(false);
    }
  }, [mode, selectedProductId, products]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProductImage(null);
    setProductImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productNameAr.trim() || !productNameEn.trim() || !productPrice.trim()) {
      showToast(t('fillRequiredFields', language), 'error');
      return;
    }

    const productData = {
      name: {
        ar: productNameAr.trim(),
        en: productNameEn.trim()
      },
      price: parseFloat(productPrice),
      description: productDescription.trim(),
      brand: productBrand.trim(),
      inStock: productInStock,
      rating: productRating ? parseFloat(productRating) : 0,
      reviewCount: productReviewCount ? parseInt(productReviewCount) : 0,
      discount: productDiscount ? parseInt(productDiscount) : 0,
      isNew: productIsNew,
      image: productImagePreview,
      category: 'Hero Ads',
      categorySlug: 'hero-ads'
    };

    try {
      if (mode === 'add') {
        await addProduct(productData);
        showToast(t('productAddedSuccessfully', language), 'success');
      } else if (mode === 'edit') {
        await updateProduct(parseInt(selectedProductId), productData);
        showToast(t('productUpdatedSuccessfully', language), 'success');
      }
      
      setMode('list');
    } catch (error) {
      showToast(t('errorOccurred', language), 'error');
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        await deleteProduct(parseInt(selectedProductId));
        showToast(t('productDeletedSuccessfully', language), 'success');
        setMode('list');
        setSelectedProductId('');
      } catch (error) {
        showToast(t('errorOccurred', language), 'error');
      }
    }
  };

  return (
    <div className="manage-hero-ads-page">
      <div className="manage-hero-ads-container">
        <div className="page-header">
          <h1 className="page-title">
            {language === 'ar' ? 'إدارة إعلانات الصفحة الرئيسية' : 'Manage Hero Ads'}
          </h1>
          <p className="page-description">
            {language === 'ar' 
              ? 'إضافة وتعديل وحذف المنتجات المعروضة في الإعلانات الرئيسية'
              : 'Add, edit, and delete products displayed in hero advertisements'
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${mode === 'list' ? 'active' : ''}`}
            onClick={() => setMode('list')}
          >
            {language === 'ar' ? 'قائمة المنتجات' : 'Products List'}
          </button>
          <button 
            className={`mode-btn ${mode === 'add' ? 'active' : ''}`}
            onClick={() => setMode('add')}
          >
            {language === 'ar' ? 'إضافة منتج' : 'Add Product'}
          </button>
          <button 
            className={`mode-btn ${mode === 'edit' ? 'active' : ''}`}
            onClick={() => setMode('edit')}
          >
            {language === 'ar' ? 'تعديل منتج' : 'Edit Product'}
          </button>
        </div>

        {/* Products List */}
        {mode === 'list' && (
          <div className="products-list">
            <h2 className="section-title">
              {language === 'ar' ? 'منتجات الإعلانات' : 'Hero Products'} ({heroProducts.length})
            </h2>
            
            {heroProducts.length === 0 ? (
              <div className="no-products">
                <p>{language === 'ar' ? 'لا توجد منتجات في الإعلانات' : 'No products in hero ads'}</p>
              </div>
            ) : (
              <div className="products-grid">
                {heroProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name[language]} />
                      {product.discount && (
                        <div className="discount-badge">-{product.discount}%</div>
                      )}
                      {product.isNew && !product.discount && (
                        <div className="new-badge">
                          {language === 'ar' ? 'جديد' : 'NEW'}
                        </div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name[language]}</h3>
                      <p className="product-price">${product.price}</p>
                      <div className="product-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            setSelectedProductId(product.id.toString());
                            setMode('edit');
                          }}
                        >
                          {language === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => {
                            if (window.confirm(language === 'ar' ? 'هل تريد حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
                              deleteProduct(product.id);
                              showToast(t('productDeletedSuccessfully', language), 'success');
                            }
                          }}
                        >
                          {language === 'ar' ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Form */}
        {(mode === 'add' || mode === 'edit') && (
          <form className="hero-ads-form" onSubmit={handleSubmit}>
            <h2 className="form-title">
              {mode === 'add' 
                ? (language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')
                : (language === 'ar' ? 'تعديل المنتج' : 'Edit Product')
              }
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'} *
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={productNameAr}
                  onChange={(e) => setProductNameAr(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'} *
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={productNameEn}
                  onChange={(e) => setProductNameEn(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'السعر' : 'Price'} *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {language === 'ar' ? 'وصف المنتج' : 'Product Description'}
              </label>
              <textarea
                className="form-textarea"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'التقييم' : 'Rating'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="form-input"
                  value={productRating}
                  onChange={(e) => setProductRating(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'عدد المراجعات' : 'Review Count'}
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={productReviewCount}
                  onChange={(e) => setProductReviewCount(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'خصم (%)' : 'Discount (%)'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="form-input"
                  value={productDiscount}
                  onChange={(e) => setProductDiscount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'ar' ? 'متوفر في المخزن' : 'In Stock'}
                </label>
                <select
                  className="form-input"
                  value={productInStock}
                  onChange={(e) => setProductInStock(e.target.value === 'true')}
                >
                  <option value="true">{language === 'ar' ? 'متوفر' : 'Available'}</option>
                  <option value="false">{language === 'ar' ? 'غير متوفر' : 'Out of Stock'}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={productIsNew}
                  onChange={(e) => setProductIsNew(e.target.checked)}
                />
                <span className="checkmark"></span>
                {language === 'ar' ? 'منتج جديد' : 'New Product'}
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                {language === 'ar' ? 'صورة المنتج' : 'Product Image'}
              </label>
              <div className="image-upload-area">
                {productImagePreview ? (
                  <div className="image-preview">
                    <img src={productImagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="delete-image-btn"
                      onClick={handleDeleteImage}
                    >
                      {language === 'ar' ? 'حذف الصورة' : 'Delete Image'}
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <p className="upload-text">
                      {language === 'ar' ? 'اضغط لرفع صورة' : 'Click to upload image'}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setMode('list')}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="submit-btn"
              >
                {mode === 'add' 
                  ? (language === 'ar' ? 'إضافة المنتج' : 'Add Product')
                  : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                }
              </button>
              {mode === 'edit' && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={handleDeleteProduct}
                >
                  {language === 'ar' ? 'حذف المنتج' : 'Delete Product'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageHeroAds;
