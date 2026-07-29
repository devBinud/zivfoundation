import React, { useState } from 'react';
import Swal from 'sweetalert2';

const PublicDonate = () => {
  const [amount, setAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('Hope Wildlife & Nature Reserve');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [taxCertificate, setTaxCertificate] = useState(true);

  const presetAmounts = ['25', '50', '100', '250', '500'];

  const handleDonate = (e) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;

    if (!donorName || !donorEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Details',
        text: 'Please enter your full name and email address to receive your verified digital certificate.',
        confirmButtonColor: '#c5112e'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Contribution Recorded!',
      html: `Thank you <strong>${donorName}</strong> for your donation of <strong>$${finalAmount}</strong> to <em>${selectedCause}</em>.<br/><br/>A digital certificate receipt has been dispatched to <strong>${donorEmail}</strong>.`,
      confirmButtonColor: '#c5112e'
    });
  };

  return (
    <div className="public-donate-page">
      <section className="hero-section" style={{ paddingBottom: '2.5rem' }}>
        <div className="hero-container">
          <h1 className="hero-title">
            Make a Tax-Deductible <span className="gradient-text">Contribution</span>
          </h1>
          <p className="hero-subtitle">
            100% of your gift is audited and routed directly to verified NGO accounts with instant digital honors certification.
          </p>
        </div>
      </section>

      <section className="section-container" style={{ paddingTop: '0', maxWidth: '800px' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleDonate}>
            <div className="form-group mb-6">
              <label className="form-label">Select Verified Cause or Partner NGO</label>
              <select
                className="form-control"
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                style={{ height: '48px', fontSize: '1rem' }}
              >
                <option value="Hope Wildlife & Nature Reserve">Hope Wildlife & Nature Reserve (Kenya)</option>
                <option value="Global Literacy Initiative">Global Literacy Initiative (India)</option>
                <option value="Clean Ocean Care Alliance">Clean Ocean Care Alliance (Indonesia)</option>
                <option value="Solar Health & Energy Access">Solar Health & Energy Access (Ghana)</option>
                <option value="Ziv Foundation General Impact Fund">Ziv Foundation General Impact Fund (Global)</option>
              </select>
            </div>

            <div className="form-group mb-6">
              <label className="form-label">Select Donation Amount (USD)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                {presetAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`btn ${amount === val && !customAmount ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => { setAmount(val); setCustomAmount(''); }}
                    style={{ padding: '0.75rem', fontSize: '1rem', fontWeight: '700' }}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              <input
                type="number"
                className="form-control"
                placeholder="Or enter custom amount in USD"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
              />
            </div>

            <div className="form-row mb-4">
              <div className="form-group flex-1">
                <label className="form-label">Your Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Jane Doe"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group flex-1">
                <label className="form-label">Email Address (For Audit Receipt)</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="jane@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-6" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="taxCert"
                checked={taxCertificate}
                onChange={(e) => setTaxCertificate(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="taxCert" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Issue official digital certificate for tax-deductibility & donor honor roll
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-hero-lg w-full">
              Complete Secured Donation of ${customAmount || amount || '0'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PublicDonate;
