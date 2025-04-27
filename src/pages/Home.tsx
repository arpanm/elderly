import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    } else if (action === 'settings') {
      navigate('/settings');
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
        <div className="menu-item" onClick={() => handleItemClick('settings')}>
          <div className="menu-icon">👤⚙️</div>
          <div className="menu-text">Personal Information</div>
        </div>
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
            <span className="feature-text">When is my Doctor's appointment?</span>
          </li>
          <li onClick={() => handleItemClick('plumber')}>
            <span className="feature-icon">🔧</span>
            <span className="feature-text">Is Plumber coming today?</span>
          </li>
          <li onClick={() => handleItemClick('electrician')}>
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Is Electrician coming today?</span>
          </li>
          <li onClick={() => handleItemClick('shopping')}>
            <span className="feature-icon">🛒</span>
            <span className="feature-text">Help with my shopping</span>
          </li>
        </ul>
      </div>
      <div className="coming-soon-features">
        <h2>Coming Soon Features</h2>
        <div className="feature-categories">
          <div className="feature-category">
            <h3>Health & Wellness</h3>
            <ul>
              <li className="disabled">
                <span className="feature-icon">🏥</span>
                <span className="feature-text">Book periodic medical checkup</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">💉</span>
                <span className="feature-text">Schedule immunization</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">🥦</span>
                <span className="feature-text">Order daily groceries</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">💊</span>
                <span className="feature-text">Order monthly medicines</span>
              </li>
            </ul>
          </div>
          <div className="feature-category">
            <h3>Memory Lane</h3>
            <ul>
              <li className="disabled">
                <span className="feature-icon">👶</span>
                <span className="feature-text">Show my childhood memories</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">👨‍👩‍👧‍👦</span>
                <span className="feature-text">Show my kids' year by year photos</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">💑</span>
                <span className="feature-text">Show my marriage photos</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">🎓</span>
                <span className="feature-text">Show my graduation memories</span>
              </li>
              <li className="disabled">
                <span className="feature-icon">🌍</span>
                <span className="feature-text">Show my travel memories</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-padding" />
    </div>
  );
};

export default Home; 