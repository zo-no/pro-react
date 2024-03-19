import { useState, useRef } from "react";
import Button from "./Button";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div className={` m-4 rounded-md  bg-green-500 p-2 text-center`}>
      <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
      <Button onClick={handleStart}>开始</Button>
      <Button onClick={handleStop}>停止</Button>
      <Button onClick={() => setStartTime(null)}>重置</Button>
    </div>
  );
}
