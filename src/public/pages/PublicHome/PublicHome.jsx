import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaHospitalAlt,
  FaHeart,
  FaAmbulance,
  FaShieldAlt,
  FaFileAlt,
  FaRegCommentDots,
  FaArrowRight
} from 'react-icons/fa';
import practoHeroImg from '../../../assets/bg/homepage-hero-image-web-v1.png';
import donorCardImg from '../../../assets/sections/donor.jpg';
import './PublicHome.css';

const PublicHome = () => {
  const services = [
    {
      id: 'availability',
      title: 'Donor Availability',
      image: donorCardImg,
      desc: 'Find verified voluntary blood donors in real-time across Jorhat and Assam with direct contact.',
      btnText: 'Search Donors',
      link: '/blood-banks'
    },
    {
      id: 'requestor',
      title: 'Blood Requestor',
      image: donorCardImg,
      desc: 'Post verified patient blood requirements and connect immediately with nearby voluntary donors.',
      btnText: 'Request Blood',
      link: '/register?role=requestor'
    },
    {
      id: 'donor',
      title: 'Donor Portal',
      image: donorCardImg,
      desc: 'Join our voluntary donor network, track your lifetime donations, and earn lifesaver honors.',
      btnText: 'Join as Donor',
      link: '/register?role=donor'
    },
    {
      id: 'emergency',
      title: 'Emergency SOS',
      image: donorCardImg,
      desc: 'Broadcast instant high-priority emergency blood alerts directly to active donors within 15 km.',
      btnText: 'Emergency Request',
      link: '/emergency-request'
    }
  ];

  return (
    <div className="public-home-page">
      {/* 1. Exact Practo-Style Hero Section */}
      <section className="practo-hero-banner">
        <div className="practo-hero-container">

          {/* Left Hero Content */}
          <div className="practo-hero-text-col">
            <h1 className="practo-hero-headline">
              <span className="hero-head-top">Skip the search!</span>
              <span className="hero-head-bottom">Find Real-Time Blood Donors</span>
            </h1>

            <p className="practo-hero-pricing-sub">
              Verified voluntary donors + Emergency SOS · 100% Free Service
            </p>

            {/* Social Proof: Online Donors Avatars & Live Green Dot */}
            <div className="practo-online-social-row">
              <div className="avatar-stack">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="Donor"
                  className="stack-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' r='16' fill='%23bfdbfe'/%3E%3Ccircle cx='16' cy='12' r='6' fill='%231d4ed8'/%3E%3Cpath d='M6 28 C6 20 26 20 26 28' fill='%231d4ed8'/%3E%3C/svg%3E";
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                  alt="Donor"
                  className="stack-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' r='16' fill='%23fed7aa'/%3E%3Ccircle cx='16' cy='12' r='6' fill='%23c2410c'/%3E%3Cpath d='M6 28 C6 20 26 20 26 28' fill='%23c2410c'/%3E%3C/svg%3E";
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                  alt="Donor"
                  className="stack-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' r='16' fill='%23bbf7d0'/%3E%3Ccircle cx='16' cy='12' r='6' fill='%2315803d'/%3E%3Cpath d='M6 28 C6 20 26 20 26 28' fill='%2315803d'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span className="online-text">+152 Donors are online</span>
              <span className="live-green-dot" title="Active real-time online status"></span>
            </div>

            {/* Primary Action Button */}
            <div className="practo-btn-container">
              <Link to="/blood-banks" className="practo-primary-cta">
                Find Donors Now
              </Link>
            </div>

            {/* Feature Highlights Row */}
            <div className="practo-features-checklist">
              <div className="practo-feature-item">
                <FaShieldAlt className="feat-icon" />
                <span>Verified Donors</span>
              </div>
              <div className="practo-feature-item">
                <FaFileAlt className="feat-icon" />
                <span>Digital Assistance</span>
              </div>
              <div className="practo-feature-item">
                <FaRegCommentDots className="feat-icon" />
                <span>Free SOS Alerts</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="practo-hero-visual-col">
            <img
              src={practoHeroImg}
              alt="Take Online Donor Consultation"
              className="practo-woman-img"
            />
          </div>

        </div>
      </section>

      {/* 2. Modern 4-Services Section (Clean & Minimalist) */}
      <section className="modern-services-section">
        <div className="modern-services-container">

          {/* Section Header */}
          <div className="modern-services-header">
            <h2 className="services-section-title">
              Everything You Need in One Life-Saving Network
            </h2>
            <p className="services-section-sub">
              Fast, transparent, and certified voluntary blood assistance connecting donors, patients, and hospitals.
            </p>
          </div>

          {/* 4 Cards Grid (Health City Hospital Reference Style) */}
          <div className="hc-services-grid">
            {services.map((svc) => (
              <div key={svc.id} className="hc-service-card">
                {/* Top Image Banner */}
                <div className="hc-card-img-wrap">
                  <img src={svc.image} alt={svc.title} className="hc-card-img" />
                </div>

                {/* Card Body */}
                <div className="hc-card-body">
                  <h3 className="hc-card-title">{svc.title}</h3>
                  <p className="hc-card-desc">{svc.desc}</p>
                  
                  <div className="hc-card-footer">
                    <Link to={svc.link} className="hc-card-link">
                      <span>Read More</span>
                      <FaArrowRight className="hc-arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default PublicHome;
