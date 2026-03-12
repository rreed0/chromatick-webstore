export type AccentName = "green" | "red" | "amber";

export const ACCENT_COLORS: Record<
  AccentName,
  { accent: string; glow: string; glowSoft: string }
> = {
  green: {
    accent: "#7ee787",
    glow: "18, 32, 20",
    glowSoft: "8, 12, 9",
  },
  red: {
    accent: "#be0001",
    glow: "40, 4, 4",
    glowSoft: "16, 2, 2",
  },
  amber: {
    accent: "#b27501",
    glow: "45, 35, 5",
    glowSoft: "18, 14, 2",
  },
};

export function getAccentForProductId(productId: string): AccentName {
  if (productId === "p_lf20wr" || productId === "p_f91wr") return "red";
  if (productId === "p_f91wa") return "amber";
  return "green";
}

export function parseGlow(s: string): [number, number, number] {
  const [r, g, b] = s.split(",").map((n) => parseInt(n.trim(), 10));
  return [r, g, b];
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0"))
      .join("")
  );
}
