import { COLORS } from "../lib/colors";

type Props = {
  url: string;
  width?: number | string;
  height?: number | string;
  /** Frame chrome height in px */
  chromeHeight?: number;
  /** Border radius of the entire frame */
  radius?: number;
  /** Show the soft floating shadow */
  shadow?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const BROWSER_CHROME_HEIGHT = 56;

export const BrowserFrame: React.FC<Props> = ({
  url,
  width = "100%",
  height = "100%",
  chromeHeight = BROWSER_CHROME_HEIGHT,
  radius = 12,
  shadow = true,
  children,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: COLORS.browserFrame.chromeBg,
        boxShadow: shadow ? COLORS.browserFrame.shadow : "none",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${COLORS.browserFrame.border}`,
        ...style,
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          height: chromeHeight,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          backgroundColor: COLORS.browserFrame.chromeBg,
          borderBottom: `1px solid ${COLORS.browserFrame.border}`,
          gap: 12,
        }}
      >
        <TrafficLights />
        <NavButtons />
        <AddressBar url={url} />
        <ChromeIcons />
      </div>
      {/* Viewport */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

const TrafficLights: React.FC = () => (
  <div style={{ display: "flex", gap: 8 }}>
    <Dot color={COLORS.browserFrame.trafficClose} />
    <Dot color={COLORS.browserFrame.trafficMin} />
    <Dot color={COLORS.browserFrame.trafficMax} />
  </div>
);

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: color,
    }}
  />
);

const NavButtons: React.FC = () => (
  <div style={{ display: "flex", gap: 4, marginLeft: 16 }}>
    <NavIcon path="M15 18l-6-6 6-6" />
    <NavIcon path="M9 18l6-6-6-6" />
    <NavIcon
      path="M3 12a9 9 0 1015.5-6M21 4v6h-6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </div>
);

const NavIcon: React.FC<{
  path: string;
  strokeLinecap?: "round" | "butt";
  strokeLinejoin?: "round" | "miter";
}> = ({ path, strokeLinecap = "round", strokeLinejoin = "round" }) => (
  <div
    style={{
      width: 28,
      height: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
    }}
  >
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path
        d={path}
        stroke={COLORS.browserFrame.iconGray}
        strokeWidth={2}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  </div>
);

const AddressBar: React.FC<{ url: string }> = ({ url }) => (
  <div
    style={{
      flex: 1,
      height: 32,
      borderRadius: 16,
      backgroundColor: COLORS.browserFrame.addressBarBg,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: 8,
      fontSize: 14,
      color: COLORS.browserFrame.addressBarText,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif",
      maxWidth: 720,
    }}
  >
    <LockIcon />
    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      {url}
    </span>
  </div>
);

const LockIcon: React.FC = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
    <rect
      x={5}
      y={11}
      width={14}
      height={10}
      rx={2}
      stroke={COLORS.browserFrame.iconGray}
      strokeWidth={2}
    />
    <path
      d="M8 11V7a4 4 0 018 0v4"
      stroke={COLORS.browserFrame.iconGray}
      strokeWidth={2}
    />
  </svg>
);

const ChromeIcons: React.FC = () => (
  <div style={{ display: "flex", gap: 4 }}>
    <NavIcon path="M12 5v14M5 12h14" />
    <NavIcon path="M12 6h.01M12 12h.01M12 18h.01" />
  </div>
);
