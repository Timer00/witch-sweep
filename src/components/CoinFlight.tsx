import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { coin } from "@/assets";

interface CoinFlightProps {
  amount: number;
  onCoinLanded: () => void;
  onDone: () => void;
}

const APPEAR_STAGGER_MS = 120;
const FLY_START_MS = 500;
const FLY_STAGGER_MS = 250;
const FLY_MS = 700;

interface FlightCoin {
  id: number;
  sx: number;
  sy: number;
  phase: "idle" | "fly" | "gone";
}

/**
 * Overlay that makes the earned coins appear near the witch and fly one by
 * one into the coin counter in the top-right corner. Calls onCoinLanded as
 * each coin arrives (so the counter can tick up) and onDone at the end.
 */
const CoinFlight = ({ amount, onCoinLanded, onDone }: CoinFlightProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState<FlightCoin[] | null>(null);
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const cbRef = useRef({ onCoinLanded, onDone });
  cbRef.current = { onCoinLanded, onDone };

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wr = wrap.getBoundingClientRect();
    const icon = document.getElementById("coin-counter-icon");
    const ir = icon?.getBoundingClientRect();
    setTarget({
      x: ir ? ir.left + ir.width / 2 - wr.left : wr.width - 50,
      y: ir ? ir.top + ir.height / 2 - wr.top : 20,
    });
    setCoins(
      Array.from({ length: amount }, (_, i) => ({
        id: i,
        sx: wr.width * (0.32 + Math.random() * 0.14),
        sy: wr.height * (0.45 + Math.random() * 0.22),
        phase: "idle",
      }))
    );
  }, [amount]);

  useEffect(() => {
    if (!target) return;
    const timeouts: number[] = [];
    for (let i = 0; i < amount; i++) {
      const startAt = FLY_START_MS + i * FLY_STAGGER_MS;
      timeouts.push(
        window.setTimeout(() => {
          setCoins((cs) =>
            cs ? cs.map((c) => (c.id === i ? { ...c, phase: "fly" } : c)) : cs
          );
        }, startAt)
      );
      timeouts.push(
        window.setTimeout(() => {
          setCoins((cs) =>
            cs ? cs.map((c) => (c.id === i ? { ...c, phase: "gone" } : c)) : cs
          );
          cbRef.current.onCoinLanded();
        }, startAt + FLY_MS)
      );
    }
    timeouts.push(
      window.setTimeout(() => {
        cbRef.current.onDone();
      }, FLY_START_MS + (amount - 1) * FLY_STAGGER_MS + FLY_MS + 400)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [target, amount]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
    >
      {target &&
        coins?.map(
          (c) =>
            c.phase !== "gone" && (
              <img
                key={c.id}
                src={coin}
                alt=""
                width={30}
                height={30}
                className="absolute"
                style={{
                  left: c.sx - 15,
                  top: c.sy - 15,
                  transform:
                    c.phase === "fly"
                      ? `translate(${target.x - c.sx}px, ${
                          target.y - c.sy
                        }px) rotate(540deg) scale(0.5)`
                      : "translate(0, 0)",
                  transition:
                    c.phase === "fly"
                      ? `transform ${FLY_MS}ms cubic-bezier(0.45, -0.15, 0.85, 0.6)`
                      : undefined,
                  animation:
                    c.phase === "idle"
                      ? `coinIn 0.3s ${c.id * APPEAR_STAGGER_MS}ms backwards`
                      : undefined,
                }}
              />
            )
        )}
    </div>
  );
};

export default CoinFlight;
