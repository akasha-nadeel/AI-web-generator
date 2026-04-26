import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../lib/colors";
import { softEaseOut } from "../lib/easing";

export type CursorKeyframe = {
  /** Absolute frame at which the cursor reaches this position */
  frame: number;
  /** Position in the canvas, in pixels (or percentages of canvas via prop) */
  x: number;
  y: number;
  /** Optional click event at this frame — visual click is handled by callers */
  click?: boolean;
};

type Props = {
  keyframes: CursorKeyframe[];
  /** Show 1px white outline around the arrow — for dark backgrounds */
  outlined?: boolean;
  /** Cursor size in pixels (default 24) */
  size?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const positionAtFrame = (
  frame: number,
  keyframes: CursorKeyframe[]
): { x: number; y: number } => {
  if (keyframes.length === 0) return { x: 0, y: 0 };
  if (frame <= keyframes[0].frame) {
    return { x: keyframes[0].x, y: keyframes[0].y };
  }
  if (frame >= keyframes[keyframes.length - 1].frame) {
    const last = keyframes[keyframes.length - 1];
    return { x: last.x, y: last.y };
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const t = interpolate(frame, [a.frame, b.frame], [0, 1], {
        easing: softEaseOut,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
      };
    }
  }

  return { x: 0, y: 0 };
};

export const Cursor: React.FC<Props> = ({
  keyframes,
  outlined = false,
  size = 24,
}) => {
  const frame = useCurrentFrame();
  const { x, y } = positionAtFrame(frame, keyframes);

  // macOS-style arrow: filled triangle with a small tail, pointing top-left
  const path =
    "M 1 1 L 1 19 L 6 14 L 9 21 L 12 20 L 9 13 L 16 13 Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        position: "absolute",
        left: x,
        top: y,
        // Hot spot is the top-left of the arrow tip
        transform: "translate(0, 0)",
        pointerEvents: "none",
      }}
    >
      {outlined && (
        <path
          d={path}
          fill="none"
          stroke={COLORS.cursorOutline}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      )}
      <path
        d={path}
        fill={COLORS.cursor}
        stroke={outlined ? COLORS.cursor : "none"}
        strokeWidth={0.5}
      />
    </svg>
  );
};
