import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaShieldAlt } from 'react-icons/fa';
import indiaFlag from '../../../assets/icons/india.png';
import logoZf from '../../../assets/logo_zf.png';
import './PublicLogin.css';

const MOCK_REGISTERED_PHONES = ['9876543210', '9999999999', '8888888888', '9123456789'];

const PublicLogin = () => {
  const navigate = useNavigate();

  // Form states
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendOtp = () => {
    setError(null);
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setOtpCode('');
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setError(null);

    if (!otpSent) {
      setError('Please enter mobile number and click Send OTP.');
      return;
    }
    if (otpCode !== '123456') {
      setError('Invalid OTP code. Please enter test code 123456.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isRegistered = MOCK_REGISTERED_PHONES.includes(phone);

      if (isRegistered) {
        Swal.fire({
          title: 'Welcome Back!',
          text: `Mobile +91 ${phone} verified. Logged into Ziv Foundation Public Account.`,
          icon: 'success',
          confirmButtonColor: '#800000'
        });
        navigate('/');
      } else {
        Swal.fire({
          title: 'Mobile Verified!',
          text: `Mobile +91 ${phone} is not registered yet. Redirecting to complete registration profile...`,
          icon: 'success',
          confirmButtonColor: '#800000'
        }).then(() => {
          navigate(`/register?phone=${phone}`);
        });
      }
    }, 600);
  };

  return (
    <div className="public-login-page">
      {/* Clean Page Header Banner with Breadcrumbs */}
      <div className="page-breadcrumb-banner">
        <div className="page-breadcrumb-container">
          <h1 className="page-breadcrumb-title">Public Portal Sign In</h1>
          <nav className="page-breadcrumb-nav">
            <Link to="/" className="page-breadcrumb-link">Home</Link>
            <span className="page-breadcrumb-separator">/</span>
            <span className="page-breadcrumb-current">Login</span>
          </nav>
        </div>
      </div>

      <div className="public-login-container">
        <div className="pub-login-card max-w-md mx-auto">
          {/* Header Branding */}
          <div className="pub-login-header text-center">
            <img src={logoZf} alt="Ziv Foundation Logo" className="pub-login-logo" />
            <h2>Ziv Foundation Public Portal</h2>
            <p>Passwordless Mobile OTP Login & Registration</p>
          </div>

          {error && <div className="pub-alert pub-alert-danger mb-4">{error}</div>}

          {/* DONOR / REQUESTOR PUBLIC LOGIN FORM */}
          <form onSubmit={handleUserLogin} className="pub-login-form">
            <div className="pub-form-group mb-4">
              <label className="pub-form-label">Registered Mobile Number</label>
              <div className="pub-phone-input-group">
                <div className="pub-phone-prefix">
                  <img src={indiaFlag} alt="IN" style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  className="pub-phone-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                type="button"
                className="pub-btn pub-btn-secondary w-full mb-4"
                onClick={handleSendOtp}
              >
                Send One-Time Password (OTP)
              </button>
            ) : (
              <div className="pub-form-group mb-4 animate-fade">
                <div className="pub-alert pub-alert-info mb-3">
                  <strong>OTP Dispatched!</strong> Enter 6-digit code sent to +91 {phone} (Test OTP: <strong>123456</strong>)
                </div>
                <label className="pub-form-label">Enter 6-Digit OTP Code</label>
                <input
                  type="text"
                  className="pub-form-control mb-3"
                  placeholder="Enter 123456"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
            )}

            {otpSent && (
              <button type="submit" className="pub-btn pub-btn-primary w-full" disabled={loading}>
                {loading ? 'Verifying OTP...' : 'Verify OTP & Continue'}
              </button>
            )}
          </form>

          {/* Footer Registration Links */}
          <div className="pub-login-footer">
            <div className="pub-reg-prompt">
              <span>New user? Verify mobile above or click below:</span>
              <div className="pub-reg-links mt-2">
                <Link to="/register?role=donor" className="pub-link-highlight">
                  • Register as Voluntary Donor
                </Link>
                <Link to="/register?role=requestor" className="pub-link-highlight">
                  • Register as Blood Requestor
                </Link>
              </div>
            </div>

            <div className="admin-portal-link-box mt-4">
              <Link to="/admin/login" className="admin-redirect-link">
                <FaShieldAlt /> Are you an Administrator? Access Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLogin;
