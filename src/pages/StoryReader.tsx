import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "@/components/PageContainer.tsx";
import { storyChapters } from "@/assets/story/eineVerhexteWoche.ts";
import { paginateChapter, type BookPage } from "@/utils/paginateStory.ts";
import { markChapterFinished } from "@/utils/storyProgress.ts";
import type { StoryChapter } from "@/assets/story/eineVerhexteWoche.ts";

interface StoryReaderProps {
  chapterIndex: number;
  onBackToContents: () => void;
}

function PageContent({
  page,
  chapter,
  totalPages,
  isLast,
}: {
  page: BookPage;
  chapter: StoryChapter;
  totalPages: number;
  isLast: boolean;
}) {
  return (
    <>
      {page.isChapterStart && (
        <div className="mb-4 text-center">
          <h2 className="font-tales text-3xl text-[#3a2417]">
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
      {isLast && (
        <p className="mt-6 text-center text-sm italic text-[#8a7a5a]">
          — Ende des Kapitels —
        </p>
      )}
      <p className="mt-4 text-center text-xs text-[#8a7a5a]">
        {page.pageNumber} / {totalPages}
      </p>
    </>
  );
}

const parchmentStyle = {
  background:
    "radial-gradient(ellipse at center, #f5ebcd 0%, #e8d5a8 60%, #d9c08c 100%)",
  boxShadow:
    "inset 2px 0 8px rgba(0,0,0,0.15), inset -2px 0 8px rgba(0,0,0,0.1)",
};

const FLIP_DURATION = 600;

const StoryReader = ({ chapterIndex, onBackToContents }: StoryReaderProps) => {
  const chapter = storyChapters[chapterIndex];
  const pages = paginateChapter(chapter);
  const [currentPage, setCurrentPage] = useState(0);
  const [flipState, setFlipState] = useState<{
    direction: "forward" | "backward";
    toPage: number;
    animating: boolean;
  } | null>(null);

  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const touchStartRef = useRef<number | null>(null);

  const isFlipping = flipState !== null;
  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < pages.length - 1;
  const displayPage = currentPage;
  const isLastPage = displayPage === pages.length - 1;

  const commitFlip = useCallback(() => {
    if (!flipState) return;
    setCurrentPage(flipState.toPage);
    setFlipState(null);
  }, [flipState]);

  const goForward = useCallback(() => {
    if (!canGoForward || isFlipping) return;
    const next = currentPage + 1;
    if (prefersReducedMotion.current) {
      setCurrentPage(next);
      return;
    }
    setFlipState({ direction: "forward", toPage: next, animating: false });
  }, [canGoForward, isFlipping, currentPage]);

  const goBack = useCallback(() => {
    if (!canGoBack || isFlipping) return;
    const prev = currentPage - 1;
    if (prefersReducedMotion.current) {
      setCurrentPage(prev);
      return;
    }
    setFlipState({ direction: "backward", toPage: prev, animating: false });
  }, [canGoBack, isFlipping, currentPage]);

  // Trigger animation on next frame after flipState is set
  useEffect(() => {
    if (flipState && !flipState.animating) {
      requestAnimationFrame(() => {
        setFlipState((s) => (s ? { ...s, animating: true } : null));
      });
    }
  }, [flipState]);

  // Timeout fallback for transitionend
  useEffect(() => {
    if (flipState?.animating) {
      flipTimeoutRef.current = setTimeout(commitFlip, FLIP_DURATION + 100);
      return () => clearTimeout(flipTimeoutRef.current);
    }
  }, [flipState?.animating, commitFlip]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goForward();
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goForward, goBack]);

  // Mark chapter finished
  useEffect(() => {
    if (isLastPage) {
      markChapterFinished(chapter.id);
    }
  }, [isLastPage, chapter.id]);

  // Touch/swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartRef.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartRef.current;
      touchStartRef.current = null;
      if (Math.abs(delta) > 50) {
        if (delta < 0) goForward();
        else goBack();
      }
    },
    [goForward, goBack]
  );

  const page = pages[displayPage];

  return (
    <PageContainer
      style={{
        background:
          "radial-gradient(ellipse at center, #2a1a10 0%, #1a0e08 50%, #0d0705 100%)",
      }}
    >
      <div className="z-2 relative flex h-full w-full items-center justify-center px-2">
        {/* Back to contents */}
        <button
          type="button"
          onClick={onBackToContents}
          className="absolute right-3 top-1 z-10 rounded px-3 py-1 text-sm text-amber-200/70 underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Zur Übersicht
        </button>

        {/* Left arrow */}
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack || isFlipping}
          className="shrink-0 rounded-full p-1 text-amber-100 transition-opacity disabled:opacity-20"
          aria-label="Vorherige Seite"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Book frame */}
        <div
          className="relative mx-1 overflow-hidden rounded-lg border-4 border-[#5a3a22] shadow-2xl"
          style={{
            width: "88%",
            height: "90%",
            background: "#3a2417",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.3)",
            perspective: "1200px",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Page-stack illusion */}
          <div className="absolute inset-y-2 left-1 w-1 rounded bg-[#d9c08c]/40" />
          <div className="absolute inset-y-2 right-1 w-1 rounded bg-[#d9c08c]/40" />

          {/* Static parchment (shows destination page during flip) */}
          <div
            className="absolute inset-2 overflow-y-auto rounded px-8 py-5"
            style={parchmentStyle}
          >
            {flipState ? (
              <PageContent
                page={pages[flipState.toPage]}
                chapter={chapter}
                totalPages={pages.length}
                isLast={flipState.toPage === pages.length - 1}
              />
            ) : (
              <PageContent
                page={page}
                chapter={chapter}
                totalPages={pages.length}
                isLast={isLastPage}
              />
            )}
          </div>

          {/* Animated flip leaf */}
          {flipState && (
            <div
              className="absolute inset-2 rounded"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin:
                  flipState.direction === "forward"
                    ? "left center"
                    : "right center",
                transition: flipState.animating
                  ? `transform ${FLIP_DURATION}ms ease-in-out`
                  : "none",
                transform: flipState.animating
                  ? flipState.direction === "forward"
                    ? "rotateY(-180deg)"
                    : "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
              onTransitionEnd={() => {
                clearTimeout(flipTimeoutRef.current);
                commitFlip();
              }}
            >
              {/* Front face: the page we're leaving */}
              <div
                className="absolute inset-0 overflow-y-auto rounded px-8 py-5"
                style={{
                  ...parchmentStyle,
                  backfaceVisibility: "hidden",
                }}
              >
                <PageContent
                  page={page}
                  chapter={chapter}
                  totalPages={pages.length}
                  isLast={isLastPage}
                />
              </div>
              {/* Back face */}
              <div
                className="absolute inset-0 rounded"
                style={{
                  ...parchmentStyle,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              />
            </div>
          )}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward || isFlipping}
          className="shrink-0 rounded-full p-1 text-amber-100 transition-opacity disabled:opacity-20"
          aria-label="Nächste Seite"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </PageContainer>
  );
};

export default StoryReader;
