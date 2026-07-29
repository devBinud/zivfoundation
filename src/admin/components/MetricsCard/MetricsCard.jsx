import React from 'react';
import './MetricsCard.css';

const MetricsCard = ({ title, value, icon, trend, status = 'primary' }) => {
  return (
    <div className="glass-card metrics-card">
      <div className="metrics-header">
        <span className="metrics-title">{title}</span>
        <div className="metrics-icon-wrapper">
          {icon}
        </div>
      </div>
      
      <div className="metrics-body">
        <h3 className="metrics-value">{value}</h3>
        {trend && (
          <span className={`metrics-trend trend-${status}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
