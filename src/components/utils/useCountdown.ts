import { useState, useEffect } from "react";

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

const useCountdown = (startDate: string, endDate: string) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(intialState);

  // const startTime = new Date(startDate).valueOf();
  // const endTime = new Date(endDate).getTime();
  const startTime = +new Date(startDate);
  const endTime = Number(new Date(endDate));

  useEffect(() => {
    const currentTime = Date.now();
    const hasStarted = currentTime >= startTime;
    const hasEnded = currentTime >= endTime;

    calculateTimeLeft();

    if (hasStarted && !hasEnded) {
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startDate, endDate, timeLeft.hasEnded, timeLeft.hasEnded]);

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
    } else if (startDate && endDate && !hasStarted) {
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
    } else if (startDate && endDate && hasEnded) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasStarted: true,
        hasEnded: true,
      });
    } else {
      setTimeLeft(intialState);
    }
  };

  return timeLeft;
};

export default useCountdown;
