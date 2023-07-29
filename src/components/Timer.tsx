import { useTimer } from 'react-timer-hook';
import { nextPage } from '@/App.tsx';

interface TimerProps {
  expiryTimestamp: Date;
  onExpire: nextPage;
  autoStart: boolean;
}

export default function Timer({
  expiryTimestamp,
  onExpire,
  autoStart,
}: TimerProps) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    autoStart,
    onExpire,
  });

  return (
    <div className="text-center">
      <div className="text-8xl">
        <span>{minutes}</span>:<span>{seconds}</span>
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
