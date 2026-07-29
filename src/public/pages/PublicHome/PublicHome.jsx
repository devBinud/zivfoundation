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
      link: '/login'
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
