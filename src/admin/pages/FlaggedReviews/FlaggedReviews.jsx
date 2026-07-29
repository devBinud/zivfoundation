import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { FaArrowRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './FlaggedReviews.css';

const FlaggedReviews = () => {
  const [flaggedReviews, setFlaggedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlaggedReviews = async () => {
    try {
      setLoading(true);
      const data = await api.disputes.list();
      setFlaggedReviews(data);
      setLoading(false);
    } catch (err) {
      setError('Could not load flagged reviews.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlaggedReviews();
  }, []);

  const handleResolveReview = async (reviewId) => {
    const result = await Swal.fire({
      title: 'Resolve Flagged Review?',
      text: 'Are you sure you want to resolve and dismiss flags for this comment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, resolve!'
    });

    if (result.isConfirmed) {
      setError(null);
      try {
        await api.disputes.resolve(reviewId);
        await fetchFlaggedReviews();
        Swal.fire({
          title: 'Resolved!',
          text: 'Flags have been resolved and settled.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)'
        });
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: `Failed to resolve flags: ${err.message}`,
          icon: 'error',
          confirmButtonColor: 'var(--primary)'
        });
      }
    }
  };

  return (
    <div className="flagged-reviews-view">
      <div className="glass-card controls-card mb-4 flex-between">
        <div>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Flagged Reviews Board</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
            Moderate community reviews, flag comments, or resolve abusive/commercial solicitation reports.
          </p>
        </div>
        <span className="badge badge-secondary">
          Awaiting Action: {flaggedReviews.filter(r => r.status === 'Pending').length}
        </span>
      </div>

      {error && <div className="alert-box alert-danger mb-4">{error}</div>}

      {loading ? (
        <div className="flagged-reviews-stack">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="glass-card flagged-review-card mb-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Skeleton width={90} height={22} borderRadius={6} />
                  <Skeleton width={130} height={14} />
                </div>
                <Skeleton width={80} height={22} borderRadius={6} />
              </div>
              <Skeleton width={200} height={15} style={{ marginBottom: '0.4rem' }} />
              <Skeleton width={280} height={13} style={{ marginBottom: '0.4rem' }} />
              <Skeleton width={240} height={13} style={{ marginBottom: '1rem' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Skeleton width={100} height={26} borderRadius={6} />
              </div>
            </div>
          ))}
        </div>
      ) : flaggedReviews.length === 0 ? (
        <div className="glass-card text-center py-6" style={{ color: 'var(--text-muted)' }}>
          No flagged reviews registered. All clean!
        </div>
      ) : (
        <div className="flagged-reviews-stack">
          {flaggedReviews.map(r => (
            <div key={r.id} className="glass-card flagged-review-card mb-4 animate-fade">
              <div className="flagged-review-header flex-between mb-4">
                <div className="flagged-review-origin">
                  <span className="review-reason-tag">
                    {r.reason}
                  </span>
                  <span className="flagged-review-date-text ml-4">
                    Reported on: {r.dateReported}
                  </span>
                </div>
                <div className="flagged-review-state">
                  <span className={`badge ${r.status === 'Pending' ? 'badge-pending' : 'badge-approved'}`}>
                    {r.status}
                  </span>
                </div>
              </div>

              <div className="flagged-review-participants mb-4">
                <div className="participant">
                  <span className="participant-role">Reporter:</span>
                  <span className="participant-name">{r.reporterName}</span>
                </div>
                <div className="participant-separator" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaArrowRight style={{ color: 'var(--text-muted)' }} />
                </div>
                <div className="participant">
                  <span className="participant-role">Offender:</span>
                  <span className="participant-name">{r.offenderName}</span>
                </div>
              </div>

              <div className="flagged-review-comment-bubble">
                <p className="comment-bubble-label">Flagged Comment Context:</p>
                <blockquote className="comment-quote">
                  "{r.commentText}"
                </blockquote>
              </div>

              <div className="flagged-review-actions mt-4 flex-between">
                <span className="flagged-review-id-tag">Report ID: {r.id}</span>
                {r.status === 'Pending' ? (
                  <button 
                    className="btn-resolve"
                    onClick={() => handleResolveReview(r.id)}
                  >
                    Resolve Report
                  </button>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Resolved & Settled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlaggedReviews;
