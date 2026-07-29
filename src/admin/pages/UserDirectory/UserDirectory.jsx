import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './UserDirectory.css';

const UserDirectory = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [actionError, setActionError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.users.list();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load user directories', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const handleGlobalSuccess = () => {
      fetchUsers();
    };
    window.addEventListener('on-behalf-success', handleGlobalSuccess);
    return () => {
      window.removeEventListener('on-behalf-success', handleGlobalSuccess);
    };
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const actionWord = currentStatus === 'Active' ? 'suspend' : 'activate';
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
      setActionError(null);
      try {
        await api.users.toggleStatus(userId);
        await fetchUsers();
        Swal.fire({
          title: 'Success!',
          text: `User account has been ${actionWord}ed successfully.`,
          icon: 'success',
          confirmButtonColor: 'var(--primary)'
        });
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: `Could not update user status: ${err.message}`,
          icon: 'error',
          confirmButtonColor: 'var(--primary)'
        });
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="directory-view">
      <div className="glass-card controls-card flex-between">
        <div className="filters-group">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="form-control filter-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Donor">Donors Only</option>
            <option value="Seeker">Seekers Only</option>
          </select>

          <select 
            className="form-control filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <Link to="/admin/on-behalf" className="btn btn-primary">
          <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span> On-Behalf Creation
        </Link>
      </div>

      {actionError && <div className="alert-box alert-danger mt-4">{actionError}</div>}

      <div className="glass-card mt-4 table-card">
        {loading ? (
          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>S.No.</th>
                  <th>User Details</th>
                  <th>Contact Info</th>
                  <th>System Role</th>
                  <th>Blood Group</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array(6).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'center' }}><Skeleton width={20} /></td>
                    <td><Skeleton width={110} height={14} /></td>
                    <td><Skeleton width={150} height={14} /><br /><Skeleton width={100} height={12} style={{ marginTop: 4 }} /></td>
                    <td><Skeleton width={60} height={22} borderRadius={20} /></td>
                    <td><Skeleton width={40} height={22} borderRadius={6} /></td>
                    <td><Skeleton width={90} height={14} /></td>
                    <td><Skeleton width={70} height={22} borderRadius={20} /></td>
                    <td><Skeleton width={70} height={30} borderRadius={8} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p style={{ padding: '3rem', color: 'var(--text-muted)' }} className="text-center">No users matching search filters found.</p>
        ) : (
          <div className="table-container" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>S.No.</th>
                  <th>User Details</th>
                  <th>Contact Info</th>
                  <th>System Role</th>
                  <th>Blood Group</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, index) => (
                  <tr key={u.id}>
                    <td style={{ textAlign: 'center', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {index + 1}
                    </td>
                    <td>
                      <span className="user-name">{u.name}</span>
                    </td>
                    <td>
                      <div className="contact-details">
                        <span className="contact-email">{u.email}</span>
                        <span className="contact-phone">{u.phone}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${u.role === 'Donor' ? 'role-donor-badge' : 'role-seeker-badge'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className="blood-badge badge-blood">{u.bloodGroup}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{u.joinedDate}</td>
                    <td>
                      <span className={`badge badge-${u.status.toLowerCase()}`}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          className="btn btn-sm btn-details-outline"
                          onClick={() => navigate(`/admin/users/${u.id}`)}
                          title="View Full Details"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Details
                        </button>
                        <button
                          className={`btn btn-sm ${u.status === 'Active' ? 'btn-danger-outline' : 'btn-success-outline'}`}
                          onClick={() => handleToggleStatus(u.id, u.status)}
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
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

export default UserDirectory;
