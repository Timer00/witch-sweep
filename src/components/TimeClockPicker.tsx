import { useRef } from "react";
import { coin } from "@/assets";

interface TimeClockPickerProps {
  minutes: number;
  onChange: (minutes: number) => void;
  /** Coin reward to show in the middle; null hides coins (cleaning: time earns nothing) */
  coins: number | null;
}

export const MIN_MINUTES = 5;
export const MAX_MINUTES = 60;
const STEP = 5;

const SIZE = 300;
const CENTER = SIZE / 2;
const TRACK_R = 130;
const FACE_R = 112;

function polar(radius: number, minutes: number): { x: number; y: number } {
  const rad = (minutes * 6 * Math.PI) / 180; // 6° per minute, 0 at 12 o'clock
  return {
    x: CENTER + radius * Math.sin(rad),
    y: CENTER - radius * Math.cos(rad),
  };
}

/**
 * A clock face with a circular slider around it. Dragging the golden knob
 * (or tapping the ring) sets the minutes, in 5-minute steps from 5 to 60.
 */
const TimeClockPicker = ({ minutes, onChange, coins }: TimeClockPickerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);
  const minutesRef = useRef(minutes);
  minutesRef.current = minutes;

  const minutesFromPointer = (e: React.PointerEvent): number => {
    const rect = svgRef.current!.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    let deg = (Math.atan2(dx, -dy) * 180) / Math.PI; // 0° at top, clockwise
    if (deg < 0) deg += 360;
    const stepped = Math.round(deg / (STEP * 6)) * STEP;
    return Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, stepped));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    onChange(minutesFromPointer(e));
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Capture is a nice-to-have for dragging; the tap already counted
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const next = minutesFromPointer(e);
    // Don't jump across the 12-o'clock mark mid-drag (60 ↔ 10 wrap)
    if (Math.abs(next - minutesRef.current) > 30) return;
    if (next !== minutesRef.current) onChange(next);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      onChange(Math.min(MAX_MINUTES, minutes + STEP));
      e.preventDefault();
    }
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      onChange(Math.max(MIN_MINUTES, minutes - STEP));
      e.preventDefault();
    }
  };

  const knob = polar(TRACK_R, minutes);

  return (
    <div
      className="relative touch-none select-none"
      style={{ width: "min(62vh, 46vw, 440px)" }}
      role="slider"
      aria-valuemin={MIN_MINUTES}
      aria-valuemax={MAX_MINUTES}
      aria-valuenow={minutes}
      aria-label="Minuten wählen"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="block w-full cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          <radialGradient id="clockFace" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#f5ebcd" />
            <stop offset="70%" stopColor="#e8d5a8" />
            <stop offset="100%" stopColor="#d9c08c" />
          </radialGradient>
        </defs>

        {/* Slider track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={TRACK_R}
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth={13}
        />
        {/* Filled part of the slider, from 12 o'clock to the knob */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={TRACK_R}
          fill="none"
          stroke="#d9a441"
          strokeWidth={13}
          strokeLinecap="round"
          pathLength={MAX_MINUTES}
          strokeDasharray={`${minutes} ${MAX_MINUTES - minutes}`}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />

        {/* Clock face */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={FACE_R}
          fill="url(#clockFace)"
          stroke="#5a3a22"
          strokeWidth={4}
        />

        {/* Tick marks every 5 minutes */}
        {Array.from({ length: 12 }, (_, i) => {
          const m = (i + 1) * STEP;
          const outer = polar(FACE_R - 6, m);
          const inner = polar(FACE_R - 16, m);
          return (
            <line
              key={m}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#5a3a22"
              strokeWidth={m % 15 === 0 ? 4 : 2}
              strokeLinecap="round"
              opacity={0.7}
            />
          );
        })}

        {/* Quarter labels */}
        {[15, 30, 45, 60].map((m) => {
          const pos = polar(FACE_R - 32, m);
          return (
            <text
              key={m}
              x={pos.x}
              y={pos.y + 5}
              textAnchor="middle"
              fill="#5a3a22"
              fontSize={15}
              opacity={0.8}
              style={{ fontFamily: '"OpenDyslexic", serif' }}
            >
              {m}
            </text>
          );
        })}

        {/* Knob */}
        <circle cx={knob.x} cy={knob.y} r={26} fill="transparent" />
        <circle
          cx={knob.x}
          cy={knob.y}
          r={13}
          fill="#f0c75e"
          stroke="#5a3a22"
          strokeWidth={3}
        />

        {/* Minutes + coin reward in the middle of the clock; lives inside
            the SVG so it scales with the clock on small screens */}
        <g pointerEvents="none">
          <text
            x={CENTER}
            y={132}
            textAnchor="middle"
            fill="#3a2417"
            fontSize={44}
            style={{ fontFamily: '"AncientModernTales", serif' }}
          >
            {minutes}
          </text>
          <text
            x={CENTER}
            y={154}
            textAnchor="middle"
            fill="#5a3a22"
            fontSize={13}
            style={{ fontFamily: '"OpenDyslexic", serif' }}
          >
            Minuten
          </text>
          {coins != null && (
            <>
              {Array.from({ length: coins }, (_, i) => {
                const w = 15;
                const gap = 3;
                const perRow = 6;
                const row = Math.floor(i / perRow);
                const rowCount = Math.min(perRow, coins - row * perRow);
                const total = rowCount * w + (rowCount - 1) * gap;
                return (
                  <image
                    key={i}
                    href={coin}
                    x={CENTER - total / 2 + (i % perRow) * (w + gap)}
                    y={162 + row * 18}
                    width={w}
                    height={w}
                  />
                );
              })}
              <text
                x={CENTER}
                y={coins > 6 ? 212 : 196}
                textAnchor="middle"
                fill="#5a3a22"
                fontSize={11}
                style={{ fontFamily: '"OpenDyslexic", serif' }}
              >
                {coins} {coins === 1 ? "Münze" : "Münzen"}
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default TimeClockPicker;
