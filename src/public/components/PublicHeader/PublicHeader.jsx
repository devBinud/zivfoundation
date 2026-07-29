import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BiDonateBlood } from 'react-icons/bi';
import logoZf from '../../../assets/logo_zf.png';
import './PublicHeader.css';

const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lang, setLang] = useState('EN');
  const [mobileAccordion, setMobileAccordion] = useState({});
  const location = useLocation();
  const dropdownRef = useRef(null);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  const toggleMobileAccordion = (name) => {
    setMobileAccordion(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <header className="rakt-header-wrapper" ref={dropdownRef}>
      {/* 1. Top Emblem Header Bar */}
      <div className="top-emblem-bar">
        <div className="top-emblem-container">
            {/* Ziv Foundation Branding ONLY */}
            <Link to="/" className="portal-brand-item">
              <img src={logoZf} alt="Ziv Foundation Logo" className="portal-logo-img" />
              <div className="portal-title-group">
                <span className="portal-name">
                  {lang === 'EN' ? 'Ziv Foundation' : 'জিভ ফাউণ্ডেচন'}
                </span>
                <span className="portal-subname">
                  {lang === 'EN' ? 'For the people, To the people' : 'জনসাধাৰণৰ বাবে, জনসাধাৰণলৈ'}
                </span>
              </div>
            </Link>
          </div>

          {/* Top Right Utilities */}
          <div className="top-utilities-group">
            {/* Language Switcher Pill (ENGLISH / ASSAMESE) */}
            <div className="lang-switcher-pill" role="radiogroup" aria-label="Select Language">
              <button
                type="button"
                className={`lang-btn ${lang === 'EN' ? 'active' : ''}`}
                onClick={() => setLang('EN')}
              >
                ENGLISH
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'AS' ? 'active' : ''}`}
                onClick={() => setLang('AS')}
              >
                ASSAMESE
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
              >
                {lang === 'EN' ? 'Home' : 'মুখ্য পৃষ্ঠা'}
              </NavLink>
            </li>

            {/* About Dropdown */}
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
                <span>{lang === 'EN' ? 'About Us' : 'আমাৰ বিষয়ে'}</span>
                <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="dropdown-menu-box">
                <Link to="/about" className="dropdown-menu-item">
                  {lang === 'EN' ? 'About Ziv Foundation' : 'জিভ ফাউণ্ডেচনৰ বিষয়ে'}
                </Link>
                <Link to="/about#impact" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Impact & Network' : 'প্ৰভাৱ আৰু নেটৱৰ্ক'}
                </Link>
                <Link to="/contact" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Contact & Support' : 'যোগাযোগ আৰু সহায়'}
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
                <span>{lang === 'EN' ? 'Looking for Blood' : 'ৰক্তৰ প্ৰয়োজন'}</span>
                <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="dropdown-menu-box">
                <Link to="/#search" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Blood Availability Search' : 'ৰক্ত উপলব্ধতা সন্ধান'}
                </Link>
                <Link to="/#directory" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Blood Centre Directory' : 'ৰক্ত কেন্দ্ৰ নিৰ্দেশিকা'}
                </Link>
                <Link to="/contact#request" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Emergency Request' : 'জৰুৰী ৰক্ত অনুৰোধ'}
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
                <span>{lang === 'EN' ? 'Want to Donate' : 'ৰক্তদান কৰিব বিচাৰে'}</span>
                <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="dropdown-menu-box">
                <Link to="/contact#donor-register" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Donor Registration' : 'ৰক্তদাতা পঞ্জীয়ন'}
                </Link>
                <Link to="/#camps" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Donation Camps Search' : 'ৰক্তদান শিবিৰ সন্ধান'}
                </Link>
                <Link to="/about#guidelines" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Eligibility Guidelines' : 'যোগ্যতাৰ নিৰ্দেশনা'}
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
                <span>{lang === 'EN' ? 'Blood Centre Login' : 'ৰক্ত কেন্দ্ৰ লগইন'}</span>
                <svg className="caret-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="dropdown-menu-box right-aligned">
                <Link to="/admin/login" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Admin & Official Login' : 'প্ৰশাসনিক লগইন'}
                </Link>
                <Link to="/admin/login" className="dropdown-menu-item">
                  {lang === 'EN' ? 'Partner Hospital Portal' : 'হস্পিটাল / পাৰ্টনাৰ পৰ্টেল'}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* 3. Red Announcement Ticker Bar */}
      <div className="announcement-ticker-bar">
        <div className="ticker-container">
          <div className="ticker-label">
            <BiDonateBlood className="pulse-indicator" size={16} />
            <span>ৰক্তবন্ধু অভিযান</span>
          </div>
          <div className="ticker-marquee-wrapper">
            <div className="ticker-marquee-content">
              {lang === 'EN'
                ? 'Contribute to saving valuable lives — Donate blood, join this noble cause of humanity | Download Ziv Blood Mobile App for instant live stock & emergency donor requests | Helpline: 1800-ZIV-BLOOD'
                : 'বহুমূলীয়া জীৱন ৰক্ষা কৰাত অৰিহণা যোগাওক — ৰক্তদান কৰক | লাইভ ষ্টক আৰু জৰুৰী অনুৰোধৰ বাবে Ziv Blood মোবাইল এপ ডাউনলোড কৰক | হেল্পলাইন: ১৮০০-ZIV-BLOOD'}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-utility-row">
            <div className="helpline-badge mobile-helpline">
              📞 Helpline: 104 / 1800-ZIV-BLOOD
            </div>
            <div className="lang-switcher-pill">
              <button type="button" className={`lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => setLang('EN')}>ENGLISH</button>
              <button type="button" className={`lang-btn ${lang === 'AS' ? 'active' : ''}`} onClick={() => setLang('AS')}>ASSAMESE</button>
            </div>
          </div>

          <div className="mobile-menu-list">
            <NavLink to="/" end className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {lang === 'EN' ? 'Home' : 'মুখ্য পৃষ্ঠা'}
            </NavLink>

            {/* Mobile Accordion: About */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('about')}>
                <span>{lang === 'EN' ? 'About Us' : 'আমাৰ বিষয়ে'}</span>
                <span className="acc-icon">{mobileAccordion['about'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['about'] && (
                <div className="mobile-accordion-body">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'About Ziv Foundation' : 'জিভ ফাউণ্ডেচনৰ বিষয়ে'}</Link>
                  <Link to="/about#impact" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Impact & Network' : 'প্ৰভাৱ আৰু নেটৱৰ্ক'}</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Contact & Support' : 'যোগাযোগ আৰু সহায়'}</Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Looking for Blood */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('looking')}>
                <span>{lang === 'EN' ? 'Looking for Blood' : 'ৰক্তৰ প্ৰয়োজন'}</span>
                <span className="acc-icon">{mobileAccordion['looking'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['looking'] && (
                <div className="mobile-accordion-body">
                  <Link to="/#search" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Blood Availability Search' : 'ৰক্ত উপলব্ধতা সন্ধান'}</Link>
                  <Link to="/#directory" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Blood Centre Directory' : 'ৰক্ত কেন্দ্ৰ নিৰ্দেশিকা'}</Link>
                  <Link to="/contact#request" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Emergency Request' : 'জৰুৰী ৰক্ত অনুৰোধ'}</Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Want to Donate */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('donate')}>
                <span>{lang === 'EN' ? 'Want to Donate' : 'ৰক্তদান কৰিব বিচাৰে'}</span>
                <span className="acc-icon">{mobileAccordion['donate'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['donate'] && (
                <div className="mobile-accordion-body">
                  <Link to="/contact#donor-register" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Donor Registration' : 'ৰক্তদাতা পঞ্জীয়ন'}</Link>
                  <Link to="/#camps" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Donation Camps Search' : 'ৰক্তদান শিবিৰ সন্ধান'}</Link>
                  <Link to="/about#guidelines" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Eligibility Guidelines' : 'যোগ্যতাৰ নিৰ্দেশনা'}</Link>
                </div>
              )}
            </div>

            {/*export default PublicHeader;�ात्रता दिशानिर्देश'}</Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Blood Centre Login */}
            <div className="mobile-accordion-item">
              <button type="button" className="mobile-accordion-trigger" onClick={() => toggleMobileAccordion('login')}>
                <span>{lang === 'EN' ? 'Blood Centre Login' : 'ब्लड सेंटर लॉगिन'}</span>
                <span className="acc-icon">{mobileAccordion['login'] ? '−' : '+'}</span>
              </button>
              {mobileAccordion['login'] && (
                <div className="mobile-accordion-body">
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Admin Portal Login' : 'प्रशासनिक लॉगिन'}</Link>
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>• {lang === 'EN' ? 'Partner Hospital Login' : 'अस्पताल / पार्टनर्स पोर्टल'}</Link>
                </div>
              )}
            </div>

            <div className="mobile-portal-login-cta">
              <Link to="/admin/login" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                🔐 {lang === 'EN' ? 'Login to Portal' : 'पोर्टल लॉगिन'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
