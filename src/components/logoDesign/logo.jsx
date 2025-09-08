import React from 'react';
import './logo.css';

export const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-icon">
        <div className="logo-mountain"></div>
        <div className="logo-calendar"></div>
      </div>
      <div className="logo-text">
        <span className="logo-text-main">ProEvent</span>
        <span className="logo-text-tagline">Digital Office Solutions</span>
      </div>
    </div>
  );
};
