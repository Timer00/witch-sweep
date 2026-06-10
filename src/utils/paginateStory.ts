import type { StoryBlock, StoryChapter } from "@/assets/story/eineVerhexteWoche";

export interface BookPage {
  blocks: StoryBlock[];
  isChapterStart: boolean;
  pageNumber: number;
}

const SCENE_BREAK_COST = 10;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function splitAtSentence(text: string, targetWords: number): [string, string] {
  const words = text.split(/\s+/);
  if (words.length <= targetWords) return [text, ""];

  const slice = words.slice(0, targetWords).join(" ");

  // Find last sentence-ending punctuation (.!?) optionally followed by closing quotes
  let splitPos = -1;
  for (let i = slice.length - 1; i >= Math.floor(slice.length * 0.3); i--) {
    const c = slice[i];
    if (c === "." || c === "!" || c === "?") {
      let end = i;
      while (
        end + 1 < slice.length &&
        (slice[end + 1] === "”" ||
          slice[end + 1] === '"' ||
          slice[end + 1] === "»")
      ) {
        end++;
      }
      splitPos = end;
      break;
    }
  }

  if (splitPos === -1) {
    return [slice, words.slice(targetWords).join(" ")];
  }

  const first = slice.substring(0, splitPos + 1);
  const firstWordCount = first.split(/\s+/).filter(Boolean).length;
  const rest = words.slice(firstWordCount).join(" ");
  return [first, rest];
}

const cache = new Map<string, BookPage[]>();

export function paginateChapter(
  chapter: StoryChapter,
  wordsPerPage = 90
): BookPage[] {
  const cacheKey = `${chapter.id}:${wordsPerPage}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const chapterStartBudget = Math.round(wordsPerPage * 0.6);
  const minFillRatio = 0.65;

  const pages: BookPage[] = [];
  let currentBlocks: StoryBlock[] = [];
  let currentWords = 0;
  let isFirstPage = true;

  function budget() {
    return isFirstPage ? chapterStartBudget : wordsPerPage;
  }

  function commitPage() {
    if (currentBlocks.length === 0) return;
    pages.push({
      blocks: currentBlocks,
      isChapterStart: isFirstPage,
      pageNumber: pages.length + 1,
    });
    currentBlocks = [];
    currentWords = 0;
    isFirstPage = false;
  }

  // Add text that may be longer than one page, splitting as needed
  function addLongText(text: string) {
    let remaining = text;
    while (countWords(remaining) > budget() - currentWords) {
      const space = budget() - currentWords;
      if (space < 10) {
        commitPage();
        continue;
      }
      const [first, rest] = splitAtSentence(remaining, space);
      const firstW = countWords(first);
      if (firstW >= 10) {
        currentBlocks.push({ type: "text", text: first });
        currentWords += firstW;
        commitPage();
        remaining = rest;
      } else {
        commitPage();
      }
    }
    if (remaining.trim()) {
      currentBlocks.push({ type: "text", text: remaining });
      currentWords += countWords(remaining);
    }
  }

  for (const block of chapter.blocks) {
    if (block.type === "sceneBreak") {
      if (
        currentWords + SCENE_BREAK_COST > budget() &&
        currentBlocks.length > 0
      ) {
        commitPage();
      }
      currentBlocks.push(block);
      currentWords += SCENE_BREAK_COST;
      continue;
    }

    const words = countWords(block.text);

    if (currentWords + words <= budget()) {
      currentBlocks.push(block);
      currentWords += words;
    } else if (currentWords >= budget() * minFillRatio) {
      // Page is full enough — start new page with this paragraph
      commitPage();
      addLongText(block.text);
    } else {
      // Page is underfilled — split this paragraph to fill it
      const space = budget() - currentWords;
      const [first, rest] = splitAtSentence(block.text, space);
      const firstW = countWords(first);
      if (firstW >= 10) {
        currentBlocks.push({ type: "text", text: first });
        currentWords += firstW;
        commitPage();
        if (rest.trim()) {
          addLongText(rest);
        }
      } else {
        commitPage();
        addLongText(block.text);
      }
    }
  }

  commitPage();

  cache.set(cacheKey, pages);
  return pages;
}
