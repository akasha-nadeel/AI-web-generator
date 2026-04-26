import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { COLORS } from "../lib/colors";

const { fontFamily: interFamily } = loadInter();

type Props = {
  /** Text currently in the chat input — driven by Typewriter at the consumer level */
  promptText?: React.ReactNode;
  /** Visual cue: dim the Send button until prompt has content */
  sendActive?: boolean;
  /** Show "click pulse" on Send (briefly scales 0.92) */
  sendClicked?: boolean;
};

const SIDEBAR_WIDTH = 240;

export const WeavoDashboard: React.FC<Props> = ({
  promptText,
  sendActive = false,
  sendClicked = false,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FAFAF8",
        fontFamily: interFamily,
        color: COLORS.text.body,
        display: "flex",
      }}
    >
      <Sidebar />
      <Main
        promptText={promptText}
        sendActive={sendActive}
        sendClicked={sendClicked}
      />
    </div>
  );
};

const Sidebar: React.FC = () => (
  <div
    style={{
      width: SIDEBAR_WIDTH,
      borderRight: "1px solid #E5E5E2",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 32,
      backgroundColor: "#FFFFFF",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        w
      </div>
      <span style={{ fontWeight: 600, fontSize: 16 }}>weavo</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <NavItem label="Chat" active />
      <NavItem label="Recents" />
      <NavItem label="All Projects" />
      <NavItem label="Templates" />
      <NavItem label="Trash" />
    </div>

    <div
      style={{
        marginTop: "auto",
        padding: 12,
        borderRadius: 12,
        border: "1px solid #E5E5E2",
        fontSize: 12,
      }}
    >
      <div style={{ color: COLORS.text.muted, marginBottom: 4 }}>Credits</div>
      <div style={{ fontWeight: 600 }}>240 left</div>
    </div>
  </div>
);

const NavItem: React.FC<{ label: string; active?: boolean }> = ({
  label,
  active,
}) => (
  <div
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      color: active ? COLORS.text.body : COLORS.text.muted,
      backgroundColor: active ? "#F0EFEC" : "transparent",
    }}
  >
    {label}
  </div>
);

const Main: React.FC<Props> = ({ promptText, sendActive, sendClicked }) => (
  <div
    style={{
      flex: 1,
      padding: "80px 64px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      style={{
        fontSize: 44,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        marginBottom: 12,
      }}
    >
      What do you want to build?
    </div>
    <div
      style={{
        fontSize: 16,
        color: COLORS.text.muted,
        marginBottom: 48,
      }}
    >
      Describe your site and we'll generate it.
    </div>

    <ChatCard
      promptText={promptText}
      sendActive={sendActive}
      sendClicked={sendClicked}
    />

    <SuggestionChips />
  </div>
);

const ChatCard: React.FC<Props> = ({
  promptText,
  sendActive,
  sendClicked,
}) => (
  <div
    id="weavo-chat-card"
    style={{
      width: "100%",
      maxWidth: 920,
      borderRadius: 24,
      border: "1px solid #E5E5E2",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 12px 24px rgba(0,0,0,0.04)",
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <GeminiStar />
      <div
        style={{
          flex: 1,
          fontSize: 18,
          lineHeight: 1.6,
          minHeight: 56,
          color: promptText ? COLORS.text.body : COLORS.text.light,
        }}
      >
        {promptText ?? "Describe the website you want to build…"}
      </div>
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <Pill label="Industry: Auto" />
        <Pill label="Mood: Auto" />
      </div>
      <button
        id="weavo-send-button"
        style={{
          backgroundColor: COLORS.ctaBg,
          color: COLORS.ctaText,
          fontFamily: interFamily,
          fontWeight: 500,
          fontSize: 15,
          padding: "12px 24px",
          borderRadius: 999,
          border: "none",
          opacity: sendActive ? 1 : 0.5,
          transform: sendClicked ? "scale(0.92)" : "scale(1)",
          transition: "transform 80ms ease-out",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        Send
        <SendArrow />
      </button>
    </div>
  </div>
);

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      fontSize: 13,
      color: COLORS.text.muted,
      padding: "6px 12px",
      borderRadius: 999,
      border: "1px solid #E5E5E2",
    }}
  >
    {label}
  </div>
);

const SuggestionChips: React.FC = () => {
  const chips = [
    "SaaS landing page",
    "E-commerce store",
    "Portfolio website",
    "Restaurant",
    "Agency",
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginTop: 24,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 920,
      }}
    >
      {chips.map((c) => (
        <div
          key={c}
          style={{
            fontSize: 13,
            color: COLORS.text.body,
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid #E5E5E2",
            backgroundColor: "#FFFFFF",
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

const GeminiStar: React.FC = () => (
  <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <path
      d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z"
      fill="#7C3AED"
    />
  </svg>
);

const SendArrow: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
