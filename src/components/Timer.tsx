import { useTimer } from "react-timer-hook";
import { type nextPage } from "@/App.tsx";
import { twMerge } from "tailwind-merge";

interface TimerProps {
  expiryTimestamp: Date;
  onExpire: nextPage;
  autoStart: boolean;
  className?: string;
}

export default function Timer({
  expiryTimestamp,
  onExpire,
  autoStart,
  className,
}: TimerProps) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    autoStart,
    onExpire,
  });

  // Show a full 60-minute timer as "60:00" instead of rolling over to hours
  const totalMinutes = minutes + hours * 60;

  return (
    <div className={twMerge("text-center text-8xl", className)}>
      <div>
        <span>{totalMinutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      {/*<button onClick={start}>Start</button>*/}
      {/*<button onClick={pause}>Pause</button>*/}
      {/*<button onClick={resume}>Resume</button>*/}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    // Restarts to 5 minutes timer*/}
      {/*    const time = new Date();*/}
      {/*    time.setSeconds(time.getSeconds() + 300);*/}
      {/*    restart(time);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Restart*/}
      {/*</button>*/}
    </div>
  );
}
