import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame } from "../primitives/BrowserFrame";
import { Cursor, type CursorKeyframe } from "../primitives/Cursor";
import { Typewriter } from "../primitives/Typewriter";
import { Caption } from "../primitives/Caption";
import { WeavoDashboard } from "../components/WeavoDashboard";
import { COLORS } from "../lib/colors";
import { BEATS, CAPTIONS, secondsToFrames } from "../lib/timing";
import { softEaseOut, softEaseInOut } from "../lib/easing";
import { useBeatMotion } from "../lib/beat-motion";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../lib/video-constants";

const PROMPT_TEXT =
  "Build a streaming platform called Kino — dark cinematic with red accents, show trending movies and series.";

export const Beat1_Prompt: React.FC = () => {
  const frame = useCurrentFrame();
  const { startFrame, endFrame } = BEATS.prompt;
  const motion = useBeatMotion(startFrame, endFrame);

  if (!motion.visible) return null;

  const localFrame = frame - startFrame;
  const t = (sec: number) => secondsToFrames(sec);

  // Beat is 14 seconds (frames 240-1080)
  // Timeline (relative to beat start at 0:04):
  //  0.0 -> 0.8 : browser frame zoom-in (scale 0.85 -> 1.0)
  //  3.0 -> 3.6 : cursor enters from bottom-right, glides to chat input
  //  4.0 -> 12.0 : typewriter reveals prompt
  //  12.4 -> 13.2 : cursor glides to Send
  //  13.2 -> 13.4 : click pulse on Send
  const ZOOM_END = t(0.8);
  const CURSOR_TO_INPUT_START = t(3.0);
  const CURSOR_AT_INPUT = t(3.6);
  const TYPING_START = t(4.0);
  const CURSOR_TO_SEND_START = t(12.4);
  const CURSOR_AT_SEND = t(13.2);
  const SEND_CLICK = t(13.2);
  const SEND_CLICK_END = t(13.4);

  // Browser zoom-in
  const zoomScale = interpolate(localFrame, [0, ZOOM_END], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });
  const zoomOpacity = interpolate(localFrame, [0, t(0.4)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Send activates once user starts typing
  const sendActive = localFrame >= TYPING_START + t(0.5);
  const sendClicked = localFrame >= SEND_CLICK && localFrame <= SEND_CLICK_END;

  // Frame layout
  const FRAME_WIDTH = VIDEO_WIDTH * 0.86;
  const FRAME_HEIGHT = VIDEO_HEIGHT * 0.84;
  const FRAME_X = (VIDEO_WIDTH - FRAME_WIDTH) / 2;
  const FRAME_Y = (VIDEO_HEIGHT - FRAME_HEIGHT) / 2;

  // Cursor keyframes — positions in canvas pixel space
  // Layout assumptions (percentages of FRAME):
  //   chat card center: (0.5, 0.50)
  //   send button     : (0.78, 0.62)
  // Translated to canvas pixels:
  const inputCenterX = FRAME_X + FRAME_WIDTH * 0.5;
  const inputCenterY = FRAME_Y + FRAME_HEIGHT * 0.55;
  const sendX = FRAME_X + FRAME_WIDTH * 0.78;
  const sendY = FRAME_Y + FRAME_HEIGHT * 0.66;

  const offCanvasX = VIDEO_WIDTH + 100;
  const offCanvasY = VIDEO_HEIGHT + 100;

  const cursorKeyframes: CursorKeyframe[] = [
    { frame: 0, x: offCanvasX, y: offCanvasY },
    { frame: CURSOR_TO_INPUT_START, x: offCanvasX, y: offCanvasY },
    { frame: CURSOR_AT_INPUT, x: inputCenterX, y: inputCenterY },
    { frame: CURSOR_TO_SEND_START, x: inputCenterX, y: inputCenterY },
    { frame: CURSOR_AT_SEND, x: sendX, y: sendY },
    { frame: t(14), x: sendX, y: sendY },
  ];

  // Punch-in zoom on the chat input as typing begins, holds through typing,
  // shifts to the Send button right before the click, then exits.
  const inputOriginX = inputCenterX / VIDEO_WIDTH;
  const inputOriginY = inputCenterY / VIDEO_HEIGHT;
  const sendOriginX = sendX / VIDEO_WIDTH;
  const sendOriginY = sendY / VIDEO_HEIGHT;

  const punchInScale = interpolate(
    localFrame,
    [t(3.6), t(4.2), t(11.5), t(12.4), t(13.4), t(14)],
    [1.0, 1.12, 1.12, 1.18, 1.18, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseInOut,
    }
  );

  // Crossfade transform-origin from input to send between t(11) and t(12.5)
  const originBlend = interpolate(
    localFrame,
    [t(11.0), t(12.5)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseInOut,
    }
  );
  const punchOriginX = inputOriginX + (sendOriginX - inputOriginX) * originBlend;
  const punchOriginY = inputOriginY + (sendOriginY - inputOriginY) * originBlend;

  // Compose motion: outer breath × inner punch-in
  const totalScale = motion.scale * punchInScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.videoBg,
        opacity: motion.opacity,
        transform: `scale(${totalScale})`,
        transformOrigin: `${punchOriginX * 100}% ${punchOriginY * 100}%`,
      }}
    >
      {/* Browser frame with dashboard inside */}
      <div
        style={{
          position: "absolute",
          left: FRAME_X,
          top: FRAME_Y,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          transformOrigin: "center center",
          transform: `scale(${zoomScale})`,
          opacity: zoomOpacity,
        }}
      >
        <BrowserFrame url="weavostudio.com/dashboard">
          <WeavoDashboard
            sendActive={sendActive}
            sendClicked={sendClicked}
            promptText={
              localFrame >= TYPING_START ? (
                <Typewriter
                  text={PROMPT_TEXT}
                  startFrame={startFrame + TYPING_START}
                  charsPerSecond={18}
                  showCaret
                  caretColor="#000"
                />
              ) : undefined
            }
          />
        </BrowserFrame>
      </div>

      <Cursor keyframes={cursorKeyframes} />

      <Caption
        text={CAPTIONS.prompt.text}
        startFrame={startFrame + secondsToFrames(CAPTIONS.prompt.startSec - 4)}
        endFrame={startFrame + secondsToFrames(CAPTIONS.prompt.endSec - 4)}
      />
    </AbsoluteFill>
  );
};
