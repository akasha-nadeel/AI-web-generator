import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { COLORS } from "../lib/colors";
import { BEATS, secondsToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";
import { useBeatMotion } from "../lib/beat-motion";

const { fontFamily: serifFamily } = loadSerif();
const { fontFamily: interFamily } = loadInter();

export const Beat6_CTAClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { startFrame, endFrame } = BEATS.ctaClose;
  const motion = useBeatMotion(startFrame, endFrame, {
    scaleStart: 1.06,
    scaleEnd: 1.0,
    scaleExit: 1.0,
  });

  if (!motion.visible) return null;

  const localFrame = frame - startFrame;
  const t = (sec: number) => secondsToFrames(sec);

  // Timeline (relative to beat start at 1:08):
  //  0.00 -> 0.40 : white fade-in (from prior beat) — handled at composition level via overlay
  //  0.40 -> 1.00 : "weavo." wordmark fades up
  //  1.00 -> 1.60 : CTA pill scales in
  //  1.60 -> 2.20 : CTA pulse (single subtle bounce via spring)
  //  2.20 -> 4.00 : hold final frame
  const WORDMARK_START = t(0.4);
  const WORDMARK_END = t(1.0);
  const CTA_START = t(1.0);
  const CTA_END = t(1.6);
  const PULSE_START = t(1.6);

  const wordmarkOpacity = interpolate(
    localFrame,
    [WORDMARK_START, WORDMARK_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const wordmarkDrift = interpolate(
    localFrame,
    [WORDMARK_START, WORDMARK_END],
    [12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const ctaOpacity = interpolate(
    localFrame,
    [CTA_START, CTA_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const ctaInScale = interpolate(
    localFrame,
    [CTA_START, CTA_END],
    [0.96, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  // Pulse: single bounce 1.0 -> 1.04 -> 1.0
  const pulseProgress = spring({
    frame: Math.max(0, localFrame - PULSE_START),
    fps,
    config: { damping: 12, stiffness: 140, mass: 1 },
    durationInFrames: 36,
  });
  // pulse goes 0 -> 1 -> 0 over the pulse window
  const pulseEnvelope = Math.sin(Math.min(pulseProgress, 1) * Math.PI);
  const pulseScale = 1 + pulseEnvelope * 0.04;

  const ctaScale = ctaInScale * pulseScale;

  const urlOpacity = interpolate(
    localFrame,
    [CTA_END, CTA_END + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.videoBg,
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        opacity: motion.opacity,
        transform: `scale(${motion.scale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          fontFamily: serifFamily,
          fontWeight: 500,
          fontSize: 128,
          letterSpacing: "-0.02em",
          color: COLORS.coldOpenHeading,
          opacity: wordmarkOpacity,
          transform: `translateY(${wordmarkDrift}px)`,
        }}
      >
        weavo.
      </div>

      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.ctaBg,
            color: COLORS.ctaText,
            fontFamily: interFamily,
            fontWeight: 500,
            fontSize: 28,
            padding: "20px 44px",
            borderRadius: 999,
          }}
        >
          Get Started Free
        </div>
      </div>

      <div
        style={{
          fontFamily: interFamily,
          fontWeight: 400,
          fontSize: 22,
          color: COLORS.text.light,
          opacity: urlOpacity,
          marginTop: 16,
        }}
      >
        weavostudio.com
      </div>
    </AbsoluteFill>
  );
};
