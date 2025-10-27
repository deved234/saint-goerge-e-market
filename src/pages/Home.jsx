import React from 'react';
import SaintGeorgeHero from '../components/SaintGeorgeHero';
import SaintGeorgeCategories from '../components/SaintGeorgeCategories';
import SaintGeorgeBestSellers from '../components/SaintGeorgeBestSellers';
import SaintGeorgeOffers from '../components/SaintGeorgeOffers';
import SaintGeorgeSuggestions from '../components/SaintGeorgeSuggestions';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <SaintGeorgeHero />
      <SaintGeorgeCategories />
      <SaintGeorgeBestSellers />
      <SaintGeorgeOffers />
      <SaintGeorgeSuggestions />
    </div>
  );
};

export default Home;