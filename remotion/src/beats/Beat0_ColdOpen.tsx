import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/InstrumentSerif";
import { COLORS } from "../lib/colors";
import { BEATS, msToFrames, secondsToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";
import { useBeatMotion } from "../lib/beat-motion";

const { fontFamily } = loadFont();

const FIRST_TEXT = "A website,";
const SECOND_TEXT = "in a sentence.";

export const Beat0_ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { startFrame, endFrame } = BEATS.coldOpen;
  const motion = useBeatMotion(startFrame, endFrame, {
    scaleStart: 1.02,
    scaleEnd: 1.06,
    scaleExit: 1.1,
  });

  if (!motion.visible) return null;

  const localFrame = frame - startFrame;

  // Timeline (relative to beat start at 0:00):
  //  0.00s -> 0.10s : blank hold
  //  0.10s -> 1.40s : letter-by-letter reveal of FIRST_TEXT
  //  1.40s -> 2.40s : hold FIRST_TEXT
  //  2.40s -> 3.20s : crossfade FIRST_TEXT -> SECOND_TEXT (with 30px upward drift)
  //  3.20s -> 4.00s : hold SECOND_TEXT
  const t = (sec: number) => secondsToFrames(sec);
  const FIRST_REVEAL_START = t(0.1);
  const FIRST_REVEAL_END = t(1.4);
  const MORPH_START = t(2.4);
  const MORPH_END = t(3.2);

  const charsToShow = (() => {
    if (localFrame < FIRST_REVEAL_START) return 0;
    if (localFrame >= FIRST_REVEAL_END) return FIRST_TEXT.length;
    const progress =
      (localFrame - FIRST_REVEAL_START) /
      (FIRST_REVEAL_END - FIRST_REVEAL_START);
    return Math.floor(progress * FIRST_TEXT.length);
  })();

  const firstOpacity = interpolate(
    localFrame,
    [MORPH_START, MORPH_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const firstDrift = interpolate(
    localFrame,
    [MORPH_START, MORPH_END],
    [0, -30],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const secondOpacity = interpolate(
    localFrame,
    [MORPH_START, MORPH_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const secondDrift = interpolate(
    localFrame,
    [MORPH_START, MORPH_END],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const headingStyle: React.CSSProperties = {
    fontFamily,
    fontWeight: 500,
    fontSize: 192,
    letterSpacing: "-0.02em",
    color: COLORS.coldOpenHeading,
    lineHeight: 1.1,
    position: "absolute",
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.videoBg,
        justifyContent: "center",
        alignItems: "center",
        opacity: motion.opacity,
        transform: `scale(${motion.scale})`,
        transformOrigin: "center center",
      }}
    >
      <div style={{ position: "relative", width: 1600, height: 240 }}>
        <div
          style={{
            ...headingStyle,
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: firstOpacity,
            transform: `translateY(${firstDrift}px)`,
          }}
        >
          {FIRST_TEXT.slice(0, charsToShow)}
        </div>
        <div
          style={{
            ...headingStyle,
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: secondOpacity,
            transform: `translateY(${secondDrift}px)`,
          }}
        >
          {SECOND_TEXT}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Re-export so consumers can import via beat namespace
export { msToFrames };
