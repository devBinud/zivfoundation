import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTint, 
  FaUsers, 
  FaHeartbeat, 
  FaShieldAlt, 
  FaAward, 
  FaAmbulance, 
  FaArrowRight, 
  FaCheckCircle, 
  FaHeart,
  FaHospitalAlt,
  FaPhoneAlt,
  FaFileMedicalAlt,
  FaChevronRight
} from 'react-icons/fa';
import heroBloodImg from '../../../assets/bg/2149378364.jpg';
import './PublicHome.css';

const PublicHome = () => {
  const [activeTab, setActiveTab] = useState(2);

  const features = [
    {
      id: 1,
      icon: <FaHeartbeat />,
      title: 'Instant Donor Matching',
      desc: 'Real-time district matching connects urgent patients with verified active donors near their medical centre.'
    },
    {
      id: 2,
      icon: <FaTint />,
      title: 'Save Up to 3 Lives',
      desc: 'Whole blood is separated into red blood cells, platelets, and plasma to treat multiple critically ill individuals.'
    },
    {
      id: 3,
      icon: <FaShieldAlt />,
      title: '100% Free & Certified',
      desc: 'All donation camps and testing procedures are conducted safely in government and accredited blood banks.'
    },
    {
      id: 4,
      icon: <FaCheckCircle />,
      title: 'Free Health Screening',
      desc: 'Every donor receives complimentary screening for hemoglobin levels, blood pressure, and blood grouping.'
    },
    {
      id: 5,
      icon: <FaAward />,
      title: 'Digital Honors & Badges',
      desc: 'Earn verifiable digital certificates and honors recognizing your noble contribution to community health.'
    },
    {
      id: 6,
      icon: <FaAmbulance />,
      title: '24/7 Emergency SOS',
      desc: 'Urgent emergency broadcast alerts mobilize nearby voluntary donors instantly during critical operations.'
    }
  ];

  const services = [
    {
      id: 0,
      title: 'Check Blood Donor Availability',
      icon: <FaUsers />,
      desc: 'Search registered voluntary blood donors in real-time across all districts and blood groups. Connect directly with verified donors near your location to obtain blood quickly.',
      btnText: 'Search Availability',
      link: '/donor-directory'
    },
    {
      id: 1,
      title: 'Register as Requestor',
      icon: <FaHospitalAlt />,
      desc: 'Register as a patient, family member, or hospital representative to post verified blood requirements, track live donor responses, and request immediate blood units.',
      btnText: 'Register as Requestor',
      link: '/register?role=requestor'
    },
    {
      id: 2,
      title: 'Register/login as Donor',
      icon: <FaHeart />,
      desc: 'The Donor Login portal allows registered voluntary donors to securely access their profiles, view donation history, update personal details, and receive notifications about nearby emergency requests.',
      btnText: 'Donor Login',
      link: '/register?role=donor&mode=login'
    },
    {
      id: 3,
      title: 'Emergency Blood Request',
      icon: <FaAmbulance />,
      desc: 'Facing a critical medical emergency? Broadcast an urgent SOS blood requirement to all active voluntary donors in your district and alert nearby NGO coordinators immediately.',
      btnText: 'Emergency Blood Request',
      link: '/emergency-request'
    }
  ];

  return (
    <div className="public-home-page">
      {/* 1. Clean Modern Hero Section (Matching binudsoftwaresolutions.in layout) */}
      <section className="binud-hero-section">
        <div className="binud-hero-container">
          <div className="binud-hero-content">
            {/* Top Quality Badge */}
            <div className="hero-quality-badge">
              <span>Saving Lives Every Day</span>
              <FaCheckCircle className="badge-check-icon" />
            </div>

            {/* Impact Headline */}
            <h1 className="hero-modern-title">
              Donate Blood & <br />
              <span className="hero-banner-highlight">Save Valuable Lives</span> <br />
              in Your Community
            </h1>

            {/* Subtitle */}
            <p className="hero-modern-subtitle">
              Join a compassionate network of verified voluntary blood donors and hospitals delivering urgent life-saving transfusions across Assam when every second matters.
            </p>

            {/* CTA Group */}
            <div className="hero-modern-cta-group">
              <Link to="/register?role=donor" className="hero-gold-btn">
                <span>Start Donating</span>
                <FaArrowRight className="btn-arrow" />
              </Link>
              <Link to="/#search" className="hero-outline-btn">
                <span>Explore Services</span>
                <FaChevronRight className="btn-arrow" />
              </Link>
            </div>
          </div>

          {/* Right Hero Visual with 2149378364.jpg */}
          <div className="binud-hero-visual">
            <div className="hero-image-wrapper">
              <img 
                src={heroBloodImg} 
                alt="Voluntary Blood Donation Saves Lives" 
                className="hero-main-photo" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Overlapping Feature Card (Yellow/Lime Vibrant Card) */}
      <section className="overlapping-card-wrapper">
        <div className="overlapping-feature-card">
          {/* Card Top Header */}
          <div className="card-top-header">
            <div className="card-title-col">
              <h2 className="card-heading">
                Why Choose <br />
                <span className="card-highlight">Voluntary Blood</span> <br />
                Donation?
              </h2>
            </div>
            <div className="card-desc-col">
              <p className="card-lead-text">
                There are many vital, life-saving benefits to voluntary blood donation. With minimal time and zero cost, your single donation directly empowers emergency units, cancer therapies, and surgical recoveries.
              </p>
            </div>
          </div>

          {/* 6 Features Grid (2 Rows x 3 Cols) */}
          <div className="card-features-grid">
            {features.map((item) => (
              <div key={item.id} className="feature-item-cell">
                <div className="feature-icon-circle">
                  {item.icon}
                </div>
                <div className="feature-text-block">
                  <h3 className="feature-item-title">{item.title}</h3>
                  <p className="feature-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Card Bottom Centered CTA */}
          <div className="card-bottom-action">
            <Link to="/register?role=donor" className="card-bottom-btn">
              GET STARTED NOW
            </Link>
          </div>
        </div>
      </section>



      {/* 4. Interactive Services & Emergency Hub */}
      <section className="vertical-services-section">
        <div className="vertical-services-container">
          {/* Left Vertical Tabs Sidebar */}
          <div className="vertical-tabs-sidebar">
            {services.map((svc, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={svc.id}
                  className={`vertical-tab-item ${isActive ? 'active-tab' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="vertical-tab-icon">
                    {svc.icon}
                  </div>
                  <span className="vertical-tab-title">{svc.title}</span>
                  <FaArrowRight className="vertical-tab-arrow" />
                </div>
              );
            })}
          </div>

          {/* Right Active Detail Panel */}
          <div className="vertical-tab-content-panel">
            <div className="panel-left-details">
              <h3 className="panel-service-title">{services[activeTab].title}</h3>
              <p className="panel-service-desc">
                {services[activeTab].desc}
              </p>
              <Link to={services[activeTab].link} className="panel-cta-button">
                <span>{services[activeTab].btnText}</span>
                <FaArrowRight />
              </Link>
            </div>

            <div className="panel-right-graphic">
              <svg className="blood-bag-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 120 20 C 170 40, 160 120, 120 140" stroke="#b91c1c" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <rect x="50" y="50" width="75" height="110" rx="16" fill="#dc2626" />
                <rect x="58" y="58" width="59" height="94" rx="10" fill="#b91c1c" />
                <rect x="64" y="70" width="47" height="42" rx="4" fill="#ffffff" />
                <line x1="70" y1="80" x2="105" y2="80" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <line x1="70" y1="88" x2="98" y2="88" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <line x1="70" y1="96" x2="101" y2="96" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="50" cy="140" r="18" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                <path d="M50 128 C50 128 41 140 41 145 C41 150 45 154 50 154 C55 154 59 150 59 145 C59 140 50 128 50 128 Z" fill="#dc2626"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PublicHome;
