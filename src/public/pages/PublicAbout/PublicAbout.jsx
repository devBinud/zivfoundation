import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCertificate, FaGlobe, FaBolt } from 'react-icons/fa';
import './PublicAbout.css';

const PublicAbout = () => {
  return (
    <div className="public-about-page">
      {/* Page Header Banner with Breadcrumbs */}
      <div className="page-breadcrumb-banner">
        <div className="page-breadcrumb-container">
          <h1 className="page-breadcrumb-title">About Ziv Foundation</h1>
          <nav className="page-breadcrumb-nav">
            <Link to="/" className="page-breadcrumb-link">Home</Link>
            <span className="page-breadcrumb-separator">/</span>
            <span className="page-breadcrumb-current">About Us</span>
          </nav>
        </div>
      </div>

      {/* Intro Header Content */}
      <section className="section-container" style={{ paddingTop: '3rem', paddingBottom: '1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#800000', marginBottom: '1rem', lineHeight: '1.3' }}>
            Building the Standard of Trust in Global Charity
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.75' }}>
            Ziv Foundation was established to bridge the gap between compassionate donors and high-impact non-profit organizations through rigorous background vetting, clear audit metrics, and tamper-proof certificate management.
          </p>
        </div>
      </section>

      <section className="section-container" style={{ paddingTop: '0' }}>
        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1rem' }}>Our Purpose</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Philanthropy requires absolute transparency. Ziv Foundation acts as an independent accreditation body that verifies NGO governance, monitors fund allocations, and safeguards donor confidence worldwide.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1rem' }}>Our Framework</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              We employ a multi-layered moderation pipeline. Applications submitted by NGOs undergo automated background checks, physical document audits, and ongoing review moderation by our panel.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Values */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-tag">Core Principles</span>
          <h2 className="section-title">Values That Drive Every Verification</h2>
        </div>

        <div className="grid-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(128, 0, 0, 0.08)', color: '#800000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem auto' }}>
              <FaShieldAlt />
            </div>
            <h4>Uncompromising Integrity</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              No NGO is accredited without thorough vetting against international standards and fraud registries.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(128, 0, 0, 0.08)', color: '#800000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem auto' }}>
              <FaCertificate />
            </div>
            <h4>Verifiable Proof</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Digital honors and donation certificates issued by Ziv can be audited online anytime.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(128, 0, 0, 0.08)', color: '#800000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem auto' }}>
              <FaGlobe />
            </div>
            <h4>Global Inclusivity</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Empowering grassroots non-profits alongside international NGOs with equal tools for visibility.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(128, 0, 0, 0.08)', color: '#800000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.25rem auto' }}>
              <FaBolt />
            </div>
            <h4>Rapid Moderation</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Our admin panel processes requests and flag reviews quickly to ensure seamless cause deployment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicAbout;
