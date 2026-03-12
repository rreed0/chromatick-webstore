"use client";

import { useEffect } from "react";
import { useAccentColor } from "@/components/AccentColorProvider";
import type { AccentName } from "@/lib/accent-colors";

export function AccentSync({ accent }: { accent: AccentName }) {
  const { setAccent } = useAccentColor();

  useEffect(() => {
    setAccent(accent, { durationMs: 120 });
  }, [accent, setAccent]);

  return null;
}
