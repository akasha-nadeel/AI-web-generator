import { Composition } from "remotion";
import { MainComposition } from "./MainComposition";

export const VIDEO_FPS = 60;
export const VIDEO_WIDTH = 2560;
export const VIDEO_HEIGHT = 1440;
export const VIDEO_DURATION_SECONDS = 72;
export const VIDEO_DURATION_FRAMES = VIDEO_DURATION_SECONDS * VIDEO_FPS;

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
