import { MotiView } from "moti";
import { ViewStyle } from "react-native";

const SkeletonLoader = ({
  width,
  height,
  radius,
  style,
}: {
  width: number | string;
  height: number;
  radius: number;
  style?: ViewStyle;
}) => (
  <MotiView
    from={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{
      type: "timing",
      duration: 1500,
      loop: true,
    }}
    style={[
      {
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#E1E1E1",
      } as ViewStyle,
      style,
    ]}
  />
);

export default SkeletonLoader;
