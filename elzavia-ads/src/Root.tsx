import { Composition } from "remotion";
import { B2G1Ad } from "./B2G1Ad";
import { TOTAL_FRAMES, WIDTH, HEIGHT, FPS } from "./B2G1Ad/shared";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="B2G1Ad"
        component={B2G1Ad}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
