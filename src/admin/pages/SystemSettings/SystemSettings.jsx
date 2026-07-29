import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { FaSlidersH, FaSave, FaShieldAlt, FaEnvelope, FaVial } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.settings.get();
      setSettings(data);
      setLoading(false);
    } catch (err) {
      Swal.fire('Error', 'Failed to retrieve portal configurations.', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.settings.update(settings);
      setSaving(false);
      Swal.fire({
        title: 'Settings Saved!',
        text: 'System overrides have been updated and synchronized.',
        icon: 'success',
        confirmButtonColor: 'var(--primary)'
      });
    } catch (err) {
      setSaving(false);
      Swal.fire('Error', `Save failed: ${err.message}`, 'error');
    }
  };

  return (
    <div className="system-settings-view">
      <div className="page-header mb-6">
        <h1 className="page-title">
          System Settings & Rules
        </h1>
        <p className="page-subtitle">
          Configure automated validation rules, recipient parameters, notifications thresholds, and admin timeout behaviors.
        </p>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <Skeleton width={180} height={20} style={{ marginBottom: '1.5rem' }} />
          <Skeleton count={5} height={40} style={{ marginBottom: '1rem' }} />
          <Skeleton width={120} height={40} borderRadius={8} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="grid-2col-1-1" style={{ alignItems: 'start' }}>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="card-headline mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaVial style={{ color: 'var(--primary)' }} /> Verification & Donation Rules
              </h3>

              <div className="form-group mb-4">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <label className="form-label mb-0" style={{ fontWeight: 600 }}>Auto-approve Request Certificates</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '300px' }}>
                      Automatically bypass head Duty Hematologist validation loops if medical code matches emergency status.
                    </p>
                  </div>
                  <label className="switch-wrapper">
                    <input
                      type="checkbox"
                      name="autoApproveVetting"
                      checked={settings.autoApproveVetting}
                      onChange={handleChange}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="form-label" style={{ fontWeight: 600 }}>Donations count for Gold Badge</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Minimum verified donations a donor must complete to unlock Gold Tier status in mobile honors views.
                </p>
                <input
                  type="number"
                  name="minDonationsGold"
                  value={settings.minDonationsGold}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className="form-input"
                  style={{ maxWidth: '120px' }}
                  required
                />
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="card-headline mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaEnvelope style={{ color: 'var(--primary)' }} /> Alert Rules
              </h3>

              <div className="form-group mb-4">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <label className="form-label mb-0" style={{ fontWeight: 600 }}>Email Confirmation Loop</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '300px' }}>
                      Dispatch automated emails to seekers when requests change statuses from pending to approved/rejected.
                    </p>
                  </div>
                  <label className="switch-wrapper">
                    <input
                      type="checkbox"
                      name="emailConfirmation"
                      checked={settings.emailConfirmation}
                      onChange={handleChange}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-group mb-2">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <label className="form-label mb-0" style={{ fontWeight: 600 }}>SMS Alerts for Red Emergencies</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '300px' }}>
                      Send instant SMS gateway updates directly to matched surrounding donors for code-red urgency.
                    </p>
                  </div>
                  <label className="switch-wrapper">
                    <input
                      type="checkbox"
                      name="smsUrgentBroadcasts"
                      checked={settings.smsUrgentBroadcasts}
                      onChange={handleChange}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="card-headline mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaShieldAlt style={{ color: 'var(--primary)' }} /> Security Policies
              </h3>

              <div className="form-group mb-4">
                <label className="form-label" style={{ fontWeight: 600 }}>Admin Inactivity Timeout</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Determine duration of inactivity before admins are signed out of the vetting portal dashboard.
                </p>
                <select
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="form-input"
                  style={{ maxWidth: '180px' }}
                >
                  <option value="15m">15 Minutes</option>
                  <option value="30m">30 Minutes</option>
                  <option value="1h">1 Hour</option>
                  <option value="4h">4 Hours</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <label className="form-label mb-0" style={{ fontWeight: 600 }}>Enforce Multi-Factor Authentication</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '300px' }}>
                      Require two-factor security codes during logins for administrator level access roles.
                    </p>
                  </div>
                  <label className="switch-wrapper">
                    <input
                      type="checkbox"
                      name="enforce2FA"
                      checked={settings.enforce2FA}
                      onChange={handleChange}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h3 className="card-headline mb-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaSlidersH style={{ color: 'var(--primary)' }} /> Options Sync
              </h3>
              <p className="text-center" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '320px' }}>
                Click save to instantly update local caching structures and propagate rule weights down to vetting workflows.
              </p>
              <button type="submit" disabled={saving} className="btn btn-success btn-full-width" style={{ gap: '8px', maxWidth: '240px' }}>
                <FaSave /> {saving ? 'Syncing...' : 'Save Rule Configuration'}
              </button>
            </div>

          </div>
        </form>
      )}
    </div>
  );
};

export default SystemSettings;
