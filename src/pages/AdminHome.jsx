import React from 'react';
import AdminHero from '../components/AdminHero';
import AdminCategories from '../components/AdminCategories';
import AdminBestSellers from '../components/AdminBestSellers';
import AdminOffers from '../components/AdminOffers';
import AdminSuggestions from '../components/AdminSuggestions';
import './AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <AdminHero />
      <AdminCategories />
      <AdminBestSellers />
      <AdminOffers />
      <AdminSuggestions />
    </div>
  );
};

export default AdminHome;

