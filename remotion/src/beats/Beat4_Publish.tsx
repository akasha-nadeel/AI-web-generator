import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame } from "../primitives/BrowserFrame";
import { Cursor, type CursorKeyframe } from "../primitives/Cursor";
import { Typewriter } from "../primitives/Typewriter";
import { Caption } from "../primitives/Caption";
import { WeavoEditor } from "../components/WeavoEditor";
import { KinoSiteMock } from "../components/KinoSiteMock";
import { PublishModal } from "../components/PublishModal";
import { COLORS } from "../lib/colors";
import { BEATS, CAPTIONS, secondsToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../lib/video-constants";

export const Beat4_Publish: React.FC = () => {
  const frame = useCurrentFrame();
  const { startFrame, endFrame } = BEATS.publish;

  if (frame < startFrame || frame > endFrame) return null;

  const localFrame = frame - startFrame;
  const t = (sec: number) => secondsToFrames(sec);

  // Beat is 10s (50.0 -> 60.0)
  //  0.0 -> 0.4 : fade in from prior beat
  //  0.4 -> 2.0 : cursor moves from preview area to Publish button (top-right)
  //  2.0 -> 2.2 : click pulse on Publish
  //  2.5 -> 2.75 : modal scale-in
  //  3.0 -> 5.0 : subdomain auto-fills "kino" letter-by-letter
  //  5.5 -> 6.5 : cursor moves to "Publish site" button in modal
  //  6.5 -> 6.7 : click pulse on confirm
  //  6.7 -> 8.0 : loading spinner
  //  8.0 -> 10.0 : success state visible
  const FADE_IN_END = t(0.4);
  const PUBLISH_HIGHLIGHT = t(0.4);
  const CURSOR_TO_PUBLISH = t(2.0);
  const PUBLISH_CLICK = t(2.0);
  const PUBLISH_CLICK_END = t(2.2);
  const MODAL_OPEN_START = t(2.5);
  const MODAL_OPEN_END = t(2.75);
  const SUBDOMAIN_TYPE_START = t(3.0);
  const SUBDOMAIN_TYPE_END = t(5.0);
  const CURSOR_TO_CONFIRM = t(6.5);
  const CONFIRM_HIGHLIGHT = t(5.5);
  const CONFIRM_CLICK = t(6.5);
  const CONFIRM_CLICK_END = t(6.7);
  const LOADING_START = t(6.7);
  const SUCCESS_START = t(8.0);

  const fadeInOpacity = interpolate(localFrame, [0, FADE_IN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });

  // Modal animation
  const modalScale = interpolate(
    localFrame,
    [MODAL_OPEN_START, MODAL_OPEN_END],
    [0.96, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );
  const modalOpacity = interpolate(
    localFrame,
    [MODAL_OPEN_START, MODAL_OPEN_END],
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

  // Cursor positions
  // Publish button: top-right of editor toolbar — about (0.95, 0.10) of frame
  const publishX = FRAME_X + FRAME_WIDTH * 0.93;
  const publishY = FRAME_Y + 56 + 28; // chrome height + toolbar half
  // Modal confirm button is centered horizontally, ~62% down
  const confirmX = VIDEO_WIDTH * 0.5;
  const confirmY = VIDEO_HEIGHT * 0.62;

  const cursorKeyframes: CursorKeyframe[] = [
    {
      frame: 0,
      x: FRAME_X + FRAME_WIDTH * 0.5,
      y: FRAME_Y + FRAME_HEIGHT * 0.5,
    },
    {
      frame: CURSOR_TO_PUBLISH - t(1.6),
      x: FRAME_X + FRAME_WIDTH * 0.5,
      y: FRAME_Y + FRAME_HEIGHT * 0.5,
    },
    { frame: CURSOR_TO_PUBLISH, x: publishX, y: publishY },
    { frame: CURSOR_TO_CONFIRM - t(1.0), x: publishX, y: publishY },
    { frame: CURSOR_TO_CONFIRM, x: confirmX, y: confirmY },
    { frame: t(10), x: confirmX, y: confirmY },
  ];

  // Send button states
  const publishHighlight =
    localFrame >= PUBLISH_HIGHLIGHT && localFrame < PUBLISH_CLICK;
  const publishClicked =
    localFrame >= PUBLISH_CLICK && localFrame <= PUBLISH_CLICK_END;

  const confirmHighlight =
    localFrame >= CONFIRM_HIGHLIGHT && localFrame < CONFIRM_CLICK;
  const confirmClicked =
    localFrame >= CONFIRM_CLICK && localFrame <= CONFIRM_CLICK_END;

  const showLoading = localFrame >= LOADING_START && localFrame < SUCCESS_START;
  const showSuccess = localFrame >= SUCCESS_START;
  const showModal = localFrame >= MODAL_OPEN_START;

  return (
    <AbsoluteFill
      style={{ backgroundColor: COLORS.videoBg, opacity: fadeInOpacity }}
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
            messages={[
              { role: "user", content: "Make the hero title bigger and add a 'Watch Trailer' button." },
              { role: "assistant", content: "Done — your changes are live in the preview." },
            ]}
            preview={<KinoSiteMock variant="after-edit" />}
            publishHighlight={publishHighlight}
            publishClicked={publishClicked}
          />
        </BrowserFrame>
      </div>

      {showModal && (
        <PublishModal
          scale={modalScale}
          backdropOpacity={modalOpacity}
          subdomain={
            <Typewriter
              text="kino"
              startFrame={startFrame + SUBDOMAIN_TYPE_START}
              charsPerSecond={3}
            />
          }
          inputCaret={
            localFrame >= SUBDOMAIN_TYPE_START &&
            localFrame < SUBDOMAIN_TYPE_END
          }
          confirmHighlight={confirmHighlight}
          confirmClicked={confirmClicked}
          loading={showLoading}
          successState={showSuccess}
          publishedUrl="kino.weavostudio.com"
        />
      )}

      <Cursor keyframes={cursorKeyframes} />

      <Caption
        text={CAPTIONS.publish.text}
        startFrame={
          startFrame + secondsToFrames(CAPTIONS.publish.startSec - 50)
        }
        endFrame={startFrame + secondsToFrames(CAPTIONS.publish.endSec - 50)}
      />
    </AbsoluteFill>
  );
};
