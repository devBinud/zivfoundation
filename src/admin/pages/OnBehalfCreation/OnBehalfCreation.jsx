import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { FaUser, FaTint, FaCheck, FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import indiaFlag from '../../../assets/icons/india.png';
import './OnBehalfCreation.css';

const locationData = {
  "Assam": [
    "Kamrup Metropolitan", "Kamrup", "Jorhat", "Dibrugarh", "Silchar", "Nagaon",
    "Tezpur", "Sivasagar", "Tinsukia", "Bongaigaon", "Barpeta", "Dhubri",
    "Goalpara", "Karimganj", "Lakhimpur", "Dhemaji", "Nalbari", "Darrang"
  ]
};

const checkPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: 'Empty', color: '#6b7280' };
  
  let score = 0;
  const hasMinLength = pwd.length >= 8;
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  const hasUpperLower = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);

  if (hasMinLength) score += 1;
  if (hasNumber) score += 1;
  if (hasSpecial) score += 1;
  if (hasUpperLower) score += 1;

  let label = 'Weak';
  let color = '#ef4444';

  if (score >= 4) {
    label = 'Strong';
    color = '#10b981';
  } else if (score >= 2) {
    label = 'Medium';
    color = '#f59e0b';
  }

  return {
    score,
    label,
    color,
    hasMinLength,
    hasNumber,
    hasSpecial,
    hasUpperLower
  };
};

const OnBehalfCreation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [actionType, setActionType] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    bloodGroup: 'O+',
    currentAddress: '',
    permanentAddress: '',
    state: 'Assam',
    district: 'Kamrup Metropolitan',
    area: '',
    pincode: '',
    password: '',
    identityDocumentType: 'aadhaar',
    weight: '',
    lastDonationDate: '',
    availability: 'Active',
    preferredLocations: '',
    associatedWith: 'Individual',
    emergencyContactName: '',
    emergencyContactPhone: '',
    documentName: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIdFile(file);
      setUserForm(prev => ({ ...prev, documentName: file.name }));
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const sanitized = value.replace(/[^0-9]/g, '');
      setUserForm(prev => ({ ...prev, phone: sanitized }));
    } else if (name === 'currentAddress' && sameAsCurrentAddress) {
      setUserForm(prev => ({ ...prev, currentAddress: value, permanentAddress: value }));
    } else {
      setUserForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSendOtp = () => {
    setError(null);
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userForm.phone)) {
      setError('Please enter a valid 10-digit phone number first.');
      return;
    }
    setOtpSent(true);
    setOtpCode('');
  };

  const handleVerifyOtp = () => {
    setError(null);
    if (otpCode === '123456') {
      setOtpVerified(true);
      setStep(3);
    } else {
      setError('Invalid OTP code. Please enter 123456 to bypass simulation.');
    }
  };

  const nextStep = () => {
    setError(null);
    if (step === 2) {
      if (actionType === 'donor') {
        if (!otpVerified) {
          setError('Please verify the mobile number via OTP before proceeding.');
          return;
        }
      } else {
        if (!userForm.name || !userForm.password || !userForm.gender || !userForm.dob) {
          setError('Please fill in Name, Password, Gender, and Date of Birth.');
          return;
        }
      }
    } else if (step === 3) {
      if (actionType === 'donor') {
        if (!userForm.name || !userForm.email || !userForm.gender || !userForm.dob || !userForm.currentAddress || !userForm.permanentAddress || !userForm.state || !userForm.district || !userForm.area || !userForm.pincode) {
          setError('Please fill in all personal details and address credentials.');
          return;
        }
      } else {
        if (!userForm.district || !userForm.area) {
          setError('Please enter both District and Area.');
          return;
        }
      }
    } else if (step === 4) {
      if (actionType === 'donor') {
        if (!userForm.weight || !userForm.preferredLocations || !userForm.emergencyContactName || !userForm.emergencyContactPhone) {
          setError('Please fill in all donor safety and contact credentials.');
          return;
        }
      } else {
        if (!idFile) {
          setError('Please upload a verification document (e.g. Aadhaar or ID proof).');
          return;
        }
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: userForm.name,
        role: actionType === 'donor' ? 'Donor' : 'Seeker',
        gender: userForm.gender,
        dob: userForm.dob,
        bloodGroup: userForm.bloodGroup,
        district: userForm.district,
        area: userForm.area,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        ...(actionType === 'donor' ? {
          email: userForm.email,
          phone: `+91 ${userForm.phone}`,
          currentAddress: userForm.currentAddress,
          permanentAddress: userForm.permanentAddress,
          state: userForm.state,
          pincode: userForm.pincode,
          weight: userForm.weight,
          lastDonationDate: userForm.lastDonationDate || 'Never',
          availability: userForm.availability,
          preferredLocations: userForm.preferredLocations,
          associatedWith: userForm.associatedWith,
          emergencyContact: `${userForm.emergencyContactName} (${userForm.emergencyContactPhone})`
        } : {
          password: userForm.password,
          identity_document: idFile ? idFile.name : '',
          identity_document_type: userForm.identityDocumentType,
          current_address: userForm.currentAddress || '',
          permanent_address: userForm.permanentAddress || '',
          documentName: idFile ? idFile.name : ''
        })
      };
      await api.users.createOnBehalf(payload);
      Swal.fire({
        title: 'User Profile Created!',
        text: `${actionType === 'donor' ? 'Blood Donor' : 'Blood Requestor'} profile has been registered and initialized in the database.`,
        icon: 'success',
        confirmButtonColor: 'var(--primary)'
      });
      setLoading(false);
      setStep(6);
      window.dispatchEvent(new CustomEvent('on-behalf-success'));
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Action failed. Please try again.',
        icon: 'error',
        confirmButtonColor: 'var(--primary)'
      });
      setLoading(false);
    }
  };

  return (
    <div className="on-behalf-page-view">
      <div className="page-header mb-6">
        <h1 className="page-title">
          User Creation - {actionType === 'donor' ? 'Blood Donor' : 'Blood Requestor'}
        </h1>
        <p className="page-subtitle">
          {actionType === 'donor'
            ? 'Manually initialize blood donor profiles directly into the system database.'
            : 'Manually initialize verified blood requestor (seeker) profiles in the system.'}
        </p>
      </div>

      <div className="glass-card creation-wizard-card">
        <div className="wizard-steps-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`} title="Choose Profile">1</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`} title={actionType === 'donor' ? "Verification" : "Credentials"}>2</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`} title={actionType === 'donor' ? "Personal Info" : "Address Details"}>3</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 4 ? 'active' : ''}`} title={actionType === 'donor' ? "Eligibility Details" : "Upload Document"}>4</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 5 ? 'active' : ''}`} title="Review Details">5</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 6 ? 'active' : ''}`} title="Result">6</div>
        </div>
        <div className="wizard-divider"></div>

        <div className="wizard-body mt-6">
          {error && <div className="alert-box alert-danger mb-4">{error}</div>}

          {step === 1 && (
            <div className="step-content animate-fade">
              <p className="step-desc mb-6 text-center" style={{ color: 'var(--text-secondary)' }}>
                Select the type of admin action you want to initiate on behalf of a user.
              </p>

              <div className="action-cards-grid">
                <div
                  className={`action-card ${actionType === 'donor' ? 'selected' : ''}`}
                  onClick={() => setActionType('donor')}
                >
                  <div className="action-card-icon">
                    <FaTint />
                  </div>
                  <div className="action-card-info">
                    <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Create Blood Donor</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Register a new blood donor directly into the system database.</p>
                  </div>
                </div>

                <div
                  className={`action-card ${actionType === 'requestor' ? 'selected' : ''}`}
                  onClick={() => setActionType('requestor')}
                >
                  <div className="action-card-icon">
                    <FaUser />
                  </div>
                  <div className="action-card-info">
                    <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Create Blood Requestor</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Register a new verified blood requestor (seeker) in the system.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade">
              {actionType === 'donor' ? (
                <>
                  <h3 className="form-subheading mb-4" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Mobile & OTP Verification</h3>

                  <div className="form-group mb-4">
                    <label className="form-label">Mobile Number</label>
                    <div className="phone-input-group">
                      <div className="phone-prefix-box">
                        <img src={indiaFlag} alt="IN" style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        className="phone-input-field"
                        value={userForm.phone}
                        onChange={handleUserChange}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        disabled={otpVerified}
                        required
                      />
                    </div>
                    {!otpSent && !otpVerified && (
                      <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={handleSendOtp}
                        style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                      >
                        Send OTP Verification Code
                      </button>
                    )}
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="form-group mb-4 animate-fade">
                      <div className="alert-box alert-info mb-3" style={{
                        color: 'var(--text-primary)',
                        border: '1px solid hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2)',
                        background: 'var(--primary-light)',
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        lineHeight: '1.4',
                        display: 'block'
                      }}>
                        <strong>OTP Sent!</strong> A 6-digit One-Time Password has been dispatched to +91 {userForm.phone}. (Use mock code <strong style={{ color: 'var(--primary)' }}>123456</strong>)
                      </div>
                      <label className="form-label">Enter 6-Digit OTP Code</label>
                      <input
                        type="text"
                        placeholder="Enter 123456"
                        className="form-control mb-3"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleVerifyOtp}
                        style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="alert-box alert-success mb-4 text-center" style={{ color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem', borderRadius: '6px' }}>
                      <strong>✓ Phone number verified successfully!</strong> Please proceed to the next step.
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="form-subheading mb-4" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Requestor Credentials</h3>

                  <div className="form-row flex-gap mb-4">
                    <div className="form-group flex-1">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={userForm.name}
                        onChange={handleUserChange}
                        placeholder="As per official ID"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Password</label>
                      <input
                        type="text"
                        name="password"
                        className="form-control"
                        value={userForm.password}
                        onChange={handleUserChange}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row flex-gap mb-4">
                    <div className="form-group flex-1">
                      <label className="form-label">Gender</label>
                      <select name="gender" className="form-control" value={userForm.gender} onChange={handleUserChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        max={new Date().toISOString().split('T')[0]}
                        className="form-control"
                        value={userForm.dob}
                        onChange={handleUserChange}
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Blood Group</label>
                      <select name="bloodGroup" className="form-control" value={userForm.bloodGroup} onChange={handleUserChange}>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="step-content animate-fade">
              <h3 className="form-subheading mb-4" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Personal & Address Details</h3>

              <div className="form-row flex-gap mb-4">
                <div className="form-group flex-1">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={userForm.name}
                    onChange={handleUserChange}
                    placeholder="As per official ID"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={userForm.email}
                    onChange={handleUserChange}
                    placeholder="e.g. name@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row flex-gap mb-4">
                <div className="form-group flex-1">
                  <label className="form-label">Current Address</label>
                  <input
                    type="text"
                    name="currentAddress"
                    className="form-control"
                    value={userForm.currentAddress}
                    onChange={handleUserChange}
                    placeholder="Present residence location"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Permanent Address</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    className="form-control"
                    value={userForm.permanentAddress}
                    onChange={handleUserChange}
                    placeholder="Permanent family residence"
                    required
                  />
                </div>
              </div>

              <div className="form-row flex-gap mb-4">
                <div className="form-group flex-1">
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    name="district"
                    className="form-control"
                    value={userForm.district}
                    onChange={handleUserChange}
                    placeholder="Administrative district"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Area</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    value={userForm.area}
                    onChange={handleUserChange}
                    placeholder="Local sector / neighborhood"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content animate-fade">
              {actionType === 'donor' ? (
                <div>
                  <h3 className="form-subheading mb-4" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Become Blood Donor - Eligibility Details</h3>

                  <div className="form-row flex-gap mb-4">
                    <div className="form-group flex-1">
                      <label className="form-label">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        className="form-control"
                        min="45"
                        max="150"
                        value={userForm.weight}
                        onChange={handleUserChange}
                        placeholder="Must be >= 45 kg"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Last Donation Date</label>
                      <input
                        type="date"
                        name="lastDonationDate"
                        className="form-control"
                        value={userForm.lastDonationDate}
                        onChange={handleUserChange}
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Donor Availability Status</label>
                      <select name="availability" className="form-control" value={userForm.availability} onChange={handleUserChange}>
                        <option value="Active">Active Donor</option>
                        <option value="Inactive">Temporarily Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row flex-gap mb-4">
                    <div className="form-group flex-1">
                      <label className="form-label">Preferred Donation Locations</label>
                      <input
                        type="text"
                        name="preferredLocations"
                        className="form-control"
                        value={userForm.preferredLocations}
                        onChange={handleUserChange}
                        placeholder="e.g. GMCH, Baruah Blood Bank"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Associated With</label>
                      <select name="associatedWith" className="form-control" value={userForm.associatedWith} onChange={handleUserChange}>
                        <option value="Individual">Individual</option>
                        <option value="Educational Institution">Educational Institution</option>
                        <option value="NGO">NGO</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Blood Bank">Blood Bank</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row flex-gap mb-4">
                    <div className="form-group flex-1">
                      <label className="form-label">Emergency Contact Name</label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        className="form-control"
                        value={userForm.emergencyContactName}
                        onChange={handleUserChange}
                        placeholder="Contact person's name"
                        required
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label className="form-label">Emergency Contact Phone</label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        className="form-control"
                        value={userForm.emergencyContactPhone}
                        onChange={handleUserChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="form-subheading mb-4" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Become Requestor - Upload Verification Document</h3>

                  <div className="form-group mb-4">
                    <label className="form-label">Verification Document (e.g. Aadhaar Card, ID Proof)</label>
                    <div style={{
                      border: '2px dashed var(--border)',
                      borderRadius: '8px',
                      padding: '2.5rem 1.5rem',
                      textAlign: 'center',
                      background: 'rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, width: '100%', height: '100%',
                          opacity: 0, cursor: 'pointer'
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <FaUser size={32} style={{ color: 'var(--text-secondary)' }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {idFile ? idFile.name : 'Upload Aadhaar or ID Proof Document'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Click to select or drag PDF, PNG, JPG file (Max 5MB)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="step-content animate-fade text-center">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Review Details Before Saving</h3>

              <div className="summary-box glass-card mt-4" style={{ padding: '1.5rem', maxHeight: '350px', overflowY: 'auto' }}>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem' }}>General Credentials</h4>
                  </div>
                  <p><strong>Action:</strong> Register {actionType === 'donor' ? 'Blood Donor' : 'Blood Requestor'}</p>
                  <p><strong>Full Name:</strong> {userForm.name}</p>
                  <p><strong>Email:</strong> {userForm.email}</p>
                  <p><strong>Phone:</strong> +91 {userForm.phone} (Verified via OTP)</p>
                  <p><strong>Gender:</strong> {userForm.gender}</p>
                  <p><strong>Date of Birth:</strong> {userForm.dob}</p>
                  <p><strong>Blood Group:</strong> <span className="badge badge-approved">{userForm.bloodGroup}</span></p>

                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem', margin: '0.5rem 0 0.25rem' }}>
                    <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem' }}>Address & Region</h4>
                  </div>
                  <p><strong>Current Address:</strong> {userForm.currentAddress}</p>
                  <p><strong>Permanent Address:</strong> {userForm.permanentAddress}</p>
                  <p><strong>District:</strong> {userForm.district}</p>
                  <p><strong>Area:</strong> {userForm.area}</p>

                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem', margin: '0.5rem 0 0.25rem' }}>
                    <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem' }}>Role Specifics</h4>
                  </div>
                  {actionType === 'donor' ? (
                    <>
                      <p><strong>Weight:</strong> {userForm.weight} kg</p>
                      <p><strong>Last Donation:</strong> {userForm.lastDonationDate || 'Never'}</p>
                      <p><strong>Availability:</strong> {userForm.availability}</p>
                      <p><strong>Preferred Location:</strong> {userForm.preferredLocations}</p>
                      <p><strong>Association:</strong> {userForm.associatedWith}</p>
                      <p><strong>Emergency Contact:</strong> {userForm.emergencyContactName} ({userForm.emergencyContactPhone})</p>
                    </>
                  ) : (
                    <p><strong>Verification Doc:</strong> <span style={{ color: 'var(--success)', fontWeight: 600 }}>{idFile ? idFile.name : 'None'}</span></p>
                  )}
                </div>
              </div>

              <p className="mt-4" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                By clicking Confirm & Save, this verified profile will be securely saved into the system database.
              </p>
            </div>
          )}

          {step === 6 && (
            <div className="step-content animate-fade text-center py-6">
              <div style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '1rem' }}><FaCheck /></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>User Profile Provisioned</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                The verified {actionType === 'donor' ? 'blood donor' : 'blood requestor'} account has been successfully provisioned in the database.
              </p>
              <button className="btn btn-primary mt-6" onClick={() => navigate('/admin/users')}>
                View Users Directory
              </button>
            </div>
          )}
        </div>

        <div className="wizard-footer">
          {step < 6 && (
            <button className="btn btn-secondary" onClick={step === 1 ? () => navigate('/admin') : prevStep}>
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
          )}
          {step < 5 && (
            <button
              className="btn btn-primary"
              onClick={nextStep}
              disabled={step === 2 && actionType === 'donor' && !otpVerified}
            >
              Next Step
            </button>
          )}
          {step === 5 && (
            <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm & Save'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBehalfCreation;
