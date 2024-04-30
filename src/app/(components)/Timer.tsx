import React, { useEffect, useState } from "react";

const Timer = ({ duration }) => {
  // Convert duration from minutes to seconds
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    // Update the time left every second
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [duration]);

  // Convert timeLeft from seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      Time left: {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
};

export default Timer;
