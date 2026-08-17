import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaTint,
  FaTimes,
  FaAmbulance,
  FaShieldAlt,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaUserCheck,
  FaHeart,
  FaUserCircle
} from 'react-icons/fa';
import './PublicBloodBanks.css';

const VERIFIED_DONORS = [
  {
    id: 'donor-1',
    name: 'Bhaskar Jyoti Sharma',
    initials: 'BJ',
    bloodGroup: 'O+',
    gender: 'Male',
    age: 28,
    district: 'Jorhat',
    area: 'Gar-Ali / Tarajan',
    totalDonations: 8,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Gold Lifesaver',
    badgeType: 'gold',
    phone: '+91 94350 12891',
    whatsapp: '919435012891',
    bio: 'Ready for emergency blood requirements in and around Jorhat Medical College.',
    responseTime: '< 15 mins'
  },
  {
    id: 'donor-2',
    name: 'Ananya Borah',
    initials: 'AB',
    bloodGroup: 'B+',
    gender: 'Female',
    age: 25,
    district: 'Jorhat',
    area: 'Jail Road / Kushraj Area',
    totalDonations: 5,
    lastDonated: '5 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Star Donor',
    badgeType: 'star',
    phone: '+91 98540 33214',
    whatsapp: '919854033214',
    bio: 'Regular platelet and whole blood donor. Available on call.',
    responseTime: '< 20 mins'
  },
  {
    id: 'donor-3',
    name: 'Pranab Kalita',
    initials: 'PK',
    bloodGroup: 'A+',
    gender: 'Male',
    age: 32,
    district: 'Guwahati (Kamrup Metro)',
    area: 'Beltola / Six Mile',
    totalDonations: 12,
    lastDonated: '3 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Champion Donor',
    badgeType: 'champion',
    phone: '+91 98640 55678',
    whatsapp: '919864055678',
    bio: 'Active volunteer coordinator at Guwahati. 12 times whole blood donor.',
    responseTime: '< 15 mins'
  },
  {
    id: 'donor-4',
    name: 'Rituraj Das',
    initials: 'RD',
    bloodGroup: 'AB+',
    gender: 'Male',
    age: 29,
    district: 'Dibrugarh',
    area: 'Barbari / AMCH Circle',
    totalDonations: 6,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Regular Donor',
    badgeType: 'regular',
    phone: '+91 94351 77890',
    whatsapp: '919435177890',
    bio: 'Available near Assam Medical College & Hospital for emergency needs.',
    responseTime: '< 15 mins'
  },
  {
    id: 'donor-5',
    name: 'Debajit Saikia',
    initials: 'DS',
    bloodGroup: 'O-',
    gender: 'Male',
    age: 31,
    district: 'Jorhat',
    area: 'Malow Ali / Bypass',
    totalDonations: 9,
    lastDonated: '3 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Rare Blood Hero',
    badgeType: 'rare',
    phone: '+91 94352 88910',
    whatsapp: '919435288910',
    bio: 'Universal negative O- donor ready to assist in critical trauma surgeries.',
    responseTime: '< 10 mins'
  },
  {
    id: 'donor-6',
    name: 'Priyanka Gogoi',
    initials: 'PG',
    bloodGroup: 'B-',
    gender: 'Female',
    age: 26,
    district: 'Silchar (Cachar)',
    area: 'Ghungoor / Hospital Road',
    totalDonations: 4,
    lastDonated: '6 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Rare Blood Hero',
    badgeType: 'rare',
    phone: '+91 94355 44321',
    whatsapp: '919435544321',
    bio: 'Verified voluntary donor registered with Ziv Barak Valley Chapter.',
    responseTime: '< 25 mins'
  },
  {
    id: 'donor-7',
    name: 'Abhinav Dutta',
    initials: 'AD',
    bloodGroup: 'A-',
    gender: 'Male',
    age: 27,
    district: 'Tezpur (Sonitpur)',
    area: 'Tribeni / Mahabhairab',
    totalDonations: 7,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Gold Lifesaver',
    badgeType: 'gold',
    phone: '+91 94353 99120',
    whatsapp: '919435399120',
    bio: 'Emergency response donor across Sonitpur and Tezpur Medical College.',
    responseTime: '< 20 mins'
  },
  {
    id: 'donor-8',
    name: 'Himanshu Sarmah',
    initials: 'HS',
    bloodGroup: 'O+',
    gender: 'Male',
    age: 34,
    district: 'Jorhat',
    area: 'Rowriah / Lichubari',
    totalDonations: 11,
    lastDonated: '5 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Champion Donor',
    badgeType: 'champion',
    phone: '+91 98541 66789',
    whatsapp: '919854166789',
    bio: '11+ blood donations completed. Passionate voluntary healthcare worker.',
    responseTime: '< 15 mins'
  },
  {
    id: 'donor-9',
    name: 'Dipankar Neog',
    initials: 'DN',
    bloodGroup: 'B+',
    gender: 'Male',
    age: 30,
    district: 'Nagaon',
    area: 'Haiborgaon / Civil Hospital Road',
    totalDonations: 5,
    lastDonated: '3 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Star Donor',
    badgeType: 'star',
    phone: '+91 94357 11234',
    whatsapp: '919435711234',
    bio: 'Registered voluntary donor ready to respond on 30 minutes notice.',
    responseTime: '< 25 mins'
  },
  {
    id: 'donor-10',
    name: 'Juri Dutta',
    initials: 'JD',
    bloodGroup: 'AB-',
    gender: 'Female',
    age: 28,
    district: 'Guwahati (Kamrup Metro)',
    area: 'Chandmari / Zoo Road',
    totalDonations: 4,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Rare Blood Hero',
    badgeType: 'rare',
    phone: '+91 98642 77890',
    whatsapp: '919864277890',
    bio: 'Rare AB- blood donor. Contact for planned surgeries or urgent requests.',
    responseTime: '< 20 mins'
  },
  {
    id: 'donor-11',
    name: 'Manash Pratim Baruah',
    initials: 'MB',
    bloodGroup: 'A+',
    gender: 'Male',
    age: 26,
    district: 'Barpeta',
    area: 'Jotigaon / FAAMC Circle',
    totalDonations: 4,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Regular Donor',
    badgeType: 'regular',
    phone: '+91 94359 88123',
    whatsapp: '919435988123',
    bio: 'Voluntary donor available near Barpeta Medical College.',
    responseTime: '< 20 mins'
  },
  {
    id: 'donor-12',
    name: 'Kaushik Hazarika',
    initials: 'KH',
    bloodGroup: 'O+',
    gender: 'Male',
    age: 33,
    district: 'Jorhat',
    area: 'Bhogdoi Bridge / Club Road',
    totalDonations: 14,
    lastDonated: '3 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Champion Donor',
    badgeType: 'champion',
    phone: '+91 94350 44556',
    whatsapp: '919435044556',
    bio: '14 times voluntary donor. Honored by Ziv Foundation Lifesaver Honor Roll.',
    responseTime: '< 10 mins'
  },
  {
    id: 'donor-13',
    name: 'Pallabi Mahanta',
    initials: 'PM',
    bloodGroup: 'A+',
    gender: 'Female',
    age: 27,
    district: 'Jorhat',
    area: 'Cinammara / Tea Estate Circle',
    totalDonations: 6,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Star Donor',
    badgeType: 'star',
    phone: '+91 94350 77112',
    whatsapp: '919435077112',
    bio: 'Dedicated lifesaver voluntary donor available across Jorhat.',
    responseTime: '< 20 mins'
  },
  {
    id: 'donor-14',
    name: 'Sanjeev Kumar Goswami',
    initials: 'SG',
    bloodGroup: 'B+',
    gender: 'Male',
    age: 36,
    district: 'Guwahati (Kamrup Metro)',
    area: 'Dispur / Last Gate',
    totalDonations: 10,
    lastDonated: '3 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Gold Lifesaver',
    badgeType: 'gold',
    phone: '+91 98640 19283',
    whatsapp: '919864019283',
    bio: 'Ready to assist in emergency pediatric and surgical operations.',
    responseTime: '< 15 mins'
  },
  {
    id: 'donor-15',
    name: 'Suraj Chetri',
    initials: 'SC',
    bloodGroup: 'O+',
    gender: 'Male',
    age: 24,
    district: 'Dibrugarh',
    area: 'Chowkidinghee / Graham Bazar',
    totalDonations: 3,
    lastDonated: '3 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Regular Donor',
    badgeType: 'regular',
    phone: '+91 94351 00293',
    whatsapp: '919435100293',
    bio: 'Youth voluntary blood donor group coordinator in Dibrugarh.',
    responseTime: '< 25 mins'
  },
  {
    id: 'donor-16',
    name: 'Dharitri Das',
    initials: 'DD',
    bloodGroup: 'AB+',
    gender: 'Female',
    age: 29,
    district: 'Jorhat',
    area: 'Boruah Chariali',
    totalDonations: 5,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Star Donor',
    badgeType: 'star',
    phone: '+91 98540 88291',
    whatsapp: '919854088291',
    bio: 'Active donor registered with Ziv Jorhat blood response wing.',
    responseTime: '< 15 mins'
  },
  {
    id: 'donor-17',
    name: 'Bikash Jyoti Nath',
    initials: 'BN',
    bloodGroup: 'O-',
    gender: 'Male',
    age: 30,
    district: 'Guwahati (Kamrup Metro)',
    area: 'Bhangagarh / GMCH Gate',
    totalDonations: 7,
    lastDonated: '5 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Rare Blood Hero',
    badgeType: 'rare',
    phone: '+91 98641 22334',
    whatsapp: '919864122334',
    bio: 'Universal donor residing directly next to GMCH Guwahati.',
    responseTime: '< 5 mins'
  },
  {
    id: 'donor-18',
    name: 'Rupjyoti Medhi',
    initials: 'RM',
    bloodGroup: 'A-',
    gender: 'Male',
    age: 35,
    district: 'Jorhat',
    area: 'Kakatigaon / Bypass',
    totalDonations: 8,
    lastDonated: '4 months ago',
    isAvailable: true,
    isVerified: true,
    donorBadge: 'Rare Blood Hero',
    badgeType: 'rare',
    phone: '+91 94350 99221',
    whatsapp: '919435099221',
    bio: 'Rare A- voluntary donor with verified negative antibody history.',
    responseTime: '< 20 mins'
  }
];

const DISTRICTS = [
  'All Districts',
  'Jorhat',
  'Guwahati (Kamrup Metro)',
  'Dibrugarh',
  'Silchar (Cachar)',
  'Tezpur (Sonitpur)',
  'Nagaon',
  'Barpeta'
];

const BLOOD_GROUPS = ['All', 'A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'];

const PublicBloodBanks = () => {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('All Districts');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDonor, setActiveDonor] = useState(null);

  // Filtered Donors
  const filteredDonors = useMemo(() => {
    return VERIFIED_DONORS.filter((d) => {
      const matchSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.area.toLowerCase().includes(search.toLowerCase()) ||
        d.district.toLowerCase().includes(search.toLowerCase()) ||
        d.bloodGroup.toLowerCase().includes(search.toLowerCase());

      const matchDistrict = district === 'All Districts' || d.district === district;
      const matchGroup = selectedGroup === 'All' || d.bloodGroup === selectedGroup;

      return matchSearch && matchDistrict && matchGroup;
    });
  }, [search, district, selectedGroup]);

  // Reset page to 1 when filters or page size change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, district, selectedGroup, pageSize]);

  // Pagination calculation
  const totalItems = filteredDonors.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="premium-donors-page">
      
      {/* 1. Header Banner */}
      <section className="p-header-section">
        <div className="p-header-container">
          <div className="p-badge-pill">
            <span className="live-dot"></span>
            <span>VOLUNTARY LIFESAVER NETWORK · ASSAM</span>
          </div>

          <h1 className="p-main-title">Verified Blood Donors Directory</h1>
          <p className="p-main-sub">
            Directly connect with certified, active voluntary blood donors across Jorhat and Assam ready for emergency and scheduled transfusions.
          </p>

          {/* Search & Filter Card */}
          <div className="p-filter-card">
            <div className="p-search-row">
              <div className="p-input-box">
                <FaSearch className="p-icon" />
                <input
                  type="text"
                  placeholder="Search donor name, area, hospital, or blood group..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-text-input"
                />
                {search && (
                  <button type="button" onClick={() => setSearch('')} className="p-clear-btn">
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="p-district-box">
                <FaMapMarkerAlt className="p-loc-icon" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="p-select"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blood Group Filter Pills */}
            <div className="p-blood-filter-row">
              <span className="p-filter-label">Filter by Blood Group:</span>
              <div className="p-pills-wrap">
                {BLOOD_GROUPS.map((grp) => (
                  <button
                    key={grp}
                    type="button"
                    className={`p-blood-pill ${selectedGroup === grp ? 'active' : ''}`}
                    onClick={() => setSelectedGroup(grp)}
                  >
                    {grp === 'All' ? 'All Groups' : grp}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Donors Table Section */}
      <div className="p-table-container">
        
        {/* Table Top Bar */}
        <div className="p-table-top-bar">
          <div className="p-entries-selector">
            <label htmlFor="pageSizeSelect">Show</label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="p-entries-select"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>donors per page</span>
          </div>

          <div className="p-top-right">
            <span className="p-results-count">
              Showing <strong>{startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)}</strong> of <strong>{totalItems}</strong> verified donors
            </span>
            <Link to="/emergency-request" className="p-emergency-sos-cta">
              <FaAmbulance /> Broadcast Emergency SOS
            </Link>
          </div>
        </div>

        {/* Elevated Table Card */}
        <div className="p-table-card">
          <div className="p-table-responsive">
            <table className="p-donors-table">
              <thead>
                <tr>
                  <th className="th-donor">Donor Profile</th>
                  <th className="th-blood">Blood Group</th>
                  <th className="th-location">Location & Area</th>
                  <th className="th-donations">Donations</th>
                  <th className="th-status">Live Status</th>
                  <th className="th-actions text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDonors.map((donor) => (
                  <tr
                    key={donor.id}
                    className="p-table-row"
                    onClick={() => setActiveDonor(donor)}
                  >
                    {/* Donor Column: Avatar + Name + Verified Badge + Honor Tag */}
                    <td className="td-donor">
                      <div className="p-donor-profile-cell">
                        <div className="p-avatar-circle">
                          {donor.initials}
                        </div>
                        <div className="p-donor-meta">
                          <div className="p-donor-name-row">
                            <span className="p-donor-name">{donor.name}</span>
                            <FaCheckCircle className="p-check-icon" title="Verified Voluntary Lifesaver" />
                          </div>
                          <span className={`p-honor-tag ${donor.badgeType}`}>
                            <FaAward className="p-honor-icon" /> {donor.donorBadge}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Blood Group Pill */}
                    <td className="td-blood">
                      <div className="p-blood-badge">
                        <FaTint className="p-tint" />
                        <span>{donor.bloodGroup}</span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="td-location">
                      <div className="p-location-cell">
                        <div className="p-area-name">{donor.area}</div>
                        <div className="p-district-name">
                          <FaMapMarkerAlt className="p-pin" /> {donor.district}
                        </div>
                      </div>
                    </td>

                    {/* Donations & Demographics */}
                    <td className="td-donations">
                      <div className="p-donations-cell">
                        <strong className="p-donation-count">{donor.totalDonations} Times</strong>
                        <span className="p-demographics">{donor.age} yrs · {donor.gender}</span>
                      </div>
                    </td>

                    {/* Availability */}
                    <td className="td-status">
                      <span className="p-status-pill">
                        <span className="p-green-beacon"></span> Available Today
                      </span>
                    </td>

                    {/* Direct Actions */}
                    <td className="td-actions text-right">
                      <div className="p-action-group" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="btn-p-connect"
                          onClick={() => setActiveDonor(donor)}
                          title="View Profile & Request Assistance"
                        >
                          <FaHeart className="btn-icon" /> Connect
                        </button>

                        <a
                          href={`https://api.whatsapp.com/send?phone=${donor.whatsapp}&text=${encodeURIComponent(
                            `Hello ${donor.name}, I found your verified donor profile on Ziv Foundation for blood group ${donor.bloodGroup}. We urgently need voluntary blood assistance. Could you please let us know if you are available?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-p-whatsapp"
                          title="Chat on WhatsApp"
                        >
                          <FaWhatsapp />
                        </a>

                        <a
                          href={`tel:${donor.phone}`}
                          className="btn-p-call"
                          title={`Call ${donor.name}`}
                        >
                          <FaPhoneAlt />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedDonors.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-empty-cell">
                      <div className="p-empty-content">
                        <h3>No Donors Found</h3>
                        <p>No verified voluntary donors match your current search and filter settings.</p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch('');
                            setDistrict('All Districts');
                            setSelectedGroup('All');
                          }}
                          className="btn-p-reset"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Pagination Bar */}
          {totalItems > 0 && (
            <div className="p-pagination-bar">
              <div className="p-pagination-info">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (Total <strong>{totalItems}</strong> donors)
              </div>

              <div className="p-pagination-nav">
                <button
                  type="button"
                  className="p-page-btn arrow"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous Page"
                >
                  <FaChevronLeft /> Prev
                </button>

                <div className="p-page-numbers-track">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`p-page-num ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="p-page-btn arrow"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next Page"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. Connect & Profile Modal */}
      {activeDonor && (
        <div className="p-modal-overlay" onClick={() => setActiveDonor(null)}>
          <div className="p-modal-dialog" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button
              type="button"
              className="p-modal-close"
              onClick={() => setActiveDonor(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* Modal Header */}
            <div className="p-modal-header">
              <div className="p-modal-avatar">
                {activeDonor.initials}
              </div>

              <div className="p-modal-title-meta">
                <div className="p-modal-name-row">
                  <h2>{activeDonor.name}</h2>
                  <FaCheckCircle className="p-modal-check" />
                </div>
                <div className="p-modal-sub-tags">
                  <span className="p-modal-blood-pill">
                    <FaTint /> {activeDonor.bloodGroup}
                  </span>
                  <span className={`p-modal-honor-tag ${activeDonor.badgeType}`}>
                    <FaAward /> {activeDonor.donorBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-modal-body">
              
              <div className="p-modal-info-box">
                <div className="p-modal-info-row">
                  <FaMapMarkerAlt className="p-m-icon" />
                  <div>
                    <label>Locality & District</label>
                    <p>{activeDonor.area}, {activeDonor.district}, Assam</p>
                  </div>
                </div>

                <div className="p-modal-info-row">
                  <FaCalendarAlt className="p-m-icon" />
                  <div>
                    <label>Donation History</label>
                    <p>{activeDonor.totalDonations} Completed Donations · Last Donated: {activeDonor.lastDonated}</p>
                  </div>
                </div>

                <div className="p-modal-info-row">
                  <FaUserCheck className="p-m-icon" />
                  <div>
                    <label>Availability & Response Time</label>
                    <p>🟢 Active on call · Usually responds in {activeDonor.responseTime}</p>
                  </div>
                </div>
              </div>

              {/* Note / Bio */}
              <p className="p-modal-bio">
                "{activeDonor.bio}"
              </p>

              {/* Safety Note */}
              <div className="p-modal-safety-banner">
                <FaShieldAlt className="p-shield" />
                <p>
                  <strong>100% Free & Voluntary:</strong> Blood donation is completely free. Never offer or pay money to any voluntary donor.
                </p>
              </div>

              {/* Direct Connect Buttons */}
              <div className="p-modal-actions">
                <a
                  href={`https://api.whatsapp.com/send?phone=${activeDonor.whatsapp}&text=${encodeURIComponent(
                    `Hello ${activeDonor.name}, I found your verified donor profile on Ziv Foundation for blood group ${activeDonor.bloodGroup}. We urgently need voluntary blood assistance. Could you please let us know if you are available?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-p-modal-whatsapp"
                >
                  <FaWhatsapp /> Chat on WhatsApp
                </a>

                <a
                  href={`tel:${activeDonor.phone}`}
                  className="btn-p-modal-phone"
                >
                  <FaPhoneAlt /> Call Donor ({activeDonor.phone})
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PublicBloodBanks;
