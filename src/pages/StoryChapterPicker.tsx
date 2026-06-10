import PageContainer from "@/components/PageContainer.tsx";
import {
  STORY_TITLE,
  STORY_SUBTITLE,
  storyChapters,
} from "@/assets/story/eineVerhexteWoche.ts";

interface StoryChapterPickerProps {
  onSelectChapter: (index: number) => void;
  onBack: () => void;
}

const StoryChapterPicker = ({
  onSelectChapter,
  onBack,
}: StoryChapterPickerProps) => {
  return (
    <PageContainer
      style={{
        background:
          "radial-gradient(ellipse at center, #2a1a10 0%, #1a0e08 50%, #0d0705 100%)",
      }}
    >
      <div className="z-2 relative flex h-full w-full items-center justify-center px-4">
        {/* Book frame */}
        <div
          className="relative flex overflow-hidden rounded-lg border-4 border-[#5a3a22] shadow-2xl"
          style={{
            width: "90%",
            height: "90%",
            background: "#3a2417",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Page-stack illusion */}
          <div className="absolute inset-y-2 left-1 w-1 rounded bg-[#d9c08c]/40" />
          <div className="absolute inset-y-2 right-1 w-1 rounded bg-[#d9c08c]/40" />

          {/* Left page: title */}
          <div
            className="flex flex-1 flex-col items-center justify-center rounded-l p-6"
            style={{
              background:
                "radial-gradient(ellipse at center, #f5ebcd 0%, #e8d5a8 60%, #d9c08c 100%)",
              boxShadow: "inset -4px 0 12px rgba(0,0,0,0.15)",
              margin: "8px 0 8px 8px",
            }}
          >
            <h1 className="font-tales text-center text-3xl text-[#3a2417] lg:text-4xl">
              {STORY_TITLE}
            </h1>
            <p className="font-dyslexic mt-3 text-center text-sm italic text-[#5a3a22] lg:text-base">
              {STORY_SUBTITLE}
            </p>
          </div>

          {/* Spine */}
          <div
            className="w-3 shrink-0"
            style={{
              background:
                "linear-gradient(to right, #2a1a10, #3a2417, #2a1a10)",
              boxShadow: "0 0 8px rgba(0,0,0,0.5)",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          />

          {/* Right page: table of contents */}
          <div
            className="flex flex-1 flex-col rounded-r p-5"
            style={{
              background:
                "radial-gradient(ellipse at center, #f5ebcd 0%, #e8d5a8 60%, #d9c08c 100%)",
              boxShadow: "inset 4px 0 12px rgba(0,0,0,0.15)",
              margin: "8px 8px 8px 0",
            }}
          >
            <h2 className="font-tales mb-3 text-center text-xl text-[#3a2417] lg:text-2xl">
              Inhaltsverzeichnis
            </h2>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {storyChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => onSelectChapter(index)}
                  className="group flex items-center gap-2 rounded px-3 py-1.5 text-left transition-colors hover:bg-[#d9c08c]/50"
                >
                  <span className="font-tales text-base text-[#3a2417] lg:text-lg">
                    {chapter.weekday}
                  </span>
                  <span className="flex-1 border-b border-dotted border-[#8a7a5a]/50" />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onBack}
              className="font-dyslexic mt-2 self-center text-sm text-[#5a3a22] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default StoryChapterPicker;
