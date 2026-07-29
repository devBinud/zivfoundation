import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import MetricsCard from '../../components/MetricsCard/MetricsCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    usersCount: 0,
    donorsCount: 0,
    seekersCount: 0,
    activeUsersCount: 0,
    partnersCount: 0,
    pendingRequestsCount: 0,
    approvedRequestsCount: 0,
    totalRequestsCount: 0,
    pendingFlaggedReviewsCount: 0,
    resolvedFlaggedReviewsCount: 0,
    activeDonorsCount: 0,
    suspendedDonorsCount: 0,
    activeSeekersCount: 0,
    suspendedSeekersCount: 0
  });

  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [users, partners, requests, disputes] = await Promise.all([
        api.users.list(),
        api.partners.list(),
        api.requests.list(),
        api.disputes.list()
      ]);

      const donors = users.filter(u => u.role === 'Donor').length;
      const seekers = users.filter(u => u.role === 'Seeker').length;
      const activeUsers = users.filter(u => u.status === 'Active').length;
      const activeDonors = users.filter(u => u.role === 'Donor' && u.status === 'Active').length;
      const suspendedDonors = users.filter(u => u.role === 'Donor' && u.status === 'Suspended').length;
      const activeSeekers = users.filter(u => u.role === 'Seeker' && u.status === 'Active').length;
      const suspendedSeekers = users.filter(u => u.role === 'Seeker' && u.status === 'Suspended').length;

      const pendingReqs = requests.filter(r => r.status === 'Pending').length;
      const approvedReqs = requests.filter(r => r.status === 'Approved').length;
      const pendingDisps = disputes.filter(d => d.status === 'Pending').length;
      const resolvedDisps = disputes.filter(d => d.status === 'Resolved').length;

      setStats({
        usersCount: users.length,
        donorsCount: donors,
        seekersCount: seekers,
        activeUsersCount: activeUsers,
        partnersCount: partners.length,
        pendingRequestsCount: pendingReqs,
        approvedRequestsCount: approvedReqs,
        totalRequestsCount: requests.length,
        pendingFlaggedReviewsCount: pendingDisps,
        resolvedFlaggedReviewsCount: resolvedDisps,
        activeDonorsCount: activeDonors,
        suspendedDonorsCount: suspendedDonors,
        activeSeekersCount: activeSeekers,
        suspendedSeekersCount: suspendedSeekers
      });

      setRecentRequests(requests.slice(0, 5));
      setLoading(false);
    } catch (err) {
      console.error('Failed to load dashboard statistics', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const handleGlobalSuccess = () => {
      fetchDashboardData();
    };
    window.addEventListener('on-behalf-success', handleGlobalSuccess);
    return () => {
      window.removeEventListener('on-behalf-success', handleGlobalSuccess);
    };
  }, []);

  const bloodGroupData = React.useMemo(() => [
    { name: 'O+', count: 8 },
    { name: 'O-', count: 4 },
    { name: 'A+', count: 5 },
    { name: 'A-', count: 2 },
    { name: 'B+', count: 6 },
    { name: 'B-', count: 1 },
    { name: 'AB+', count: 3 },
    { name: 'AB-', count: 2 }
  ], []);

  const requestsTrendData = React.useMemo(() => [
    { name: 'Jan', requests: 2 },
    { name: 'Feb', requests: 5 },
    { name: 'Mar', requests: 8 },
    { name: 'Apr', requests: 12 },
    { name: 'May', requests: 9 },
    { name: 'Jun', requests: 15 },
    { name: 'Jul', requests: 18 }
  ], []);

  const statusDistributionData = React.useMemo(() => [
    { name: 'Pending', value: stats.pendingRequestsCount || 2, color: '#f59e0b' },
    { name: 'Approved', value: stats.approvedRequestsCount || 1, color: '#3b82f6' },
    { name: 'Completed', value: 3, color: '#10b981' },
    { name: 'Rejected', value: stats.pendingFlaggedReviewsCount || 1, color: '#ef4444' }
  ], [stats.pendingRequestsCount, stats.approvedRequestsCount, stats.pendingFlaggedReviewsCount]);

  const donorRegistrationData = React.useMemo(() => [
    { name: 'Jan', donors: 4 },
    { name: 'Feb', donors: 7 },
    { name: 'Mar', donors: 5 },
    { name: 'Apr', donors: 10 },
    { name: 'May', donors: 8 },
    { name: 'Jun', donors: 14 },
    { name: 'Jul', donors: 12 }
  ], []);

  return (
    <div className="dashboard-view">
      {/* Metrics Row */}
      {loading ? (
        <div className="metrics-grid">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Skeleton width={130} height={14} />
                <Skeleton width={42} height={42} borderRadius={10} />
              </div>
              <Skeleton width={70} height={36} />
            </div>
          ))}
        </div>
      ) : (
        <div className="metrics-grid">
          <MetricsCard
            title="Total Registered Users"
            value={stats.usersCount}
            status="primary"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />

          <MetricsCard
            title="Total Donors"
            value={stats.donorsCount}
            status="danger"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            }
          />

          <MetricsCard
            title="Total Seekers"
            value={stats.seekersCount}
            status="warning"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            }
          />

          <MetricsCard
            title="Total Partners"
            value={stats.partnersCount}
            status="success"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
              </svg>
            }
          />
        </div>
      )}

      {/* Analytics Grid */}
      {loading ? (
        <div>
          <div className="dashboard-grid mt-4">
            <div className="glass-card" style={{ padding: '1.5rem', height: '280px' }}>
              <Skeleton width={180} height={18} style={{ marginBottom: '1.5rem' }} />
              <Skeleton width={'100%'} height={180} />
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', height: '280px' }}>
              <Skeleton width={160} height={18} style={{ marginBottom: '1.5rem' }} />
              <Skeleton width={'100%'} height={12} style={{ marginBottom: '0.5rem' }} />
              <Skeleton width={'100%'} height={8} borderRadius={999} style={{ marginBottom: '1.5rem' }} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="analytics-grid mt-4">
            <div className="glass-card chart-card">
              <h3 className="card-headline mb-3">Blood Group Availability</h3>
              <p className="page-subtitle mb-4">Number of active available donors classified by blood group</p>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={bloodGroupData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontSize: '11px' }} />
                    <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '11px' }} />
                    <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card chart-card">
              <h3 className="card-headline mb-3">Blood Requests Trend</h3>
              <p className="page-subtitle mb-4">Monthly aggregation of seeker blood requests submitted to the platform</p>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                  <AreaChart data={requestsTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="requestsColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontSize: '11px' }} />
                    <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="requests" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#requestsColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card chart-card">
              <h3 className="card-headline mb-3">Request Status Distribution</h3>
              <p className="page-subtitle mb-4">Breakdown of seeker blood requests by current moderation status</p>
              <div style={{ width: '100%', height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={statusDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '11px' }} />
                    <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px', color: 'var(--text-secondary)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card chart-card">
              <h3 className="card-headline mb-3">Donor Registration Trend</h3>
              <p className="page-subtitle mb-4">Outreach growth showing monthly count of newly registered blood donors</p>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={donorRegistrationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontSize: '11px' }} />
                    <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-primary)', borderRadius: '8px', fontSize: '11px' }} />
                    <Bar dataKey="donors" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="dashboard-bottom-grid mt-4">
            <div className="glass-card dashboard-requests-card-full">
              <div className="flex-between mb-4">
                <h3 className="card-headline">Active Request Dispatch</h3>
                <Link to="/admin/requests" className="btn btn-secondary btn-sm-text">View All Queue</Link>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                {recentRequests.length === 0 ? (
                  <p style={{ padding: '2rem', color: 'var(--text-muted)' }} className="text-center">No blood requests currently registered.</p>
                ) : (
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Seeker</th>
                        <th>Group</th>
                        <th>Required Qty</th>
                        <th>Urgency</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRequests.map(r => (
                        <tr key={r.id}>
                          <td>{r.seekerName}</td>
                          <td>
                            <span className="blood-group-tag">{r.bloodGroup}</span>
                          </td>
                          <td>{r.unitsNeeded} Units</td>
                          <td>{r.urgency}</td>
                          <td>
                            <span className={`badge badge-${r.status.toLowerCase()}`}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <Link to="/admin/requests" className="btn btn-secondary btn-sm-text" style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', borderRadius: '6px' }}>View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="glass-card activity-timeline-card">
              <h3 className="card-headline mb-4">System Activity Log</h3>

              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-badge danger"></div>
                  <div className="timeline-content">
                    <p className="timeline-text"><strong>AB- request</strong> created by Hiten Kalita</p>
                    <span className="timeline-time">5 mins ago</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge success"></div>
                  <div className="timeline-content">
                    <p className="timeline-text"><strong>Donor Nabajit</strong> approved & verified</p>
                    <span className="timeline-time">2 hours ago</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge primary"></div>
                  <div className="timeline-content">
                    <p className="timeline-text"><strong>New donor</strong> Jahnabi Deka registered</p>
                    <span className="timeline-time">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
