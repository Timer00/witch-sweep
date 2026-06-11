const STAR_COLOR = "140, 106, 47";

interface DecoStar {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  opacity: number;
  rotate: number;
  char: string;
}

const EDGE_STARS: DecoStar[] = [
  { top: "2%", left: "1%", size: 18, opacity: 0.5, rotate: -15, char: "✦" },
  { top: "1%", right: "2%", size: 13, opacity: 0.4, rotate: 20, char: "✧" },
  { top: "20%", right: "0.8%", size: 16, opacity: 0.45, rotate: -10, char: "✦" },
  { top: "33%", left: "0.9%", size: 12, opacity: 0.35, rotate: 12, char: "✧" },
  { top: "52%", right: "1.2%", size: 11, opacity: 0.35, rotate: 0, char: "★" },
  { top: "68%", left: "0.7%", size: 15, opacity: 0.45, rotate: -18, char: "✦" },
  { bottom: "3%", left: "2%", size: 13, opacity: 0.4, rotate: 8, char: "✧" },
  { bottom: "2%", right: "1%", size: 17, opacity: 0.5, rotate: 15, char: "✦" },
  { bottom: "18%", right: "2%", size: 11, opacity: 0.3, rotate: -5, char: "✧" },
  { top: "42%", left: "2%", size: 10, opacity: 0.3, rotate: 25, char: "★" },
];

const INNER_STARS: DecoStar[] = [
  { top: "10%", left: "calc(50% - 470px)", size: 14, opacity: 0.4, rotate: -12, char: "✦" },
  { top: "30%", left: "calc(50% - 395px)", size: 9, opacity: 0.3, rotate: 0, char: "★" },
  { top: "58%", left: "calc(50% - 430px)", size: 11, opacity: 0.33, rotate: 18, char: "✧" },
  { top: "80%", left: "calc(50% - 480px)", size: 12, opacity: 0.35, rotate: -8, char: "✧" },
  { top: "16%", left: "calc(50% + 390px)", size: 12, opacity: 0.35, rotate: 10, char: "✧" },
  { top: "44%", left: "calc(50% + 455px)", size: 15, opacity: 0.4, rotate: -20, char: "✦" },
  { top: "70%", left: "calc(50% + 405px)", size: 10, opacity: 0.3, rotate: 5, char: "★" },
  { top: "88%", left: "calc(50% + 470px)", size: 13, opacity: 0.38, rotate: 22, char: "✦" },
];

const EXTRA_STARS: DecoStar[] = [
  { top: "6%", left: "12%", size: 10, opacity: 0.3, rotate: 30, char: "✧" },
  { top: "14%", right: "10%", size: 14, opacity: 0.35, rotate: -22, char: "✦" },
  { top: "28%", left: "8%", size: 9, opacity: 0.25, rotate: 5, char: "★" },
  { top: "38%", right: "6%", size: 12, opacity: 0.3, rotate: 15, char: "✧" },
  { top: "46%", left: "14%", size: 16, opacity: 0.4, rotate: -8, char: "✦" },
  { top: "55%", right: "12%", size: 8, opacity: 0.25, rotate: 35, char: "★" },
  { top: "62%", left: "5%", size: 11, opacity: 0.3, rotate: -25, char: "✧" },
  { top: "75%", right: "8%", size: 13, opacity: 0.35, rotate: 12, char: "✦" },
  { top: "82%", left: "10%", size: 9, opacity: 0.28, rotate: -15, char: "★" },
  { bottom: "8%", right: "14%", size: 15, opacity: 0.4, rotate: 20, char: "✦" },
  { top: "10%", left: "25%", size: 7, opacity: 0.2, rotate: 40, char: "✧" },
  { top: "90%", right: "25%", size: 8, opacity: 0.22, rotate: -30, char: "★" },
];

function DecoStars({ dense }: { dense?: boolean }) {
  const stars = dense
    ? [...EDGE_STARS, ...INNER_STARS, ...EXTRA_STARS]
    : [...EDGE_STARS, ...INNER_STARS];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            fontSize: s.size,
            lineHeight: 1,
            color: `rgba(${STAR_COLOR}, ${s.opacity})`,
            transform: `rotate(${s.rotate}deg)`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}

export default DecoStars;
