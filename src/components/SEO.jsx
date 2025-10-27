import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  lang = 'ar'
}) => {
  const siteName = 'Saint George Market';
  const defaultTitle = 'سوق سانت جورج - Saint George Market';
  const defaultDescription = 'Saint George Market - أفضل متجر للبقالة والأطعمة الطازجة عالية الجودة';
  const defaultKeywords = 'متجر, بقالة, طعام طازج, سوق سانت جورج, Saint George Market';
  const defaultImage = '/og-image.jpg';
  const siteUrl = 'https://saintgeorgemarket.com';

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="language" content={lang} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_SA' : 'en_US'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#D04251" />
      <meta name="msapplication-TileColor" content="#D04251" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />
      
      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="ar" href={seoUrl} />
      <link rel="alternate" hrefLang="en" href={`${seoUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={seoUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": seoDescription,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-50-123-4567",
            "contactType": "customer service"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "King Fahd Street",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
          },
          "sameAs": [
            "https://facebook.com/saintgeorgemarket",
            "https://instagram.com/saintgeorgemarket"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;