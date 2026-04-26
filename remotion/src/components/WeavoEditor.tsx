import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { COLORS } from "../lib/colors";

const { fontFamily: interFamily } = loadInter();

const SIDEBAR_WIDTH = 380;

type Message = {
  role: "user" | "assistant";
  content: React.ReactNode;
};

type Props = {
  messages?: Message[];
  /** Live-typed input in the chat box */
  inputText?: React.ReactNode;
  inputCaret?: boolean;
  /** Element rendered in the preview pane (e.g. <KinoSiteMock /> or <Img />) */
  preview: React.ReactNode;
  /** Show Publish button highlight */
  publishHighlight?: boolean;
  publishClicked?: boolean;
};

export const WeavoEditor: React.FC<Props> = ({
  messages = [],
  inputText,
  inputCaret = false,
  preview,
  publishHighlight = false,
  publishClicked = false,
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
      <ChatSidebar
        messages={messages}
        inputText={inputText}
        inputCaret={inputCaret}
      />
      <PreviewArea
        preview={preview}
        publishHighlight={publishHighlight}
        publishClicked={publishClicked}
      />
    </div>
  );
};

const ChatSidebar: React.FC<{
  messages: Message[];
  inputText?: React.ReactNode;
  inputCaret: boolean;
}> = ({ messages, inputText, inputCaret }) => (
  <div
    style={{
      width: SIDEBAR_WIDTH,
      borderRight: "1px solid #E5E5E2",
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <div
      style={{
        padding: "16px 20px",
        borderBottom: "1px solid #E5E5E2",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          backgroundColor: "#000",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        w
      </div>
      <span style={{ fontWeight: 600, fontSize: 14 }}>Kino</span>
      <span style={{ fontSize: 12, color: COLORS.text.muted, marginLeft: "auto" }}>
        Editor
      </span>
    </div>

    {/* Messages */}
    <div
      style={{
        flex: 1,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        overflow: "hidden",
      }}
    >
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
    </div>

    {/* Input */}
    <div
      style={{
        padding: 16,
        borderTop: "1px solid #E5E5E2",
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: "1px solid #E5E5E2",
          padding: 14,
          minHeight: 80,
          fontSize: 15,
          lineHeight: 1.5,
          color: inputText ? COLORS.text.body : COLORS.text.light,
        }}
      >
        {inputText ?? "Ask for changes…"}
        {inputCaret && (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1em",
              backgroundColor: "#000",
              marginLeft: 2,
              verticalAlign: "text-bottom",
            }}
          />
        )}
      </div>
    </div>
  </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  if (message.role === "user") {
    return (
      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "85%",
          padding: "10px 14px",
          backgroundColor: COLORS.ctaBg,
          color: COLORS.ctaText,
          borderRadius: 16,
          borderBottomRightRadius: 4,
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        {message.content}
      </div>
    );
  }
  return (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "90%",
        padding: "10px 14px",
        backgroundColor: "#F0EFEC",
        color: COLORS.text.body,
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      {message.content}
    </div>
  );
};

const PreviewArea: React.FC<{
  preview: React.ReactNode;
  publishHighlight: boolean;
  publishClicked: boolean;
}> = ({ preview, publishHighlight, publishClicked }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#F4F3EE",
    }}
  >
    {/* Toolbar */}
    <div
      style={{
        height: 56,
        borderBottom: "1px solid #E5E5E2",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <ToolbarPill label="Desktop" active />
        <ToolbarPill label="Tablet" />
        <ToolbarPill label="Mobile" />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <button
          style={{
            border: "1px solid #E5E5E2",
            borderRadius: 999,
            padding: "8px 16px",
            fontSize: 14,
            backgroundColor: "#FFFFFF",
          }}
        >
          Save
        </button>
        <button
          id="weavo-publish-button"
          style={{
            border: "none",
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: COLORS.ctaBg,
            color: COLORS.ctaText,
            outline: publishHighlight ? `3px solid rgba(0,0,0,0.15)` : "none",
            outlineOffset: 2,
            transform: publishClicked ? "scale(0.92)" : "scale(1)",
            transition: "transform 80ms ease-out",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Publish
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Preview */}
    <div
      style={{
        flex: 1,
        padding: 32,
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
          border: "1px solid #E5E5E2",
          backgroundColor: "#FFFFFF",
        }}
      >
        {preview}
      </div>
    </div>
  </div>
);

const ToolbarPill: React.FC<{ label: string; active?: boolean }> = ({
  label,
  active,
}) => (
  <div
    style={{
      padding: "6px 12px",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: active ? 500 : 400,
      backgroundColor: active ? "#F0EFEC" : "transparent",
      color: active ? COLORS.text.body : COLORS.text.muted,
    }}
  >
    {label}
  </div>
);
