import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { categories as initialCategories, products as initialProducts } from '../data/sampleData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Load categories from localStorage or use initial data
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem('saint-george-categories');
      return savedCategories ? JSON.parse(savedCategories) : initialCategories;
    } catch (error) {
      console.error('Error loading categories from localStorage:', error);
      return initialCategories;
    }
  });

  // Helper function to get category slug from category name
  const getCategorySlug = (categoryName) => {
    if (!categoryName) return 'unknown';
    
    // Map Arabic category names to slugs
    const categoryMap = {
      'مخبوزات و حلويات': 'bakery-sweets',
      'الألبان و الجبن': 'dairy-cheese',
      'مأكولات بحرية': 'seafood',
      'اللحوم و الدواجن': 'meat-poultry',
      'منتجات طازجة': 'fresh-produce',
      'خضروات': 'vegetables',
      'توابل و بهارات': 'spices-seasonings',
      'معلبات': 'canned-foods',
      'مجمدات': 'frozen-foods',
      'مشروبات': 'beverages',
      'المشروبات': 'beverages',
      'مكسرات و بذور': 'nuts-seeds'
    };
    
    // Try to find in map first
    if (categoryMap[categoryName]) {
      return categoryMap[categoryName];
    }
    
    // Otherwise convert to slug
    return categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\u0600-\u06FFa-z0-9-]/g, '');
  };

  // Load products from localStorage or use initial data
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('saint-george-products');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        // Make sure all products have categorySlug
        const productsWithSlugs = parsed.map(product => ({
          ...product,
          categorySlug: product.categorySlug || getCategorySlug(product.category)
        }));
        return productsWithSlugs;
      }
      // Add categorySlug to initial products
      const productsWithSlugs = initialProducts.map(product => ({
        ...product,
        categorySlug: getCategorySlug(product.category)
      }));
      return productsWithSlugs;
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      const productsWithSlugs = initialProducts.map(product => ({
        ...product,
        categorySlug: getCategorySlug(product.category)
      }));
      return productsWithSlugs;
    }
  });

  // Save categories to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('saint-george-categories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
    }
  }, [categories]);

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('saint-george-products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }, [products]);

  const addCategory = useCallback((newCategory) => {
    const category = {
      id: Date.now(), // Simple ID generation
      name: {
        ar: newCategory.nameAr,
        en: newCategory.nameEn || newCategory.nameAr
      },
      slug: newCategory.slug,
      icon: newCategory.icon || "📦",
      productCount: 0,
      description: {
        ar: newCategory.descriptionAr || `منتجات ${newCategory.nameAr}`,
        en: newCategory.descriptionEn || `Products for ${newCategory.nameEn || newCategory.nameAr}`
      },
      image: newCategory.image
    };

    setCategories(prev => [...prev, category]);
    return category;
  }, []);

  const updateCategory = useCallback((id, updates) => {
    console.log('Updating category with ID:', id, 'Updates:', updates);
    setCategories(prev => {
      const updated = prev.map(category => 
        category.id === id ? { ...category, ...updates } : category
      );
      console.log('Categories after update:', updated);
      return updated;
    });
  }, []);

  const deleteCategory = useCallback((id) => {
    console.log('Deleting category with ID:', id);
    setCategories(prev => {
      const filtered = prev.filter(category => category.id !== id);
      console.log('Categories after deletion:', filtered);
      return filtered;
    });
  }, []);

  const addProduct = useCallback((newProduct) => {
    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      categorySlug: newProduct.categorySlug,
      price: newProduct.price,
      image: newProduct.image,
      description: newProduct.description || '',
      brand: newProduct.brand || '',
      inStock: newProduct.inStock !== false,
      rating: 0,
      reviewCount: 0,
      isNew: true
    };

    console.log('Adding product:', product);
    setProducts(prev => [...prev, product]);
    return product;
  }, []);

  const updateProduct = useCallback((id, updates) => {
    console.log('Updating product with ID:', id, 'Updates:', updates);
    setProducts(prev => {
      const updated = prev.map(product => 
        product.id === id ? { ...product, ...updates } : product
      );
      console.log('Products after update:', updated);
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    console.log('Deleting product with ID:', id);
    setProducts(prev => {
      const filtered = prev.filter(product => product.id !== id);
      console.log('Products after deletion:', filtered);
      return filtered;
    });
  }, []);

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
