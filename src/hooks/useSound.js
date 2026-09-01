import { useRef, useState, useCallback } from "react";

// Synthesizes UI sound effects with the Web Audio API — no audio assets required.
export function useSound() {
  const ctxRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq = 440, dur = 0.06, vol = 0.05, type = "sine") => {
      const ctx = ensureCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = vol;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.stop(ctx.currentTime + dur);
    },
    [ensureCtx]
  );

  const beep = useCallback(
    (freq = 440, dur = 0.06, vol = 0.05, type = "sine") => {
      if (!enabled) return;
      playTone(freq, dur, vol, type);
    },
    [enabled, playTone]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      setTimeout(() => playTone(next ? 660 : 260, 0.08, 0.06), 0);
      return next;
    });
  }, [playTone]);

  return { enabled, toggle, beep };
}
