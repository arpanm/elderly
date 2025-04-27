import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types/chat';
import './VoiceChat.css';

interface VoiceChatProps {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ messages, addMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const [showCallBack, setShowCallBack] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Load initial messages from sessionStorage
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      // Convert string timestamps back to Date objects
      parsedMessages.forEach((msg: ChatMessage) => {
        msg.timestamp = new Date(msg.timestamp);
      });
      // Add all stored messages
      parsedMessages.forEach((msg: ChatMessage) => {
        addMessage(msg);
      });
    }
  }, [addMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleVoiceCommand = useCallback((command: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: command,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(newMessage);

    let response = '';
    if (command.includes('story')) {
      window.location.href = '/companion?action=story';
      response = 'Playing a story for you...';
    } else if (command.includes('music')) {
      window.location.href = '/companion?action=music';
      response = 'Playing music for you...';
    } else if (command.includes('bill')) {
      window.location.href = '/tasks?action=bills';
      response = 'Showing your utility bills...';
    } else if (command.includes('appointment') || command.includes('doctor')) {
      window.location.href = '/tasks?action=doctor';
      response = 'Booking a doctor appointment...';
    } else if (command.includes('plumber')) {
      window.location.href = '/tasks?action=plumber';
      response = 'Booking a plumber...';
    } else if (command.includes('electrician')) {
      window.location.href = '/tasks?action=electrician';
      response = 'Booking an electrician...';
    } else if (command.includes('shopping')) {
      window.location.href = '/tasks?action=shopping';
      response = 'Showing your shopping list...';
    } else {
      response = "I'm sorry, I couldn't understand that. Would you like me to arrange a callback?";
      setShowCallBack(true);
    }

    const botMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: response,
      sender: 'assistant',
      timestamp: new Date(),
    };
    addMessage(botMessage);
  }, [addMessage]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, [handleVoiceCommand]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleCallBack = () => {
    setShowCallBack(false);
    const botMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: 'Waiting for incoming call...',
      sender: 'assistant',
      timestamp: new Date(),
    };
    addMessage(botMessage);
  };

  return (
    <div className="voice-chat-container">
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            <div className="message-content">{message.text}</div>
            <div className="message-time">
              {message.timestamp instanceof Date ? message.timestamp.toLocaleTimeString() : new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="voice-controls">
        <button
          className={`voice-button ${isListening ? 'listening' : ''}`}
          onClick={startListening}
        >
          {isListening ? 'Listening...' : 'Tap to Speak'}
        </button>
        {showCallBack && (
          <button className="callback-button" onClick={handleCallBack}>
            Yes, arrange callback
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceChat; 