import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { images } from "../imports/images.imports";
import Back from "./back";
import { colors } from "../constants/constants.global";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface MaskProps {
  title: string;
}

const Mask = ({ title }: MaskProps) => {
  return (
    <ImageBackground
      source={images.mask}
      resizeMode="cover"
      className="w-full justify-center"
      style={{ height: 140, paddingHorizontal: 20 }}
    >
      <View className="mt-4 flex-row justify-between">
        <Back title={title} color={colors.main} />
        <FontAwesome name="bookmark" size={22} color={colors.main} />
      </View>
    </ImageBackground>
  );
};

export default Mask;
