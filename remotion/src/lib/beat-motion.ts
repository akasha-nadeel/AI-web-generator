import { interpolate, useCurrentFrame } from "remotion";
import { softEaseOut, softEaseInOut } from "./easing";

const DEFAULT_FADE_IN = 18; // 0.3s @ 60fps
const DEFAULT_FADE_OUT = 18;

type BeatMotionOptions = {
  fadeInFrames?: number;
  fadeOutFrames?: number;
  /** Scale at which the beat fades in. Default 0.94 — feels like a gentle dolly-in. */
  scaleStart?: number;
  /** Scale at which the beat is at the end of its window. Default 1.04 — slow breath. */
  scaleEnd?: number;
  /** Scale on fade-out tail. Default 1.08 — exits zoomed in slightly. */
  scaleExit?: number;
  /** Disable the breathing zoom — only fade. Useful for beats that handle motion themselves. */
  noBreath?: boolean;
};

/**
 * Returns motion values for a beat: opacity (with fade-in/out tails),
 * scale (slow breathing zoom), and a `visible` flag.
 *
 * The visible window extends fadeInFrames before startFrame and fadeOutFrames
 * after endFrame so adjacent beats overlap — creating a free crossfade
 * transition without any extra coordination.
 */
export function useBeatMotion(
  startFrame: number,
  endFrame: number,
  options: BeatMotionOptions = {}
): { opacity: number; scale: number; visible: boolean } {
  const frame = useCurrentFrame();
  const fadeIn = options.fadeInFrames ?? DEFAULT_FADE_IN;
  const fadeOut = options.fadeOutFrames ?? DEFAULT_FADE_OUT;
  const scaleStart = options.scaleStart ?? 0.96;
  const scaleEnd = options.scaleEnd ?? 1.04;
  const scaleExit = options.scaleExit ?? 1.08;

  const visibleStart = startFrame - fadeIn;
  const visibleEnd = endFrame + fadeOut;
  const visible = frame >= visibleStart && frame <= visibleEnd;

  const opacity = interpolate(
    frame,
    [visibleStart, startFrame, endFrame, visibleEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );

  let scale = 1;
  if (!options.noBreath) {
    scale = interpolate(
      frame,
      [visibleStart, startFrame, endFrame, visibleEnd],
      [scaleStart, 1.0, scaleEnd, scaleExit],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: softEaseInOut,
      }
    );
  }

  return { opacity, scale, visible };
}

/**
 * Compute a punch-in zoom that targets a specific point on the canvas
 * during a frame range. The zoom holds at peak through the focusEnd then
 * eases back to neutral by exitEnd.
 *
 * Used for cinematic emphasis on a UI element (e.g., zoom in on the
 * Send button right before it's clicked).
 */
export function usePunchInZoom(opts: {
  focusStartFrame: number;
  focusEndFrame: number;
  exitEndFrame: number;
  /** Origin in canvas-percentage units, e.g., "50% 60%" for chat input area */
  originX: number; // 0..1 of canvas width
  originY: number; // 0..1 of canvas height
  /** Peak zoom scale. Default 1.18 — a noticeable but not aggressive push-in */
  peakScale?: number;
}): { scale: number; transformOrigin: string } {
  const frame = useCurrentFrame();
  const { focusStartFrame, focusEndFrame, exitEndFrame } = opts;
  const peakScale = opts.peakScale ?? 1.18;

  const scale = interpolate(
    frame,
    [focusStartFrame, focusEndFrame, exitEndFrame],
    [1, peakScale, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseInOut,
    }
  );

  const transformOrigin = `${opts.originX * 100}% ${opts.originY * 100}%`;

  return { scale, transformOrigin };
}
