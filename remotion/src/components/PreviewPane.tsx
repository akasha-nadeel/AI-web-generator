import { interpolate, useCurrentFrame } from "remotion";
import { KinoSiteMock } from "./KinoSiteMock";
import { msToFrames } from "../lib/timing";
import { softEaseOut } from "../lib/easing";
import { COLORS } from "../lib/colors";

type Props = {
  /** Frame at which the hero pass begins */
  heroStartFrame: number;
  trendingStartFrame: number;
  bentoStartFrame: number;
  featuredStartFrame: number;
  /** Optional empty state before hero appears */
  showLoading?: boolean;
};

const REVEAL_DURATION = () => msToFrames(500);

export const PreviewPane: React.FC<Props> = ({
  heroStartFrame,
  trendingStartFrame,
  bentoStartFrame,
  featuredStartFrame,
  showLoading = true,
}) => {
  const frame = useCurrentFrame();
  const reveal = REVEAL_DURATION();

  const heroOpacity = revealOpacity(frame, heroStartFrame, reveal);
  const heroDrift = revealDrift(frame, heroStartFrame, reveal);

  const trendingOpacity = revealOpacity(frame, trendingStartFrame, reveal);
  const trendingDrift = revealDrift(frame, trendingStartFrame, reveal);

  const bentoOpacity = revealOpacity(frame, bentoStartFrame, reveal);
  const bentoDrift = revealDrift(frame, bentoStartFrame, reveal);

  const featuredOpacity = revealOpacity(frame, featuredStartFrame, reveal);
  const featuredDrift = revealDrift(frame, featuredStartFrame, reveal);

  const showHero = frame >= heroStartFrame;
  const showTrending = frame >= trendingStartFrame;
  const showBento = frame >= bentoStartFrame;
  const showFeatured = frame >= featuredStartFrame;

  // When nothing is revealed yet, show a soft "waiting" surface so the pane
  // doesn't appear blank.
  if (!showHero && showLoading) {
    return <LoadingSurface />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.kino.bg,
        overflow: "hidden",
      }}
    >
      {showHero && (
        <Section opacity={heroOpacity} drift={heroDrift}>
          <KinoHero />
        </Section>
      )}
      {showTrending && (
        <Section opacity={trendingOpacity} drift={trendingDrift}>
          <KinoTrending />
        </Section>
      )}
      {showBento && (
        <Section opacity={bentoOpacity} drift={bentoDrift}>
          <KinoBento />
        </Section>
      )}
      {showFeatured && (
        <Section opacity={featuredOpacity} drift={featuredDrift}>
          <KinoFeatured />
        </Section>
      )}
    </div>
  );
};

const Section: React.FC<{
  opacity: number;
  drift: number;
  children: React.ReactNode;
}> = ({ opacity, drift, children }) => (
  <div style={{ opacity, transform: `translateY(${drift}px)` }}>
    {children}
  </div>
);

function revealOpacity(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });
}

function revealDrift(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: softEaseOut,
  });
}

const LoadingSurface: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: COLORS.kino.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,0.4)",
      fontSize: 14,
      letterSpacing: "0.2em",
    }}
  >
    GENERATING…
  </div>
);

// Re-use sections from KinoSiteMock by rendering progressive variants
const KinoHero: React.FC = () => (
  <div style={{ height: 800 }}>
    <KinoSiteMock variant="hero-only" />
  </div>
);

// For trending/bento/featured we render the appropriate "extra" only — the
// hero is already drawn above. Trick: render the variant inside a clip-path
// that hides everything above the section we want.
const KinoTrending: React.FC = () => (
  <KinoSlice variant="hero-trending" sliceTop={800} />
);

const KinoBento: React.FC = () => (
  <KinoSlice variant="full-bento" sliceTop={1280} />
);

const KinoFeatured: React.FC = () => (
  <KinoSlice variant="full-page" sliceTop={1900} />
);

/**
 * Renders a KinoSiteMock variant but only shows the area below `sliceTop`,
 * so each subsequent reveal "stacks" without redrawing the prior sections.
 */
const KinoSlice: React.FC<{
  variant: Parameters<typeof KinoSiteMock>[0]["variant"];
  sliceTop: number;
}> = ({ variant, sliceTop }) => (
  <div
    style={{
      position: "relative",
      marginTop: -sliceTop,
      clipPath: `inset(${sliceTop}px 0 0 0)`,
    }}
  >
    <KinoSiteMock variant={variant} tall />
  </div>
);
