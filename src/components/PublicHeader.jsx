import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoZf from '../assets/logo_zf.png';
import '../styles/header.css';

const translations = {
  EN: {
    helpline: 'Helpline: 104 / 1800-ZIV-BLOOD',
    home: 'Home',
    about: 'About Us',
    aboutZf: 'About Ziv Foundation',
    impact: 'Impact & Network',
    contact: 'Contact & Support',
    looking: 'Looking for Blood',
    availability: 'Blood Availability Search',
    directory: 'Blood Centre Directory',
    emergency: 'Emergency Request',
    donate: 'Want to Donate',
    register: 'Donor Registration',
    camps: 'Donation Camps Search',
    eligibility: 'Eligibility Guidelines',
    login: 'Blood Centre Login',
    adminLogin: 'Admin & Official Login',
    partnerLogin: 'Partner Hospital Portal',
    tickerLabel: 'Rakt Parivar Abhiyaan',
    tickerText: 'Contribute to saving valuable lives - Donate blood, join this noble cause of humanity | Download Ziv Blood Mobile App for instant live stock & emergency donor requests | Helpline: 1800-ZIV-BLOOD',
  },
  AS: {
    home: 'Home',
    about: 'About Us',
    aboutZf: 'About Ziv Foundation',
    impact: 'Impact & Network',
    contact: 'Contact & Support',
    looking: 'Looking for Blood',
    availability: 'Blood Availability Search',
    directory: 'Blood Centre Directory',
    emergency: 'Emergency Request',
    donate: 'Want to Donate',
    register: 'Donor Registration',
    camps: 'Donation Camps Search',
    eligibility: 'Eligibility Guidelines',
    login: 'Blood Centre Login',
    adminLogin: 'Admin & Official Login',
    partnerLogin: 'Partner Hospital Portal',
    tickerLabel: 'ৰক্ত পৰিয়াল অভিযান',
    tickerText: 'বহুমূলীয়া জীৱন ৰক্ষাৰ বাবে ৰক্তদান কৰক — মানৱতাৰ এই পবিত্ৰ কাৰ্য্যত যোগ দিয়ক | জীয়াই থকাৰ বাবে জিভ এপ ডাউনলোড কৰক | হেল্পলাইন: ১০৪ / ১৮০০-ZIV-BLOOD',
  }
};

const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lang, setLang] = useState('EN');
  const [mobileAccordion, setMobileAccordion] = useState({});
  const location = useLocation();
  const dropdownRef = useRef(null);

  const t = translations[lang] || translations.EN;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu & dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const toggleMobileAccordion = (name) => {
    setMobileAccordion(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <header className="rakt-header-wrapper" ref={dropdownRef}>
      <div className="simple-navbar-container">
        {/* Brand Group */}
        <Link to="/" className="portal-brand-item" onClick={closeDropdown}>
          <img src={logoZf} alt="Ziv Foundation Logo" className="portal-logo-img" />
          <div className="portal-title-group">
            <span className="portal-name">Ziv Foundation</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav-menu">
          {/* Home Link */}
          <li className="nav-item-cell">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `simple-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeDropdown}
            >
              {t.home}
            </NavLink>
          </li>

          {/* About Us Dropdown */}
          <li
            className={`nav-item-cell dropdown-parent ${activeDropdown === 'about' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="simple-nav-link dropdown-trigger"
              onClick={() => toggleDropdown('about')}
              aria-expanded={activeDropdown === 'about'}
            >
              <span>{t.about}</span>
              <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="dropdown-menu-box">
              <Link to="/about" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.aboutZf}
              </Link>
              <Link to="/about#impact" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.impact}
              </Link>
              <Link to="/contact" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.contact}
              </Link>
            </div>
          </li>

          {/* Looking for Blood Dropdown */}
          <li
            className={`nav-item-cell dropdown-parent ${activeDropdown === 'looking' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('looking')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="simple-nav-link dropdown-trigger"
              onClick={() => toggleDropdown('looking')}
              aria-expanded={activeDropdown === 'looking'}
            >
              <span>{t.looking}</span>
              <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="dropdown-menu-box">
              <Link to="/#search" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.availability}
              </Link>
              <Link to="/#directory" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.directory}
              </Link>
              <Link to="/contact#request" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.emergency}
              </Link>
            </div>
          </li>

          {/* Want to Donate Dropdown */}
          <li
            className={`nav-item-cell dropdown-parent ${activeDropdown === 'donate' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('donate')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="simple-nav-link dropdown-trigger"
              onClick={() => toggleDropdown('donate')}
              aria-expanded={activeDropdown === 'donate'}
            >
              <span>{t.donate}</span>
              <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="dropdown-menu-box">
              <Link to="/register?role=donor" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.register}
              </Link>
              <Link to="/#camps" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.camps}
              </Link>
              <Link to="/about#guidelines" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.eligibility}
              </Link>
            </div>
          </li>

          {/* Blood Centre Login Dropdown */}
          <li
            className={`nav-item-cell dropdown-parent ${activeDropdown === 'login' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('login')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="simple-nav-link dropdown-trigger highlight-portal-link"
              onClick={() => toggleDropdown('login')}
              aria-expanded={activeDropdown === 'login'}
            >
              <span>{t.login}</span>
              <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className="dropdown-menu-box right-aligned">
              <Link to="/login" className="dropdown-menu-item" onClick={closeDropdown}>
                Public Account Login
              </Link>
              <Link to="/admin/login" className="dropdown-menu-item" onClick={closeDropdown}>
                {t.adminLogin}
              </Link>
            </div>
          </li>
        </ul>

        {/* Right Utilities: Contact Us CTA & Mobile Toggle */}
        <div className="navbar-right-utilities">
          <Link to="/contact" className="navbar-cta-btn">
            Contact us
          </Link>

          <button
            className="rakt-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 3. Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">

          <div className="mobile-menu-list">
            <NavLink to="/" end className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t.home}
            </NavLink>

            {/* Mobile Accordion: About */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('about')}>
                <span>{t.about}</span>
                <span className="acc-icon">{mobileAccordion['about'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['about'] && (
                <div className="mobile-accordion-body">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>• {t.aboutZf}</Link>
                  <Link to="/about#impact" onClick={() => setMobileMenuOpen(false)}>• {t.impact}</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>• {t.contact}</Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Looking for Blood */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('looking')}>
                <span>{t.looking}</span>
                <span className="acc-icon">{mobileAccordion['looking'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['looking'] && (
                <div className="mobile-accordion-body">
                  <Link to="/#search" onClick={() => setMobileMenuOpen(false)}>• {t.availability}</Link>
                  <Link to="/#directory" onClick={() => setMobileMenuOpen(false)}>• {t.directory}</Link>
                  <Link to="/contact#request" onClick={() => setMobileMenuOpen(false)}>• {t.emergency}</Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Want to Donate */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('donate')}>
                <span>{t.donate}</span>
                <span className="acc-icon">{mobileAccordion['donate'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['donate'] && (
                <div className="mobile-accordion-body">
                  <Link to="/register?role=donor" onClick={() => setMobileMenuOpen(false)}>• {t.register}</Link>
                  <Link to="/#camps" onClick={() => setMobileMenuOpen(false)}>• {t.camps}</Link>
                  <Link to="/about#guidelines" onClick={() => setMobileMenuOpen(false)}>• {t.eligibility}</Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Blood Centre Login */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('login')}>
                <span>{t.login}</span>
                <span className="acc-icon">{mobileAccordion['login'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['login'] && (
                <div className="mobile-accordion-body">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>• Public Account Login</Link>
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>• {t.adminLogin}</Link>
                </div>
              )}
            </div>

            <div className="mobile-portal-login-cta">
              <Link to="/login" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                🔐 {t.login}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
