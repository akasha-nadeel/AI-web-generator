import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame } from "../primitives/BrowserFrame";
import { Typewriter } from "../primitives/Typewriter";
import { KinoSiteMock } from "../components/KinoSiteMock";
import { COLORS } from "../lib/colors";
import { BEATS, secondsToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";
import { useBeatMotion } from "../lib/beat-motion";
import { VIDEO_WIDTH, VIDEO_HEIGHT } from "../lib/video-constants";

const TYPED_URL = "kino.weavostudio.com";

export const Beat5_Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { startFrame, endFrame } = BEATS.payoff;
  // Subtle breath only — scroll provides the dominant motion
  const motion = useBeatMotion(startFrame, endFrame, {
    scaleStart: 0.98,
    scaleEnd: 1.02,
    scaleExit: 1.04,
  });

  if (!motion.visible) return null;

  const localFrame = frame - startFrame;
  const t = (sec: number) => secondsToFrames(sec);

  // Beat is 8s (60 -> 68)
  //  0.0 -> 0.4  : tab grow animation (new tab opens to the right of existing)
  //  0.4 -> 2.0  : URL types in address bar
  //  2.0 -> 2.5  : subtle progress bar
  //  2.5 -> 7.5  : cinematic vertical scroll of full Kino site
  //  7.5 -> 8.0  : hold + start fade-to-white for Beat 6
  const TAB_GROW_END = t(0.4);
  const URL_TYPE_START = t(0.4);
  const URL_TYPE_END = t(2.0);
  const PROGRESS_END = t(2.5);
  const SCROLL_START = t(2.5);
  const SCROLL_END = t(7.5);
  const FADE_TO_WHITE_START = t(7.5);
  const FADE_TO_WHITE_END = t(8.0);

  const tabGrowScale = interpolate(localFrame, [0, TAB_GROW_END], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });

  const progressOpacity = interpolate(
    localFrame,
    [URL_TYPE_END, URL_TYPE_END + 4, PROGRESS_END - 6, PROGRESS_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const progressWidth = interpolate(
    localFrame,
    [URL_TYPE_END, PROGRESS_END],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );

  // Scroll the tall page over 5 seconds.
  // Total page height in KinoSiteMock 'full-page' is roughly 800 (hero) + 700 (trending) + 600 (genres) + 460 (featured) + 200 (footer) ~ 2760px
  // The viewport is FRAME_H. We want to scroll from 0 to (totalHeight - viewportH).
  const scrollProgress = interpolate(
    localFrame,
    [SCROLL_START, SCROLL_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );

  const fadeToWhite = interpolate(
    localFrame,
    [FADE_TO_WHITE_START, FADE_TO_WHITE_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: softEaseOut,
    }
  );

  const FRAME_PAD = 80;
  const FRAME_X = FRAME_PAD;
  const FRAME_Y = FRAME_PAD;
  const FRAME_W = VIDEO_WIDTH - FRAME_PAD * 2;
  const FRAME_H = VIDEO_HEIGHT - FRAME_PAD * 2;
  const VIEWPORT_H = FRAME_H - 56; // minus chrome
  const TOTAL_PAGE_H = 2760;
  const MAX_SCROLL = Math.max(0, TOTAL_PAGE_H - VIEWPORT_H);
  const scrollY = scrollProgress * MAX_SCROLL;

  // URL field: only show typed text after URL_TYPE_START
  const urlText = (() => {
    if (localFrame < URL_TYPE_START) return "";
    if (localFrame >= URL_TYPE_END) return TYPED_URL;
    const elapsed = localFrame - URL_TYPE_START;
    const totalChars = TYPED_URL.length;
    const totalDur = URL_TYPE_END - URL_TYPE_START;
    const charsToShow = Math.floor((elapsed / totalDur) * totalChars);
    return TYPED_URL.slice(0, charsToShow);
  })();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.videoBg,
        opacity: motion.opacity,
        transform: `scale(${motion.scale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: FRAME_X,
          top: FRAME_Y,
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${tabGrowScale})`,
          transformOrigin: "center center",
        }}
      >
        <BrowserFrame url={urlText || "kino.weavostudio.com"}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              backgroundColor: COLORS.kino.bg,
            }}
          >
            {/* Progress bar across top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${progressWidth}%`,
                height: 3,
                backgroundColor: COLORS.kino.accent,
                opacity: progressOpacity,
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -scrollY,
                left: 0,
                right: 0,
              }}
            >
              <KinoSiteMock variant="full-page" tall />
            </div>
          </div>
        </BrowserFrame>
      </div>

      {/* White overlay for fade-to-Beat-6 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.videoBg,
          opacity: fadeToWhite,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
