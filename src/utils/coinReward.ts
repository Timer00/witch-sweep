// Homework: one coin per 5 minutes — 5 → 1, 30 → 6, 60 → 12.
// Cleaning rewards are NOT time-based; they come from the difficulty
// slider (see DifficultySlider), because more time must not mean more coins.
export function coinsForHomeworkMinutes(minutes: number): number {
  return Math.floor(minutes / 5);
}

const NUMBER_WORDS = [
  "null",
  "eine",
  "zwei",
  "drei",
  "vier",
  "fünf",
  "sechs",
  "sieben",
  "acht",
  "neun",
  "zehn",
  "elf",
  "zwölf",
];

// "eine Münze", "drei Münzen", … for the witch's dialogue
export function coinLabel(count: number): string {
  const word = NUMBER_WORDS[count] ?? String(count);
  return `${word} ${count === 1 ? "Münze" : "Münzen"}`;
}
