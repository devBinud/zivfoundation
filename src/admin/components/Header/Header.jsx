import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = ({ onMenuToggle, theme, setTheme }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getShortName = () => {
    if (!user?.name) return 'Admin';
    const parts = user.name.trim().split(' ');
    return parts[parts.length - 1];
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/admin') return ['Ziv Foundation', 'Dashboard'];
    if (path === '/admin/users') return ['Directory Records', 'Users Directory'];
    if (path.startsWith('/admin/users/')) return ['Directory Records', 'User Details'];
    if (path === '/admin/partners') return ['Directory Records', 'Partners Directory'];
    if (path === '/admin/partners/add') return ['Directory Records', 'Add New Organization'];
    if (path === '/admin/requests') return ['Verification Board', 'Request Queue'];
    if (path === '/admin/flagged-reviews') return ['Verification Board', 'Flagged Reviews'];
    if (path === '/admin/on-behalf') return ['User Creation', 'On-Behalf Creation'];
    if (path === '/admin/certificates') return ['Certifications', 'Honors & Awards'];
    if (path.startsWith('/admin/certificates/view/')) return ['Certifications', 'View Certificate'];
    if (path === '/admin/broadcasts') return ['Notifications Setting', 'Broadcast Panel'];
    if (path === '/admin/push-notifications') return ['Notifications Setting', 'Push Campaigns'];
    if (path === '/admin/settings') return ['System Operations', 'System Settings'];
    if (path === '/admin/masters/org-types') return ['Masters', 'Organization Types'];
    return ['Ziv Foundation', 'Console'];
  };

  return (
    <header className="header-nav">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuToggle} aria-label="Toggle Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
        <div className="header-breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
          {getBreadcrumbs().map((crumb, idx, arr) => (
            <React.Fragment key={idx}>
              <span style={{ color: idx === arr.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {crumb}
              </span>
              {idx < arr.length - 1 && <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="header-actions-wrapper">
        <div className="header-profile-container" ref={profileRef}>
          <div 
            className={`header-profile ${profileDropdownOpen ? 'active' : ''}`}
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <div className="profile-details">
              <span className="profile-name">{getShortName()}</span>
            </div>
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'Z'}
            </div>
          </div>

          <div className={`profile-dropdown ${profileDropdownOpen ? 'show' : ''}`}>
            <div className="dropdown-user-info">
              <span className="dropdown-user-name">{user?.name || 'Ziv Admin'}</span>
              <span className="dropdown-user-email">{user?.email || 'admin@zivfoundation.org'}</span>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <button className="dropdown-item" onClick={() => { setProfileDropdownOpen(false); navigate('/admin/settings'); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: 'var(--primary)' }}>
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              View Profile
            </button>
            
            <button className="dropdown-item" onClick={() => { setProfileDropdownOpen(false); navigate('/admin/settings'); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: 'var(--primary)' }}>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Account Settings
            </button>
            
            <div className="dropdown-divider"></div>
            
            <button className="dropdown-item logout-btn" onClick={() => { setProfileDropdownOpen(false); logout(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
