import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Companion.css';

const Companion: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentContent, setCurrentContent] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const stories = [
    `Once upon a time, in a small village nestled between rolling hills, there lived a kind old man named Mr. Thompson. 
    Every morning, he would walk through the village, greeting everyone with a warm smile and a helping hand. 
    One day, he noticed that the village children had nowhere to play, so he built them a beautiful playground. 
    The children were overjoyed, and their laughter filled the air. Mr. Thompson's kindness spread throughout the village, 
    inspiring others to help one another. The village became known as the friendliest place in the valley, 
    all thanks to one man's simple acts of kindness.`,

    `In a magical forest deep in the mountains, there lived a wise old owl named Oliver. 
    He had seen many seasons come and go, and his knowledge was vast. Animals from all around would come to seek his advice. 
    One winter, when food was scarce, Oliver taught the younger animals how to store food and prepare for harsh times. 
    When spring came, he showed them how to plant seeds and grow their own food. His wisdom helped the forest community 
    thrive through all seasons. The animals learned that with knowledge and preparation, they could overcome any challenge.`,

    `Long ago, in a peaceful town by the sea, an elderly couple named George and Martha discovered the secret to happiness. 
    They spent their days collecting seashells and sharing stories with visitors. One day, they found a special shell 
    that made beautiful music when held to the ear. Instead of keeping it for themselves, they placed it in the town square 
    for everyone to enjoy. The music brought joy to all who heard it, and soon the town became known for its magical shell. 
    George and Martha showed that true happiness comes from sharing special moments with others.`,

    `In a quiet neighborhood, there was a retired teacher named Mrs. Jenkins who loved to read. 
    Her house was filled with books of all kinds. One day, she noticed that many children in her neighborhood 
    didn't have access to books. So she started a small library in her garage, inviting children to come and read. 
    She would read stories aloud, bringing the characters to life with different voices. The children's love for reading grew, 
    and soon the library became a gathering place for the whole community. Mrs. Jenkins proved that you're never too old 
    to make a difference in someone's life.`,

    `On a small farm at the edge of town, lived an elderly farmer named Samuel. He had a special way with animals, 
    especially his old horse, Daisy. Every morning, they would ride through the fields, checking on the crops and animals. 
    One summer, when a terrible storm destroyed many farms, Samuel and Daisy worked tirelessly to help their neighbors. 
    They delivered food, helped rebuild fences, and comforted those who had lost their homes. Their selfless acts 
    showed that true strength comes from helping others in their time of need.`
  ];

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'story') {
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      setCurrentContent(randomStory);
      speakText(randomStory);
    } else if (action === 'music') {
      setCurrentContent('Playing Mozart - Sonata No. 13');
      playMusic();
    }
  }, [searchParams]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleStoryClick = () => {
    // Cancel any ongoing speech before starting a new one
    window.speechSynthesis.cancel();
    
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    setCurrentContent(randomStory);
    speakText(randomStory);
  };

  const handleMusicClick = () => {
    setCurrentContent('Playing Mozart - Sonata No. 13');
    playMusic();
  };

  const handleQuestionClick = () => {
    const question = "What would you like to know? I'm here to help answer your questions.";
    setCurrentContent(question);
    speakText(question);
  };

  const handleStopContent = () => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Stop music if playing
    if (isPlaying) {
      stopMusic();
    }
    
    // Clear current content to show options
    setCurrentContent('');
  };

  return (
    <div className="companion-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <div className="companion-content">
        <h1>Companion</h1>
        <div className="content-area">
          {currentContent && (
            <div className="content-display">
              <button className="close-button" onClick={handleStopContent}>
                Stop!
              </button>
              <p>{currentContent}</p>
              {searchParams.get('action') === 'music' && (
                <div className="music-controls">
                  <button
                    onClick={isPlaying ? stopMusic : playMusic}
                    className="control-button"
                  >
                    {isPlaying ? 'Stop Music' : 'Play Music'}
                  </button>
                </div>
              )}
            </div>
          )}
          {!currentContent && (
            <div className="companion-div">
              <p className="welcome-message">Welcome to your companion! Click on any option below:</p>
              <ul className="companion-options">
                <li onClick={handleStoryClick} className="option-item">
                  Listen to stories
                </li>
                <li onClick={handleMusicClick} className="option-item">
                  Play music
                </li>
                <li onClick={handleQuestionClick} className="option-item">
                  Ask questions
                </li>
              </ul>
            </div>
          )}
        </div>
        <audio
          ref={audioRef}
          src="/Mozart-Sonata_No_13.mp3"
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default Companion; 