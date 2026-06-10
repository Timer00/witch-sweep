import { WEEKDAY_IDS, type WeekdayId } from "@/assets/story/eineVerhexteWoche";

const FINISHED_KEY = "storyProgress.v1";
const POSITION_KEY = "storyPosition.v1";

function isValidWeekdayId(value: unknown): value is WeekdayId {
  return typeof value === "string" && (WEEKDAY_IDS as readonly string[]).includes(value);
}

export function loadFinishedChapters(): WeekdayId[] {
  try {
    const raw = localStorage.getItem(FINISHED_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidWeekdayId);
  } catch {
    return [];
  }
}

export function markChapterFinished(id: WeekdayId): void {
  const current = loadFinishedChapters();
  if (current.includes(id)) return;
  current.push(id);
  localStorage.setItem(FINISHED_KEY, JSON.stringify(current));
}

export interface ReadingPosition {
  chapterIndex: number;
  pageIndex: number;
}

export function saveReadingPosition(chapterIndex: number, pageIndex: number): void {
  localStorage.setItem(POSITION_KEY, JSON.stringify({ chapterIndex, pageIndex }));
}

export function loadReadingPosition(): ReadingPosition | null {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "chapterIndex" in parsed &&
      "pageIndex" in parsed &&
      typeof (parsed as ReadingPosition).chapterIndex === "number" &&
      typeof (parsed as ReadingPosition).pageIndex === "number"
    ) {
      const pos = parsed as ReadingPosition;
      if (pos.chapterIndex >= 0 && pos.chapterIndex < 7) return pos;
    }
    return null;
  } catch {
    return null;
  }
}
