import { useRef } from "react";
import { coin } from "@/assets";

interface DifficultySliderProps {
  points: number;
  onChange: (points: number) => void;
}

export const MIN_POINTS = 1;
export const MAX_POINTS = 12;

// One word per two increments: 0–1 sehr leicht, 2–3 okay, … 10–12 Extrem!
const DIFFICULTY_LABELS = [
  "sehr leicht",
  "okay",
  "mittel",
  "schwer",
  "sehr schwer",
  "Extrem!",
];

export function difficultyLabel(points: number): string {
  const index = Math.min(DIFFICULTY_LABELS.length - 1, Math.floor(points / 2));
  return DIFFICULTY_LABELS[index];
}

const W = 300;
const H = 320;
const TRACK_X = 95;
const TRACK_TOP = 70;
const TRACK_BOTTOM = 240;
const INFO_X = 195;

function yForPoints(points: number): number {
  return (
    TRACK_BOTTOM - (points / MAX_POINTS) * (TRACK_BOTTOM - TRACK_TOP)
  );
}

/**
 * A vertical slider on a parchment panel. Dragging the golden knob up
 * makes the task "harder" and worth more coins (1–12). The fill gets a
 * more intense gold the higher it goes.
 */
const DifficultySlider = ({ points, onChange }: DifficultySliderProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);

  const pointsFromPointer = (e: React.PointerEvent): number => {
    const rect = svgRef.current!.getBoundingClientRect();
    const yView = ((e.clientY - rect.top) / rect.height) * H;
    const raw =
      ((TRACK_BOTTOM - yView) / (TRACK_BOTTOM - TRACK_TOP)) * MAX_POINTS;
    return Math.min(MAX_POINTS, Math.max(MIN_POINTS, Math.round(raw)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange(pointsFromPointer(e));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const next = pointsFromPointer(e);
    if (next !== points) onChange(next);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      onChange(Math.min(MAX_POINTS, points + 1));
      e.preventDefault();
    }
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      onChange(Math.max(MIN_POINTS, points - 1));
      e.preventDefault();
    }
  };

  const knobY = yForPoints(points);

  return (
    <div
      className="relative touch-none select-none"
      style={{ width: "min(62vh, 46vw, 440px)" }}
      role="slider"
      aria-valuemin={MIN_POINTS}
      aria-valuemax={MAX_POINTS}
      aria-valuenow={points}
      aria-valuetext={`${points} ${points === 1 ? "Münze" : "Münzen"}, ${difficultyLabel(points)}`}
      aria-label="Schwierigkeit wählen"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          <radialGradient id="diffPanel" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#f5ebcd" />
            <stop offset="70%" stopColor="#e8d5a8" />
            <stop offset="100%" stopColor="#d9c08c" />
          </radialGradient>
          {/* Soft gold at the bottom, intense deep gold at the top */}
          <linearGradient
            id="diffFill"
            gradientUnits="userSpaceOnUse"
            x1={TRACK_X}
            y1={TRACK_BOTTOM}
            x2={TRACK_X}
            y2={TRACK_TOP}
          >
            <stop offset="0%" stopColor="#f0dfae" />
            <stop offset="35%" stopColor="#e8c172" />
            <stop offset="65%" stopColor="#d9a441" />
            <stop offset="85%" stopColor="#c47e1d" />
            <stop offset="100%" stopColor="#9c5708" />
          </linearGradient>
        </defs>

        {/* Parchment panel */}
        <rect
          x={8}
          y={8}
          width={W - 16}
          height={H - 16}
          rx={20}
          fill="url(#diffPanel)"
          stroke="#5a3a22"
          strokeWidth={4}
        />

        {/* Title */}
        <text
          x={W / 2}
          y={42}
          textAnchor="middle"
          fill="#3a2417"
          fontSize={16}
          style={{ fontFamily: '"OpenDyslexic", serif' }}
        >
          So schwer ist meine Aufgabe:
        </text>

        {/* Slider track */}
        <line
          x1={TRACK_X}
          y1={TRACK_TOP}
          x2={TRACK_X}
          y2={TRACK_BOTTOM}
          stroke="rgba(0,0,0,0.35)"
          strokeWidth={13}
          strokeLinecap="round"
        />
        {/* Filled part, from the bottom up to the knob */}
        <line
          x1={TRACK_X}
          y1={TRACK_BOTTOM}
          x2={TRACK_X}
          y2={knobY}
          stroke="url(#diffFill)"
          strokeWidth={13}
          strokeLinecap="round"
        />

        {/* Tick marks, stronger where the difficulty word changes */}
        {Array.from({ length: MAX_POINTS + 1 }, (_, p) => (
          <line
            key={p}
            x1={TRACK_X + 12}
            x2={TRACK_X + (p % 2 === 0 ? 20 : 16)}
            y1={yForPoints(p)}
            y2={yForPoints(p)}
            stroke="#5a3a22"
            strokeWidth={p % 2 === 0 ? 3 : 2}
            strokeLinecap="round"
            opacity={0.6}
          />
        ))}

        {/* Knob */}
        <circle cx={TRACK_X} cy={knobY} r={26} fill="transparent" />
        <circle
          cx={TRACK_X}
          cy={knobY}
          r={13}
          fill="#f0c75e"
          stroke="#5a3a22"
          strokeWidth={3}
        />

        {/* Coin reward next to the slider */}
        <g pointerEvents="none">
          <text
            x={INFO_X}
            y={130}
            textAnchor="middle"
            fill="#3a2417"
            fontSize={44}
            style={{ fontFamily: '"AncientModernTales", serif' }}
          >
            {points}
          </text>
          <text
            x={INFO_X}
            y={152}
            textAnchor="middle"
            fill="#5a3a22"
            fontSize={13}
            style={{ fontFamily: '"OpenDyslexic", serif' }}
          >
            {points === 1 ? "Münze" : "Münzen"}
          </text>
          {Array.from({ length: points }, (_, i) => {
            const w = 15;
            const gap = 3;
            const perRow = 6;
            const row = Math.floor(i / perRow);
            const rowCount = Math.min(perRow, points - row * perRow);
            const total = rowCount * w + (rowCount - 1) * gap;
            return (
              <image
                key={i}
                href={coin}
                x={INFO_X - total / 2 + (i % perRow) * (w + gap)}
                y={162 + row * 18}
                width={w}
                height={w}
              />
            );
          })}
        </g>

        {/* Difficulty word at the bottom */}
        <text
          x={W / 2}
          y={290}
          textAnchor="middle"
          fill="#3a2417"
          fontSize={26}
          style={{ fontFamily: '"AncientModernTales", serif' }}
        >
          {difficultyLabel(points)}
        </text>
      </svg>
    </div>
  );
};

export default DifficultySlider;
