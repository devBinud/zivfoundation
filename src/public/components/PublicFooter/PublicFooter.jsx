import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaArrowUp } from 'react-icons/fa';
import './PublicFooter.css';

const PublicFooter = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="eraktkosh-footer">
      {/* 1. Partner / Government Logos Carousel Strip */}
      <div className="partner-logos-section">
        <div className="partner-logos-container">
          <button className="carousel-nav-btn prev-btn" onClick={scrollLeft} aria-label="Previous Partners">
            <FaChevronLeft />
          </button>

          <div className="partner-logos-scroll" ref={carouselRef}>
            {/* Logo 1: Ministry of Health & Family Welfare */}
            <div className="partner-logo-item">
              <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#1e293b">
                  <path d="M20 8 L25 13 L20 18 L15 13 Z" fill="#b91c1c"/>
                  <circle cx="20" cy="26" r="6" stroke="#1e293b" strokeWidth="2"/>
                  <line x1="20" y1="32" x2="20" y2="38" stroke="#1e293b" strokeWidth="2"/>
                  <text x="36" y="18" fontSize="9" fontWeight="bold" fill="#0f172a">स्वास्थ्य एवं परिवार कल्याण मंत्रालय</text>
                  <text x="36" y="28" fontSize="8" fontWeight="700" fill="#1e293b">MINISTRY OF HEALTH AND</text>
                  <text x="36" y="37" fontSize="8" fontWeight="700" fill="#1e293b">FAMILY WELFARE</text>
                </g>
              </svg>
            </div>

            {/* Logo 2: CDAC */}
            <div className="partner-logo-item">
              <svg width="110" height="45" viewBox="0 0 110 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22.5" r="16" fill="#0284c7" />
                <path d="M14 22.5 C14 16 30 16 30 22.5 C30 29 14 29 14 22.5" stroke="#ffffff" strokeWidth="3" fill="none"/>
                <text x="44" y="24" fontSize="13" fontWeight="bold" fill="#0284c7">C-DAC</text>
                <text x="44" y="32" fontSize="6" fontWeight="600" fill="#64748b">ADVANCED COMPUTING</text>
              </svg>
            </div>

            {/* Logo 3: Digital India */}
            <div className="partner-logo-item">
              <svg width="130" height="45" viewBox="0 0 130 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10 L30 10 L22 35 Z" fill="#f97316"/>
                <path d="M22 10 L35 10 L28 35 Z" fill="#0284c7"/>
                <text x="40" y="22" fontSize="14" fontWeight="800" fill="#0284c7">Digital India</text>
                <text x="40" y="32" fontSize="7" fontWeight="600" fill="#64748b">Power To Empower</text>
              </svg>
            </div>

            {/* Logo 4: India.gov.in */}
            <div className="partner-logo-item">
              <svg width="130" height="45" viewBox="0 0 130 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="10" y="28" fontSize="20" fontWeight="900" fill="#dc2626">india</text>
                <circle cx="68" cy="18" r="3" fill="#16a34a"/>
                <text x="74" y="28" fontSize="16" fontWeight="800" fill="#0284c7">.gov.in</text>
              </svg>
            </div>

            {/* Logo 5: MyGov */}
            <div className="partner-logo-item">
              <svg width="110" height="45" viewBox="0 0 110 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="8" width="28" height="28" rx="6" fill="#15803d"/>
                <path d="M18 22 L24 28 L32 16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
                <text x="44" y="24" fontSize="15" fontWeight="900" fill="#15803d">my</text>
                <text x="44" y="36" fontSize="13" fontWeight="800" fill="#dc2626">GOV</text>
              </svg>
            </div>
          </div>

          <button className="carousel-nav-btn next-btn" onClick={scrollRight} aria-label="Next Partners">
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* 2. Main Dark Gray Footer */}
      <div className="main-dark-footer">
        <div className="footer-content-container">
          {/* Column 1: Contact */}
          <div className="dark-footer-col contact-col">
            <h3 className="dark-col-title">Contact</h3>
            
            <div className="contact-item">
              <span className="contact-label">Address:</span>
              <p className="contact-value">
                C-56/1, Anusandhan Bhawan, Sector-62, Noida, Uttar Pradesh-201307
              </p>
            </div>

            <div className="contact-item">
              <span className="contact-label">Contact Number</span>
              <p className="contact-value">+91-9650816031</p>
            </div>

            <div className="contact-item">
              <span className="contact-label">Email</span>
              <p className="contact-value">eraktkosh@cdac.in</p>
            </div>

            <div className="contact-item">
              <span className="contact-label">For Administrative queries</span>
              <p className="contact-value">
                Blood Cell, National Health Mission Ministry of Health & Family Welfare, New Delhi-110011
              </p>
            </div>
          </div>

          {/* Column 2: Important Links */}
          <div className="dark-footer-col links-col">
            <h3 className="dark-col-title">Important Links</h3>
            <ul className="dark-footer-links">
              <li><Link to="/">Search Blood Availability</Link></li>
              <li><Link to="/">Search Blood Center Directory</Link></li>
              <li><Link to="/">Search Blood Donation Camp</Link></li>
              <li><Link to="/admin/login">Blood Center Login</Link></li>
              <li><Link to="/register?role=donor&mode=login">Donor Login</Link></li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="dark-footer-col policies-col">
            <h3 className="dark-col-title">Policies</h3>
            <ul className="dark-footer-links">
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#accessibility">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>

        {/* Scroll To Top Circle Button on Bottom Right */}
        <button className="footer-scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to Top">
          <FaArrowUp />
        </button>
      </div>

      {/* 3. Bottom Black Bar */}
      <div className="sub-footer-black-bar">
        <p className="sub-footer-text">
          Designed and Developed by Centre for Development of Advanced Computing
        </p>
      </div>
    </footer>
  );
};

export default PublicFooter;
