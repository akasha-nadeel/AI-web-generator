import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { COLORS } from "../lib/colors";

const { fontFamily: interFamily } = loadInter();

type Props = {
  /** 0..1 scale-in progress for the modal card */
  scale: number;
  /** 0..1 backdrop dim */
  backdropOpacity: number;
  /** Subdomain text typed so far */
  subdomain: React.ReactNode;
  /** Show input caret in the subdomain field */
  inputCaret?: boolean;
  /** Confirm button states */
  confirmHighlight?: boolean;
  confirmClicked?: boolean;
  /** Show success state instead of input */
  successState?: boolean;
  /** Loading state — between click and success */
  loading?: boolean;
  /** Final URL to display in success */
  publishedUrl?: string;
};

export const PublishModal: React.FC<Props> = ({
  scale,
  backdropOpacity,
  subdomain,
  inputCaret = false,
  confirmHighlight = false,
  confirmClicked = false,
  successState = false,
  loading = false,
  publishedUrl = "kino.weavostudio.com",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: interFamily,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(10, 10, 10, ${0.4 * backdropOpacity})`,
        }}
      />
      <div
        style={{
          position: "relative",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: 32,
          width: 480,
          boxShadow: "0 60px 120px rgba(0,0,0,0.2)",
          transform: `scale(${scale})`,
          opacity: backdropOpacity,
        }}
      >
        {!successState ? (
          <>
            <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
              Publish your site
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.text.muted,
                marginBottom: 24,
              }}
            >
              Choose a subdomain. Your site will be live instantly.
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 8,
                color: COLORS.text.body,
              }}
            >
              Subdomain
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                border: "1px solid #E5E5E2",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  fontSize: 15,
                  color: subdomain ? COLORS.text.body : COLORS.text.light,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {subdomain || "your-site"}
                {inputCaret && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2,
                      height: "1em",
                      backgroundColor: "#000",
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  fontSize: 15,
                  color: COLORS.text.muted,
                  backgroundColor: "#F4F3EE",
                  borderLeft: "1px solid #E5E5E2",
                }}
              >
                .weavostudio.com
              </div>
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: COLORS.ctaBg,
                color: COLORS.ctaText,
                fontFamily: interFamily,
                fontWeight: 500,
                fontSize: 15,
                padding: "14px 24px",
                borderRadius: 10,
                border: "none",
                outline: confirmHighlight ? "3px solid rgba(0,0,0,0.15)" : "none",
                outlineOffset: 2,
                transform: confirmClicked ? "scale(0.96)" : "scale(1)",
                transition: "transform 80ms ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? <Spinner /> : "Publish site"}
            </button>
          </>
        ) : (
          <SuccessState publishedUrl={publishedUrl} />
        )}
      </div>
    </div>
  );
};

const Spinner: React.FC = () => (
  <div
    style={{
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "#FFFFFF",
    }}
  />
);

const SuccessState: React.FC<{ publishedUrl: string }> = ({ publishedUrl }) => (
  <div style={{ textAlign: "center", padding: "8px 0" }}>
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#0E7C3A",
        margin: "0 auto 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 13l4 4L19 7"
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
      You're live.
    </div>
    <div
      style={{
        fontSize: 14,
        color: COLORS.text.muted,
        marginBottom: 16,
      }}
    >
      Your site is published at:
    </div>
    <a
      style={{
        fontSize: 16,
        fontWeight: 500,
        color: COLORS.text.body,
        textDecoration: "underline",
      }}
    >
      {publishedUrl}
    </a>
  </div>
);
