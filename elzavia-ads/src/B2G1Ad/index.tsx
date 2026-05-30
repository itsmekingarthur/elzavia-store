import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Scene1_Hook } from "./Scene1_Hook";
import { Scene2_Problem } from "./Scene2_Problem";
import { Scene3_Solution } from "./Scene3_Solution";
import { Scene4_Offer } from "./Scene4_Offer";
import { Scene5_CTA } from "./Scene5_CTA";
import { SCENE_DURATIONS } from "./shared";

const { hook, problem, solution, offer, cta } = SCENE_DURATIONS;

export const B2G1Ad: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f1a" }}>
      <Sequence from={0} durationInFrames={hook}>
        <Scene1_Hook />
      </Sequence>
      <Sequence from={hook} durationInFrames={problem}>
        <Scene2_Problem />
      </Sequence>
      <Sequence from={hook + problem} durationInFrames={solution}>
        <Scene3_Solution />
      </Sequence>
      <Sequence from={hook + problem + solution} durationInFrames={offer}>
        <Scene4_Offer />
      </Sequence>
      <Sequence from={hook + problem + solution + offer} durationInFrames={cta}>
        <Scene5_CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
