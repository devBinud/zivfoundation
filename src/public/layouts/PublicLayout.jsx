import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../../components/PublicHeader';
import PublicFooter from '../components/PublicFooter/PublicFooter';
import './PublicLayout.css';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <PublicHeader />
      <main className="public-main-content">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
