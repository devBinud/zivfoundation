import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTint, FaMapMarkerAlt, FaSearch, FaUsers, FaUserPlus, FaHeart, FaAmbulance, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import './PublicHome.css';

const CustomSelect = ({ icon, placeholder, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      <div
        className={`custom-select-trigger ${isOpen ? 'trigger-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="field-icon">{icon}</span>
        <span className={`selected-text ${!selectedValue ? 'placeholder-style' : ''}`}>
          {selectedValue || placeholder}
        </span>
        <FaChevronDown className={`select-chevron ${isOpen ? 'chevron-up' : ''}`} />
      </div>

      {isOpen && (
        <div className="custom-options-dropdown">
          <div
            className={`custom-option-item ${!selectedValue ? 'opt-active' : ''}`}
            onClick={() => {
              onSelect('');
              setIsOpen(false);
            }}
          >
            {placeholder}
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              className={`custom-option-item ${selectedValue === opt ? 'opt-active' : ''}`}
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PublicHome = () => {
  const [activeTab, setActiveTab] = useState(2); // Donor Login active by default
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');

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
      icon: <FaUserPlus />,
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
      {/* Hero Section */}
      <section className="redlove-hero-section">
        <div className="redlove-hero-overlay"></div>
        <div className="redlove-hero-container">
          <h1 className="redlove-hero-title">
            Efficiently Connect with Blood Donors: Saving Lives Made Simpler and Faster
          </h1>

          {/* Blood Donor Search Bar */}
          <div className="redlove-search-card">
            <div className="search-field">
              <CustomSelect
                icon={<FaTint />}
                placeholder="Select Blood Group"
                options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
                selectedValue={bloodGroup}
                onSelect={setBloodGroup}
              />
            </div>

            <div className="search-divider"></div>

            <div className="search-field">
              <CustomSelect
                icon={<FaMapMarkerAlt />}
                placeholder="Select a District"
                options={['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh']}
                selectedValue={district}
                onSelect={setDistrict}
              />
            </div>

            <div className="search-divider"></div>

            <div className="search-field">
              <CustomSelect
                icon={<FaMapMarkerAlt />}
                placeholder="Select a Upazila"
                options={['Dhanmondi', 'Gulshan', 'Mirpur', 'Uttara', 'Savar']}
                selectedValue={upazila}
                onSelect={setUpazila}
              />
            </div>

            <button type="button" className="redlove-search-btn">
              <FaSearch className="btn-icon" />
              <span>SEARCH</span>
            </button>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Section */}
      <section className="step-guide-section">
        <div className="step-guide-card">
          <div className="step-guide-header">
            <h2 className="step-guide-title">Step-by-step guide</h2>
          </div>

          <div className="step-guide-grid">
            {/* Step 1 */}
            <div className="step-guide-item">
              <div className="step-illustration-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="26" y="15" width="28" height="50" rx="6" stroke="#000000" strokeWidth="2.5" fill="#ffffff"/>
                  <rect x="30" y="22" width="20" height="32" rx="2" fill="#fef08a" stroke="#000000" strokeWidth="1.5"/>
                  <circle cx="48" cy="18" r="10" fill="#000000"/>
                  <path d="M43 18 L46 21 L53 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 45 C18 45 26 40 26 48 C26 52 20 54 18 50" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="step-number">1.</span>
              <h3 className="step-item-title">Sign up online</h3>
              <Link to="/register?role=donor" className="step-read-more">
                <span>Read more</span>
                <FaArrowRight />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="step-guide-item">
              <div className="step-illustration-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="36" cy="32" r="18" stroke="#000000" strokeWidth="2.5" fill="#ffffff"/>
                  <path d="M49 45 L62 58" stroke="#000000" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="36" cy="32" r="7" fill="#000000"/>
                  <line x1="36" y1="20" x2="36" y2="23" stroke="#000000" strokeWidth="2"/>
                  <line x1="36" y1="41" x2="36" y2="44" stroke="#000000" strokeWidth="2"/>
                  <line x1="24" y1="32" x2="27" y2="32" stroke="#000000" strokeWidth="2"/>
                  <line x1="45" y1="32" x2="48" y2="32" stroke="#000000" strokeWidth="2"/>
                </svg>
              </div>
              <span className="step-number">2.</span>
              <h3 className="step-item-title">Pass the screening</h3>
              <Link to="/about" className="step-read-more">
                <span>Read more</span>
                <FaArrowRight />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="step-guide-item">
              <div className="step-illustration-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="16" width="22" height="32" rx="4" stroke="#000000" strokeWidth="2.5" fill="#dc2626"/>
                  <path d="M31 16 L31 10" stroke="#000000" strokeWidth="2"/>
                  <path d="M31 24 C31 24 26 31 26 34 C26 37 28 39 31 39 C34 39 36 37 36 34 C36 31 31 24 31 24 Z" fill="#ffffff"/>
                  <path d="M31 48 C31 60 48 60 48 50" stroke="#000000" strokeWidth="2" strokeDasharray="3 3"/>
                  <rect x="42" y="44" width="30" height="14" rx="7" stroke="#000000" strokeWidth="2.5" fill="#ffffff"/>
                </svg>
              </div>
              <span className="step-number">3.</span>
              <h3 className="step-item-title">Donate blood</h3>
              <Link to="/register?role=donor" className="step-read-more">
                <span>Read more</span>
                <FaArrowRight />
              </Link>
            </div>

            {/* Step 4 */}
            <div className="step-guide-item">
              <div className="step-illustration-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="24" y="18" width="44" height="28" rx="4" stroke="#000000" strokeWidth="2.5" fill="#ffffff"/>
                  <rect x="28" y="22" width="12" height="12" rx="2" fill="#000000"/>
                  <line x1="44" y1="24" x2="62" y2="24" stroke="#000000" strokeWidth="2"/>
                  <line x1="44" y1="30" x2="56" y2="30" stroke="#000000" strokeWidth="2"/>
                  <circle cx="62" cy="40" r="8" fill="#dc2626"/>
                  <path d="M58 48 L62 40 L66 48" stroke="#dc2626" strokeWidth="2"/>
                  <path d="M20 54 C20 54 30 42 38 42 C44 42 48 48 48 56" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <span className="step-number">4.</span>
              <h3 className="step-item-title">Receive recognition</h3>
              <Link to="/about" className="step-read-more">
                <span>Read more</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Vertical Tabs Services Section */}
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
