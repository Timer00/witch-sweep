import logo from '@/assets/images/witch_talk.png';
import { PageProps, setTimerMinutes } from '@/App.tsx';
import DialogBox from '@/components/DialogBox.tsx';
import PageContainer from "@/components/PageContainer.tsx";

interface HowLongProps extends PageProps {
  setTimerMinutes: setTimerMinutes;
}

const HowLong = ({
  setTimerMinutes,
  nextPage
}: HowLongProps) => {
  const setHowLong = (minutes: number) => {
    setTimerMinutes(minutes);
    nextPage();
  };

  return (
    <PageContainer>
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] z-0 w-1/2"
      />
      <DialogBox>
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-10">
          <div
            onClick={() => setHowLong(1)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-red-300"
          >
            <span className="text-center">5:00</span>
          </div>
          <div
            onClick={() => setHowLong(10)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-blue-700"
          >
            <span className="text-center">10:00</span>
          </div>
          <div
            onClick={() => setHowLong(15)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-yellow-400"
          >
            <span className="text-center">15:00</span>
          </div>
          <div
            onClick={() => setHowLong(20)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-green-500"
          >
            <span className="text-center">20:00</span>
          </div>
        </div>
      </DialogBox>
    </PageContainer>
  );
};

export default HowLong;
