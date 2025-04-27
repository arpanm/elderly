import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
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
          <li>"Tell me a story"</li>
          <li>"Play music"</li>
          <li>"Show my bills"</li>
          <li>"Book doctor appointment"</li>
          <li>"Call plumber"</li>
          <li>"Call electrician"</li>
          <li>"Show shopping list"</li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 