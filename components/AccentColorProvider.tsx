"use client";

import { animate, type AnimationPlaybackControls } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ACCENT_COLORS,
  hexToRgb,
  parseGlow,
  rgbToHex,
  type AccentName,
} from "@/lib/accent-colors";

const DURATION_MS = 700;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type AccentColorContextValue = {
  accent: AccentName;
  setAccent: (accent: AccentName, options?: { durationMs?: number }) => void;
};

const AccentColorContext = createContext<AccentColorContextValue | null>(null);

function applyVars(accentHex: string, glow: string, glowSoft: string) {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", accentHex);
  root.style.setProperty("--accent-green", accentHex);
  root.style.setProperty("--accent-glow", glow);
  root.style.setProperty("--accent-glow-soft", glowSoft);
}

export function AccentColorProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentName>("green");
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const currentRef = useRef({
    accentHex: ACCENT_COLORS.green.accent,
    glow: parseGlow(ACCENT_COLORS.green.glow),
    glowSoft: parseGlow(ACCENT_COLORS.green.glowSoft),
  });

  const setAccent = useCallback((next: AccentName, options?: { durationMs?: number }) => {
    setAccentState((prev) => {
      if (prev === next) return prev;
      const target = ACCENT_COLORS[next];
      const start = currentRef.current;
      const durationMs = options?.durationMs ?? DURATION_MS;
      const endGlow = parseGlow(target.glow);
      const endGlowSoft = parseGlow(target.glowSoft);
      const endRgb = hexToRgb(target.accent);
      const startRgb = hexToRgb(start.accentHex);

      const updateAccent = (progress: number) => {
        const r = lerp(startRgb[0], endRgb[0], progress);
        const g = lerp(startRgb[1], endRgb[1], progress);
        const b = lerp(startRgb[2], endRgb[2], progress);
        const accentHex = rgbToHex(r, g, b);

        const glow: [number, number, number] = [
          lerp(start.glow[0], endGlow[0], progress),
          lerp(start.glow[1], endGlow[1], progress),
          lerp(start.glow[2], endGlow[2], progress),
        ];
        const glowSoft: [number, number, number] = [
          lerp(start.glowSoft[0], endGlowSoft[0], progress),
          lerp(start.glowSoft[1], endGlowSoft[1], progress),
          lerp(start.glowSoft[2], endGlowSoft[2], progress),
        ];

        const glowStr = `${Math.round(glow[0])}, ${Math.round(glow[1])}, ${Math.round(glow[2])}`;
        const glowSoftStr = `${Math.round(glowSoft[0])}, ${Math.round(glowSoft[1])}, ${Math.round(glowSoft[2])}`;
        applyVars(accentHex, glowStr, glowSoftStr);

        currentRef.current = {
          accentHex,
          glow,
          glowSoft,
        };
      };

      animationRef.current?.stop();
      if (durationMs <= 0) {
        currentRef.current = {
          accentHex: target.accent,
          glow: endGlow,
          glowSoft: endGlowSoft,
        };
        applyVars(target.accent, target.glow, target.glowSoft);
        return next;
      }

      animationRef.current = animate(0, 1, {
        duration: durationMs / 1000,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: updateAccent,
        onComplete: () => {
          animationRef.current = null;
          currentRef.current = {
            accentHex: target.accent,
            glow: endGlow,
            glowSoft: endGlowSoft,
          };
          applyVars(target.accent, target.glow, target.glowSoft);
        },
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const initial = ACCENT_COLORS[accent];
    currentRef.current = {
      accentHex: initial.accent,
      glow: parseGlow(initial.glow),
      glowSoft: parseGlow(initial.glowSoft),
    };
    applyVars(initial.accent, initial.glow, initial.glowSoft);
  }, []);

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  const value = useMemo(
    () => ({ accent, setAccent }),
    [accent, setAccent],
  );

  return (
    <AccentColorContext.Provider value={value}>
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const ctx = useContext(AccentColorContext);
  if (!ctx) {
    throw new Error("useAccentColor must be used within AccentColorProvider");
  }
  return ctx;
}
