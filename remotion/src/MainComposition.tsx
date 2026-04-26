import { AbsoluteFill } from "remotion";
import { COLORS } from "./lib/colors";
import { Beat0_ColdOpen } from "./beats/Beat0_ColdOpen";
import { Beat1_Prompt } from "./beats/Beat1_Prompt";
import { Beat2_Build } from "./beats/Beat2_Build";
import { Beat3_Refine } from "./beats/Beat3_Refine";
import { Beat4_Publish } from "./beats/Beat4_Publish";
import { Beat5_Payoff } from "./beats/Beat5_Payoff";
import { Beat6_CTAClose } from "./beats/Beat6_CTAClose";
import { AudioTrack } from "./AudioTrack";

export const MainComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.videoBg }}>
      <Beat0_ColdOpen />
      <Beat1_Prompt />
      <Beat2_Build />
      <Beat3_Refine />
      <Beat4_Publish />
      <Beat5_Payoff />
      <Beat6_CTAClose />
      <AudioTrack />
    </AbsoluteFill>
  );
};
