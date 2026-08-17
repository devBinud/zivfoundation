import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaHeart
} from 'react-icons/fa';
import logoZf from '../../../assets/logo.png';
import './PublicFooter.css';

const PublicFooter = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/register');

  return (
    <footer className="std-full-footer-wrapper">
      {/* Standard Minimalist White Footer Grid */}
      <div className="std-white-footer-section">
        <div className="std-footer-container">

          {/* Column 1: Brand */}
          <div className="std-f-col std-f-brand-col">
            <Link to="/" className="std-f-brand-link">
              <img src={logoZf} alt="Ziv Foundation" className="std-f-logo-img" />
            </Link>
          </div>

          {/* Column 2: Our Services */}
          <div className="std-f-col">
            <h4 className="std-f-col-title">Our Services</h4>
            <ul className="std-f-links">
              <li><Link to="/blood-banks">Search Blood Donors</Link></li>
              <li><Link to="/emergency-request">Emergency SOS Broadcast</Link></li>
              <li><Link to="/register?role=donor">Donate Blood Online</Link></li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className="std-f-col">
            <h4 className="std-f-col-title">About Us</h4>
            <ul className="std-f-links">
              <li><Link to="/about">Donor Safety & Eligibility</Link></li>
              <li><Link to="/contact">NGO Accreditation Desk</Link></li>
              <li><Link to="/admin/login">Admin & Coordinator Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Jorhat Headquarters */}
          <div className="std-f-col std-f-contact-col">
            <a href="mailto:support@zivfoundation.org" className="std-f-direct-link">
              support@zivfoundation.org
            </a>
            <p className="std-f-contact-sub">
              Chandan Nagar, Jorhat, Assam - 785001
            </p>
            <p className="std-f-contact-sub">
              Helpline: +91 94350 12345
            </p>
          </div>

        </div>

        {/* 3. Bottom Legal & Social Row */}
        <div className="std-f-bottom-divider"></div>
        <div className="std-footer-container std-f-bottom-row">
          <p className="std-f-copyright">
            Copyright ©{new Date().getFullYear()} Ziv Foundation. All Rights Reserved.
          </p>

          <div className="std-f-social-group">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="std-f-social-icon"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="std-f-social-icon"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="std-f-social-icon"
            >
              <FaYoutube />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919435012345"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="std-f-social-icon"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default PublicFooter;
