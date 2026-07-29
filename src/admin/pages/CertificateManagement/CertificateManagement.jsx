import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { FaEye, FaDownload, FaTrash, FaMedal, FaGem, FaTrophy } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './CertificateManagement.css';

const CertificateManagement = () => {
  const navigate = useNavigate();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCerts = async () => {
    try {
      setLoading(true);
      const data = await api.certificates.list();
      setCerts(data);
      setLoading(false);
    } catch (err) {
      setError('Could not load certificate databases.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleDownload = (cert) => {
    Swal.fire({
      title: 'Downloading Certificate...',
      html: `Preparing PDF for <strong>${cert.donorName}</strong> (${cert.tier} Tier)`,
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        title: 'Download Successful!',
        text: `Donation_Certificate_${cert.donorName.replace(' ', '_')}.pdf has been saved to your downloads.`,
        icon: 'success',
        confirmButtonColor: 'var(--primary)'
      });
    });
  };

  const handleDelete = async (certId) => {
    const result = await Swal.fire({
      title: 'Revoke Certificate?',
      text: 'Are you sure you want to revoke this lifesaver certificate? The donor will lose access to their tier badges.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, revoke it!'
    });

    if (result.isConfirmed) {
      try {
        await api.certificates.delete(certId);
        fetchCerts();
        Swal.fire({
          title: 'Revoked!',
          text: 'The certificate has been successfully removed.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)'
        });
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: `Action failed: ${err.message}`,
          icon: 'error',
          confirmButtonColor: 'var(--primary)'
        });
      }
    }
  };

  const getTierBadgeClass = (tier) => {
    switch (tier.toLowerCase()) {
      case 'platinum': return 'tier-badge-plat';
      case 'gold': return 'tier-badge-gold';
      default: return 'tier-badge-silver';
    }
  };

  return (
    <div className="certs-page-view">
      <div className="page-header mb-6">
        <h1 className="page-title">
          Donation Honors & Certificates
        </h1>
        <p className="page-subtitle">
          Issue, review, and print life-saving certificates for registered donors based on donation activity.
        </p>
      </div>

      {error && <div className="alert-box alert-danger mb-4">{error}</div>}

      <div className="glass-card table-card">
        {loading ? (
          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>S.No.</th>
                  <th>Donor Name</th>
                  <th>Donations</th>
                  <th>Honor Tier</th>
                  <th>Issue Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array(4).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'center' }}><Skeleton width={20} /></td>
                    <td><Skeleton width={140} height={14} /></td>
                    <td><Skeleton width={80} height={14} /></td>
                    <td><Skeleton width={70} height={22} borderRadius={20} /></td>
                    <td><Skeleton width={90} height={14} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Skeleton width={55} height={26} borderRadius={6} />
                        <Skeleton width={55} height={26} borderRadius={6} />
                        <Skeleton width={55} height={26} borderRadius={6} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : certs.length === 0 ? (
          <p style={{ padding: '3rem', color: 'var(--text-muted)' }} className="text-center">No certificates active in logger database.</p>
        ) : (
          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>S.No.</th>
                  <th>Donor Name</th>
                  <th>Donations</th>
                  <th>Honor Tier</th>
                  <th>Issue Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certs.map((c, index) => (
                  <tr key={c.id}>
                    <td style={{ textAlign: 'center', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {index + 1}
                    </td>
                    <td style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{c.donorName}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '500' }}>
                          {c.donationCount} Units Donated
                        </span>
                        <button
                          onClick={() => navigate(`/admin/certificates/history/${c.id}`)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--primary)',
                            fontSize: '0.72rem',
                            fontWeight: '600',
                            padding: 0,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            marginTop: '1px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                          title="Click to view full donation timeline history"
                        >
                          View Donation History
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getTierBadgeClass(c.tier)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.35rem 0.75rem', borderRadius: '30px', textTransform: 'none' }}>
                        {c.tier.toLowerCase() === 'platinum' && <FaGem style={{ color: '#06b6d4' }} />}
                        {c.tier.toLowerCase() === 'gold' && <FaTrophy style={{ color: '#eab308' }} />}
                        {c.tier.toLowerCase() === 'silver' && <FaMedal style={{ color: '#94a3b8' }} />}
                        <span style={{ fontWeight: '600' }}>ৰক্তবন্ধু</span>
                        <span style={{ opacity: 0.8, fontSize: '0.78rem', fontWeight: '500' }}>({c.tier})</span>
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{c.issueDate}</td>
                    <td>
                      <div className="partner-actions-cell">
                        <button className="btn-action-outline btn-view-outline" onClick={() => navigate(`/admin/certificates/view/${c.id}`)} title="View Certificate">
                          <FaEye /> View
                        </button>
                        <button className="btn-action-outline btn-edit-outline" onClick={() => handleDownload(c)} title="Download PDF">
                          <FaDownload /> Print
                        </button>
                        <button className="btn-action-outline btn-delete-outline" onClick={() => handleDelete(c.id)} title="Revoke Certificate">
                          <FaTrash /> Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateManagement;
