import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleItemClick = (action: string) => {
    // Navigate to the appropriate page with the action parameter
    if (action === 'companion') {
      navigate('/companion');
    } else if (action === 'music') {
        navigate('/companion?action=music');
    } else if (action === 'story') {
        navigate('/companion?action=story');
    } else {
      navigate(`/tasks?action=${action}`);
    }
  };

  return (
    <div className="home-container">
        <h1>Welcome to Elderly Care</h1>
      <div className="menu-container">
        <Link to="/tasks" className="menu-item">
          <div className="menu-icon">📋</div>
          <div className="menu-text">Your Tasks Assistant</div>
        </Link>
        <Link to="/companion" className="menu-item">
          <div className="menu-icon">🎵</div>
          <div className="menu-text">Your Companion</div>
        </Link>
      </div>
      <div className="quick-commands">
        <h2>Quick Asks!</h2>
        <ul>
          <li onClick={() => handleItemClick('companion')}>
            <span className="feature-icon">👥</span>
            <span className="feature-text">Be my companion</span>
          </li>
          <li onClick={() => handleItemClick('music')}>
            <span className="feature-icon">🎵</span>
            <span className="feature-text">Play my favorite music</span>
          </li>
          <li onClick={() => handleItemClick('story')}>
            <span className="feature-icon">📖</span>
            <span className="feature-text">Tell me a story</span>
          </li>
          <li onClick={() => handleItemClick('bills')}>
            <span className="feature-icon">💰</span>
            <span className="feature-text">Show my bills</span>
          </li>
          <li onClick={() => handleItemClick('doctor')}>
            <span className="feature-icon">👨‍⚕️</span>
            <span className="feature-text">Book apointment for my Doctor</span>
          </li>
          <li onClick={() => handleItemClick('plumber')}>
            <span className="feature-icon">🔧</span>
            <span className="feature-text">Call Plumber</span>
          </li>
          <li onClick={() => handleItemClick('electrician')}>
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Call Electrician</span>
          </li>
          <li onClick={() => handleItemClick('shopping')}>
            <span className="feature-icon">🛒</span>
            <span className="feature-text">Help me with shopping</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 