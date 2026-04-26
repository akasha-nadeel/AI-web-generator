import { Composition } from "remotion";
import { MainComposition } from "./MainComposition";
import {
  VIDEO_FPS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_DURATION_FRAMES,
} from "./lib/video-constants";

export {
  VIDEO_FPS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  VIDEO_DURATION_FRAMES,
} from "./lib/video-constants";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MainComposition"
      component={MainComposition}
      durationInFrames={VIDEO_DURATION_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
