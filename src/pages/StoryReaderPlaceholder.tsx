import PageContainer from "@/components/PageContainer.tsx";
import Button from "@/components/Button.tsx";
import Title from "@/components/Title.tsx";
import { storyChapters } from "@/assets/story/eineVerhexteWoche.ts";

interface StoryReaderPlaceholderProps {
  chapterIndex: number;
  onBackToContents: () => void;
}

const StoryReaderPlaceholder = ({
  chapterIndex,
  onBackToContents,
}: StoryReaderPlaceholderProps) => {
  const chapter = storyChapters[chapterIndex];

  return (
    <PageContainer className="bg-gradient-to-b from-[#1a0e08] via-[#2a1a10] to-[#0d0705]">
      <div className="z-2 relative flex h-full flex-col items-center justify-center gap-6">
        <Title>{chapter.weekday}</Title>
        <p className="font-dyslexic text-xl text-amber-100">{chapter.title}</p>
        <p className="font-dyslexic text-lg text-amber-200/60">
          Der Buchleser kommt bald hierhin ...
        </p>
        <Button onClick={onBackToContents} small className="mt-4 md:text-xl lg:text-2xl">
          Zur Übersicht
        </Button>
      </div>
    </PageContainer>
  );
};

export default StoryReaderPlaceholder;
