import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { FaUser, FaTint, FaCheck, FaUpload, FaPhoneAlt, FaCheckCircle, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import indiaFlag from '../../../assets/icons/india.png';
import './PublicRegister.css';

const locationData = {
  "Assam": [
    "Kamrup Metropolitan", "Kamrup", "Jorhat", "Dibrugarh", "Silchar", "Nagaon",
    "Tezpur", "Sivasagar", "Tinsukia", "Bongaigaon", "Barpeta", "Dhubri",
    "Goalpara", "Karimganj", "Lakhimpur", "Dhemaji", "Nalbari", "Darrang"
  ]
};

// Known registered mobile numbers list for smart detection simulation
const MOCK_REGISTERED_PHONES = ['9876543210', '9999999999', '8888888888', '9123456789'];

const PublicRegister = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const roleParam = searchParams.get('role') === 'requestor' ? 'requestor' : 'donor';
  const [role, setRole] = useState(roleParam);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [sameAsCurrentAddress, setSameAsCurrentAddress] = useState(false);

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Form State (Passwordless)
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

  useEffect(() => {
    const currentRole = searchParams.get('role') === 'requestor' ? 'requestor' : 'donor';
    setRole(currentRole);
    setStep(1);
    setError(null);
    setOtpSent(false);
    setOtpCode('');
    setOtpVerified(false);
    setIsExistingUser(false);
  }, [searchParams]);

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

  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setSameAsCurrentAddress(checked);
    if (checked) {
      setUserForm(prev => ({ ...prev, permanentAddress: prev.currentAddress }));
    }
  };

  const handleSendOtp = () => {
    setError(null);
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userForm.phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setOtpCode('');
  };

  const handleVerifyOtp = () => {
    setError(null);
    if (otpCode !== '123456') {
      setError('Invalid OTP code. Please enter test code 123456.');
      return;
    }

    setOtpVerified(true);
    const isRegistered = MOCK_REGISTERED_PHONES.includes(userForm.phone);

    if (isRegistered) {
      setIsExistingUser(true);
      Swal.fire({
        title: 'Logged In Successfully!',
        text: `Mobile number +91 ${userForm.phone} is already registered. Welcome back!`,
        icon: 'success',
        confirmButtonColor: '#800000'
      });
      navigate('/');
    } else {
      setIsExistingUser(false);
      Swal.fire({
        title: 'Mobile Verified!',
        text: 'You are a new user. Please complete your registration details to continue.',
        icon: 'success',
        confirmButtonColor: '#800000'
      });
      setStep(2);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    setError(null);
    if (step === 1) {
      if (!otpVerified) {
        setError('Please verify your mobile number via OTP before proceeding.');
        return;
      }
    } else if (step === 2) {
      if (!userForm.name || !userForm.gender || !userForm.dob) {
        setError('Please fill in Full Name, Gender, and Date of Birth.');
        return;
      }
      if (role === 'donor' && !userForm.email) {
        setError('Please enter a valid Email Address.');
        return;
      }
    } else if (step === 3) {
      if (!userForm.currentAddress || !userForm.district || !userForm.area || !userForm.pincode) {
        setError('Please fill in Current Address, District, Area, and Pincode.');
        return;
      }
    } else if (step === 4) {
      if (role === 'requestor') {
        if (!idFile) {
          setError('Please upload a verification document (e.g. Aadhaar Card or Official ID Proof).');
          return;
        }
      } else {
        if (!userForm.weight || !userForm.preferredLocations || !userForm.emergencyContactName || !userForm.emergencyContactPhone) {
          setError('Please fill in all donor safety details, weight, preferred location, and emergency contact.');
          return;
        }
      }
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setError(null);
    setStep(step - 1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: userForm.name,
        role: role === 'donor' ? 'Donor' : 'Seeker',
        gender: userForm.gender,
        dob: userForm.dob,
        bloodGroup: userForm.bloodGroup,
        district: userForm.district,
        area: userForm.area,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        ...(role === 'donor' ? {
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
          phone: `+91 ${userForm.phone}`,
          identity_document: idFile ? idFile.name : '',
          identity_document_type: userForm.identityDocumentType,
          current_address: userForm.currentAddress || '',
          permanent_address: userForm.permanentAddress || '',
          documentName: idFile ? idFile.name : ''
        })
      };

      if (api.users && api.users.createOnBehalf) {
        await api.users.createOnBehalf(payload);
      }

      Swal.fire({
        title: 'Registration Successful!',
        text: `Your ${role === 'donor' ? 'Blood Donor' : 'Blood Requestor'} profile has been created successfully.`,
        icon: 'success',
        confirmButtonColor: '#800000'
      });
      setLoading(false);
      setStep(6);
    } catch (err) {
      Swal.fire({
        title: 'Registration Error',
        text: err.message || 'Registration failed. Please check your information and try again.',
        icon: 'error',
        confirmButtonColor: '#800000'
      });
      setLoading(false);
    }
  };

  return (
    <div className="public-register-page">
      {/* Clean Page Header Banner with Breadcrumbs */}
      <div className="page-breadcrumb-banner">
        <div className="page-breadcrumb-container">
          <h1 className="page-breadcrumb-title">
            {role === 'requestor' ? 'Blood Requestor Portal' : 'Voluntary Blood Donor Portal'}
          </h1>
          <nav className="page-breadcrumb-nav">
            <Link to="/" className="page-breadcrumb-link">Home</Link>
            <span className="page-breadcrumb-separator">/</span>
            <span className="page-breadcrumb-current">
              {role === 'requestor' ? 'Requestor Portal' : 'Donor Portal'}
            </span>
          </nav>
        </div>
      </div>

      <div className="public-register-container">
        <div className="public-register-card">
        <div className="pub-wizard-body">
          {error && <div className="pub-alert pub-alert-danger mb-4">{error}</div>}

          {/* STEP 1: MOBILE & OTP VERIFICATION FLOW */}
          {step === 1 && (
            <div className="pub-step-content animate-fade max-w-md mx-auto">
              <h3 className="pub-subheading mb-4 text-center">Mobile Number & OTP Authentication</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                Enter your mobile number to send OTP. If already registered, you will log in automatically. If new, you will proceed to complete registration.
              </p>

              <div className="pub-form-group mb-4">
                <label className="pub-form-label">Mobile Number</label>
                <div className="pub-phone-input-group">
                  <div className="pub-phone-prefix">
                    <img src={indiaFlag} alt="IN" style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className="pub-phone-field"
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
                    className="pub-btn pub-btn-primary w-full mt-4"
                    onClick={handleSendOtp}
                  >
                    Send One-Time Password (OTP)
                  </button>
                )}
              </div>

              {otpSent && !otpVerified && (
                <div className="pub-form-group mb-4 animate-fade">
                  <div className="pub-alert pub-alert-info mb-3">
                    <strong>OTP Dispatched!</strong> A 6-digit OTP code has been sent to +91 {userForm.phone}. (Test OTP: <strong>123456</strong>)
                  </div>
                  <label className="pub-form-label">Enter 6-Digit OTP Code</label>
                  <input
                    type="text"
                    placeholder="Enter 123456"
                    className="pub-form-control mb-3"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  <button
                    type="button"
                    className="pub-btn pub-btn-success w-full"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP Code
                  </button>
                </div>
              )}

              {otpVerified && !isExistingUser && (
                <div className="pub-alert pub-alert-success mb-4 text-center">
                  ✓ Mobile number (+91 {userForm.phone}) verified! Click Next Step to complete your registration.
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Personal Details */}
          {step === 2 && (
            <div className="pub-step-content animate-fade">
              <h3 className="pub-subheading mb-4">
                {role === 'donor' ? 'Donor Personal Details' : 'Requestor Personal Details'}
              </h3>

              <div className="pub-form-row mb-4">
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="pub-form-control"
                    value={userForm.name}
                    onChange={handleUserChange}
                    placeholder="Full Name as per Official ID"
                    required
                  />
                </div>
                {role === 'donor' && (
                  <div className="pub-form-group flex-1">
                    <label className="pub-form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="pub-form-control"
                      value={userForm.email}
                      onChange={handleUserChange}
                      placeholder="e.g. name@domain.com"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="pub-form-row mb-4">
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Gender</label>
                  <select name="gender" className="pub-form-control" value={userForm.gender} onChange={handleUserChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    max={new Date().toISOString().split('T')[0]}
                    className="pub-form-control"
                    value={userForm.dob}
                    onChange={handleUserChange}
                    required
                  />
                </div>
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">{role === 'donor' ? 'Blood Group' : 'Blood Group Needed'}</label>
                  <select name="bloodGroup" className="pub-form-control" value={userForm.bloodGroup} onChange={handleUserChange}>
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
            </div>
          )}

          {/* STEP 3: Address & Location Details */}
          {step === 3 && (
            <div className="pub-step-content animate-fade">
              <h3 className="pub-subheading mb-4">Address & Location Details</h3>

              {role === 'requestor' && (
                <div className="pub-form-row mb-4">
                  <div className="pub-form-group flex-1">
                    <label className="pub-form-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      className="pub-form-control"
                      value={userForm.email}
                      onChange={handleUserChange}
                      placeholder="e.g. example@domain.com"
                    />
                  </div>
                </div>
              )}

              <div className="pub-form-row mb-4">
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Current Residence Address</label>
                  <input
                    type="text"
                    name="currentAddress"
                    className="pub-form-control"
                    value={userForm.currentAddress}
                    onChange={handleUserChange}
                    placeholder="House / Street / Locality"
                    required
                  />
                </div>
              </div>

              <div className="pub-form-group mb-4">
                <label className="pub-checkbox-label">
                  <input
                    type="checkbox"
                    checked={sameAsCurrentAddress}
                    onChange={handleSameAddressToggle}
                  />
                  <span>Permanent address is same as current address</span>
                </label>
              </div>

              <div className="pub-form-row mb-4">
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Permanent Address</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    className="pub-form-control"
                    value={userForm.permanentAddress}
                    onChange={handleUserChange}
                    disabled={sameAsCurrentAddress}
                    placeholder="Permanent family address"
                    required
                  />
                </div>
              </div>

              <div className="pub-form-row mb-4">
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">State</label>
                  <select name="state" className="pub-form-control" value={userForm.state} onChange={handleUserChange}>
                    <option value="Assam">Assam</option>
                  </select>
                </div>
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">District</label>
                  <select name="district" className="pub-form-control" value={userForm.district} onChange={handleUserChange}>
                    {locationData["Assam"].map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Area / Upazila / City</label>
                  <input
                    type="text"
                    name="area"
                    className="pub-form-control"
                    value={userForm.area}
                    onChange={handleUserChange}
                    placeholder="e.g. Dispur, Zoo Road"
                    required
                  />
                </div>
                <div className="pub-form-group flex-1">
                  <label className="pub-form-label">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    className="pub-form-control"
                    value={userForm.pincode}
                    onChange={handleUserChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Eligibility (Donor) OR Document Upload (Requestor) */}
          {step === 4 && (
            <div className="pub-step-content animate-fade">
              {role === 'donor' ? (
                <div>
                  <h3 className="pub-subheading mb-4">Donor Eligibility & Safety Details</h3>

                  <div className="pub-form-row mb-4">
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        className="pub-form-control"
                        min="45"
                        max="150"
                        value={userForm.weight}
                        onChange={handleUserChange}
                        placeholder="Minimum 45 kg required"
                        required
                      />
                    </div>
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Last Blood Donation Date</label>
                      <input
                        type="date"
                        name="lastDonationDate"
                        className="pub-form-control"
                        value={userForm.lastDonationDate}
                        onChange={handleUserChange}
                      />
                    </div>
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Donor Availability Status</label>
                      <select name="availability" className="pub-form-control" value={userForm.availability} onChange={handleUserChange}>
                        <option value="Active">Active & Available</option>
                        <option value="Inactive">Temporarily Unavailable</option>
                      </select>
                    </div>
                  </div>

                  <div className="pub-form-row mb-4">
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Preferred Donation Locations / Hospitals</label>
                      <input
                        type="text"
                        name="preferredLocations"
                        className="pub-form-control"
                        value={userForm.preferredLocations}
                        onChange={handleUserChange}
                        placeholder="e.g. GMCH Guwahati, Saharia Blood Bank"
                        required
                      />
                    </div>
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Associated With</label>
                      <select name="associatedWith" className="pub-form-control" value={userForm.associatedWith} onChange={handleUserChange}>
                        <option value="Individual">Individual Voluntary Donor</option>
                        <option value="Educational Institution">Educational Institution / College</option>
                        <option value="NGO">NGO / Charity Partner</option>
                        <option value="Hospital">Hospital / Medical Center</option>
                        <option value="Blood Bank">Blood Bank</option>
                        <option value="Corporate">Corporate / Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="pub-form-row mb-4">
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Emergency Contact Name</label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        className="pub-form-control"
                        value={userForm.emergencyContactName}
                        onChange={handleUserChange}
                        placeholder="Family member / Guardian name"
                        required
                      />
                    </div>
                    <div className="pub-form-group flex-1">
                      <label className="pub-form-label">Emergency Contact Phone</label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        className="pub-form-control"
                        value={userForm.emergencyContactPhone}
                        onChange={handleUserChange}
                        placeholder="10-digit emergency contact phone"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="pub-subheading mb-4">Verification Document Upload</h3>

                  <div className="pub-form-group mb-4">
                    <label className="pub-form-label">Select Identity Document Type</label>
                    <select
                      name="identityDocumentType"
                      className="pub-form-control mb-4"
                      value={userForm.identityDocumentType}
                      onChange={handleUserChange}
                    >
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="voter_id">Voter ID Card</option>
                      <option value="passport">Passport</option>
                      <option value="driving_license">Driving License</option>
                    </select>

                    <label className="pub-form-label">Upload Government Approved Photo ID Proof</label>
                    <div className="pub-upload-box">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                      />
                      <div className="pub-upload-placeholder">
                        <FaUpload size={32} className="pub-upload-icon" />
                        <span className="pub-upload-text">
                          {idFile ? idFile.name : 'Click or Drag & Drop Document File Here'}
                        </span>
                        <span className="pub-upload-hint">
                          Supported formats: PDF, PNG, JPG (Max 5MB)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Review Details */}
          {step === 5 && (
            <div className="pub-step-content animate-fade">
              <h3 className="text-center mb-4" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#800000' }}>
                Review Registration Details Before Submission
              </h3>

              <div className="pub-summary-box">
                <div className="pub-summary-section">
                  <h4>General Credentials</h4>
                  <p><strong>Role:</strong> {role === 'donor' ? 'Voluntary Blood Donor' : 'Blood Requestor'}</p>
                  <p><strong>Full Name:</strong> {userForm.name}</p>
                  <p><strong>Email Address:</strong> {userForm.email || 'N/A'}</p>
                  <p><strong>Mobile Number:</strong> +91 {userForm.phone} <span className="badge-verified">✓ Verified via OTP</span></p>
                  <p><strong>Gender:</strong> {userForm.gender}</p>
                  <p><strong>Date of Birth:</strong> {userForm.dob}</p>
                  <p><strong>Blood Group:</strong> <span className="pub-bg-pill">{userForm.bloodGroup}</span></p>
                </div>

                <div className="pub-summary-section">
                  <h4>Address & Location</h4>
                  <p><strong>Current Address:</strong> {userForm.currentAddress}</p>
                  <p><strong>Permanent Address:</strong> {userForm.permanentAddress}</p>
                  <p><strong>State & District:</strong> {userForm.state}, {userForm.district}</p>
                  <p><strong>Area & Pincode:</strong> {userForm.area} - {userForm.pincode}</p>
                </div>

                <div className="pub-summary-section">
                  <h4>Role-Specific Details</h4>
                  {role === 'donor' ? (
                    <>
                      <p><strong>Donor Weight:</strong> {userForm.weight} kg</p>
                      <p><strong>Last Donation Date:</strong> {userForm.lastDonationDate || 'Never Donated Previously'}</p>
                      <p><strong>Status:</strong> {userForm.availability}</p>
                      <p><strong>Preferred Locations:</strong> {userForm.preferredLocations}</p>
                      <p><strong>Associated With:</strong> {userForm.associatedWith}</p>
                      <p><strong>Emergency Contact:</strong> {userForm.emergencyContactName} (+91 {userForm.emergencyContactPhone})</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Document Type:</strong> {userForm.identityDocumentType.toUpperCase()}</p>
                      <p><strong>Uploaded File:</strong> {idFile ? idFile.name : 'Attached'}</p>
                    </>
                  )}
                </div>
              </div>

              <p className="mt-4 text-center" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                By clicking Complete Registration, you confirm that the provided details are true and accurate.
              </p>
            </div>
          )}

          {/* STEP 6: Complete */}
          {step === 6 && (
            <div className="pub-step-content animate-fade text-center py-6">
              <div className="pub-success-icon"><FaCheck /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Registration Submitted Successfully!
              </h3>
              <p style={{ color: '#475569', maxWidth: '550px', margin: '0 auto 1.75rem auto' }}>
                Thank you for registering with Ziv Foundation. Your {role === 'donor' ? 'Voluntary Blood Donor' : 'Blood Requestor'} profile is now active.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/" className="pub-btn pub-btn-secondary">
                  Go to Home
                </Link>
                <Link to="/login" className="pub-btn pub-btn-primary">
                  Login to Portal
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="pub-wizard-footer">
          {step < 6 && (
            <button className="pub-btn pub-btn-secondary" onClick={step === 1 ? () => navigate('/') : prevStep}>
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
          )}
          {step < 5 && (
            <button
              className="pub-btn pub-btn-primary"
              onClick={nextStep}
              disabled={step === 1 && !otpVerified}
            >
              Next Step
            </button>
          )}
          {step === 5 && (
            <button className="pub-btn pub-btn-success" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default PublicRegister;
