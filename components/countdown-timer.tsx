import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate: string; // ISO string format
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div
      className={
        timeLeft.days < 1 &&
        timeLeft.hours < 1 &&
        timeLeft.minutes < 15 &&
        timeLeft.seconds !== 0
          ? "border rounded-full p-1 px-2 border-red-400 animate-pulse"
          : "border rounded-full p-1 px-2"
      }
    >
      <div className="flex space-x-1 justify-center items-center text-xs font-medium tracking-tight">
        {timeLeft.days > 0 && (
          <div>
            {timeLeft.days} {timeLeft.days < 2 ? "day" : "days"}
          </div>
        )}
        {timeLeft.hours > 0 && timeLeft.days < 2 && (
          <div>
            {timeLeft.hours} {timeLeft.hours < 2 ? "hour" : "hours"}{" "}
          </div>
        )}
        {timeLeft.minutes > 0 && timeLeft.hours < 2 && timeLeft.days === 0 && (
          <div
            className={
              timeLeft.hours === 0 && timeLeft.minutes < 15
                ? "text-red-400"
                : ""
            }
          >
            {timeLeft.minutes} {timeLeft.minutes < 2 ? "minute" : "minutes"}
          </div>
        )}
        {timeLeft.days === 0 &&
          timeLeft.hours === 0 &&
          timeLeft.minutes < 2 &&
          timeLeft.seconds > 0 && (
            <div
              className={
                timeLeft.hours === 0 && timeLeft.minutes < 15
                  ? "text-red-400"
                  : ""
              }
            >
              {timeLeft.seconds} {timeLeft.seconds < 2 ? "second" : "seconds"}
            </div>
          )}

        <p
          className={
            timeLeft.days < 1 && timeLeft.hours < 1 && timeLeft.minutes < 15
              ? "text-red-400"
              : ""
          }
        >
          {timeLeft.days === 0 &&
          timeLeft.hours === 0 &&
          timeLeft.minutes === 0 &&
          timeLeft.seconds === 0
            ? "Time is up "
            : "left"}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
