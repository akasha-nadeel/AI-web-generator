import { COLORS } from "../lib/colors";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";

const { fontFamily: interFamily } = loadInter();
const { fontFamily: oswaldFamily } = loadOswald();

export type KinoVariant =
  | "hero-only"
  | "hero-trending"
  | "full-bento"
  | "after-edit"
  | "full-page";

type Props = {
  variant: KinoVariant;
  /** When true, scale the layout for use as a tall scrollable image */
  tall?: boolean;
};

/**
 * Placeholder render of the Kino streaming site (Trilok pattern).
 * Used until Phase 4's Playwright capture script provides real screenshots,
 * at which point this component is swapped for <Img src="kino-..." />
 * in the consumer beats.
 */
export const KinoSiteMock: React.FC<Props> = ({ variant, tall = false }) => {
  return (
    <div
      style={{
        width: "100%",
        height: tall ? "auto" : "100%",
        minHeight: tall ? 0 : "100%",
        backgroundColor: COLORS.kino.bg,
        fontFamily: interFamily,
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Hero showWatchTrailer={variant === "after-edit"} biggerTitle={variant === "after-edit"} />
      {(variant === "hero-trending" ||
        variant === "full-bento" ||
        variant === "after-edit" ||
        variant === "full-page") && <TrendingRow />}
      {(variant === "full-bento" ||
        variant === "after-edit" ||
        variant === "full-page") && <GenreTiles />}
      {variant === "full-page" && <Featured />}
      {variant === "full-page" && <Footer />}
    </div>
  );
};

const Hero: React.FC<{ showWatchTrailer: boolean; biggerTitle: boolean }> = ({
  showWatchTrailer,
  biggerTitle,
}) => {
  return (
    <div
      style={{
        position: "relative",
        height: 800,
        backgroundImage:
          "linear-gradient(180deg, rgba(14,14,14,0.0) 0%, rgba(14,14,14,0.85) 70%, #0E0E0E 100%), radial-gradient(ellipse at 30% 40%, rgba(230,56,56,0.35) 0%, transparent 60%), linear-gradient(135deg, #1a0a0a 0%, #0E0E0E 100%)",
        padding: "48px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: oswaldFamily,
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "0.02em",
          }}
        >
          KINO<span style={{ color: COLORS.kino.accent }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, opacity: 0.8 }}>
          <span>Movies</span>
          <span>Series</span>
          <span>Top 10</span>
          <span>My List</span>
        </div>
      </div>

      <div>
        <div
          style={{
            color: COLORS.kino.accent,
            fontSize: 14,
            letterSpacing: "0.2em",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          NOW STREAMING
        </div>
        <div
          style={{
            fontFamily: oswaldFamily,
            fontWeight: 700,
            fontSize: biggerTitle ? 200 : 160,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            maxWidth: 1400,
          }}
        >
          The Last
          <br />
          <span style={{ color: COLORS.kino.accent }}>Frontier</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: COLORS.kino.accent,
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 18,
              padding: "16px 36px",
              borderRadius: 999,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <PlayIcon />
            Watch Now
          </button>
          {showWatchTrailer && (
            <button
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 18,
                padding: "16px 36px",
                borderRadius: 999,
                border: "1.5px solid rgba(255,255,255,0.7)",
              }}
            >
              ▶ Watch Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TrendingRow: React.FC = () => {
  const items = ["1", "2", "3", "4", "5"];
  return (
    <div style={{ padding: "64px 80px" }}>
      <div
        style={{
          fontFamily: oswaldFamily,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 32,
          textTransform: "uppercase",
        }}
      >
        Top Trending
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {items.map((n, i) => (
          <div
            key={n}
            style={{
              position: "relative",
              flex: 1,
              aspectRatio: "2/3",
              backgroundColor: i % 2 === 0 ? "#1a1a1a" : "#202020",
              borderRadius: 8,
              backgroundImage: `linear-gradient(135deg, hsl(${
                (i * 60) % 360
              }, 30%, 18%) 0%, #0E0E0E 100%)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: -40,
                fontFamily: oswaldFamily,
                fontWeight: 700,
                fontSize: 320,
                lineHeight: 0.8,
                color: "transparent",
                WebkitTextStroke: `4px ${COLORS.kino.accent}`,
                pointerEvents: "none",
              }}
            >
              {n}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GenreTiles: React.FC = () => {
  const tiles: Array<{ label: string; color: string }> = [
    { label: "Action", color: COLORS.kino.accent },
    { label: "Sci-Fi", color: "#7A3FFF" },
    { label: "Drama", color: "#0E9694" },
    { label: "Thriller", color: "#FF8A1F" },
  ];
  return (
    <div style={{ padding: "64px 80px" }}>
      <div
        style={{
          fontFamily: oswaldFamily,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 32,
          textTransform: "uppercase",
        }}
      >
        By Genre
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.label}
            style={{
              backgroundColor: tile.color,
              borderRadius: 16,
              aspectRatio: "1/1",
              padding: 32,
              display: "flex",
              alignItems: "flex-end",
              fontFamily: oswaldFamily,
              fontSize: 48,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            {tile.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const Featured: React.FC = () => (
  <div style={{ padding: "64px 80px", borderTop: "1px solid #1a1a1a" }}>
    <div
      style={{
        fontFamily: oswaldFamily,
        fontSize: 36,
        fontWeight: 600,
        marginBottom: 32,
        textTransform: "uppercase",
      }}
    >
      Featured Series
    </div>
    <div
      style={{
        height: 400,
        borderRadius: 16,
        backgroundImage:
          "linear-gradient(90deg, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.4) 50%, transparent 100%), linear-gradient(135deg, #2a0f0f, #0E0E0E)",
        padding: 48,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: oswaldFamily,
            fontSize: 80,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Ascendant
        </div>
        <div style={{ fontSize: 18, opacity: 0.7, marginTop: 16, maxWidth: 600 }}>
          A new era begins. The acclaimed series that changed everything.
        </div>
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => (
  <div
    style={{
      padding: "64px 80px 80px",
      borderTop: "1px solid #1a1a1a",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div
      style={{
        fontFamily: oswaldFamily,
        fontWeight: 700,
        fontSize: 32,
        letterSpacing: "0.02em",
      }}
    >
      KINO<span style={{ color: COLORS.kino.accent }}>.</span>
    </div>
    <div style={{ fontSize: 14, opacity: 0.5 }}>© 2026 Kino. All rights reserved.</div>
  </div>
);

const PlayIcon: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
