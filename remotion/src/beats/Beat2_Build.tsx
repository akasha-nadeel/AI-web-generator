import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caption } from "../primitives/Caption";
import { CodeEditor } from "../components/CodeEditor";
import { PreviewPane } from "../components/PreviewPane";
import { KINO_HTML_SNIPPET } from "../data/kino-html-snippet";
import { COLORS } from "../lib/colors";
import { BEATS, CAPTIONS, secondsToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";
import { useBeatMotion } from "../lib/beat-motion";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../lib/video-constants";

export const Beat2_Build: React.FC = () => {
  const frame = useCurrentFrame();
  const { startFrame, endFrame } = BEATS.build;
  const motion = useBeatMotion(startFrame, endFrame);

  if (!motion.visible) return null;

  const localFrame = frame - startFrame;
  const t = (sec: number) => secondsToFrames(sec);

  // Beat is 17s (18 -> 35)
  //  0.0 -> 0.4  : hard cut + brief fade
  //  0.0 -> 14.0 : code streams (~80 chars/sec linear)
  //  6.0  : hero reveals in preview
  //  9.0  : trending row reveals
  //  12.0 : full bento reveals
  //  14.0 : featured fade-in
  //  15.0 -> 17.0 : code pane dims to 30% opacity, preview expands
  const FADE_IN_END = t(0.4);
  const HERO_REVEAL = t(6.0);
  const TRENDING_REVEAL = t(9.0);
  const BENTO_REVEAL = t(12.0);
  const FEATURED_REVEAL = t(14.0);
  const SPLIT_RESIZE_START = t(15.0);
  const SPLIT_RESIZE_END = t(17.0);

  // Code stream: 80 chars/sec
  const charsPerSecond = 80;
  const visibleChars = Math.min(
    KINO_HTML_SNIPPET.length,
    Math.max(0, Math.floor((localFrame / secondsToFrames(1)) * charsPerSecond))
  );

  const fadeInOpacity = interpolate(localFrame, [0, FADE_IN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });

  // Split layout transitions from 50/50 to ~35/65 (code dim, preview expand)
  const codeWidthRatio = interpolate(
    localFrame,
    [SPLIT_RESIZE_START, SPLIT_RESIZE_END],
    [0.5, 0.35],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );
  const previewWidthRatio = 1 - codeWidthRatio;

  const codeOpacity = interpolate(
    localFrame,
    [SPLIT_RESIZE_START, SPLIT_RESIZE_END],
    [1, 0.4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );

  // Frame layout — full-bleed split, generous outer padding
  const PAD = 80;
  const FRAME_X = PAD;
  const FRAME_Y = PAD;
  const FRAME_W = VIDEO_WIDTH - PAD * 2;
  const FRAME_H = VIDEO_HEIGHT - PAD * 2;
  const GUTTER = 24;
  const codeWidth = FRAME_W * codeWidthRatio - GUTTER / 2;
  const previewWidth = FRAME_W * previewWidthRatio - GUTTER / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.videoBg,
        opacity: fadeInOpacity * motion.opacity,
        transform: `scale(${motion.scale})`,
        transformOrigin: "center center",
      }}
    >
      {/* Status bar at top */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 13,
          letterSpacing: "0.18em",
          color: COLORS.text.muted,
          textTransform: "uppercase",
        }}
      >
        weavostudio.com / generate
      </div>

      {/* Code editor pane */}
      <div
        style={{
          position: "absolute",
          left: FRAME_X,
          top: FRAME_Y,
          width: codeWidth,
          height: FRAME_H,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${COLORS.codeEditor.line}`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.06)",
          opacity: codeOpacity,
        }}
      >
        <CodeEditor
          code={KINO_HTML_SNIPPET}
          visibleChars={visibleChars}
          caret={visibleChars < KINO_HTML_SNIPPET.length}
        />
      </div>

      {/* Preview pane */}
      <div
        style={{
          position: "absolute",
          left: FRAME_X + codeWidth + GUTTER,
          top: FRAME_Y,
          width: previewWidth,
          height: FRAME_H,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${COLORS.codeEditor.line}`,
          boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
          backgroundColor: COLORS.kino.bg,
        }}
      >
        <PreviewPane
          heroStartFrame={startFrame + HERO_REVEAL}
          trendingStartFrame={startFrame + TRENDING_REVEAL}
          bentoStartFrame={startFrame + BENTO_REVEAL}
          featuredStartFrame={startFrame + FEATURED_REVEAL}
        />
      </div>

      <Caption
        text={CAPTIONS.build.text}
        startFrame={startFrame + secondsToFrames(CAPTIONS.build.startSec - 18)}
        endFrame={startFrame + secondsToFrames(CAPTIONS.build.endSec - 18)}
      />
    </AbsoluteFill>
  );
};
