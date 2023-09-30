import logo from '@/assets/images/witch_talk.png';
import { PageProps } from '@/App.tsx';
import Dialog from '@/components/Dialog.tsx';
import PageContainer from "@/components/PageContainer.tsx";

interface YouWonProps extends PageProps {
  restartButton: string;
}

const YouWon = ({ nextPage, messages, restartButton }: YouWonProps) => {
  return (
    <PageContainer>
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] z-0 w-1/2"
      />
      <Dialog
        messages={messages}
        nextPage={nextPage}
        buttonText={restartButton}
      />
    </PageContainer>
  );
};

export default YouWon;
