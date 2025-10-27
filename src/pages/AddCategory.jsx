import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { useData } from '../contexts/DataContext';
import './AddCategory.css';

const AddCategory = () => {
  const [mode, setMode] = useState('add'); // 'add' or 'edit'
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categoryNameAr, setCategoryNameAr] = useState('');
  const [categoryNameEn, setCategoryNameEn] = useState('');
  const [categoryDescriptionAr, setCategoryDescriptionAr] = useState('');
  const [categoryDescriptionEn, setCategoryDescriptionEn] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { language } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const navigate = useNavigate();

  const isRTL = language === 'ar';

  // Load category data when selected for editing
  useEffect(() => {
    if (mode === 'edit' && selectedCategoryId) {
      const category = categories.find(cat => cat.id === parseInt(selectedCategoryId));
      if (category) {
        setCategoryNameAr(category.name.ar || '');
        setCategoryNameEn(category.name.en || '');
        setCategoryDescriptionAr(category.description.ar || '');
        setCategoryDescriptionEn(category.description.en || '');
        setImagePreview(category.image || '');
        setCategoryImage(null);
      }
    } else if (mode === 'add') {
      // Reset form for add mode
      setSelectedCategoryId('');
      setCategoryNameAr('');
      setCategoryNameEn('');
      setCategoryDescriptionAr('');
      setCategoryDescriptionEn('');
      setImagePreview('');
      setCategoryImage(null);
    }
  }, [mode, selectedCategoryId, categories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!categoryNameAr.trim()) {
      showError(isRTL ? 'يرجى إدخال اسم القسم' : 'Please enter category name');
      return;
    }

    if (!categoryNameEn.trim()) {
      showError(isRTL ? 'يرجى إدخال اسم القسم بالإنجليزية' : 'Please enter category name in English');
      return;
    }


    if (mode === 'add' && !categoryImage && !imagePreview) {
      showError(isRTL ? 'يرجى إضافة صورة للقسم' : 'Please add category image');
      return;
    }

    if (mode === 'edit' && !selectedCategoryId) {
      showError(isRTL ? 'يرجى اختيار قسم للتعديل' : 'Please select a category to edit');
      return;
    }

    // Create slug from English name
    const slug = categoryNameEn
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    if (mode === 'add') {
      // Create new category object
      const newCategory = {
        nameAr: categoryNameAr.trim(),
        nameEn: categoryNameEn.trim(),
        slug: slug,
        icon: "📦",
        image: imagePreview,
        descriptionAr: categoryDescriptionAr.trim() || `منتجات ${categoryNameAr.trim()}`,
        descriptionEn: categoryDescriptionEn.trim() || `Products for ${categoryNameEn.trim()}`
      };

      // Add category to context
      addCategory(newCategory);

      // Show success message
      showSuccess(isRTL ? 'تم إضافة القسم بنجاح!' : 'Category added successfully!');
    } else {
      // Update existing category
      const category = categories.find(cat => cat.id === parseInt(selectedCategoryId));
      if (!category) {
        showError(isRTL ? 'القسم غير موجود' : 'Category not found');
        return;
      }

      const updatedCategory = {
        ...category,
        name: {
          ar: categoryNameAr.trim(),
          en: categoryNameEn.trim()
        },
        description: {
          ar: categoryDescriptionAr.trim() || `منتجات ${categoryNameAr.trim()}`,
          en: categoryDescriptionEn.trim() || `Products for ${categoryNameEn.trim()}`
        },
        icon: "📦",
        image: imagePreview || category.image,
        slug: slug
      };

      updateCategory(selectedCategoryId, updatedCategory);
      showSuccess(isRTL ? 'تم تحديث القسم بنجاح!' : 'Category updated successfully!');
    }

    // Clear form
    setCategoryNameAr('');
    setCategoryNameEn('');
    setCategoryDescriptionAr('');
    setCategoryDescriptionEn('');
    setCategoryIcon('');
    setCategoryImage(null);
    setImagePreview('');
    setSelectedCategoryId('');
    setMode('add');

    // Navigate back to admin home after a short delay
    setTimeout(() => {
      navigate('/admin-home');
    }, 1500);
  };

  const handleDelete = () => {
    setCategoryImage(null);
    setImagePreview(null);
  };

  const handleDeleteCategory = () => {
    if (!selectedCategoryId) {
      showError(isRTL ? 'يرجى اختيار قسم للحذف' : 'Please select a category to delete');
      return;
    }

    if (window.confirm(isRTL ? 'هل أنت متأكد من حذف هذا القسم؟' : 'Are you sure you want to delete this category?')) {
      deleteCategory(selectedCategoryId);
      showSuccess(isRTL ? 'تم حذف القسم بنجاح!' : 'Category deleted successfully!');
      
      // Reset form
      setSelectedCategoryId('');
      setCategoryNameAr('');
      setCategoryNameEn('');
      setCategoryDescriptionAr('');
      setCategoryDescriptionEn('');
      setImagePreview('');
      setCategoryImage(null);
      setMode('add');
      
      setTimeout(() => {
        navigate('/admin-home');
      }, 1500);
    }
  };

  return (
    <div className="add-category-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="add-category-container">
        <div className="page-header">
          <button className="back-button" onClick={() => navigate('/admin-home')}>
            {isRTL ? '→' : '←'}
          </button>
          <h1 className="page-title">
            {mode === 'add' ? (isRTL ? 'إضافة قسم جديد' : 'Add New Category') : (isRTL ? 'تعديل القسم' : 'Edit Category')}
          </h1>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="mode-toggle">
          <button 
            type="button"
            className={`mode-btn ${mode === 'add' ? 'active' : ''}`}
            onClick={() => setMode('add')}
          >
            {isRTL ? 'إضافة قسم جديد' : 'Add New Category'}
          </button>
          <button 
            type="button"
            className={`mode-btn ${mode === 'edit' ? 'active' : ''}`}
            onClick={() => setMode('edit')}
          >
            {isRTL ? 'تعديل قسم موجود' : 'Edit Existing Category'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-category-form">
          {/* Category Selection for Edit Mode */}
          {mode === 'edit' && (
            <div className="form-section">
              <label className="form-label">
                {isRTL ? 'اختر القسم للتعديل:' : 'Select Category to Edit:'}
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="form-select"
                required
              >
                <option value="">
                  {isRTL ? '-- اختر القسم --' : '-- Select Category --'}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name[language]} ({category.name.ar} / {category.name.en})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Name Arabic */}
          <div className="form-section">
            <label className="form-label">
              {isRTL ? 'اسم القسم (عربي):' : 'Category Name (Arabic):'}
            </label>
            <input
              type="text"
              value={categoryNameAr}
              onChange={(e) => setCategoryNameAr(e.target.value)}
              className="form-input"
              placeholder={isRTL ? 'أدخل اسم القسم بالعربية' : 'Enter category name in Arabic'}
              required
            />
          </div>

          {/* Category Name English */}
          <div className="form-section">
            <label className="form-label">
              {isRTL ? 'اسم القسم (إنجليزي):' : 'Category Name (English):'}
            </label>
            <input
              type="text"
              value={categoryNameEn}
              onChange={(e) => setCategoryNameEn(e.target.value)}
              className="form-input"
              placeholder={isRTL ? 'أدخل اسم القسم بالإنجليزية' : 'Enter category name in English'}
              required
            />
          </div>

          {/* Category Description Arabic */}
          <div className="form-section">
            <label className="form-label">
              {isRTL ? 'وصف القسم (عربي):' : 'Category Description (Arabic):'}
            </label>
            <textarea
              value={categoryDescriptionAr}
              onChange={(e) => setCategoryDescriptionAr(e.target.value)}
              className="form-textarea"
              placeholder={isRTL ? 'أدخل وصف القسم بالعربية' : 'Enter category description in Arabic'}
              rows="3"
            />
          </div>

          {/* Category Description English */}
          <div className="form-section">
            <label className="form-label">
              {isRTL ? 'وصف القسم (إنجليزي):' : 'Category Description (English):'}
            </label>
            <textarea
              value={categoryDescriptionEn}
              onChange={(e) => setCategoryDescriptionEn(e.target.value)}
              className="form-textarea"
              placeholder={isRTL ? 'أدخل وصف القسم بالإنجليزية' : 'Enter category description in English'}
              rows="3"
            />
          </div>


          {/* Category Image */}
          <div className="form-section">
            <label className="form-label">
              {isRTL ? 'صورة القسم:' : 'Category Image:'}
            </label>
            <div className="image-upload-area">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Category preview" />
                  <button
                    type="button"
                    className="delete-image-btn"
                    onClick={handleDelete}
                  >
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
          <div className="action-buttons">
            <button type="submit" className="submit-btn">
              {mode === 'add' ? (isRTL ? 'إضافة القسم' : 'Add Category') : (isRTL ? 'حفظ التعديلات' : 'Save Changes')}
            </button>
            {mode === 'edit' && (
              <button type="button" className="delete-btn" onClick={handleDeleteCategory}>
                {isRTL ? 'حذف القسم' : 'Delete Category'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;

