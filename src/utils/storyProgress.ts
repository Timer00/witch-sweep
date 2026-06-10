import { WEEKDAY_IDS, type WeekdayId } from "@/assets/story/eineVerhexteWoche";

const STORAGE_KEY = "storyProgress.v1";

function isValidWeekdayId(value: unknown): value is WeekdayId {
  return typeof value === "string" && (WEEKDAY_IDS as readonly string[]).includes(value);
}

export function loadFinishedChapters(): WeekdayId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
