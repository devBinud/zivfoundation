import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import './PublicFooter.css';

const PublicFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="eraktkosh-footer">
      {/* Main Dark Gray Footer */}
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
    </footer>
  );
};

export default PublicFooter;
