import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import loginBg from '../../../assets/bg/login_bg.png';
import logoZf from '../../../assets/logo.png';
import './Login.css';

const Login = () => {
  const { login, isAuthenticated, error: authError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please fill in all authorization fields.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setLocalError(err.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-login-page"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(10, 17, 30, 0.88) 0%, rgba(15, 23, 42, 0.82) 50%, rgba(10, 17, 30, 0.92) 100%), url(${loginBg})`
      }}
    >
      <div className="admin-glow-effect"></div>

      <div className="admin-login-wrapper">
        <div className="admin-login-card animate-fade">
          
          {/* Top Brand Header */}
          <div className="admin-brand-header">
            <img src={logoZf} alt="Ziv Foundation Logo" className="admin-brand-logo" />
          </div>

          {/* 2-Pill Segment Switcher (Nemcare style) */}
          <div className="admin-pill-switcher">
            <button type="button" className="admin-pill-btn active">
              Admin Portal
            </button>
            <Link to="/login" className="admin-pill-btn link-btn">
              Public Portal
            </Link>
          </div>

          {/* Title & Subtitle */}
          <div className="admin-title-section">
            <h2 className="admin-main-title">Administrator Login</h2>
            <p className="admin-main-subtitle">Sign in to access system control panel & settings</p>
          </div>

          {(localError || authError) && (
            <div className="admin-alert-box admin-alert-danger animate-shake">
              <FaShieldAlt className="alert-icon" />
              <span>{localError || authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form" autoComplete="off">
            <div className="admin-form-group">
              <label className="admin-form-label">ADMIN EMAIL ADDRESS</label>
              <div className="admin-input-container">
                <FaEnvelope className="admin-input-icon" />
                <input
                  type="email"
                  className="admin-form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zivfoundation.org"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">PASSWORD</label>
              <div className="admin-input-container">
                <FaLock className="admin-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="admin-form-control has-toggle"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="admin-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="admin-btn-primary w-full" disabled={loading}>
              {loading ? (
                <span className="flex-center gap-2">
                  <span className="spinner-small"></span> Verifying Session...
                </span>
              ) : 'Sign In as Administrator'}
            </button>
          </form>

          <div className="admin-card-footer">
            <div className="admin-footer-copyright">
              © 2026 Ziv Foundation. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
