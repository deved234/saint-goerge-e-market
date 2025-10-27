import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'subscribe'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const { language } = useLanguage();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const isRTL = language === 'ar';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginEmail.trim()) {
      showError(isRTL ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email');
      return;
    }
    
    if (!loginPassword.trim()) {
      showError(isRTL ? 'يرجى إدخال كلمة المرور' : 'Please enter your password');
      return;
    }

    // Here you would normally make an API call to authenticate
    // For now, just show success message
    showSuccess(isRTL ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
    
    // Clear form
    setLoginEmail('');
    setLoginPassword('');
    setRememberPassword(false);
    
    // Redirect to admin home after successful login
    setTimeout(() => {
      navigate('/admin-home');
    }, 1500);
  };

  return (
    <div className="admin-login-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="login-container">
        <div className="login-card">
          {/* Tabs */}
          <div className="login-tabs">
            <button
              className={`tab-button ${activeTab === 'subscribe' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscribe')}
            >
              {isRTL ? 'اشتراك' : 'Subscribe'}
            </button>
            <button
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              {isRTL ? 'تسجيل الدخول' : 'Login'}
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="login-form-container">
              <h1 className="login-title">
                {isRTL ? 'مرحباً بعودتك!' : 'Welcome Back!'}
              </h1>
              <p className="login-subtitle">
                {isRTL ? 'قم بتسجيل الدخول لإدارة الفئات والمنتجات والعروض' : 'Log in to manage categories, products, and offers'}
              </p>

              <form onSubmit={handleLoginSubmit} className="login-form">
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    {isRTL ? 'أدخل ايميل المشرف الخاص بك' : 'Enter your admin email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={isRTL ? 'الايميل الخاص بك' : 'Your email'}
                    className="form-input"
                  />
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    {isRTL ? 'أدخل كلمة مرور المشرف الخاصة بك' : 'Enter your admin password'}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={isRTL ? 'كلمة المرور الخاصة بك' : 'Your password'}
                    className="form-input"
                  />
                </div>

                {/* Remember Password & Forgot Password */}
                <div className="form-options">
                  <a href="#" className="forgot-link">
                    {isRTL ? 'هل نسيت كلمة السر؟' : 'Forgot password?'}
                  </a>
                  <label className="remember-checkbox">
                    <input
                      type="checkbox"
                      checked={rememberPassword}
                      onChange={(e) => setRememberPassword(e.target.checked)}
                    />
                    <span>{isRTL ? 'تذكر' : 'Remember'}</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                  {isRTL ? 'تسجيل الدخول' : 'Login'}
                </button>

                {/* New Customer Link */}
                <p className="new-customer-text">
                  {isRTL ? 'مشترك جديد؟' : 'New customer?'}{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('subscribe')}
                    className="subscribe-link"
                  >
                    {isRTL ? 'اشتراك' : 'Subscribe'}
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* Subscribe Tab Content */}
          {activeTab === 'subscribe' && (
            <div className="subscribe-container">
              <h1 className="login-title">
                {isRTL ? 'إنشاء حساب جديد' : 'Create New Account'}
              </h1>
              <p className="login-subtitle">
                {isRTL ? 'قريباً...' : 'Coming soon...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

