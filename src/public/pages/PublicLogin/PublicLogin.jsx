import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  FaCheckCircle,
  FaRedo,
  FaShieldAlt
} from 'react-icons/fa';
import indiaFlag from '../../../assets/icons/india.png';
import logoZf from '../../../assets/logo.png';
import loginBg from '../../../assets/bg/login-bg.jpg';
import './PublicLogin.css';

const MOCK_REGISTERED_PHONES = {
  donor: ['9876543210', '9999999999', '8888888888'],
  requestor: ['9123456789', '9435012345', '9854012345']
};

const PublicLogin = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Role Tab State ('donor' | 'requestor')
  const initialRole = searchParams.get('role') === 'requestor' ? 'requestor' : 'donor';
  const [activeRole, setActiveRole] = useState(initialRole);

  // Form & OTP States
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync URL search params with active role
  useEffect(() => {
    const roleInUrl = searchParams.get('role');
    if (roleInUrl === 'requestor' || roleInUrl === 'donor') {
      setActiveRole(roleInUrl);
    }
  }, [searchParams]);

  // Resend Countdown Timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    setSearchParams({ role });
    setError(null);
    setOtpSent(false);
    setOtpCode('');
  };

  const handleSendOtp = () => {
    setError(null);
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setOtpSent(true);
    setCountdown(30);
    setOtpCode('');
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setError(null);

    if (!otpSent) {
      setError('Please enter mobile number and click Get Verification OTP.');
      return;
    }
    if (otpCode !== '123456') {
      setError('Invalid OTP code. Please enter the verification code 123456.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const registeredList = [
        ...MOCK_REGISTERED_PHONES.donor,
        ...MOCK_REGISTERED_PHONES.requestor
      ];
      const isRegistered = registeredList.includes(phone);

      if (isRegistered) {
        navigate(activeRole === 'donor' ? '/register?role=donor' : '/emergency-request');
      } else {
        navigate(`/register?role=${activeRole}&phone=${phone}`);
      }
    }, 500);
  };

  return (
    <div
      className="nem-login-page"
      style={{
        backgroundImage: `linear-gradient(135deg, rgb(215 128 128 / 88%) 0%, rgb(76 67 67 / 82%) 50%, rgba(10, 17, 30, 0.92) 100%), url(${loginBg})`
      }}
    >
      <div className="nem-glow-effect"></div>

      <div className="nem-login-wrapper">
        <div className="nem-login-card animate-fade">

          {/* 1. Header Branding */}
          <div className="nem-brand-header">
            <div className="nem-brand-logo-row">
              <img src={logoZf} alt="Ziv Foundation" className="nem-brand-logo" />
            </div>
          </div>

          {/* 2. Sleek 2-Pill Segment Switcher (Exact Nemcare Header Switch) */}
          <div className="nem-pill-switcher">
            <button
              type="button"
              className={`nem-pill-btn ${activeRole === 'donor' ? 'active' : ''}`}
              onClick={() => handleRoleChange('donor')}
            >
              Donor
            </button>
            <button
              type="button"
              className={`nem-pill-btn ${activeRole === 'requestor' ? 'active' : ''}`}
              onClick={() => handleRoleChange('requestor')}
            >
              Requestor
            </button>
          </div>

          {/* 3. Section Title & Subtitle */}
          <div className="nem-title-section">
            <h2 className="nem-main-title">
              {activeRole === 'donor' ? 'Donor Sign In' : 'Requestor Sign In'}
            </h2>
            <p className="nem-main-subtitle">
              {activeRole === 'donor'
                ? 'Sign in to access your donation portal & emergency alerts'
                : 'Sign in to track active blood requisitions & find lifesavers'}
            </p>
          </div>

          {/* 4. Error Banner */}
          {error && (
            <div className="nem-alert nem-alert-danger animate-shake">
              <FaShieldAlt className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* 5. Pure Mobile OTP Authentication Form */}
          <form onSubmit={handleUserLogin} className="nem-form" autoComplete="off">
            <div className="nem-form-group">
              <label className="nem-form-label">
                <span>REGISTERED INDIAN MOBILE NUMBER</span>
                <span className="req-star">*</span>
              </label>
              <div className="nem-input-container phone-input-box">
                <div className="nem-country-prefix">
                  <img src={indiaFlag} alt="IN" className="nem-flag-img" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  className="nem-form-control phone-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  disabled={otpSent}
                  autoFocus
                  required
                />
              </div>
              {!otpSent && (
                <span className="nem-input-hint">
                  We will send a 6-digit one-time code to this number.
                </span>
              )}
            </div>

            {!otpSent ? (
              <button
                type="button"
                className="nem-btn-primary w-full"
                onClick={handleSendOtp}
              >
                <span>Get Verification OTP</span>
              </button>
            ) : (
              <div className="nem-otp-panel animate-fade">
                <div className="nem-alert nem-alert-success">
                  <FaCheckCircle className="success-icon" />
                  <div className="success-content">
                    <strong>OTP Sent Successfully</strong>
                    <p>A 6-digit verification code has been dispatched to +91 {phone}</p>
                  </div>
                </div>

                <div className="nem-form-group">
                  <div className="nem-label-row">
                    <label className="nem-form-label">ENTER 6-DIGIT OTP CODE</label>
                    {countdown > 0 ? (
                      <span className="nem-resend-timer">Resend in <strong>{countdown}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        className="nem-resend-btn"
                        onClick={handleSendOtp}
                      >
                        <FaRedo className="resend-icon" /> Resend
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    className="nem-form-control nem-otp-input"
                    placeholder="••••••"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="nem-btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Verifying Security Code...</span>
                  ) : (
                    <span>Sign In as {activeRole === 'donor' ? 'Donor' : 'Requestor'}</span>
                  )}
                </button>

                <button
                  type="button"
                  className="nem-change-num-btn"
                  onClick={() => { setOtpSent(false); setOtpCode(''); }}
                >
                  Change Mobile Number
                </button>
              </div>
            )}
          </form>

          {/* 6. Registration Link */}
          <div className="nem-footer-section">
            <div className="nem-reg-prompt">
              <span>Don't have an account?</span>{' '}
              <Link
                to={`/register?role=${activeRole}`}
                className="nem-reg-link"
              >
                Register as {activeRole === 'donor' ? 'Donor' : 'Requestor'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLogin;
