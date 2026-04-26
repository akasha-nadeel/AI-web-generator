import { VIDEO_FPS } from "./video-constants";

export const secondsToFrames = (seconds: number): number =>
  Math.round(seconds * VIDEO_FPS);

export const msToFrames = (ms: number): number =>
  Math.round((ms / 1000) * VIDEO_FPS);

export type BeatRange = {
  startFrame: number;
  endFrame: number;
  durationFrames: number;
};

const range = (startSec: number, endSec: number): BeatRange => {
  const startFrame = secondsToFrames(startSec);
  const endFrame = secondsToFrames(endSec);
  return {
    startFrame,
    endFrame,
    durationFrames: endFrame - startFrame,
  };
};

export const BEATS = {
  coldOpen: range(0, 4),
  prompt: range(4, 18),
  build: range(18, 35),
  refine: range(35, 50),
  publish: range(50, 60),
  payoff: range(60, 68),
  ctaClose: range(68, 72),
} as const;

export const CAPTIONS = {
  prompt: { startSec: 14, endSec: 17.5, text: "Type what you need." },
  build: { startSec: 24, endSec: 30, text: "Real code. Real design." },
  refine: { startSec: 42, endSec: 48, text: "Refine by chatting." },
  publish: { startSec: 54, endSec: 59, text: "Live in one click." },
} as const;
