import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PublicNgoDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const ngosList = [
    {
      id: 1,
      name: 'Hope Wildlife & Nature Reserve',
      category: 'Animal Welfare',
      location: 'Nairobi, Kenya',
      impact: '12,400+ Animals Sheltered',
      status: 'Approved & Verified',
      initials: 'HW',
      desc: 'Dedicated to wildlife preservation, habitat restoration, and anti-poaching operations in East Africa.'
    },
    {
      id: 2,
      name: 'Global Literacy Initiative',
      category: 'Education',
      location: 'Mumbai, India',
      impact: '45,000+ Students Educated',
      status: 'Approved & Verified',
      initials: 'GL',
      desc: 'Providing digital learning labs, library books, and scholarships for underprivileged children.'
    },
    {
      id: 3,
      name: 'Clean Ocean Care Alliance',
      category: 'Environment',
      location: 'Jakarta, Indonesia',
      impact: '180+ Tons Plastic Recycled',
      status: 'Approved & Verified',
      initials: 'CO',
      desc: 'Mobilizing coastal communities to audit ocean plastics, clean beaches, and revive marine ecosystems.'
    },
    {
      id: 4,
      name: 'Solar Health & Energy Access',
      category: 'Healthcare & Energy',
      location: 'Accra, Ghana',
      impact: '120+ Clinics Electrified',
      status: 'Approved & Verified',
      initials: 'SH',
      desc: 'Installing clean solar power systems in rural medical centers across Sub-Saharan Africa.'
    },
    {
      id: 5,
      name: 'Emergency Relief Network',
      category: 'Disaster Relief',
      location: 'Geneva, Switzerland',
      impact: '250,000+ Meals Distributed',
      status: 'Approved & Verified',
      initials: 'ER',
      desc: 'Rapid emergency response team providing clean water, shelter, and medical kits during natural crises.'
    },
    {
      id: 6,
      name: 'Youth Coding & Robotics Trust',
      category: 'Education',
      location: 'Bogotá, Colombia',
      impact: '8,500+ Youth Trained',
      status: 'Approved & Verified',
      initials: 'YC',
      desc: 'Offering free STEM education, laptop distribution, and mentorship to aspiring software engineers.'
    }
  ];

  const categories = ['All', 'Education', 'Environment', 'Animal Welfare', 'Healthcare & Energy', 'Disaster Relief'];

  const filteredNgos = ngosList.filter((ngo) => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ngo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ngo.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="public-ngo-directory">
      <section className="hero-section" style={{ paddingBottom: '2.5rem' }}>
        <div className="hero-bg-glow"></div>
        <div className="hero-container">
          <div className="hero-badge">
            <span>Verified Non-Profit Partners</span>
          </div>
          <h1 className="hero-title">
            Discover & Support <span className="gradient-text">Audited NGOs</span>
          </h1>
          <p className="hero-subtitle">
            All organizations listed below have passed Ziv Foundation's multi-tiered verification criteria and hold active accreditation status.
          </p>
        </div>
      </section>

      <section className="section-container" style={{ paddingTop: '0' }}>
        {/* Search & Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-input-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon-inside">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="form-control"
              placeholder="Search NGOs by name, location, or mission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Directory Grid */}
        {filteredNgos.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No verified NGOs match your search criteria.</p>
            <button className="btn btn-secondary mt-3" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="ngo-cards-grid">
            {filteredNgos.map((ngo) => (
              <div key={ngo.id} className="ngo-card">
                <div className="ngo-card-header">
                  <div className="ngo-avatar">{ngo.initials}</div>
                  <div className="ngo-meta">
                    <h3>{ngo.name}</h3>
                    <div className="ngo-category">{ngo.category} • {ngo.location}</div>
                  </div>
                </div>
                <div className="ngo-card-body">
                  <p className="ngo-desc">{ngo.desc}</p>
                  <div className="ngo-stats-row">
                    <span>Impact: <strong>{ngo.impact}</strong></span>
                    <span className="badge badge-approved">Verified ✓</span>
                  </div>
                </div>
                <div className="ngo-card-footer">
                  <Link to="/donate" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    Donate to Organization
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PublicNgoDirectory;
