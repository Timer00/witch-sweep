// One coin per started 10 minutes: 10–19 → 1, 20–29 → 2, … 60 → 6
export function coinsForMinutes(minutes: number): number {
  return Math.floor(minutes / 10);
}

const NUMBER_WORDS = ["null", "eine", "zwei", "drei", "vier", "fünf", "sechs"];

// "eine Münze", "drei Münzen", … for the witch's dialogue
export function coinLabel(count: number): string {
  const word = NUMBER_WORDS[count] ?? String(count);
  return `${word} ${count === 1 ? "Münze" : "Münzen"}`;
}
