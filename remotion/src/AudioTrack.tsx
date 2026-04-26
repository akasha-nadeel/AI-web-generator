import { Audio, staticFile } from "remotion";
import { useEffect, useState } from "react";

const AUDIO_PATH = "audio/ambient-pad.mp3";

/**
 * Mounts the ambient pad music track if present at remotion/public/audio/.
 *
 * Until you drop a track in, the file does not exist and this component
 * renders nothing. To add music:
 *   1. Download a license-friendly ambient pad track
 *      (Pixabay search "ambient pad" or YouTube Audio Library)
 *   2. Save as remotion/public/audio/ambient-pad.mp3
 *   3. Re-render — Remotion picks it up automatically.
 *
 * Volume is held at -18 LUFS approximated by 0.45 linear gain.
 */
export const AudioTrack: React.FC = () => {
  const [hasAudio, setHasAudio] = useState(false);

  useEffect(() => {
    fetch(staticFile(AUDIO_PATH), { method: "HEAD" })
      .then((res) => setHasAudio(res.ok))
      .catch(() => setHasAudio(false));
  }, []);

  if (!hasAudio) return null;

  return <Audio src={staticFile(AUDIO_PATH)} volume={0.45} />;
};
