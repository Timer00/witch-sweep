import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import {
  AlarmClock,
  BookOpen,
  Cat,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  Heart,
  NotebookPen,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import PageContainer from "@/components/PageContainer.tsx";
import { storyChapters } from "@/assets/story/eineVerhexteWoche.ts";
import { paginateChapter, type BookPage } from "@/utils/paginateStory.ts";
import {
  markChapterFinished,
  saveReadingPosition,
  loadReadingPosition,
} from "@/utils/storyProgress.ts";
import type { StoryChapter } from "@/assets/story/eineVerhexteWoche.ts";

interface StoryReaderProps {
  chapterIndex: number;
  onBackToContents: () => void;
  onGoToChapter?: (index: number) => void;
}

function computeFontSize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const stageH = Math.min(h, (w * 9) / 16);
  return Math.round(Math.max(14, Math.min(22, 8 + stageH * 0.011)));
}

import DecoStars from "@/components/DecoStars.tsx";

// One little doodle per weekday, shown beside the chapter title
const CHAPTER_ICONS: { [id: string]: LucideIcon } = {
  montag: AlarmClock,
  dienstag: Presentation,
  mittwoch: BookOpen,
  donnerstag: NotebookPen,
  freitag: CloudLightning,
  samstag: Cat,
  sonntag: Heart,
};

function PageContent({
  page,
  chapter,
  totalPages,
  isLast,
  fontSize,
  nextChapterLabel,
  onNextChapter,
}: {
  page: BookPage;
  chapter: StoryChapter;
  totalPages: number;
  isLast: boolean;
  fontSize: number;
  nextChapterLabel?: string;
  onNextChapter?: () => void;
}) {
  const ChapterIcon = CHAPTER_ICONS[chapter.id];
  return (
    <>
      {page.isChapterStart && (
        <div className="mx-auto mb-4 max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4">
            {ChapterIcon && (
              <ChapterIcon
                size={28}
                strokeWidth={1.75}
                className="shrink-0 -rotate-6 text-[#5a3a22]/60"
                aria-hidden
              />
            )}
            <h2 className="font-tales text-3xl text-[#3a2417]">
              {chapter.weekday}
            </h2>
            {ChapterIcon && (
              <ChapterIcon
                size={28}
                strokeWidth={1.75}
                className="shrink-0 rotate-6 -scale-x-100 text-[#5a3a22]/60"
                aria-hidden
              />
            )}
          </div>
          <p
            className="font-dyslexic mt-1 italic text-[#5a3a22]"
            style={{ fontSize: Math.max(12, fontSize - 4) }}
          >
            {chapter.title}
          </p>
        </div>
      )}
      <div className="mx-auto max-w-2xl space-y-3">
        {page.blocks.map((block, i) =>
          block.type === "sceneBreak" ? (
            <p
              key={i}
              className="py-2 text-center leading-relaxed tracking-[0.5em] text-[#8a7a5a]"
              style={{ fontSize }}
            >
              ✦ ✦ ✦
            </p>
          ) : (
            <p
              key={i}
              className="font-dyslexic text-left leading-relaxed text-[#3a2417]"
              style={{ fontSize }}
            >
              {block.text}
            </p>
          )
        )}
      </div>
      {isLast && (
        <div className="mx-auto max-w-2xl">
          <p className="mt-6 text-center text-sm italic text-[#8a7a5a]">
            — Ende des Kapitels —
          </p>
          {nextChapterLabel && onNextChapter && (
            <button
              type="button"
              onClick={onNextChapter}
              className="font-dyslexic mt-3 w-full text-center text-sm text-[#5a3a22] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Weiter: {nextChapterLabel} →
            </button>
          )}
        </div>
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

const StoryReader = ({
  chapterIndex,
  onBackToContents,
  onGoToChapter,
}: StoryReaderProps) => {
  const [fontSize] = useState(computeFontSize);
  const chapter = storyChapters[chapterIndex];

  // The real text area is measured after the book frame renders, then the
  // chapter is laid out into pages that exactly fit it (like an ebook reader).
  const parchmentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ width: number; height: number } | null>(
    null
  );

  useLayoutEffect(() => {
    const el = parchmentRef.current;
    if (!el) return;
    // px-8 / py-5 padding, plus the page-number footer line
    const width = Math.min(672, el.clientWidth - 64);
    const height = el.clientHeight - 40 - 32;
    setBox({ width, height });
  }, []);

  const pages = useMemo(
    () => (box ? paginateChapter(chapter, { ...box, fontSize }) : null),
    [chapter, box, fontSize]
  );

  const [currentPage, setCurrentPage] = useState(() => {
    const pos = loadReadingPosition();
    return pos && pos.chapterIndex === chapterIndex ? pos.pageIndex : 0;
  });

  const [flipState, setFlipState] = useState<{
    direction: "forward" | "backward";
    toPage: number;
    animating: boolean;
  } | null>(null);

  // Reset page when chapter changes (component reused via same key, not remounted)
  const [prevChapter, setPrevChapter] = useState(chapterIndex);
  if (prevChapter !== chapterIndex) {
    setPrevChapter(chapterIndex);
    const pos = loadReadingPosition();
    setCurrentPage(
      pos && pos.chapterIndex === chapterIndex ? pos.pageIndex : 0
    );
    setFlipState(null);
  }

  // Saved positions may exceed the page count (page counts change with screen
  // size, and "previous chapter" jumps save a huge index to land on the last
  // page) — clamp to what this layout actually has.
  const pageCount = pages?.length ?? 0;
  const safePage = pageCount > 0 ? Math.min(currentPage, pageCount - 1) : 0;

  // Save reading position whenever it changes
  useEffect(() => {
    if (!pages) return;
    saveReadingPosition(chapterIndex, safePage);
  }, [pages, chapterIndex, safePage]);

  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const touchStartRef = useRef<number | null>(null);

  const isFlipping = flipState !== null;
  const canGoBack = safePage > 0;
  const canGoForward = safePage < pageCount - 1;
  const isLastPage = pageCount > 0 && safePage === pageCount - 1;
  const isFirstPage = safePage === 0;
  const hasNextChapter =
    chapterIndex < storyChapters.length - 1 && !!onGoToChapter;
  const hasPrevChapter = chapterIndex > 0 && !!onGoToChapter;
  const nextChapter = hasNextChapter
    ? storyChapters[chapterIndex + 1]
    : undefined;

  const goToNextChapter = useCallback(() => {
    if (hasNextChapter && onGoToChapter) {
      onGoToChapter(chapterIndex + 1);
    }
  }, [hasNextChapter, onGoToChapter, chapterIndex]);

  const goToPrevChapter = useCallback(() => {
    if (hasPrevChapter && onGoToChapter) {
      // Save a very high page index so the reader clamps to the last page
      saveReadingPosition(chapterIndex - 1, Number.MAX_SAFE_INTEGER);
      onGoToChapter(chapterIndex - 1);
    }
  }, [hasPrevChapter, onGoToChapter, chapterIndex]);

  const commitFlip = useCallback(() => {
    if (!flipState) return;
    setCurrentPage(flipState.toPage);
    setFlipState(null);
  }, [flipState]);

  const goForward = useCallback(() => {
    if (isFlipping) return;
    if (canGoForward) {
      const next = safePage + 1;
      if (prefersReducedMotion.current) {
        setCurrentPage(next);
        return;
      }
      setFlipState({ direction: "forward", toPage: next, animating: false });
    } else if (hasNextChapter) {
      goToNextChapter();
    }
  }, [canGoForward, isFlipping, safePage, hasNextChapter, goToNextChapter]);

  const goBack = useCallback(() => {
    if (isFlipping) return;
    if (canGoBack) {
      const prev = safePage - 1;
      if (prefersReducedMotion.current) {
        setCurrentPage(prev);
        return;
      }
      setFlipState({ direction: "backward", toPage: prev, animating: false });
    } else if (hasPrevChapter) {
      goToPrevChapter();
    }
  }, [canGoBack, isFlipping, safePage, hasPrevChapter, goToPrevChapter]);

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
    if (pages && isLastPage) {
      markChapterFinished(chapter.id);
    }
  }, [pages, isLastPage, chapter.id]);

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

  const page = pages?.[safePage];

  const pageContentProps = {
    chapter,
    totalPages: pageCount,
    fontSize,
  };

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
          disabled={(isFirstPage && !hasPrevChapter) || isFlipping}
          className="shrink-0 rounded-full p-1 text-amber-100 transition-opacity disabled:opacity-20"
          aria-label={isFirstPage ? "Vorheriges Kapitel" : "Vorherige Seite"}
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
            ref={parchmentRef}
            className="absolute inset-2 overflow-hidden rounded px-8 py-5"
            style={parchmentStyle}
          >
            <DecoStars />
            <div className="relative h-full overflow-y-auto">
              {pages &&
                (flipState ? (
                  <PageContent
                    page={pages[flipState.toPage]}
                    isLast={flipState.toPage === pageCount - 1}
                    nextChapterLabel={nextChapter?.weekday}
                    onNextChapter={goToNextChapter}
                    {...pageContentProps}
                  />
                ) : (
                  page && (
                    <PageContent
                      page={page}
                      isLast={isLastPage}
                      nextChapterLabel={nextChapter?.weekday}
                      onNextChapter={goToNextChapter}
                      {...pageContentProps}
                    />
                  )
                ))}
            </div>
          </div>

          {/* Animated flip leaf */}
          {pages && flipState && (
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
                className="absolute inset-0 overflow-hidden rounded px-8 py-5"
                style={{
                  ...parchmentStyle,
                  backfaceVisibility: "hidden",
                }}
              >
                <DecoStars />
                {page && (
                  <PageContent
                    page={page}
                    isLast={isLastPage}
                    nextChapterLabel={nextChapter?.weekday}
                    onNextChapter={goToNextChapter}
                    {...pageContentProps}
                  />
                )}
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
          disabled={(isLastPage && !hasNextChapter) || isFlipping}
          className="shrink-0 rounded-full p-1 text-amber-100 transition-opacity disabled:opacity-20"
          aria-label={isLastPage ? "Nächstes Kapitel" : "Nächste Seite"}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </PageContainer>
  );
};

export default StoryReader;
