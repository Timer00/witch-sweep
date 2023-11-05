import { useTimer } from "react-timer-hook";
import { nextPage } from "@/App.tsx";
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
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    autoStart,
    onExpire,
  });

  return (
    <div className={twMerge("text-center text-8xl", className)}>
      <div>
        <span>{minutes}</span>:
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
