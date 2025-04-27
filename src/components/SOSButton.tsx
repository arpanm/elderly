import React from 'react';
import './SOSButton.css';

interface SOSButtonProps {
  onSOSClick: () => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onSOSClick }) => {
  return (
    <button className="sos-button" onClick={onSOSClick}>
      <span className="sos-text">SOS</span>
    </button>
  );
};

export default SOSButton; 