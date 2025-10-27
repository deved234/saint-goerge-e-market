import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useData } from '../contexts/DataContext';
import './ManageProducts.css';

const ManageSpecialSection = () => {
  const location = useLocation();
  const section = location.pathname.split('/').pop(); // 'bestsellers', 'offers', 'suggestions'
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  
  const [mode, setMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productRating, setProductRating] = useState('4.5');
  const [productReviewCount, setProductReviewCount] = useState('100');
  const [productInStock, setProductInStock] = useState(true);
  const [productDiscount, setProductDiscount] = useState('');
  const [productIsNew, setProductIsNew] = useState(false);

  const isRTL = language === 'ar';

  // Get section title and filter criteria
  const getSectionInfo = () => {
    switch (section) {
      case 'manage-bestsellers':
        return {
          title: isRTL ? 'إدارة الأكثر مبيعاً' : 'Manage Best Sellers',
          filter: (p) => (p.rating || 0) >= 4.3 && (p.reviewCount || 0) >= 100
        };
      case 'manage-offers':
        return {
          title: isRTL ? 'إدارة العروض' : 'Manage Offers',
          filter: (p) => p.discount || p.isNew || p.originalPrice
        };
      case 'manage-suggestions':
        return {
          title: isRTL ? 'إدارة المقترحات' : 'Manage Suggestions',
          filter: (p) => p.isNew || (p.rating || 0) >= 4.5 || (p.reviewCount || 0) >= 150 || 
                        p.category === 'منتجات طازجة' || p.category === 'Fresh Produce'
        };
      default:
        return { 
          title: isRTL ? 'إدارة المنتجات' : 'Manage Products', 
          filter: () => true 
        };
    }
  };

  const { title, filter } = getSectionInfo();
  const sectionProducts = products.filter(filter);

  // Load product data when selected for editing
  useEffect(() => {
    if (mode === 'edit' && selectedProductId) {
      const product = products.find(p => p.id === parseInt(selectedProductId));
      if (product) {
        setProductName(product.name);
        setProductPrice(product.price.toString());
        setProductDescription(product.description || '');
        setProductBrand(product.brand || '');
        setProductCategory(product.category || '');
        setProductRating((product.rating || 4.5).toString());
        setProductReviewCount((product.reviewCount || 100).toString());
        setProductInStock(product.inStock !== false);
        setProductDiscount(product.discount ? product.discount.toString() : '');
        setProductIsNew(product.isNew || false);
        setImagePreview(product.image || '');
        setProductImage(null);
      }
    } else if (mode === 'add') {
      // Reset form for add mode
      setSelectedProductId('');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductBrand('');
      setProductCategory('');
      setProductRating('4.5');
      setProductReviewCount('100');
      setProductInStock(true);
      setProductDiscount('');
      setProductIsNew(false);
      setImagePreview('');
      setProductImage(null);
    }
  }, [mode, selectedProductId, products]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProductImage(null);
    setImagePreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      showError(isRTL ? 'يرجى إدخال اسم المنتج' : 'Please enter product name');
      return;
    }

    if (!productPrice || parseFloat(productPrice) <= 0) {
      showError(isRTL ? 'يرجى إدخال سعر صحيح' : 'Please enter a valid price');
      return;
    }

    if (!imagePreview) {
      showError(isRTL ? 'يرجى إضافة صورة للمنتج' : 'Please add a product image');
      return;
    }

    if (!productCategory.trim()) {
      showError(isRTL ? 'يرجى إدخال فئة المنتج' : 'Please enter product category');
      return;
    }

    if (mode === 'add') {
      const newProduct = {
        id: Date.now(),
        name: productName.trim(),
        price: parseFloat(productPrice),
        description: productDescription.trim(),
        image: imagePreview,
        brand: productBrand.trim(),
        category: productCategory.trim(),
        categorySlug: productCategory.toLowerCase().replace(/\s+/g, '-'),
        rating: parseFloat(productRating) || 4.5,
        reviewCount: parseInt(productReviewCount) || 100,
        inStock: productInStock,
        discount: productDiscount ? parseInt(productDiscount) : undefined,
        originalPrice: productDiscount ? parseFloat(productPrice) * (1 + parseInt(productDiscount)/100) : undefined,
        isNew: productIsNew
      };

      addProduct(newProduct);
      showSuccess(isRTL ? 'تم إضافة المنتج بنجاح!' : 'Product added successfully!');
      setMode('list');
    } else if (mode === 'edit') {
      if (!selectedProductId) {
        showError(isRTL ? 'يرجى اختيار منتج للتعديل' : 'Please select a product to edit');
        return;
      }

      const product = products.find(p => p.id === parseInt(selectedProductId));
      if (!product) {
        showError(isRTL ? 'المنتج غير موجود' : 'Product not found');
        return;
      }

      const updatedProduct = {
        ...product,
        name: productName.trim(),
        price: parseFloat(productPrice),
        description: productDescription.trim(),
        brand: productBrand.trim(),
        category: productCategory.trim(),
        categorySlug: productCategory.toLowerCase().replace(/\s+/g, '-'),
        rating: parseFloat(productRating) || 4.5,
        reviewCount: parseInt(productReviewCount) || 100,
        inStock: productInStock,
        discount: productDiscount ? parseInt(productDiscount) : undefined,
        originalPrice: productDiscount ? parseFloat(productPrice) * (1 + parseInt(productDiscount)/100) : undefined,
        isNew: productIsNew,
        image: imagePreview || product.image
      };

      updateProduct(parseInt(selectedProductId), updatedProduct);
      showSuccess(isRTL ? 'تم تحديث المنتج بنجاح!' : 'Product updated successfully!');
      setMode('list');
    }

    // Reset form
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductBrand('');
    setProductCategory('');
    setProductRating('4.5');
    setProductReviewCount('100');
    setProductInStock(true);
    setProductDiscount('');
    setProductIsNew(false);
    setImagePreview('');
    setProductImage(null);
    setSelectedProductId('');
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm(isRTL ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      showSuccess(isRTL ? 'تم حذف المنتج بنجاح!' : 'Product deleted successfully!');
    }
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId.toString());
    setMode('edit');
  };

  return (
    <div className="manage-products-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="manage-products-container">
        {/* Header */}
        <div className="page-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            {isRTL ? '→' : '←'}
          </button>
          <h1 className="page-title">{title}</h1>
        </div>

        {/* Mode Buttons */}
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${mode === 'list' ? 'active' : ''}`}
            onClick={() => setMode('list')}
          >
            {isRTL ? 'قائمة المنتجات' : 'Products List'}
          </button>
          <button 
            className={`mode-btn ${mode === 'add' ? 'active' : ''}`}
            onClick={() => setMode('add')}
          >
            {isRTL ? 'إضافة منتج' : 'Add Product'}
          </button>
        </div>

        {/* Products List */}
        {mode === 'list' && (
          <div className="products-list">
            <h2 className="section-title">
              {isRTL ? `المنتجات (${sectionProducts.length})` : `Products (${sectionProducts.length})`}
            </h2>
            {sectionProducts.length === 0 ? (
              <div className="empty-state">
                <p>{isRTL ? 'لا توجد منتجات في هذا القسم' : 'No products in this section'}</p>
                <p style={{marginTop: '16px', color: '#666'}}>
                  {isRTL ? 'اضغط على "إضافة منتج" لإضافة منتجات جديدة' : 'Click "Add Product" to add new products'}
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {sectionProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-item-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-item-info">
                      <h3 className="product-item-name">{product.name}</h3>
                      <p className="product-item-price">${product.price}</p>
                      <p className="product-item-brand">{product.brand}</p>
                      <p className="product-item-category">{product.category}</p>
                      <p className="product-item-rating">⭐ {product.rating} ({product.reviewCount})</p>
                      <p className="product-item-stock">
                        {product.inStock ? (isRTL ? 'متوفر' : 'In Stock') : (isRTL ? 'غير متوفر' : 'Out of Stock')}
                      </p>
                      {product.discount && (
                        <p className="product-item-discount">
                          {isRTL ? 'خصم' : 'Discount'}: {product.discount}%
                        </p>
                      )}
                      {product.isNew && (
                        <p className="product-item-new">
                          {isRTL ? '🆕 جديد' : '🆕 New'}
                        </p>
                      )}
                    </div>
                    <div className="product-item-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        ✏️ {isRTL ? 'تعديل' : 'Edit'}
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        🗑️ {isRTL ? 'حذف' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Form */}
        {(mode === 'add' || mode === 'edit') && (
          <div className="product-form-container">
            <h2 className="section-title">
              {mode === 'add' 
                ? (isRTL ? 'إضافة منتج جديد' : 'Add New Product')
                : (isRTL ? 'تعديل المنتج' : 'Edit Product')
              }
            </h2>
            
            <form onSubmit={handleSubmit} className="product-form">
              {/* Product Selection (Edit mode only) */}
              {mode === 'edit' && (
                <div className="form-group">
                  <label className="form-label">
                    {isRTL ? 'اختر المنتج للتعديل:' : 'Select Product to Edit:'}
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">
                      {isRTL ? '-- اختر المنتج --' : '-- Select Product --'}
                    </option>
                    {sectionProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Product Name */}
              <div className="form-group">
                <label className="form-label">
                  {isRTL ? 'اسم المنتج:' : 'Product Name:'}
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="form-input"
                  placeholder={isRTL ? 'أدخل اسم المنتج' : 'Enter product name'}
                  required
                />
              </div>

              {/* Product Price */}
              <div className="form-group">
                <label className="form-label">
                  {isRTL ? 'السعر ($):' : 'Price ($):'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="form-input"
                  placeholder={isRTL ? 'أدخل السعر' : 'Enter price'}
                  required
                />
              </div>

              {/* Product Category */}
              <div className="form-group">
                <label className="form-label">
                  {isRTL ? 'الفئة:' : 'Category:'}
                </label>
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="form-input"
                  placeholder={isRTL ? 'أدخل فئة المنتج' : 'Enter product category'}
                  required
                />
              </div>

              {/* Product Brand */}
              <div className="form-group">
                <label className="form-label">
                  {isRTL ? 'العلامة التجارية:' : 'Brand:'}
                </label>
                <input
                  type="text"
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  className="form-input"
                  placeholder={isRTL ? 'أدخل العلامة التجارية' : 'Enter brand name'}
                />
              </div>

              {/* Product Description */}
              <div className="form-group">
                <label className="form-label">
                  {isRTL ? 'الوصف:' : 'Description:'}
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="form-textarea"
                  placeholder={isRTL ? 'أدخل وصف المنتج' : 'Enter product description'}
                  rows="3"
                />
              </div>

              {/* Rating and Reviews */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {isRTL ? 'التقييم:' : 'Rating:'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={productRating}
                    onChange={(e) => setProductRating(e.target.value)}
                    className="form-input"
                    placeholder="4.5"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {isRTL ? 'عدد المراجعات:' : 'Review Count:'}
                  </label>
                  <input
                    type="number"
                    value={productReviewCount}
                    onChange={(e) => setProductReviewCount(e.target.value)}
                    className="form-input"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Discount and New Flag */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {isRTL ? 'نسبة الخصم (%):' : 'Discount (%):'}
                  </label>
                  <input
                    type="number"
                    value={productDiscount}
                    onChange={(e) => setProductDiscount(e.target.value)}
                    className="form-input"
                    placeholder={isRTL ? 'أدخل نسبة الخصم' : 'Enter discount percentage'}
                  />
                </div>

                <div className="form-group">
                  <label className="form-checkbox">
                    <input
                      type="checkbox"
                      checked={productIsNew}
                      onChange={(e) => setProductIsNew(e.target.checked)}
                    />
                    <span>{isRTL ? 'منتج جديد' : 'New Product'}</span>
                  </label>
                </div>
              </div>

              {/* In Stock */}
              <div className="form-group">
                <label className="form-checkbox">
                  <input
                    type="checkbox"
                    checked={productInStock}
                    onChange={(e) => setProductInStock(e.target.checked)}
                  />
                  <span>{isRTL ? 'المنتج متوفر' : 'Product in stock'}</span>
                </label>
              </div>

              {/* Product Image */}
              <div className="form-group">
                <label className="form-label">
                  {isRTL ? 'صورة المنتج:' : 'Product Image:'}
                </label>
                <div className="image-upload-area">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button type="button" onClick={handleDeleteImage} className="delete-image-btn">
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="upload-placeholder">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-icon">+</div>
                      <span className="upload-text">
                        {isRTL ? 'إضافة صورة' : 'Add Image'}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {mode === 'add' 
                    ? (isRTL ? 'إضافة المنتج' : 'Add Product')
                    : (isRTL ? 'حفظ التعديلات' : 'Save Changes')
                  }
                </button>
                <button type="button" className="cancel-btn" onClick={() => setMode('list')}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSpecialSection;
