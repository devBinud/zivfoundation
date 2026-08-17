import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaAmbulance,
  FaPhoneAlt,
  FaHospital,
  FaUserInjured,
  FaTint,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShareAlt,
  FaWhatsapp,
  FaCopy,
  FaFileUpload,
  FaShieldAlt,
  FaHeartbeat,
  FaUsers
} from 'react-icons/fa';
import './PublicEmergencySOS.css';

const ASSAM_DISTRICTS = [
  'Kamrup Metropolitan (Guwahati)',
  'Kamrup Rural',
  'Dibrugarh',
  'Cachar (Silchar)',
  'Jorhat',
  'Sonitpur (Tezpur)',
  'Nagaon',
  'Tinsukia',
  'Barpeta',
  'Bongaigaon',
  'Sivasagar',
  'Golaghat',
  'Dhubri',
  'Karimganj',
  'Goalpara',
  'Lakhimpur',
  'Darrang',
  'Morigaon',
  'Nalbari',
  'Hailakandi',
  'Kokrajhar',
  'Chirang',
  'Baksa',
  'Udalguri',
  'Dima Hasao',
  'Karbi Anglong',
  'Dhemaji',
  'Biswanath',
  'Charaideo',
  'Hojai',
  'Majuli',
  'South Salmara-Mankachar',
  'West Karbi Anglong',
  'Bajali',
  'Tamulpur'
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PublicEmergencySOS = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    gender: 'Male',
    bloodGroup: 'B+',
    unitsRequired: 1,
    hospitalName: '',
    district: 'Jorhat',
    hospitalWard: '',
    contactName: '',
    contactPhone: '',
    urgencyReason: 'Accident / Trauma',
    prescriptionFile: null
  });

  const [submittedSos, setSubmittedSos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBloodSelect = (group) => {
    setFormData(prev => ({
      ...prev,
      bloodGroup: group
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        prescriptionFile: e.target.files[0].name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const generatedId = `SOS-AS-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedSos({
        ...formData,
        sosId: generatedId,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notifiedDonors: Math.floor(25 + Math.random() * 30)
      });
      setLoading(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 800);
  };

  const handleCopyLink = () => {
    if (submittedSos) {
      navigator.clipboard.writeText(
        `🚨 CRITICAL SOS: Blood required for ${submittedSos.patientName} (${submittedSos.bloodGroup}, ${submittedSos.unitsRequired} Units) at ${submittedSos.hospitalName}, ${submittedSos.district}. Contact: ${submittedSos.contactPhone}. Help save a life!`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="public-emergency-page">
      {/* 1. Top Urgent Hero Section */}
      <section className="emergency-hero-banner">
        <div className="emergency-hero-container">
          <div className="emergency-alert-pill">
            <span className="live-sos-beacon"></span>
            <span>24/7 DISTRICT BLOOD BROADCAST ACTIVE</span>
          </div>

          <h1 className="emergency-hero-title">
            Emergency Blood SOS Broadcast
          </h1>

          <p className="emergency-hero-sub">
            Fast-track volunteer donor notification network across Assam. Alerts are verified and dispatched immediately to active nearby donors within a 15 km radius.
          </p>

          <div className="emergency-hotline-strip">
            <div className="hotline-strip-item">
              <FaPhoneAlt className="h-icon" />
              <span>Direct Emergency Helpdesk: <strong>+91 94350 12345</strong></span>
            </div>
            <span className="strip-sep">|</span>
            <div className="hotline-strip-item">
              <FaShieldAlt className="h-icon" />
              <span>100% Free & Non-Commercial Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="emergency-main-container">
        
        {/* If SOS Submitted: Show Confirmation Hub */}
        {submittedSos ? (
          <div className="sos-success-hub">
            <div className="sos-success-header">
              <div className="sos-check-badge">
                <FaCheckCircle />
              </div>
              <div>
                <h2>Emergency SOS Broadcast Dispatched!</h2>
                <p>SOS Ticket: <strong className="sos-highlight-id">{submittedSos.sosId}</strong> · Submitted at {submittedSos.submittedAt}</p>
              </div>
            </div>

            <div className="sos-radar-status-card">
              <div className="radar-animation">
                <div className="radar-circle circle-1"></div>
                <div className="radar-circle circle-2"></div>
                <div className="radar-circle circle-3"></div>
                <FaHeartbeat className="radar-center-icon" />
              </div>
              <div className="radar-details">
                <h4>Notifying Active Donors in Real-Time</h4>
                <p>
                  Broadcasting to <strong>{submittedSos.notifiedDonors} active {submittedSos.bloodGroup} voluntary donors</strong> in and around {submittedSos.district}.
                </p>
                <div className="radar-pills">
                  <span className="radar-pill green">⚡ Instant SMS Dispatched</span>
                  <span className="radar-pill red">🚨 Coordinator Priority Desk Alerted</span>
                </div>
              </div>
            </div>

            <div className="sos-summary-grid">
              <div className="summary-item">
                <span className="s-label">Patient Name</span>
                <span className="s-value">{submittedSos.patientName} ({submittedSos.gender}, {submittedSos.patientAge} yrs)</span>
              </div>
              <div className="summary-item">
                <span className="s-label">Blood Group & Units</span>
                <span className="s-value text-red font-bold">{submittedSos.bloodGroup} · {submittedSos.unitsRequired} Unit(s)</span>
              </div>
              <div className="summary-item">
                <span className="s-label">Hospital & Location</span>
                <span className="s-value">{submittedSos.hospitalName}, {submittedSos.district}</span>
              </div>
              <div className="summary-item">
                <span className="s-label">Emergency Attendant</span>
                <span className="s-value">{submittedSos.contactName} ({submittedSos.contactPhone})</span>
              </div>
            </div>

            <div className="sos-share-actions">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `🚨 URGENT BLOOD SOS: ${submittedSos.unitsRequired} unit(s) of ${submittedSos.bloodGroup} urgently needed for ${submittedSos.patientName} at ${submittedSos.hospitalName}, ${submittedSos.district}. Call immediately: ${submittedSos.contactPhone}. Verified via Ziv Network.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sos-whatsapp-btn"
              >
                <FaWhatsapp /> Share on WhatsApp Groups
              </a>

              <button type="button" onClick={handleCopyLink} className="sos-copy-btn">
                <FaCopy /> {copied ? 'SOS Message Copied!' : 'Copy Alert Text'}
              </button>

              <button
                type="button"
                onClick={() => setSubmittedSos(null)}
                className="sos-new-btn"
              >
                Create Another SOS
              </button>
            </div>
          </div>
        ) : (
          <div className="emergency-single-card-wrapper">
            <div className="emergency-card">
              <div className="card-top-alert">
                <FaExclamationTriangle className="alert-top-icon" />
                <div>
                  <h2 className="form-title">Urgent Blood Requirement Form</h2>
                  <p className="form-subtitle">Fill in critical patient and hospital details to trigger immediate district alerts.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="emergency-form">
                
                {/* Blood Group Selection Grid */}
                <div className="form-section-block">
                  <label className="section-label">
                    <FaTint className="label-icon" /> Select Required Blood Group *
                  </label>
                  <div className="blood-group-selector">
                    {BLOOD_GROUPS.map((group) => (
                      <button
                        key={group}
                        type="button"
                        className={`blood-select-pill ${formData.bloodGroup === group ? 'selected' : ''}`}
                        onClick={() => handleBloodSelect(group)}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Info Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="patientName">Patient Full Name *</label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      placeholder="e.g. Bhaskar Sharma"
                      required
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="sos-input"
                    />
                  </div>

                  <div className="form-row-mini">
                    <div className="form-group">
                      <label htmlFor="patientAge">Age *</label>
                      <input
                        type="number"
                        id="patientAge"
                        name="patientAge"
                        placeholder="e.g. 42"
                        required
                        min="1"
                        max="110"
                        value={formData.patientAge}
                        onChange={handleInputChange}
                        className="sos-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="sos-select"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Units & Urgency Level */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="unitsRequired">Units Required *</label>
                    <input
                      type="number"
                      id="unitsRequired"
                      name="unitsRequired"
                      min="1"
                      max="10"
                      required
                      value={formData.unitsRequired}
                      onChange={handleInputChange}
                      className="sos-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="urgencyLevel">Urgency Level *</label>
                    <select
                      id="urgencyLevel"
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      className="sos-select urgency-select"
                    >
                      <option value="Immediate (< 2 Hours)">🚨 Immediate (Under 2 Hours)</option>
                      <option value="Urgent (2 - 6 Hours)">⚠️ Urgent (2 - 6 Hours)</option>
                      <option value="Within 24 Hours">🕒 Within 24 Hours</option>
                    </select>
                  </div>
                </div>

                {/* Hospital & District */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="hospitalName">
                      <FaHospital className="label-icon-inline" /> Hospital / Blood Bank Name *
                    </label>
                    <input
                      type="text"
                      id="hospitalName"
                      name="hospitalName"
                      placeholder="e.g. GMCH Guwahati / Hayat Hospital"
                      required
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="sos-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">
                      <FaMapMarkerAlt className="label-icon-inline" /> District in Assam *
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="sos-select"
                    >
                      {ASSAM_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ward / Bed No & Reason */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="hospitalWard">Ward / ICU / Bed No. (Optional)</label>
                    <input
                      type="text"
                      id="hospitalWard"
                      name="hospitalWard"
                      placeholder="e.g. ICU Ward Bed #14"
                      value={formData.hospitalWard}
                      onChange={handleInputChange}
                      className="sos-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason">Reason / Medical Diagnosis</label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="sos-select"
                    >
                      <option value="Emergency Surgery">Emergency Surgery</option>
                      <option value="Accident / Trauma">Accident / Road Trauma</option>
                      <option value="Thalassemia Major">Thalassemia Transfusion</option>
                      <option value="Delivery / C-Section">Delivery / Obstetrics</option>
                      <option value="Chemotherapy / Oncology">Chemotherapy / Cancer</option>
                      <option value="Dengue Platelet Drop">Dengue / Platelet Deficiency</option>
                      <option value="Other Medical Emergency">Other Medical Emergency</option>
                    </select>
                  </div>
                </div>

                {/* Contact Attendant */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contactName">Attendant / Contact Person *</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      placeholder="e.g. Manoj Sharma (Brother)"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="sos-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactPhone">
                      <FaPhoneAlt className="label-icon-inline" /> Emergency Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      placeholder="e.g. 9435012345"
                      pattern="[0-9]{10}"
                      required
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="sos-input"
                    />
                  </div>
                </div>

                {/* Prescription Upload (Optional) */}
                <div className="form-group">
                  <label className="upload-label">
                    <FaFileUpload className="label-icon-inline" /> Upload Hospital Requisition / Doctor Slip (Optional)
                  </label>
                  <div className="file-upload-box">
                    <input
                      type="file"
                      id="prescriptionFile"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="file-hidden-input"
                    />
                    <label htmlFor="prescriptionFile" className="upload-dropzone">
                      <FaFileUpload className="drop-icon" />
                      <span>{formData.prescriptionFile ? `Selected: ${formData.prescriptionFile}` : 'Click to attach hospital blood requisition slip'}</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="submit-btn-row">
                  <button
                    type="submit"
                    disabled={loading}
                    className="sos-dispatch-btn"
                  >
                    <FaAmbulance className="btn-icon" />
                    {loading ? 'Dispatched Alerts...' : 'BROADCAST EMERGENCY SOS NOW'}
                  </button>
                  <span className="form-security-note">
                    🔒 No charges are ever requested. Ziv is a 100% voluntary non-profit emergency service.
                  </span>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PublicEmergencySOS;
