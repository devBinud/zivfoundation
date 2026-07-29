import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/hero.css';
import '../../styles/home.css';

const PublicHome = () => {
  const featuredNgos = [
    {
      id: 1,
      name: 'Hope Wildlife & Nature Reserve',
      category: 'Animal Welfare & Conservation',
      location: 'Nairobi, Kenya',
      impact: '12,400+ Animals Sheltered',
      rating: '4.9 ★ (Verified NGO)',
      initials: 'HW',
      desc: 'Dedicated to wildlife preservation, habitat restoration, and combating poaching across East Africa.'
    },
    {
      id: 2,
      name: 'Global Literacy Initiative',
      category: 'Education & Empowerment',
      location: 'Mumbai, India',
      impact: '45,000+ Students Educated',
      rating: '5.0 ★ (Verified NGO)',
      initials: 'GL',
      desc: 'Providing digital learning labs, books, and scholarship programs for underprivileged youth.'
    },
    {
      id: 3,
      name: 'Clean Ocean Care Alliance',
      category: 'Environmental Protection',
      location: 'Jakarta, Indonesia',
      impact: '180+ Tons Plastic Recycled',
      rating: '4.8 ★ (Verified NGO)',
      initials: 'CO',
      desc: 'Mobilizing coastal communities to audit ocean plastics, clean beaches, and build sustainable marine habitats.'
    }
  ];

  return (
    <div className="public-home-page">
      {/* Hero Section (UniLayer Inspired Modern Design) */}
      <section className="hero-section">
        <div className="hero-canvas">
          <div className="hero-ring-glow"></div>
          
          <div className="hero-brand-tag">
            <span className="brand-dot"></span>
            <span>ZIV FOUNDATION • BLOOD PORTAL</span>
          </div>

          <h1 className="hero-main-title">
            Blood Portal
          </h1>

          <p className="hero-subtag">
            CENTRALIZED VOLUNTARY BLOOD DONATION & NGO ACCREDITATION
          </p>

          <div className="hero-pillars-row">
            <span className="pillar-word accent-red">RaktParivar</span>
            <span className="pillar-dot">•</span>
            <span className="pillar-word accent-white">ZivBlood</span>
            <span className="pillar-dot">•</span>
            <span className="pillar-word accent-red">VerifiedNGO</span>
          </div>

          <div className="hero-action-box">
            <span className="action-box-label">Subscribe to emergency donor alerts & announcements</span>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to alerts successfully!'); }} className="hero-subscribe-form">
              <input type="email" placeholder="Enter your email address" required className="hero-action-input" />
              <button type="submit" className="hero-action-btn">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Hero Quick Stats */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-number">1,250+</div>
            <div className="stat-label">Verified Organizations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$14.8M</div>
            <div className="stat-label">Funds Tracked & Verified</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98.4%</div>
            <div className="stat-label">Transparency Index</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">32,000+</div>
            <div className="stat-label">Digital Honors Issued</div>
          </div>
        </div>
      </section>

      {/* Verification Pillar Section */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-tag">Why Ziv Foundation</span>
          <h2 className="section-title">Reinventing Vetting & Donor Trust</h2>
          <p className="section-description">
            Every organization on the Ziv Platform undergoes multi-tier audit checks before receiving official verification certificates.
          </p>
        </div>

        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3>Rigorous Moderation</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.6', fontSize: '0.925rem' }}>
              Our admin vetting panel cross-references tax-exempt documentation, registration certificates, and operational history to prevent fraudulent activity.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <h3>Verifiable Honors & Badges</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.6', fontSize: '0.925rem' }}>
              Donors and organizations earn cryptographically signed digital certificates for contributions, easily shared and audited online.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3>Real-Time Audit Records</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.6', fontSize: '0.925rem' }}>
              Detailed donation logs, review moderation flags, and broadcast announcements keep all stakeholders updated in real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
