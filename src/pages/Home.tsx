import logo from '@/assets/images/witch_talk.png';
import { PageProps } from '@/App.tsx';
import Button from '@/components/Button.tsx';
import PageContainer from "@/components/PageContainer.tsx";

interface HomeProps extends Omit<PageProps, 'messages'> {
  gameTitle: string;
  startButton: string;
}

const Home = ({ nextPage, gameTitle, startButton }: HomeProps) => {
  return (
    <PageContainer>
      <div className="parent text-white">
        <div className="gameTitle flex items-center justify-center">
          <p id={'gameTitle'}
            className="bg-gradient-to-r from-yellow-300 to-yellow-700 bg-clip-text p-8 font-black text-transparent selection:bg-transparent md:text-4xl lg:text-6xl">
            {gameTitle}
          </p>
        </div>
        <div className="startButton">
          <p className="">
            <Button onClick={nextPage}>{startButton}</Button>
          </p>
        </div>
      </div>
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] w-1/2"
      />
    </PageContainer>
  );
};

export default Home;
