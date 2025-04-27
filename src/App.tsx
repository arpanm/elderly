import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Companion from './pages/Companion';
import VoiceChat from './components/VoiceChat';
import './App.css';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function App() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load messages from sessionStorage only once on mount
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        // Convert string timestamps back to Date objects
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

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/companion" element={<Companion />} />
        </Routes>
        <VoiceChat messages={chatMessages} addMessage={addMessage} />
      </div>
    </Router>
  );
}

export default App; 