import { useCurrentFrame } from "remotion";
import { VIDEO_FPS } from "../lib/video-constants";

type Props = {
  text: string;
  startFrame: number;
  charsPerSecond?: number;
  style?: React.CSSProperties;
  showCaret?: boolean;
  caretColor?: string;
};

const PUNCTUATION_PAUSE_MS: Record<string, number> = {
  ".": 120,
  ",": 120,
  "!": 120,
  "?": 120,
  "—": 250,
  ":": 200,
  ";": 150,
};

const computeVisibleChars = (
  text: string,
  elapsedFrames: number,
  charsPerSecond: number
): number => {
  if (elapsedFrames <= 0) return 0;

  const baseFramesPerChar = VIDEO_FPS / charsPerSecond;
  let cumulativeFrames = 0;

  for (let i = 0; i < text.length; i++) {
    cumulativeFrames += baseFramesPerChar;
    const char = text[i];
    const pauseMs = PUNCTUATION_PAUSE_MS[char];
    if (pauseMs) {
      cumulativeFrames += (pauseMs / 1000) * VIDEO_FPS;
    }
    if (cumulativeFrames > elapsedFrames) {
      return i + 1;
    }
  }
  return text.length;
};

export const Typewriter: React.FC<Props> = ({
  text,
  startFrame,
  charsPerSecond = 80,
  style,
  showCaret = false,
  caretColor = "#000000",
}) => {
  const frame = useCurrentFrame();
  const elapsedFrames = frame - startFrame;
  const visibleCount = computeVisibleChars(text, elapsedFrames, charsPerSecond);
  const visible = text.slice(0, visibleCount);

  // Caret blinks at ~2Hz: show for 30 frames, hide for 30 frames
  const caretVisible = showCaret && Math.floor(frame / 30) % 2 === 0;

  return (
    <span style={style}>
      {visible}
      {showCaret && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            backgroundColor: caretColor,
            marginLeft: 2,
            verticalAlign: "text-bottom",
            opacity: caretVisible ? 1 : 0,
          }}
        />
      )}
    </span>
  );
};
