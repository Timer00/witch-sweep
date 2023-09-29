import logo from '@/assets/images/witch_talk.png';
import { Page, setPage } from '@/App.tsx';
import DialogBox from '@/components/DialogBox.tsx';
import Timer from '@/components/Timer.tsx';
import Button from '@/components/Button.tsx';



interface TimerScreenProps extends Omit<Page,'messages'> {
  timerMinutes: number;
  setPage: setPage;
  doneButton: string;
  timerHeader: string;
}

const TimerScreen = ({
  nextPage,
  timerMinutes,
  setPage,
  doneButton,
  timerHeader,
}: TimerScreenProps) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * timerMinutes); // 10 minutes timer

  return (
    <div className="flex h-full items-center justify-center p-32">
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] z-0 w-1/2"
      />
      <DialogBox>
        <h1 className="text-3xl font-bold">{timerHeader}</h1>
        <Timer
          expiryTimestamp={time}
          onExpire={() => setPage(7)}
          autoStart={true}
        />
        <Button
          className="m-10 border-black font-mono text-black"
          onClick={nextPage}
        >
          {doneButton}
        </Button>
      </DialogBox>
    </div>
  );
};

export default TimerScreen;
