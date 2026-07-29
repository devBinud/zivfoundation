import React from 'react';
import { Link } from 'react-router-dom';

const PublicAbout = () => {
  return (
    <div className="public-about-page">
      <section className="hero-section" style={{ paddingBottom: '3rem' }}>
        <div className="hero-container">
          <h1 className="hero-title">
            Building the Standard of <span className="gradient-text">Trust in Global Charity</span>
          </h1>
          <p className="hero-subtitle">
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
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
            <h4>Uncompromising Integrity</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              No NGO is accredited without thorough vetting against international standards and fraud registries.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📜</div>
            <h4>Verifiable Proof</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Digital honors and donation certificates issued by Ziv can be audited online anytime.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌍</div>
            <h4>Global Inclusivity</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Empowering grassroots non-profits alongside international NGOs with equal tools for visibility.
            </p>
          </div>

          <div className="glass-card text-center" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
            <h4>Rapid Moderation</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
              Our admin panel processes requests and flag reviews quickly to ensure seamless cause deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="cta-banner">
          <h2 className="cta-title">Need to verify a Ziv Foundation Certificate?</h2>
          <p className="cta-text">
            Enter any certificate ID in our verification engine or log into the admin portal to manage honors.
          </p>
          <div className="flex-center gap-3">
            <Link to="/contact" className="btn btn-primary btn-hero-lg">
              Contact Verification Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicAbout;
