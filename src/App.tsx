import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Companion from './pages/Companion';
import Settings from './pages/Settings';
import VoiceChat from './components/VoiceChat';
import SOSButton from './components/SOSButton';
import './App.css';

function App() {
  const [isSOSActive, setIsSOSActive] = useState(false);

  const handleSOSClick = () => {
    setIsSOSActive(true);
    // Call emergency contacts
    const emergencyContacts = [
      { name: 'Jane Das', number: '+91 9298716543' },
      { name: 'Robert Smith', number: '+1 (555) 876-5432' },
      { name: 'Mary Kosi', number: '+91 9976514321' }
    ];
    
    // Announce SOS activation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('SOS activated! Calling emergency contacts.');
      window.speechSynthesis.speak(utterance);
    }

    // Simulate calling emergency contacts
    emergencyContacts.forEach(contact => {
      console.log(`Calling ${contact.name} at ${contact.number}`);
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/companion" element={<Companion />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <VoiceChat />
        <SOSButton onSOSClick={handleSOSClick} />
      </div>
    </Router>
  );
}

export default App;