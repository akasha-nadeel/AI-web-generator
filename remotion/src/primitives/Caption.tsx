import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "../lib/colors";
import { msToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";

const { fontFamily } = loadFont();

const FADE_FRAMES = () => msToFrames(400);
const DRIFT_PX = 8;

type Props = {
  text: string;
  startFrame: number;
  endFrame: number;
};

export const Caption: React.FC<Props> = ({ text, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const fadeFrames = FADE_FRAMES();

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const localFrame = frame - startFrame;
  const totalFrames = endFrame - startFrame;
  const fadeOutStart = totalFrames - fadeFrames;

  const opacity = interpolate(
    localFrame,
    [0, fadeFrames, fadeOutStart, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  const drift = interpolate(
    localFrame,
    [0, fadeFrames, fadeOutStart, totalFrames],
    [DRIFT_PX, 0, 0, -DRIFT_PX],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: softEaseOut }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "12%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 32,
          letterSpacing: "-0.01em",
          color: COLORS.caption,
          opacity,
          transform: `translateY(${drift}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
