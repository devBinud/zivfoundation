import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import logoZf from '../../../assets/logo_zf.png';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, theme, setTheme }) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const menuStructure = [
    {
      id: 'dashboard',
      type: 'link',
      path: '/admin',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      )
    },
    {
      id: 'usercreation',
      type: 'link',
      path: '/admin/on-behalf',
      label: 'User Creation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="16" y1="11" x2="22" y2="11" />
        </svg>
      )
    },
    {
      id: 'masters',
      type: 'dropdown',
      label: 'Masters',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
          <path d="M7 7h.01" />
        </svg>
      ),
      items: [
        {
          path: '/admin/masters/org-types',
          label: 'Organization Types',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'directory',
      type: 'dropdown',
      label: 'Directory Records',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      items: [
        {
          path: '/admin/users',
          label: 'Users Directory',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          )
        },
        {
          path: '/admin/partners/add',
          key: 'partners-add',
          label: 'Add New Organization',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )
        },
        {
          path: '/admin/partners',
          key: 'partners-view',
          label: 'View All Organizations',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1" />
              <path d="M5 21V10.85" />
              <path d="M19 21V10.85" />
              <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'vetting',
      type: 'dropdown',
      label: 'Verification Board',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      items: [
        {
          path: '/admin/requests',
          label: 'Request Queue',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
          )
        },
        {
          path: '/admin/flagged-reviews',
          label: 'Flagged Reviews',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'certifications',
      type: 'dropdown',
      label: 'Certifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      items: [
        {
          path: '/admin/certificates',
          label: 'Honors & Awards',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'notifications',
      type: 'dropdown',
      label: 'Notifications Setting',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      items: [
        {
          path: '/admin/broadcasts',
          label: 'Broadcast Panel',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          )
        },
        {
          path: '/admin/push-notifications',
          label: 'Push Campaigns',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'system',
      type: 'dropdown',
      label: 'System Operations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      items: [
        {
          path: '/admin/settings',
          label: 'System Settings',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'theme',
      type: 'theme-dropdown',
      label: 'Theme Selection'
    },
    {
      id: 'public-portal',
      type: 'link',
      path: '/',
      label: 'Public Website',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      id: 'help-docs',
      type: 'link',
      path: '/admin/help-center',
      label: 'Help & Docs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    }
  ];

  // Auto-expand dropdown section that contains current active path on load/route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = menuStructure.find(
      section => section.type === 'dropdown' &&
        section.items.some(item => currentPath === item.path || currentPath.startsWith(item.path + '/'))
    );
    if (activeSection) {
      setExpandedSections(prev => ({
        ...prev,
        [activeSection.id]: true
      }));
    }
  }, [location.pathname]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem' }}>
        <img src={logoZf} alt="Ziv Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
        <span className="logo-text">Ziv <span style={{ color: 'var(--primary)' }}>Foundation</span></span>
      </div>

      <nav className="sidebar-nav">
        {menuStructure.map((section) => {
          if (section.type === 'link') {
            return (
              <NavLink
                key={section.path}
                to={section.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end={section.path === '/'}
                onClick={onClose}
              >
                <span className="nav-item-icon">{section.icon}</span>
                <span className="nav-item-label">{section.label}</span>
              </NavLink>
            );
          }

          if (section.type === 'theme-dropdown') {
            return (
              <div key={section.id} className="sidebar-dropdown-wrapper">
                <button
                  className={`nav-dropdown-header ${themeDropdownOpen ? 'expanded' : ''}`}
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                >
                  <div className="nav-dropdown-header-left">
                    <span className="nav-item-icon">
                      {theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                      )}
                    </span>
                    <span className="nav-item-label">Theme: {theme === 'light' ? 'Light' : 'Dark'}</span>
                  </div>
                  <span className="nav-chevron-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`chevron-icon-arrow ${themeDropdownOpen ? 'rotated' : ''}`}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>
                <div className={`nav-dropdown-children-container ${themeDropdownOpen ? 'open' : ''}`}>
                  <div className="nav-dropdown-children-inner">
                    <button
                      className={`nav-sub-item-btn ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <span className="nav-sub-item-dot">•</span>
                      <span className="nav-sub-item-label">Light Theme</span>
                    </button>
                    <button
                      className={`nav-sub-item-btn ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <span className="nav-sub-item-dot">•</span>
                      <span className="nav-sub-item-label">Dark Theme</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          const isExpanded = !!expandedSections[section.id];
          const hasActiveChild = section.items.some(
            item => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          );

          return (
            <div key={section.id} className="sidebar-dropdown-wrapper">
              <button
                className={`nav-dropdown-header ${isExpanded ? 'expanded' : ''} ${hasActiveChild ? 'has-active-child' : ''}`}
                onClick={() => toggleSection(section.id)}
              >
                <div className="nav-dropdown-header-left">
                  <span className="nav-item-icon">{section.icon}</span>
                  <span className="nav-item-label">{section.label}</span>
                </div>
                <span className="nav-chevron-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </button>
              <div className={`nav-dropdown-children-container ${isExpanded ? 'open' : ''}`}>
                <div className="nav-dropdown-children-inner">
                  {section.items.map((item) => {
                    const isItemActive = location.pathname === item.path;

                    return (
                      <NavLink
                        key={item.key || item.path}
                        to={item.path}
                        className={() => `nav-sub-item ${isItemActive ? 'active' : ''}`}
                        onClick={onClose}
                      >
                        <span className="nav-sub-item-dot">•</span>
                        <span className="nav-sub-item-label">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-btn" onClick={logout}>
          <span className="nav-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          <span className="nav-item-label">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
