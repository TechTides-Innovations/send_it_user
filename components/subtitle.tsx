import { View, Text } from "react-native";
import React from "react";
import { textSize } from "../constants/constants.global";

type SubTitleProps = {
  title: string;
  color?: string;
};
const SubTitle = ({ title, color }: SubTitleProps) => {
  return (
    <View>
      <Text
        className="font-pregular"
        style={[textSize.lg, { color: color, marginVertical: 5 }]}
      >
        {title}
      </Text>
    </View>
  );
};

export default SubTitle;
