import React, { useState, useEffect } from 'react';

// Helper function to format numbers with leading zeros
const formatNumber = (num) => num.toString().padStart(2, '0');

// Function to get the current formatted date and time
const getFormattedDateTime = () => {
  const now = new Date();
  const day = formatNumber(now.getDate());
  const month = formatNumber(now.getMonth() + 1); // Months are zero-based
  const year = now.getFullYear();
  const hours = formatNumber(now.getHours());
  const minutes = formatNumber(now.getMinutes());
  
  return `Hôm nay, ngày ${day}/${month}/${year} ${hours}:${minutes}`;
};

// CurrentTimeComponent
const CurrentTimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedDateTime());

  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      setCurrentTime(getFormattedDateTime());
    };

    // Update time immediately
    updateTime();

    // Set interval to update time every minute
    const timer = setInterval(updateTime, 1000); // 60000ms = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>{currentTime}</p>
    </div>
  );
};

export default CurrentTimeComponent;
