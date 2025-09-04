import React, { useState, useEffect } from "react";
import './dt.css';
function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, []);

  // Format time (hh:mm AM/PM)
  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Format date (Day, DD Month YYYY)
  const fullDate = dateTime.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="datetime-container">
      <h1>{time}</h1>
      <p>{fullDate}</p>
    </div>
  );
}

export default DateTimeDisplay;
