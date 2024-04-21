"use client"
import React, { useState, useEffect } from 'react';

const ScoreBar = ({ list1, list2 }) => {
  const [percentage, setPercentage] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      if (list2.length === 0) {
        setPercentage(0);
      } else {
        const calculatedPercentage = (list1.length / list2.length) * 100;
        setPercentage(calculatedPercentage);
      }
    };

    const incrementPercentage = () => {
      const step = percentage / 1000; // Adjusted animation speed
      let currentPercentage = 0;
      const timer = setInterval(() => {
        currentPercentage += step;
        setDisplayedPercentage(Math.min(currentPercentage, percentage));
        if (currentPercentage >= percentage) {
          clearInterval(timer);
        }
      }, 10); // Adjusted animation speed
    };

    calculatePercentage();
    incrementPercentage();
  }, [list1, list2, percentage]);

  let colorClass = 'bg-green-500'; // Default color
  if (displayedPercentage < 45) {
    colorClass = 'bg-red-500';
  } else if (displayedPercentage >= 45 && displayedPercentage <= 75) {
    colorClass = 'bg-orange-500';
  }

  return (
    <div className="flex items-center">
      <div className="w-96 h-4 bg-gray-200 rounded-full overflow-hidden mr-4 relative">
        <div
          className={`absolute top-0 left-0 h-full ${colorClass}`}
          style={{ width: `${displayedPercentage}%` }}
        ></div>
      </div>
      <span>{Math.round(displayedPercentage)}%</span>
    </div>
  );
};

export default ScoreBar;
