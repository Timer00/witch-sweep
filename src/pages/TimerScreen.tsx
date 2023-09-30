import logo from '@/assets/images/witch_talk.png';
import { PageProps, setPage } from '@/App.tsx';
import DialogBox from '@/components/DialogBox.tsx';
import Timer from '@/components/Timer.tsx';
import Button from '@/components/Button.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { usePage } from "@/hooks/usePage.tsx";

interface TimerScreenProps extends Omit<PageProps,'messages'> {
  timerMinutes: number;
  doneButton: string;
  timerHeader: string;
}

const TimerScreen = ({
  timerMinutes,
  doneButton,
  timerHeader,
}: TimerScreenProps) => {
  const { setPage } = usePage();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * timerMinutes); // 10 minutes timer

  return (
    <PageContainer>
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] z-0 w-1/2"
      />
      <DialogBox>
        <h1 className="text-3xl font-bold">{timerHeader}</h1>
        <Timer
          expiryTimestamp={time}
          onExpire={() => setPage('youLost')}
          autoStart={true}
        />
        <Button
          className="m-10 border-black font-mono text-black"
          onClick={()=>setPage('youWon')}
        >
          {doneButton}
        </Button>
      </DialogBox>
    </PageContainer>
  );
};

export default TimerScreen;
