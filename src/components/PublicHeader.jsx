import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaSearch,
  FaAmbulance,
  FaHeart,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import logoZf from '../assets/logo.png';
import '../styles/header.css';

const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Detect scroll to style sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    <>
      <header
        className={`practo-header-wrapper ${isScrolled ? 'is-scrolled' : ''}`}
        ref={dropdownRef}
      >
        <div className="practo-navbar-container">

          {/* Left Section: Brand Logo & Main Nav Tabs */}
          <div className="practo-nav-left">
            <Link to="/" className="practo-brand-item" onClick={closeDropdown}>
              <img src={logoZf} alt="Ziv Foundation" className="practo-brand-logo" />
            </Link>

            <nav className="practo-primary-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `practo-tab-link ${isActive ? 'active' : ''}`}
                onClick={closeDropdown}
              >
                Home
              </NavLink>

              <NavLink
                to="/blood-banks"
                className={({ isActive }) => `practo-tab-link ${isActive ? 'active' : ''}`}
                onClick={closeDropdown}
              >
                Find Donors
              </NavLink>

              <NavLink
                to="/emergency-request"
                className={({ isActive }) => `practo-tab-link ${isActive ? 'active' : ''}`}
                onClick={closeDropdown}
              >
                Emergency SOS
              </NavLink>

              <NavLink
                to="/register?role=donor"
                className={({ isActive }) => `practo-tab-link ${isActive ? 'active' : ''}`}
                onClick={closeDropdown}
              >
                Donate Blood
              </NavLink>
            </nav>
          </div>

          {/* Right Section: Enterprise & Auth Links */}
          <div className="practo-nav-right">

            {/* For Coordinators Dropdown */}
            <div
              className={`practo-dropdown-item ${activeDropdown === 'providers' ? 'open' : ''}`}
              onMouseEnter={() => setActiveDropdown('providers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="practo-dropdown-btn"
                onClick={() => toggleDropdown('providers')}
                aria-expanded={activeDropdown === 'providers'}
              >
                <span>For Coordinators</span>
                <svg className="practo-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="practo-dropdown-menu">
                <Link to="/about#camps" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>Organize Blood Camp</span>
                  <span className="practo-menu-badge">NEW</span>
                </Link>
                <Link to="/contact" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>NGO Volunteer Desk</span>
                </Link>
                <Link to="/blood-banks" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>Hospital & Camp Network</span>
                </Link>
                <Link to="/register?role=donor" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>Coordinator Registration</span>
                </Link>
              </div>
            </div>

            {/* Security & Help Dropdown */}
            <div
              className={`practo-dropdown-item ${activeDropdown === 'security' ? 'open' : ''}`}
              onMouseEnter={() => setActiveDropdown('security')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className="practo-dropdown-btn"
                onClick={() => toggleDropdown('security')}
                aria-expanded={activeDropdown === 'security'}
              >
                <span>Security & help</span>
                <svg className="practo-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className="practo-dropdown-menu">
                <Link to="/about" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>Donor Safety Guidelines</span>
                </Link>
                <Link to="/contact" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>24/7 Helpline Support</span>
                </Link>
                <Link to="/about" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>Data & Privacy Policy</span>
                </Link>
                <Link to="/contact" className="practo-dropdown-link" onClick={closeDropdown}>
                  <span>Help Center & FAQs</span>
                </Link>
              </div>
            </div>

            {/* Practo-style Login / Signup Pill Button */}
            <Link to="/login" className="practo-auth-btn">
              Login / Signup
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`practo-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for closing mobile drawer */}
      <div
        className={`practo-mobile-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Off-Canvas Left Mobile Drawer */}
      <div className={`practo-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Drawer Top Header */}
        <div className="practo-drawer-header">
          <Link to="/" className="practo-brand-item" onClick={() => setMobileMenuOpen(false)}>
            <img src={logoZf} alt="Ziv Foundation" className="practo-brand-logo" />
          </Link>
          <button
            type="button"
            className="practo-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="practo-drawer-content">
          {/* Quick Emergency Action on Mobile */}
          <Link
            to="/emergency-request"
            className="mobile-emergency-banner"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="banner-icon-badge">
              <FaAmbulance />
            </div>
            <div className="banner-text">
              <strong>Emergency Blood SOS</strong>
              <span>Instant 24/7 District Broadcast</span>
            </div>
          </Link>

          <div className="mobile-nav-links-group">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `practo-mobile-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome className="m-link-icon" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/blood-banks"
              className={({ isActive }) => `practo-mobile-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaSearch className="m-link-icon" />
              <span>Find Donors</span>
            </NavLink>

            <NavLink
              to="/emergency-request"
              className={({ isActive }) => `practo-mobile-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaAmbulance className="m-link-icon" />
              <span>Emergency SOS</span>
            </NavLink>

            <NavLink
              to="/register?role=donor"
              className={({ isActive }) => `practo-mobile-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHeart className="m-link-icon" />
              <span>Donate Blood</span>
            </NavLink>
          </div>

          {/* Mobile Accordion: For Coordinators */}
          <div className="practo-mobile-accordion">
            <button
              type="button"
              className="practo-acc-trigger"
              onClick={() => toggleMobileAccordion('coord')}
            >
              <span className="acc-title-wrap">
                <FaHeart className="m-acc-icon" />
                <span>For Coordinators</span>
              </span>
              {mobileAccordion['coord'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {mobileAccordion['coord'] && (
              <div className="practo-acc-body">
                <Link to="/about#camps" onClick={() => setMobileMenuOpen(false)}>
                  Organize Blood Camp
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  NGO Volunteer Desk
                </Link>
                <Link to="/blood-banks" onClick={() => setMobileMenuOpen(false)}>
                  Hospital & Camp Network
                </Link>
                <Link to="/register?role=donor" onClick={() => setMobileMenuOpen(false)}>
                  Coordinator Registration
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Accordion: Security & Helpline */}
          <div className="practo-mobile-accordion">
            <button
              type="button"
              className="practo-acc-trigger"
              onClick={() => toggleMobileAccordion('sec')}
            >
              <span className="acc-title-wrap">
                <FaShieldAlt className="m-acc-icon" />
                <span>Security & Helpdesk</span>
              </span>
              {mobileAccordion['sec'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {mobileAccordion['sec'] && (
              <div className="practo-acc-body">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  Donor Safety Guidelines
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  24/7 Helpline Support
                </Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                  Data & Privacy Policy
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Help Center & FAQs
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Auth Button */}
          <div className="practo-mobile-auth-wrapper">
            <Link to="/login" className="practo-mobile-auth-btn" onClick={() => setMobileMenuOpen(false)}>
              Login / Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicHeader;

