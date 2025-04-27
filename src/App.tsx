import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Companion from './pages/Companion';
import Settings from './pages/Settings';
import VoiceChat from './components/VoiceChat';
import SOSButton from './components/SOSButton';
import { ChatMessage } from './types/chat';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSOSActive, setIsSOSActive] = useState(false);

  // Load messages from sessionStorage only once on mount
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setChatMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing chat messages:', error);
        sessionStorage.removeItem('chatMessages');
      }
    }
  }, []); // Empty dependency array to run only once on mount

  const addMessage = React.useCallback((message: ChatMessage) => {
    setChatMessages(prevMessages => {
      const updatedMessages = [...prevMessages, message];
      // Convert Date objects to ISO strings before storing
      const messagesToStore = updatedMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }));
      sessionStorage.setItem('chatMessages', JSON.stringify(messagesToStore));
      return updatedMessages;
    });
  }, []); // Empty dependency array since we don't depend on any external values

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
          <Route path="/companion" element={<Companion messages={chatMessages} addMessage={addMessage} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <VoiceChat messages={chatMessages} addMessage={addMessage} />
        <SOSButton onSOSClick={handleSOSClick} />
      </div>
    </Router>
  );
}

export default App;