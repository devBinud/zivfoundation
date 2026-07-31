import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './PublicContact.css';

const PublicContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'NGO Accreditation Query',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Message Transmitted!',
      text: 'Thank you for reaching out to Ziv Foundation. Our moderation team will respond within 24 business hours.',
      confirmButtonColor: '#c5112e'
    });
    setFormData({ name: '', email: '', subject: 'NGO Accreditation Query', message: '' });
  };

  return (
    <div className="public-contact-page">
      {/* Page Header Banner with Breadcrumbs */}
      <div className="page-breadcrumb-banner">
        <div className="page-breadcrumb-container">
          <h1 className="page-breadcrumb-title">Contact Us</h1>
          <nav className="page-breadcrumb-nav">
            <Link to="/" className="page-breadcrumb-link">Home</Link>
            <span className="page-breadcrumb-separator">/</span>
            <span className="page-breadcrumb-current">Contact Us</span>
          </nav>
        </div>
      </div>

      <section className="section-container" style={{ paddingTop: '3rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#800000', marginBottom: '0.75rem' }}>
            Get in Touch with Ziv Foundation
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.6' }}>
            Have questions regarding NGO verification, certificate audits, emergency requests, or partnerships? We are here to assist.
          </p>
        </div>
        <div className="grid-container" style={{ gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Contact Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--primary)', paddingTop: '0.2rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <strong>Headquarters</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    Ziv Foundation Global Secretariat<br />
                    100 Transparency Way, Suite 400<br />
                    Geneva, Switzerland
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--primary)', paddingTop: '0.2rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                </div>
                <div>
                  <strong>Email Desk</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    support@zivfoundation.org<br />
                    accreditation@zivfoundation.org
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--primary)', paddingTop: '0.2rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
                </div>
                <div>
                  <strong>Admin Portal Direct</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    Authorized personnel can access the admin dashboard directly via <a href="/admin/login" style={{ color: 'var(--primary)' }}>/admin/login</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row mb-4">
                <div className="form-group flex-1">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Inquiry Subject</label>
                <select
                  className="form-control"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="NGO Accreditation Query">NGO Accreditation & Moderation</option>
                  <option value="Certificate Verification">Certificate Audit & Verification</option>
                  <option value="Corporate Sponsorship">Corporate Sponsorship & CSR</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div className="form-group mb-6">
                <label className="form-label">Message Details</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="How can Ziv Foundation assist your organization?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-hero-lg w-full">
                Send Transmission
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicContact;
