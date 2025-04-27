import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types/chat';
import './VoiceChat.css';

const VoiceChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showCallBack, setShowCallBack] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Load initial messages from sessionStorage
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chatMessages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing chat messages:', error);
        sessionStorage.removeItem('chatMessages');
      }
    }
  }, []);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, message];
      // Convert Date objects to ISO strings before storing
      const messagesToStore = updatedMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }));
      sessionStorage.setItem('chatMessages', JSON.stringify(messagesToStore));
      return updatedMessages;
    });
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
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
    // Stop any ongoing speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
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
        {messages.map((message, index) => (
          <div
            key={message.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
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