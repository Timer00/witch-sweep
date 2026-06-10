import PageContainer from "@/components/PageContainer.tsx";
import Button from "@/components/Button.tsx";
import Title from "@/components/Title.tsx";
import { storyChapters } from "@/assets/story/eineVerhexteWoche.ts";

interface StoryChapterPickerProps {
  onSelectChapter: (index: number) => void;
  onBack: () => void;
}

const StoryChapterPicker = ({
  onSelectChapter,
  onBack,
}: StoryChapterPickerProps) => {
  return (
    <PageContainer className="bg-gradient-to-b from-[#1a0e08] via-[#2a1a10] to-[#0d0705]">
      <div className="z-2 relative flex h-full flex-col items-center justify-center gap-6">
        <Title>Wähle ein Kapitel</Title>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {storyChapters.map((chapter, index) => (
            <Button
              key={chapter.id}
              onClick={() => onSelectChapter(index)}
              className="md:text-2xl lg:text-3xl"
            >
              {chapter.weekday}
            </Button>
          ))}
        </div>
        <Button
          onClick={onBack}
          small
          className="mt-4 md:text-xl lg:text-2xl"
        >
          Zurück
        </Button>
      </div>
    </PageContainer>
  );
};

export default StoryChapterPicker;
