import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../data/translations';
import SEO from '../components/SEO';
import { getImagePath } from '../utils/imagePath';
import './Contact.css';

const Contact = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('about');
  
  return (
    <>
      <SEO 
        title={t('contactTitle', language)}
        description={t('contactSubtitle', language)}
        url="/contact"
      />
      <div className="contact-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">{t('homepage', language)}</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">{t('contact', language)}</span>
          </div>

          {/* Contact Header */}
          <div className="contact-header">
            <h1 className="contact-title">{t('contactTitle', language)}</h1>
          </div>

          {/* Tab Navigation */}
          <div className="contact-tabs">
            <button 
              className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              {t('aboutUs', language)}
            </button>
            <button 
              className={`tab-button ${activeTab === 'communications' ? 'active' : ''}`}
              onClick={() => setActiveTab('communications')}
            >
              {t('contacts', language)}
            </button>
            <button 
              className={`tab-button ${activeTab === 'location' ? 'active' : ''}`}
              onClick={() => setActiveTab('location')}
            >
              {t('workingHours', language)}
            </button>
            <button 
              className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              {t('privacyPolicy', language)}
            </button>
          </div>

          {/* Tab Content */}
          <div className="contact-content">
            {/* About Us Tab */}
            {activeTab === 'about' && (
              <div className="tab-content about-content">
                <h2 className="section-title">{t('aboutUs', language)}</h2>
                <div className="about-section">
                  <div className="about-images">
                    <div className="about-image-grid">
                      <img src={getImagePath("/unsplashqvkaqtnj4zki518-br8h-300w.png")} alt="Market 1" className="about-img" />
                      <img src={getImagePath("/unsplashxgffjkspknki518-pzl-300w.png")} alt="Market 2" className="about-img" />
                      <img src={getImagePath("/unsplashkraq7kfg7i8i518-ggk8-300w.png")} alt="Market 3" className="about-img" />
                      <img src={getImagePath("/unsplashx4zrlinfdqgi518-gny-300w.png")} alt="Market 4" className="about-img about-img-large" />
                    </div>
                  </div>
                  <div className="about-text">
                    <p>
                      {language === 'ar' 
                        ? 'مرحباً بكم في سوق سانت جورج، وجهتكم المفضلة للمنتجات الطازجة والعالية الجودة. نحن نفخر بتقديم أفضل المنتجات الغذائية من جميع أنحاء العالم. سوقنا يوفر تجربة تسوق فريدة مع مجموعة واسعة من الخضروات الطازجة، الفواكه، اللحوم، الأسماك، ومنتجات الألبان.'
                        : 'Welcome to Saint George Market, your favorite destination for fresh and high-quality products. We pride ourselves on offering the best food products from around the world. Our market provides a unique shopping experience with a wide range of fresh vegetables, fruits, meats, fish, and dairy products.'
                      }
                    </p>
                    <p>
                      {language === 'ar'
                        ? 'نحن ملتزمون بتوفير أفضل الأسعار وأعلى معايير الجودة. فريقنا المتفاني يعمل على مدار الساعة لضمان رضاكم الكامل. زوروا أحد فروعنا اليوم واكتشفوا الفرق!'
                        : 'We are committed to providing the best prices and highest quality standards. Our dedicated team works around the clock to ensure your complete satisfaction. Visit one of our branches today and discover the difference!'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Communications Tab */}
            {activeTab === 'communications' && (
              <div className="tab-content communications-content">
                <h2 className="section-title">{t('contacts', language)}</h2>
                <div className="contact-info-grid">
                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-details">
                      <h3>{t('phone', language)}</h3>
                      <p>(678) 955-0121</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">📧</div>
                    <div className="info-details">
                      <h3>{t('email', language)}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">📱</div>
                    <div className="info-details">
                      <h3>{language === 'ar' ? 'وسائل التواصل' : 'Social Media'}</h3>
                      <div className="social-links">
                        <a href="#" className="social-link">
                          <img src={getImagePath("/deviconplainfacebook5391-ki0j.svg")} alt="Facebook" />
                        </a>
                        <a href="#" className="social-link">
                          <img src={getImagePath("/materialsymbolslightemail5391-ki0j.svg")} alt="Email" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="tab-content location-content">
                <h2 className="section-title">{language === 'ar' ? 'الموقع و ساعات العمل' : 'Location & Working Hours'}</h2>
                <div className="location-section">
                  <div className="location-info">
                    <div className="info-card">
                      <h3>{t('workingHours', language)}</h3>
                      <p>{language === 'ar' ? 'السبت - الخميس: 8:00 ص - 5:00 م' : 'Saturday - Thursday: 8:00 AM - 5:00 PM'}</p>
                      <p>{language === 'ar' ? 'الجمعة: 9:00 ص - 12:00 م' : 'Friday: 9:00 AM - 12:00 PM'}</p>
                      <p>{language === 'ar' ? 'الأحد: 7:00 ص - 2:00 م' : 'Sunday: 7:00 AM - 2:00 PM'}</p>
                    </div>
                  </div>
                  <div className="location-map">
                    <img src={getImagePath("/photos/logo.PNG")} alt="Saint George Market Location" className="map-image" />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Policy Tab */}
            {activeTab === 'privacy' && (
              <div className="tab-content privacy-content">
                <h2 className="section-title">{t('privacyPolicy', language)}</h2>
                <div className="privacy-text">
                  <p>
                    {language === 'ar'
                      ? 'في سوق سانت جورج، نحن ملتزمون بحماية خصوصيتك وأمان معلوماتك الشخصية. نقوم بجمع المعلومات فقط للأغراض الضرورية لتقديم خدماتنا وتحسين تجربة التسوق الخاصة بك. نحن لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك الصريحة.'
                      : 'At Saint George Market, we are committed to protecting your privacy and the security of your personal information. We collect information only for the purposes necessary to provide our services and improve your shopping experience. We do not share your information with third parties without your explicit consent.'
                    }
                  </p>
                  <p>
                    {language === 'ar'
                      ? 'نستخدم تدابير أمنية صارمة لحماية بياناتك من الوصول غير المصرح به. جميع المعاملات تتم عبر قنوات آمنة ومشفرة. لديك الحق في الوصول إلى معلوماتك الشخصية وتعديلها أو حذفها في أي وقت.'
                      : 'We use strict security measures to protect your data from unauthorized access. All transactions are conducted through secure and encrypted channels. You have the right to access, modify, or delete your personal information at any time.'
                    }
                  </p>
                  <p>
                    {language === 'ar'
                      ? 'لمزيد من المعلومات حول سياسة الخصوصية لدينا أو إذا كان لديك أي أسئلة، يرجى الاتصال بنا عبر البريد الإلكتروني أو الهاتف. نحن هنا لخدمتك وضمان راحتك التامة عند التسوق معنا.'
                      : 'For more information about our privacy policy or if you have any questions, please contact us via email or phone. We are here to serve you and ensure your complete peace of mind when shopping with us.'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;