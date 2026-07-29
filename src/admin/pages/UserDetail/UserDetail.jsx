import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  FaArrowLeft, FaChevronRight, FaHome,
  FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaMapPin,
  FaUser, FaVenusMars, FaBirthdayCake, FaTint,
  FaWeight, FaHospital, FaAmbulance, FaHandHoldingHeart,
  FaBan, FaCheckCircle, FaShieldAlt, FaIdBadge, FaCalendarAlt,
  FaUserSlash, FaUserCheck, FaFileAlt, FaBuilding
} from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await api.users.list();
      const found = data.find(u => String(u.id) === String(id));
      setUser(found || null);
    } catch (err) {
      console.error('Failed to load user detail', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, [id]);

  const handleToggleStatus = async () => {
    if (!user) return;
    const isActive = user.status === 'Active';
    const actionWord = isActive ? 'suspend' : 'activate';
    const result = await Swal.fire({
      title: `${actionWord.charAt(0).toUpperCase() + actionWord.slice(1)} User?`,
      text: `Are you sure you want to ${actionWord} this user account?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${actionWord}!`
    });
    if (result.isConfirmed) {
      setActionLoading(true);
      try {
        await api.users.toggleStatus(user.id);
        await fetchUser();
        Swal.fire({ title: 'Done!', text: `User has been ${actionWord}d.`, icon: 'success', confirmButtonColor: 'var(--primary)' });
      } catch (err) {
        Swal.fire('Error!', err.message, 'error');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const InfoRow = ({ label, icon: Icon, value, highlight }) => (
    <div className="ud-info-row">
      <span className="ud-label">
        {Icon && <Icon style={{
          marginRight: 6,
          opacity: 0.6,
          flexShrink: 0,
          transform: Icon === FaPhone ? 'rotate(90deg)' : 'none'
        }} />}
        {label}
      </span>
      <span className={`ud-value${highlight ? ' ud-highlight' : ''}`}>{value || '—'}</span>
    </div>
  );

  const Section = ({ title, icon: Icon, color = 'var(--primary)', children }) => (
    <div className="ud-section">
      <div className="ud-section-header">
        <span className="ud-section-icon-wrap" style={{ background: color + '18', color }}>
          <Icon size={14} style={{ transform: Icon === FaPhone ? 'rotate(90deg)' : 'none' }} />
        </span>
        <h4>{title}</h4>
      </div>
      <div className="ud-section-body">{children}</div>
    </div>
  );

  const isActive = user?.status === 'Active';

  return (
    <div className="ud-page">
      <nav className="ud-breadcrumb-bar" aria-label="breadcrumb">
        <div className="ud-breadcrumb-inner">
          <span className="ud-crumb ud-crumb-home" onClick={() => navigate('/admin')}>
            <FaHome size={12} />
            <span>Home</span>
          </span>
          <FaChevronRight className="ud-crumb-sep" size={10} />
          <span className="ud-crumb ud-crumb-link" onClick={() => navigate('/admin/users')}>
            User Directory
          </span>
          <FaChevronRight className="ud-crumb-sep" size={10} />
          <span className="ud-crumb ud-crumb-active">
            {loading ? <Skeleton width={90} height={12} /> : (user?.name || 'Not Found')}
          </span>
        </div>

        <button className="btn btn-secondary ud-back-btn" onClick={() => navigate('/admin/users')}>
          <FaArrowLeft size={12} />
          Back to Directory
        </button>
      </nav>

      {loading ? (
        <div className="ud-skeleton-wrap glass-card">
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
            <Skeleton circle width={80} height={80} />
            <div style={{ flex: 1 }}>
              <Skeleton width={180} height={22} />
              <Skeleton width={130} height={14} style={{ marginTop: 8 }} />
              <Skeleton width={100} height={12} style={{ marginTop: 6 }} />
            </div>
          </div>
          {Array(8).fill(0).map((_, i) => (
            <Skeleton key={i} height={16} style={{ marginBottom: 14 }} />
          ))}
        </div>
      ) : !user ? (
        <div className="glass-card ud-not-found">
          <FaUserSlash size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>User Not Found</h3>
          <p>The user profile you are looking for does not exist or has been removed.</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/admin/users')}>
            <FaArrowLeft size={12} /> Back to Directory
          </button>
        </div>
      ) : (
        <div className="ud-content-grid">
          <div className="ud-left-col">
            <div className="glass-card ud-hero-card">
              <div className="ud-avatar">{user.name?.charAt(0).toUpperCase()}</div>

              <div className={`ud-status-pill ${isActive ? 'ud-status-active' : 'ud-status-suspended'}`}>
                {isActive
                  ? <>Active</>
                  : <><FaBan size={10} /> Suspended</>
                }
              </div>

              <h2 className="ud-hero-name">{user.name}</h2>
              <p className="ud-hero-email"><FaEnvelope size={11} style={{ marginRight: 5, opacity: 0.6 }} />{user.email}</p>
              <p className="ud-hero-phone"><FaPhone size={11} style={{ marginRight: 5, opacity: 0.6, transform: 'rotate(90deg)' }} />{user.phone}</p>

              <div className="ud-pills">
                <span className={`badge ${user.role === 'Donor' ? 'role-donor-badge' : 'role-seeker-badge'}`}>
                  {user.role === 'Donor'
                    ? <><FaTint size={10} style={{ marginRight: 4 }} />Donor</>
                    : <><FaAmbulance size={10} style={{ marginRight: 4 }} />Seeker</>
                  }
                </span>
                <span className="blood-badge-lg">
                  <MdBloodtype size={13} style={{ marginRight: 3 }} />
                  {user.bloodGroup}
                </span>
              </div>

              <div className="ud-divider" />

              <div className="ud-meta-row">
                <FaCalendarAlt size={12} style={{ color: 'var(--text-muted)' }} />
                <span>Joined <strong>{user.joinedDate}</strong></span>
              </div>
              <div className="ud-meta-row">
                <FaIdBadge size={12} style={{ color: 'var(--text-muted)' }} />
                <span>ID <strong>#{user.id}</strong></span>
              </div>

              <div className="ud-divider" />

              <button
                className={`btn ud-action-btn ${isActive ? 'btn-danger-outline' : 'btn-success-outline'}`}
                onClick={handleToggleStatus}
                disabled={actionLoading}
              >
                {actionLoading
                  ? 'Updating...'
                  : isActive
                    ? <><FaUserSlash size={13} /> Suspend Account</>
                    : <><FaUserCheck size={13} /> Activate Account</>
                }
              </button>
            </div>
          </div>

          <div className="ud-right-col">
            <Section title="Contact Information" icon={FaPhone}>
              <InfoRow label="Email Address" icon={FaEnvelope} value={user.email} />
              <InfoRow label="Phone Number" icon={FaPhone} value={user.phone} />
            </Section>

            <Section title="Address & Region" icon={FaMapMarkerAlt}>
              <InfoRow label="State" icon={FaMapMarkerAlt} value={user.state} />
              <InfoRow label="District" icon={FaMapMarkerAlt} value={user.district} />
              <InfoRow label="Area / Locality" icon={FaMapPin} value={user.area} />
              <InfoRow label="Pincode" icon={FaMapPin} value={user.pincode} />
              <InfoRow label="Current Address" icon={FaHome} value={user.currentAddress} />
              <InfoRow label="Permanent Address" icon={FaBuilding} value={user.permanentAddress} />
            </Section>

            <Section title="Personal Information" icon={FaUser}>
              <InfoRow label="Gender" icon={FaVenusMars} value={user.gender} />
              <InfoRow label="Date of Birth" icon={FaBirthdayCake} value={user.dob} />
              <InfoRow label="Blood Group" icon={FaTint} value={user.bloodGroup} highlight />
            </Section>

            {user.role === 'Donor' ? (
              <Section title="Donor Profile" icon={FaHandHoldingHeart}>
                <InfoRow label="Weight" icon={FaWeight} value={user.weight ? `${user.weight} kg` : null} />
                <InfoRow label="Last Donation" icon={FaCalendarAlt} value={user.lastDonationDate || 'Never donated'} />
                <InfoRow label="Availability" icon={FaCheckCircle} value={user.availability} />
                <InfoRow label="Preferred Locations" icon={FaHospital} value={user.preferredLocations} />
                <InfoRow label="Associated With" icon={FaBuilding} value={user.associatedWith} />
                <InfoRow label="Emergency Contact" icon={FaPhone}
                  value={user.emergencyContactName ? `${user.emergencyContactName} — ${user.emergencyContactPhone}` : null}
                />
              </Section>
            ) : (
              <Section title="Requestor Profile" icon={FaAmbulance}>
                <InfoRow 
                  label="Verification Doc" 
                  icon={FaFileAlt} 
                  value={
                    user.documentName ? (
                      <span className="badge badge-info" style={{ textTransform: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', padding: '0.15rem 0.45rem', border: 'none' }}>
                        📄 {user.documentName}
                      </span>
                    ) : (
                      'None uploaded'
                    )
                  } 
                />
              </Section>
            )}

            <Section title="Account Status" icon={FaShieldAlt}>
              <InfoRow label="System Role" icon={FaIdBadge} value={user.role} />
              <InfoRow label="Account Status" icon={FaShieldAlt} value={user.status} highlight />
              <InfoRow label="Registered On" icon={FaCalendarAlt} value={user.joinedDate} />
              <InfoRow label="User ID" icon={FaIdBadge} value={`#${user.id}`} />
            </Section>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
