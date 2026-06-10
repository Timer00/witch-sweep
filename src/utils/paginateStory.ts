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
  const slice = words.slice(0, targetWords).join(" ");
  const sentenceEnd = slice.lastIndexOf(".");
  if (sentenceEnd === -1) {
    return [slice, words.slice(targetWords).join(" ")];
  }
  const first = slice.substring(0, sentenceEnd + 1);
  const firstWordCount = first.split(/\s+/).filter(Boolean).length;
  const rest = words.slice(firstWordCount).join(" ");
  return [first, rest];
}

const cache = new Map<string, BookPage[]>();

export function paginateChapter(chapter: StoryChapter, wordsPerPage = 90): BookPage[] {
  const cacheKey = `${chapter.id}:${wordsPerPage}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const chapterStartBudget = Math.round(wordsPerPage * 0.6);
  const splitThreshold = Math.round(wordsPerPage * 1.45);

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

  for (const block of chapter.blocks) {
    if (block.type === "sceneBreak") {
      if (currentWords + SCENE_BREAK_COST > budget() && currentBlocks.length > 0) {
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
    } else if (words > splitThreshold) {
      if (currentBlocks.length > 0) {
        commitPage();
      }
      let remaining = block.text;
      while (countWords(remaining) > budget()) {
        const [first, rest] = splitAtSentence(remaining, budget());
        currentBlocks.push({ type: "text", text: first });
        currentWords = countWords(first);
        commitPage();
        remaining = rest;
      }
      if (remaining.trim()) {
        currentBlocks.push({ type: "text", text: remaining });
        currentWords = countWords(remaining);
      }
    } else {
      commitPage();
      currentBlocks.push(block);
      currentWords = words;
    }
  }

  commitPage();

  cache.set(cacheKey, pages);
  return pages;
}
