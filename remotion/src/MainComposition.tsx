import { AbsoluteFill } from "remotion";
import { COLORS } from "./lib/colors";
import { Beat0_ColdOpen } from "./beats/Beat0_ColdOpen";
import { Beat6_CTAClose } from "./beats/Beat6_CTAClose";

export const MainComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.videoBg }}>
      <Beat0_ColdOpen />
      <Beat6_CTAClose />
    </AbsoluteFill>
  );
};
