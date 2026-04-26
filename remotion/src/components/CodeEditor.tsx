import { loadFont } from "@remotion/google-fonts/JetBrainsMono";
import { COLORS } from "../lib/colors";

const { fontFamily: monoFamily } = loadFont();

type Props = {
  /** The full code; only chars [0..visibleChars] will be rendered */
  code: string;
  visibleChars: number;
  /** Show blinking caret at the current end-of-text position */
  caret?: boolean;
  /** Approximate line at which to scroll-lock the bottom (auto-scroll as code grows) */
  scrollLockToEnd?: boolean;
};

export const CodeEditor: React.FC<Props> = ({
  code,
  visibleChars,
  caret = true,
  scrollLockToEnd = true,
}) => {
  const visibleCode = code.slice(0, visibleChars);

  // Compute total visible lines so we can scroll the latest into view
  const totalLines = visibleCode.split("\n").length;
  const LINE_HEIGHT = 28;
  const VIEWPORT_LINES = 30;
  const scrollOffset = scrollLockToEnd
    ? Math.max(0, (totalLines - VIEWPORT_LINES) * LINE_HEIGHT)
    : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.codeEditor.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          height: 44,
          flexShrink: 0,
          padding: "0 16px",
          borderBottom: `1px solid ${COLORS.codeEditor.line}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: monoFamily,
          fontSize: 12,
          color: COLORS.text.muted,
        }}
      >
        <FileTabActive name="index.html" />
        <FileTab name="styles.css" />
        <FileTab name="script.js" />
        <span style={{ marginLeft: "auto", fontSize: 11 }}>
          GENERATING…
        </span>
      </div>

      {/* Code body */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          fontFamily: monoFamily,
          fontSize: 16,
          lineHeight: `${LINE_HEIGHT}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateY(${-scrollOffset}px)`,
          }}
        >
          {/* Gutter */}
          <div
            style={{
              flexShrink: 0,
              padding: "16px 8px 16px 16px",
              color: COLORS.text.light,
              userSelect: "none",
              textAlign: "right",
              minWidth: 56,
            }}
          >
            {Array.from({ length: totalLines }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <div
            style={{
              flex: 1,
              padding: "16px 16px",
              whiteSpace: "pre-wrap",
              color: COLORS.codeEditor.text,
            }}
          >
            <SyntaxHighlightedCode code={visibleCode} />
            {caret && <Caret />}
          </div>
        </div>
      </div>
    </div>
  );
};

const FileTabActive: React.FC<{ name: string }> = ({ name }) => (
  <div
    style={{
      padding: "10px 14px",
      borderBottom: `2px solid ${COLORS.codeEditor.tag}`,
      color: COLORS.codeEditor.text,
      fontWeight: 500,
    }}
  >
    {name}
  </div>
);

const FileTab: React.FC<{ name: string }> = ({ name }) => (
  <div
    style={{
      padding: "10px 14px",
      color: COLORS.text.muted,
    }}
  >
    {name}
  </div>
);

const Caret: React.FC = () => (
  <span
    style={{
      display: "inline-block",
      width: 2,
      height: "1em",
      backgroundColor: COLORS.codeEditor.text,
      marginLeft: 2,
      verticalAlign: "text-bottom",
      animation: "blink 1s steps(2, start) infinite",
    }}
  />
);

/**
 * Lightweight HTML+JSX syntax highlighter — token regex over a single string.
 * Faster + render-deterministic compared to Shiki for streaming text.
 */
const SyntaxHighlightedCode: React.FC<{ code: string }> = ({ code }) => {
  const tokens = tokenize(code);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: tok.color }}>
          {tok.text}
        </span>
      ))}
    </>
  );
};

type Token = { text: string; color: string };

const TAG_RE = /<\/?([a-zA-Z][a-zA-Z0-9-]*)/;
const ATTR_RE = /\b([a-zA-Z-]+)=/;
const STRING_RE = /"[^"]*"/;
const COMMENT_RE = /<!--[\s\S]*?-->/;
const PUNCT_RE = /[<>=/]/;

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < code.length) {
    // Comment
    const commentMatch = code.slice(i).match(COMMENT_RE);
    if (commentMatch && commentMatch.index === 0) {
      tokens.push({
        text: commentMatch[0],
        color: COLORS.codeEditor.comment,
      });
      i += commentMatch[0].length;
      continue;
    }
    // Tag opener: < or </
    if (code[i] === "<") {
      const slice = code.slice(i);
      const tagMatch = slice.match(TAG_RE);
      if (tagMatch) {
        // Push the < or </
        const punct = slice.startsWith("</") ? "</" : "<";
        tokens.push({ text: punct, color: COLORS.codeEditor.text });
        // Push tag name in tag color
        tokens.push({
          text: tagMatch[1],
          color: COLORS.codeEditor.tag,
        });
        i += punct.length + tagMatch[1].length;
        continue;
      }
    }
    // String
    const strMatch = code.slice(i).match(STRING_RE);
    if (strMatch && strMatch.index === 0) {
      tokens.push({
        text: strMatch[0],
        color: COLORS.codeEditor.string,
      });
      i += strMatch[0].length;
      continue;
    }
    // Attribute name
    const attrMatch = code.slice(i).match(ATTR_RE);
    if (attrMatch && attrMatch.index === 0) {
      tokens.push({
        text: attrMatch[1],
        color: COLORS.codeEditor.attr,
      });
      tokens.push({ text: "=", color: COLORS.codeEditor.text });
      i += attrMatch[0].length;
      continue;
    }
    // Punctuation
    if (PUNCT_RE.test(code[i])) {
      tokens.push({
        text: code[i],
        color: COLORS.codeEditor.text,
      });
      i++;
      continue;
    }
    // Plain text — accumulate until next significant char
    let plainEnd = i;
    while (
      plainEnd < code.length &&
      !PUNCT_RE.test(code[plainEnd]) &&
      code[plainEnd] !== '"' &&
      !(code.slice(plainEnd).startsWith("<!--"))
    ) {
      plainEnd++;
      if (
        plainEnd < code.length &&
        code[plainEnd] === " " &&
        ATTR_RE.test(code.slice(plainEnd + 1, plainEnd + 50))
      ) {
        // break before attribute names
        plainEnd++;
        break;
      }
    }
    if (plainEnd === i) plainEnd = i + 1;
    tokens.push({
      text: code.slice(i, plainEnd),
      color: COLORS.codeEditor.text,
    });
    i = plainEnd;
  }
  return tokens;
}
