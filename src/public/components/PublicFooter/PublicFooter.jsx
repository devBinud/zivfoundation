import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter
} from 'react-icons/fa6';
import logoZf from '../../../assets/logo.png';
import './PublicFooter.css';

const PublicFooter = () => {
  return (
    <footer className="neotia-footer-wrapper">
      <div className="neotia-footer-container">

        {/* Column 1: Organization Branding, Address & Socials */}
        <div className="neotia-f-col neotia-brand-col">
          <div className="neotia-f-brand-header">
            <Link to="/" className="neotia-f-logo-link">
              <img src={logoZf} alt="Ziv Foundation" className="neotia-f-logo" />
            </Link>
          </div>

          <p className="neotia-f-legal-unit">
            Ziv Foundation Voluntary Blood Network<br />
            ( A Registered Non-Profit Healthcare Community Initiative )
          </p>

          <p className="neotia-f-address">
            Chandan Nagar, Mouza, District Jorhat,<br />
            Assam, PIN - 785001
          </p>

          <div className="neotia-f-contact-info">
            <p><strong>Phone:</strong> +91 94350 12345 / 0376 230 1100</p>
            <p><strong>Email:</strong> <a href="mailto:contact@zivfoundation.org">contact@zivfoundation.org</a></p>
          </div>

          {/* Outlined Social Media Icon Circles */}
          <div className="neotia-f-social-row">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="neotia-social-circle"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="neotia-social-circle"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="neotia-social-circle"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="neotia-social-circle"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="neotia-social-circle"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* Column 2: Excellence & Specialties */}
        <div className="neotia-f-col">
          <h4 className="neotia-f-col-title">Excellence & Specialties</h4>
          <ul className="neotia-f-nav-list">
            <li><Link to="/blood-banks">Voluntary Blood Donation</Link></li>
            <li><Link to="/emergency-request">Emergency SOS Broadcast</Link></li>
            <li><Link to="/blood-banks">Verified Donor Directory</Link></li>
            <li><Link to="/blood-banks">Platelet & SDP Assistance</Link></li>
            <li><Link to="/blood-banks">Rare Blood Group Matching</Link></li>
            <li><Link to="/about">Donor Safety & Eligibility</Link></li>
          </ul>
        </div>

        {/* Column 3: Donors & Network */}
        <div className="neotia-f-col">
          <h4 className="neotia-f-col-title">Donors & Volunteers</h4>
          <ul className="neotia-f-nav-list">
            <li><Link to="/register?role=donor">Register as Lifesaver</Link></li>
            <li><Link to="/emergency-request">Post Patient Blood Need</Link></li>
            <li><Link to="/about">District Coordinator Desk</Link></li>
            <li><Link to="/about">Blood Donation Camps</Link></li>
            <li><Link to="/about">Lifesaver Honors & Awards</Link></li>
            <li><Link to="/admin/login">Coordinator Portal</Link></li>
          </ul>
        </div>

        {/* Column 4: Quick Links */}
        <div className="neotia-f-col">
          <h4 className="neotia-f-col-title">Quick Links</h4>
          <ul className="neotia-f-nav-list">
            <li><Link to="/blood-banks">Find Donors</Link></li>
            <li><Link to="/emergency-request">Emergency SOS</Link></li>
            <li><Link to="/about">About Ziv Foundation</Link></li>
            <li><Link to="/about">Volunteer Program</Link></li>
            <li><Link to="/contact">FAQ & Guidelines</Link></li>
            <li><Link to="/contact">Media Coverage</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Policy Strip */}
      <div className="neotia-f-bottom-bar">
        <div className="neotia-f-bottom-container">
          <p className="neotia-f-copyright-text">
            ©Ziv Foundation {new Date().getFullYear()}. All Right Reserved.{' '}
            <Link to="/about" className="neotia-f-legal-link">Terms & Conditions</Link> |{' '}
            <Link to="/about" className="neotia-f-legal-link">Privacy & Policies</Link> |{' '}
            <Link to="/about" className="neotia-f-legal-link">Volunteer Code of Conduct</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
