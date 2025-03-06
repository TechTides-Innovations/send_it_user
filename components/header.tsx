import { View, Text } from "react-native";
import React from "react";
import { colors, textSize } from "../constants/constants.global";

type HeaderProps = {
  title: string;
  subTitle: string;
};
const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <View style={{ display: "flex", gap: -4 }}>
      <Text style={[textSize.fiveXl]} className="font-pbold">
        {title}
      </Text>
      <Text
        style={[textSize.fiveXl, { color: colors.primary }]}
        className="font-pbold"
      >
        {subTitle}
      </Text>
    </View>
  );
};

export default Header;
