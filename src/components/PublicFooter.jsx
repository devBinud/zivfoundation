import React from 'react';
import { Link } from 'react-router-dom';
import logoZf from '../assets/logo.png';
import '../styles/footer.css';

const PublicFooter = () => {
  return (
    <footer className="public-footer">
      <div className="public-footer-top">
        <div className="public-footer-container">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img src={logoZf} alt="Ziv Foundation" className="footer-logo" />
              <span className="footer-brand-text">Ziv <span className="brand-accent">Foundation</span></span>
            </div>
            <p className="footer-tagline">
              Empowering global change through verified NGO partnerships, transparent charity tracking, and digital donor certifications.
            </p>
            <div className="footer-socials">
              <a href="#twitter" aria-label="Twitter" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Ziv Foundation</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Organizations</h4>
            <ul>
              <li><Link to="/admin/login">Partner Portal</Link></li>
              <li><Link to="/admin/login">Admin Authorization</Link></li>
              <li><Link to="/contact">Request Audit</Link></li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <div className="newsletter-card">
              <h4>Stay Connected</h4>
              <p>Subscribe to receive verified impact reports, blood donation drive alerts, and foundation updates.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} className="footer-subscribe-form">
                <input type="email" placeholder="Enter your email address" required className="footer-input" />
                <button type="submit" className="footer-subscribe-btn">Subscribe Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="public-footer-bottom">
        <div className="public-footer-container flex-between">
          <p>© {new Date().getFullYear()} Ziv Foundation. All rights reserved. Registered Non-Profit Organization.</p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="dot">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="dot">•</span>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
