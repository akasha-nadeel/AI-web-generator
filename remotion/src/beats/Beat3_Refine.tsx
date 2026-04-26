import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame } from "../primitives/BrowserFrame";
import { Cursor, type CursorKeyframe } from "../primitives/Cursor";
import { Typewriter } from "../primitives/Typewriter";
import { Caption } from "../primitives/Caption";
import { WeavoEditor } from "../components/WeavoEditor";
import { KinoSiteMock } from "../components/KinoSiteMock";
import { COLORS } from "../lib/colors";
import { BEATS, CAPTIONS, secondsToFrames } from "../lib/timing";
import { softEaseOut, softEaseInOut } from "../lib/easing";
import { useBeatMotion } from "../lib/beat-motion";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../lib/video-constants";

const REFINE_PROMPT =
  "Make the hero title bigger and add a 'Watch Trailer' button.";

export const Beat3_Refine: React.FC = () => {
  const frame = useCurrentFrame();
  const { startFrame, endFrame } = BEATS.refine;
  const motion = useBeatMotion(startFrame, endFrame);

  if (!motion.visible) return null;

  const localFrame = frame - startFrame;
  const t = (sec: number) => secondsToFrames(sec);

  // Beat is 15s (35.0 -> 50.0)
  //  0.0 -> 0.4 : fade in from prior beat
  //  0.4 -> 1.4 : cursor enters from right, lands on chat input
  //  1.4 -> 7.0 : type refine prompt (~5.6s)
  //  7.0 -> 7.6 : "thinking" indicator pulse
  //  7.6 -> 11.0 : preview crossfades from full-bento -> after-edit
  //  11.0 -> 14.0 : cursor moves to new "Watch Trailer" button
  //  14.0 -> 15.0 : hold
  const FADE_IN_END = t(0.4);
  const CURSOR_TO_INPUT = t(1.4);
  const TYPING_START = t(1.4);
  const TYPING_DURATION_SEC = 5.6;
  const THINKING_START = t(7.0);
  const CROSSFADE_START = t(7.6);
  const CROSSFADE_END = t(11.0);
  const CURSOR_TO_BUTTON_START = t(11.0);
  const CURSOR_AT_BUTTON = t(14.0);

  const fadeInOpacity = interpolate(localFrame, [0, FADE_IN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });

  const crossfadeProgress = interpolate(
    localFrame,
    [CROSSFADE_START, CROSSFADE_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );

  // Frame layout
  const FRAME_WIDTH = VIDEO_WIDTH * 0.92;
  const FRAME_HEIGHT = VIDEO_HEIGHT * 0.88;
  const FRAME_X = (VIDEO_WIDTH - FRAME_WIDTH) / 2;
  const FRAME_Y = (VIDEO_HEIGHT - FRAME_HEIGHT) / 2;

  // Cursor keyframes (chat sidebar is left 380px of FRAME inner)
  const chatSidebarWidth = 380;
  const inputX = FRAME_X + 80; // approximate
  const inputY = FRAME_Y + FRAME_HEIGHT - 130;
  // "Watch Trailer" button is in preview, around 70% horizontal, 70% vertical of preview area
  const previewX = FRAME_X + chatSidebarWidth + 32;
  const previewW = FRAME_WIDTH - chatSidebarWidth - 64;
  const previewH = FRAME_HEIGHT - 120;
  const buttonX = previewX + previewW * 0.20;
  const buttonY = FRAME_Y + 56 + previewH * 0.78;

  const offCanvasX = VIDEO_WIDTH + 100;

  const cursorKeyframes: CursorKeyframe[] = [
    { frame: 0, x: offCanvasX, y: VIDEO_HEIGHT * 0.5 },
    { frame: CURSOR_TO_INPUT - t(0.6), x: offCanvasX, y: VIDEO_HEIGHT * 0.5 },
    { frame: CURSOR_TO_INPUT, x: inputX + 100, y: inputY },
    { frame: CURSOR_TO_BUTTON_START, x: inputX + 100, y: inputY },
    { frame: CURSOR_AT_BUTTON, x: buttonX, y: buttonY },
    { frame: t(15), x: buttonX, y: buttonY },
  ];

  // Cursor needs white outline once it's over the dark Kino preview
  const cursorOverDarkPreview = localFrame > t(11.5);

  // Build messages: empty until typing starts; show 1 user message after typing completes
  const showFinalMessage = localFrame >= TYPING_START + t(TYPING_DURATION_SEC);

  // Punch-in zoom on the new "Watch Trailer" button after the crossfade completes
  const punchInScale = interpolate(
    localFrame,
    [t(11.0), t(12.5), t(14.0), t(15.0)],
    [1.0, 1.45, 1.45, 1.05],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseInOut,
    }
  );
  const punchOriginX = buttonX / VIDEO_WIDTH;
  const punchOriginY = buttonY / VIDEO_HEIGHT;
  const totalScale = motion.scale * punchInScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.videoBg,
        opacity: fadeInOpacity * motion.opacity,
        transform: `scale(${totalScale})`,
        transformOrigin: `${punchOriginX * 100}% ${punchOriginY * 100}%`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: FRAME_X,
          top: FRAME_Y,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
        }}
      >
        <BrowserFrame url="weavostudio.com/editor/kino">
          <WeavoEditor
            messages={
              showFinalMessage
                ? [{ role: "user", content: REFINE_PROMPT }]
                : []
            }
            inputText={
              !showFinalMessage && localFrame >= TYPING_START ? (
                <Typewriter
                  text={REFINE_PROMPT}
                  startFrame={startFrame + TYPING_START}
                  charsPerSecond={20}
                />
              ) : undefined
            }
            inputCaret={
              localFrame >= TYPING_START &&
              localFrame < TYPING_START + t(TYPING_DURATION_SEC)
            }
            preview={
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 1 - crossfadeProgress,
                  }}
                >
                  <KinoSiteMock variant="full-bento" />
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: crossfadeProgress,
                  }}
                >
                  <KinoSiteMock variant="after-edit" />
                </div>
              </div>
            }
          />
        </BrowserFrame>
      </div>

      {/* Thinking dots above input — appears briefly before crossfade */}
      {localFrame >= THINKING_START && localFrame < CROSSFADE_START + t(0.4) && (
        <ThinkingDots
          x={FRAME_X + 60}
          y={FRAME_Y + FRAME_HEIGHT - 200}
        />
      )}

      <Cursor keyframes={cursorKeyframes} outlined={cursorOverDarkPreview} />

      <Caption
        text={CAPTIONS.refine.text}
        startFrame={startFrame + secondsToFrames(CAPTIONS.refine.startSec - 35)}
        endFrame={startFrame + secondsToFrames(CAPTIONS.refine.endSec - 35)}
      />
    </AbsoluteFill>
  );
};

const ThinkingDots: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const dotOpacity = (offset: number) =>
    0.3 + 0.7 * Math.abs(Math.sin((frame + offset) / 8));
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: "#F0EFEC",
        padding: "10px 14px",
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        display: "flex",
        gap: 6,
        alignItems: "center",
      }}
    >
      <Dot opacity={dotOpacity(0)} />
      <Dot opacity={dotOpacity(8)} />
      <Dot opacity={dotOpacity(16)} />
    </div>
  );
};

const Dot: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      width: 6,
      height: 6,
      borderRadius: "50%",
      backgroundColor: "#0A0A0A",
      opacity,
    }}
  />
);
