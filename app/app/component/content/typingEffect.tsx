"use client"
import React, { useState, useEffect } from 'react';
import './TypingEffect.css'; // Import CSS file for styling

const TypingEffect = ({ content, typingSpeed, bold, size }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedContent(prevContent => prevContent + content[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [content, currentIndex, typingSpeed]);

  return (
    <div className="typing-effect">
      <h1 className={`m-2 ${size} ${bold} text-slate-800`}>{displayedContent}</h1>
    </div>
  );
};

export default TypingEffect;
