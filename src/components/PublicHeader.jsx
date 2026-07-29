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
    helpline: 'হেল্পলাইন: ১০৪ / ১৮০০-ZIV-BLOOD',
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
      {/* 1. Top Header Bar */}
      <div className="top-emblem-bar">
        <div className="top-emblem-container">
          <div className="emblem-brand-group">
            <Link to="/" className="portal-brand-item" onClick={closeDropdown}>
              <img src={logoZf} alt="Ziv Foundation Logo" className="portal-logo-img" />
              <div className="portal-title-group">
                <span className="portal-name">Ziv Foundation</span>
              </div>
            </Link>
          </div>

          {/* Top Right Utilities */}
          <div className="top-utilities-group">
            {/* Language Switcher Pill (English & অসমীয়া) */}
            <div className="lang-switcher-pill" role="radiogroup" aria-label="Select Language">
              <button
                type="button"
                className={`lang-btn ${lang === 'EN' ? 'active' : ''}`}
                onClick={() => setLang('EN')}
                title="English"
              >
                English
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'AS' ? 'active' : ''}`}
                onClick={() => setLang('AS')}
                title="অসমীয়া (Assamese)"
              >
                অসমীয়া
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
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
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="main-maroon-navbar">
        <div className="main-navbar-container">
          <ul className="desktop-nav-menu">
            {/* Home Link */}
            <li className="nav-item-cell">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `maroon-nav-link ${isActive ? 'active' : ''}`}
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
                className="maroon-nav-link dropdown-trigger"
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
                className="maroon-nav-link dropdown-trigger"
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
                className="maroon-nav-link dropdown-trigger"
                onClick={() => toggleDropdown('donate')}
                aria-expanded={activeDropdown === 'donate'}
              >
                <span>{t.donate}</span>
                <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="dropdown-menu-box">
                <Link to="/contact#donor-register" className="dropdown-menu-item" onClick={closeDropdown}>
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
                className="maroon-nav-link dropdown-trigger highlight-portal-link"
                onClick={() => toggleDropdown('login')}
                aria-expanded={activeDropdown === 'login'}
              >
                <span>{t.login}</span>
                <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="dropdown-menu-box right-aligned">
                <Link to="/admin/login" className="dropdown-menu-item" onClick={closeDropdown}>
                  {t.adminLogin}
                </Link>
                <Link to="/admin/login" className="dropdown-menu-item" onClick={closeDropdown}>
                  {t.partnerLogin}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* 3. Ticker Announcement Bar */}
      <div className="announcement-ticker-bar">
        <div className="ticker-container">
          <div className="ticker-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="pulse-indicator">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span>{t.tickerLabel}</span>
          </div>
          <div className="ticker-marquee-wrapper">
            <div className="ticker-marquee-content">
              {t.tickerText}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-utility-row">
            <div className="lang-switcher-pill">
              <button type="button" className={`lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => setLang('EN')}>English</button>
              <button type="button" className={`lang-btn ${lang === 'AS' ? 'active' : ''}`} onClick={() => setLang('AS')}>অসমীয়া</button>
            </div>
          </div>

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
                  <Link to="/contact#donor-register" onClick={() => setMobileMenuOpen(false)}>• {t.register}</Link>
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
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>• {t.adminLogin}</Link>
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>• {t.partnerLogin}</Link>
                </div>
              )}
            </div>

            <div className="mobile-portal-login-cta">
              <Link to="/admin/login" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
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
