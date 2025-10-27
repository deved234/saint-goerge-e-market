import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useData } from '../contexts/DataContext';
import './ManageProducts.css';

const ManageProducts = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { categories, products, addProduct, updateProduct, deleteProduct } = useData();
  
  const [mode, setMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productInStock, setProductInStock] = useState(true);

  const isRTL = language === 'ar';
  const category = categories.find(cat => cat.slug === slug);
  
  console.log('Current slug:', slug);
  console.log('All products:', products);
  console.log('Products with categorySlug:', products.map(p => ({ id: p.id, name: p.name, categorySlug: p.categorySlug })));
  
  const categoryProducts = products.filter(p => p.categorySlug === slug);
  console.log('Filtered products for this category:', categoryProducts);

  // Load product data when selected for editing
  useEffect(() => {
    if (mode === 'edit' && selectedProductId) {
      const product = products.find(p => p.id === parseInt(selectedProductId));
      if (product) {
        setProductName(product.name);
        setProductPrice(product.price.toString());
        setProductDescription(product.description || '');
        setProductBrand(product.brand || '');
        setProductInStock(product.inStock !== false);
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
      setProductInStock(true);
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

    // Validation
    if (!productName.trim()) {
      showError(isRTL ? 'يرجى إدخال اسم المنتج' : 'Please enter product name');
      return;
    }

    if (!productPrice || parseFloat(productPrice) <= 0) {
      showError(isRTL ? 'يرجى إدخال سعر صحيح' : 'Please enter a valid price');
      return;
    }

    if (mode === 'add' && !productImage && !imagePreview) {
      showError(isRTL ? 'يرجى إضافة صورة للمنتج' : 'Please add product image');
      return;
    }

    if (mode === 'add') {
      // Create new product object
      const newProduct = {
        name: productName.trim(),
        price: parseFloat(productPrice),
        description: productDescription.trim(),
        brand: productBrand.trim(),
        inStock: productInStock,
        image: imagePreview,
        categorySlug: slug,
        category: category.name[language]
      };

      addProduct(newProduct);
      showSuccess(isRTL ? 'تم إضافة المنتج بنجاح!' : 'Product added successfully!');
      setMode('list');
    } else if (mode === 'edit') {
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
        inStock: productInStock,
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
    setProductInStock(true);
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

  if (!category) {
    return (
      <div className="manage-products-page">
        <div className="error-message">
          <h2>{isRTL ? 'القسم غير موجود' : 'Category not found'}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-products-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="manage-products-container">
        {/* Header */}
        <div className="page-header">
          <button className="back-button" onClick={() => navigate(`/category/${slug}`)}>
            {isRTL ? '→' : '←'}
          </button>
          <h1 className="page-title">
            {isRTL ? `إدارة منتجات ${category.name.ar}` : `Manage ${category.name.en} Products`}
          </h1>
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
              {isRTL ? `المنتجات (${categoryProducts.length})` : `Products (${categoryProducts.length})`}
            </h2>
            {categoryProducts.length === 0 ? (
              <div className="empty-state">
                <p>{isRTL ? 'لا توجد منتجات في هذا القسم' : 'No products in this category'}</p>
                <button className="add-first-btn" onClick={() => setMode('add')}>
                  {isRTL ? 'إضافة أول منتج' : 'Add First Product'}
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-item-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-item-info">
                      <h3 className="product-item-name">{product.name}</h3>
                      <p className="product-item-price">${product.price}</p>
                      <p className="product-item-brand">{product.brand}</p>
                      <p className="product-item-stock">
                        {product.inStock ? (isRTL ? 'متوفر' : 'In Stock') : (isRTL ? 'غير متوفر' : 'Out of Stock')}
                      </p>
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

export default ManageProducts;

