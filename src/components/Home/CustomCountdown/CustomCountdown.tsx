import { useState, useEffect } from "react";
import "./CustomCountdown.css";
import { FaHourglassStart } from "react-icons/fa";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
  hasEnded: boolean;
}
const intialState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  hasStarted: false,
  hasEnded: false,
};

interface CustomCountdownProps {
  startDate: string;
  endDate: string;
}

const CustomCountdown = ({ startDate, endDate }: CustomCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(intialState);

  // const startTime = new Date(startDate).valueOf();
  // const endTime = new Date(endDate).getTime();
  const startTime = +new Date(startDate);
  const endTime = Number(new Date(endDate));

  const nowTime = Date.now();
  const isStarted = nowTime >= startTime;
  const isEnded = nowTime >= endTime;
  useEffect(() => {
    calculateTimeLeft();

    if (isStarted && !isEnded) {
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startDate, endDate, timeLeft.hasStarted, timeLeft.hasEnded]);

  const calculateTimeLeft = () => {
    // start & endDate may not be available onmount i.e on first render, hence the if statement.

    const currentTime = Date.now();
    const hasStarted = currentTime >= startTime;
    const hasEnded = currentTime >= endTime;

    if (startDate && endDate && hasStarted && !hasEnded) {
      const timeRemainingToEnd = endTime - currentTime;

      const days = Math.floor(timeRemainingToEnd / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemainingToEnd / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeRemainingToEnd / 1000 / 60) % 60);
      const seconds = Math.floor((timeRemainingToEnd / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        hasStarted: true,
        hasEnded: false,
      });
    } else if (startDate && endDate && hasEnded) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasStarted: true,
        hasEnded: true,
      });
    } else if (startDate && endDate && !hasStarted && !hasEnded) {
      const timeRemainingToStart = startTime - currentTime;
      const days = Math.floor(timeRemainingToStart / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemainingToStart / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeRemainingToStart / 1000 / 60) % 60);
      const seconds = Math.floor((timeRemainingToStart / 1000) % 60);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        hasStarted: false,
        hasEnded: false,
      });
    } else {
      setTimeLeft(intialState);
    }
  };

  const startingIn = startDate && endDate && !isStarted && !isEnded;

  return (
    <div className="countdown-wrapper">
      {startingIn ? (
        <aside className="countdown-aside">Starting in</aside>
      ) : null}
      <time className="countdown">
        <FaHourglassStart size={25} className="count-icon"/>
        <div>
          <span>Days</span> <div>{timeLeft.days}</div>
        </div>
        <div className="countdown-colon"> : </div>
        <div>
          <span>Hours</span> <div>{timeLeft.hours}</div>
        </div>
        <div className="countdown-colon"> : </div>
        <div>
          <span>Minutes</span> <div>{timeLeft.minutes}</div>
        </div>
        <div className="countdown-colon"> : </div>
        <div>
          <span>Seconds</span> <div>{timeLeft.seconds}</div>
        </div>
      </time>
    </div>
  );
};

export default CustomCountdown;
