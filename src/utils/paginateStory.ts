import type {
  StoryBlock,
  StoryChapter,
} from "@/assets/story/eineVerhexteWoche";

export interface BookPage {
  blocks: StoryBlock[];
  isChapterStart: boolean;
  pageNumber: number;
}

export interface PageBox {
  width: number; // text column width in px
  height: number; // available text height per page in px (footer already excluded)
  fontSize: number;
}

// Height reserved on the final page for the "Ende des Kapitels" line and
// the next-chapter link rendered below the text.
const END_BLOCK_HEIGHT = 80;

// When a paragraph is cut to fill a page, prefer a sentence boundary if one
// lies within roughly one line of the exact fill point.
const SENTENCE_SNAP_WORDS = 11;

const SENTENCE_END = /[.!?…]["“”»«›‹']*$/;

function isSentenceEnd(word: string): boolean {
  return SENTENCE_END.test(word);
}

const cache = new Map<string, BookPage[]>();

/**
 * Ebook-style pagination: the chapter text is rendered into a hidden element
 * with the exact same font, size, width, and spacing as the visible page, and
 * each page is filled with as much text as truly fits. Paragraphs are split
 * at sentence boundaries when possible, mid-sentence otherwise — like a
 * printed book.
 */
export function paginateChapter(
  chapter: StoryChapter,
  box: PageBox
): BookPage[] {
  const key = `${chapter.id}:${Math.round(box.width)}x${Math.round(
    box.height
  )}:${box.fontSize}`;
  const hit = cache.get(key);
  if (hit) return hit;

  // Hidden measuring element mirroring the visible page's text column
  const m = document.createElement("div");
  m.style.cssText =
    `position:absolute;left:-10000px;top:0;visibility:hidden;` +
    `width:${box.width}px;font-size:${box.fontSize}px;line-height:1.625;` +
    `font-family:"OpenDyslexic",serif;`;
  document.body.appendChild(m);

  const availH = box.height - 4; // small slack for rounding

  const addPara = (text: string, first: boolean): HTMLElement => {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.margin = first ? "0" : "12px 0 0 0";
    m.appendChild(p);
    return p;
  };

  const addSceneBreak = (first: boolean): HTMLElement => {
    const p = document.createElement("p");
    p.textContent = "✦ ✦ ✦";
    p.style.cssText = `margin:${
      first ? 0 : 12
    }px 0 0 0;padding:8px 0;text-align:center;letter-spacing:0.5em`;
    m.appendChild(p);
    return p;
  };

  const addHeading = () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = "margin:0 0 16px 0;text-align:center";
    const h = document.createElement("h2");
    h.textContent = chapter.weekday;
    h.style.cssText =
      'font-family:"AncientModernTales",serif;font-size:30px;line-height:36px';
    const sub = document.createElement("p");
    sub.textContent = chapter.title;
    sub.style.cssText = `margin:4px 0 0 0;font-style:italic;font-size:${Math.max(
      12,
      box.fontSize - 4
    )}px;line-height:1.5`;
    wrap.appendChild(h);
    wrap.appendChild(sub);
    m.appendChild(wrap);
  };

  const fits = () => m.getBoundingClientRect().height <= availH;

  const pages: BookPage[] = [];
  let cur: StoryBlock[] = [];

  const resetPage = () => {
    m.innerHTML = "";
    cur = [];
    if (pages.length === 0) addHeading();
  };

  const commitPage = () => {
    if (cur.length === 0) return;
    pages.push({
      blocks: cur,
      isChapterStart: pages.length === 0,
      pageNumber: pages.length + 1,
    });
    resetPage();
  };

  resetPage();

  type QueueItem = StoryBlock | { type: "end" };
  const queue: QueueItem[] = [...chapter.blocks, { type: "end" }];

  // Absolute upper bound on loop iterations so a logic gap can never
  // freeze the app — far beyond anything a real chapter produces.
  let guard = 10000;

  while (queue.length && guard-- > 0) {
    const block = queue.shift()!;

    if (block.type === "end") {
      // Make sure the end-of-chapter ornament fits below the last text
      const endEl = document.createElement("div");
      endEl.style.height = `${END_BLOCK_HEIGHT}px`;
      m.appendChild(endEl);
      if (fits() || cur.length === 0) break;
      m.removeChild(endEl);

      // Carry the tail of this page onto a final page
      const last = cur.pop()!;
      m.removeChild(m.lastElementChild!);
      if (last.type === "text") {
        const words = last.text.split(/\s+/).filter(Boolean);
        let cutIdx = -1;
        for (let i = words.length - 2; i >= 0; i--) {
          if (isSentenceEnd(words[i])) {
            cutIdx = i + 1;
            break;
          }
        }
        if (cutIdx > 0) {
          const head = words.slice(0, cutIdx).join(" ");
          const tail = words.slice(cutIdx).join(" ");
          addPara(head, cur.length === 0);
          cur.push({ type: "text", text: head });
          commitPage();
          queue.unshift({ type: "text", text: tail }, { type: "end" });
          continue;
        }
        if (cur.length === 0) {
          // Single unsplittable block filling the whole page — accept overflow
          addPara(last.text, true);
          cur.push(last);
          break;
        }
      }
      commitPage();
      queue.unshift(last, { type: "end" });
      continue;
    }

    if (block.type === "sceneBreak") {
      const el = addSceneBreak(cur.length === 0);
      if (fits() || cur.length === 0) {
        // Force-accept when it's the first thing on a page (degenerate
        // tiny screens) so pagination always makes progress
        cur.push(block);
      } else {
        m.removeChild(el);
        commitPage();
        queue.unshift(block);
      }
      continue;
    }

    // Text paragraph
    const el = addPara(block.text, cur.length === 0);
    if (fits()) {
      cur.push(block);
      continue;
    }

    // Paragraph overflows — binary-search how many words truly fit
    const words = block.text.split(/\s+/).filter(Boolean);
    let lo = 1;
    let hi = words.length;
    let best = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      el.textContent = words.slice(0, mid).join(" ");
      if (fits()) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    if (best < 4 && cur.length > 0) {
      // Hardly anything fits — start a fresh page with the whole paragraph
      m.removeChild(el);
      commitPage();
      queue.unshift(block);
      continue;
    }
    if (best === 0) {
      // Degenerate tiny screen: force the block to avoid an endless loop
      el.textContent = block.text;
      cur.push(block);
      commitPage();
      continue;
    }

    // Prefer a sentence boundary near the fill point
    let cut = best;
    for (let i = best; i >= Math.max(1, best - SENTENCE_SNAP_WORDS); i--) {
      if (isSentenceEnd(words[i - 1])) {
        cut = i;
        break;
      }
    }

    const head = words.slice(0, cut).join(" ");
    const tail = words.slice(cut).join(" ");
    el.textContent = head;
    cur.push({ type: "text", text: head });
    commitPage();
    queue.unshift({ type: "text", text: tail });
  }

  commitPage();
  document.body.removeChild(m);

  cache.set(key, pages);
  return pages;
}
