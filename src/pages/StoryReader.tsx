import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "@/components/PageContainer.tsx";
import { storyChapters } from "@/assets/story/eineVerhexteWoche.ts";
import { paginateChapter } from "@/utils/paginateStory.ts";

interface StoryReaderProps {
  chapterIndex: number;
  onBackToContents: () => void;
}

const StoryReader = ({ chapterIndex, onBackToContents }: StoryReaderProps) => {
  const chapter = storyChapters[chapterIndex];
  const pages = paginateChapter(chapter);
  const [currentPage, setCurrentPage] = useState(0);

  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < pages.length - 1;
  const isLastPage = currentPage === pages.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack) setCurrentPage((p) => p - 1);
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) setCurrentPage((p) => p + 1);
  }, [canGoForward]);

  const page = pages[currentPage];

  return (
    <PageContainer className="bg-gradient-to-b from-[#1a0e08] via-[#2a1a10] to-[#0d0705]">
      <div className="z-2 relative flex h-full w-full items-center justify-center px-2">
        {/* Back to contents button */}
        <button
          type="button"
          onClick={onBackToContents}
          className="absolute right-2 top-2 z-10 rounded px-3 py-1 text-sm text-amber-200/70 underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Zur Übersicht
        </button>

        {/* Left arrow */}
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          className="shrink-0 rounded-full p-2 text-amber-100 transition-opacity disabled:opacity-20"
          aria-label="Vorherige Seite"
        >
          <ChevronLeft size={36} />
        </button>

        {/* Page content */}
        <div
          className="mx-2 overflow-y-auto rounded-lg bg-[#f5ebcd] px-10 py-5 shadow-xl"
          style={{ width: "85%", height: "88%" }}
        >
          {page.isChapterStart && (
            <div className="mb-4 text-center">
              <h2 className="font-dyslexic text-2xl font-bold text-[#3a2417]">
                {chapter.weekday}
              </h2>
              <p className="font-dyslexic mt-1 text-sm italic text-[#5a3a22]">
                {chapter.title}
              </p>
            </div>
          )}
          <div className="space-y-3">
            {page.blocks.map((block, i) =>
              block.type === "sceneBreak" ? (
                <p
                  key={i}
                  className="py-2 text-center tracking-[0.5em] text-[#8a7a5a]"
                >
                  ✦ ✦ ✦
                </p>
              ) : (
                <p
                  key={i}
                  className="font-dyslexic text-left text-base leading-relaxed text-[#3a2417]"
                >
                  {block.text}
                </p>
              )
            )}
          </div>
          {isLastPage && (
            <p className="mt-6 text-center text-sm italic text-[#8a7a5a]">
              — Ende des Kapitels —
            </p>
          )}
          <p className="mt-4 text-center text-xs text-[#8a7a5a]">
            {page.pageNumber} / {pages.length}
          </p>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward}
          className="shrink-0 rounded-full p-2 text-amber-100 transition-opacity disabled:opacity-20"
          aria-label="Nächste Seite"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </PageContainer>
  );
};

export default StoryReader;
