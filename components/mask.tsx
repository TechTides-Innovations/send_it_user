import { ImageBackground, View, Text, Image } from "react-native";
import React from "react";
import { images } from "../imports/images.imports";
import Search from "./search";
import Back from "./back";

interface MaskProps {
  arrowColor: string;
}

const Mask = ({ arrowColor }: MaskProps) => {
  return (
    <ImageBackground
      source={images.mask}
      resizeMode="cover"
      className="w-full justify-center relative"
      style={{ height: 150, paddingHorizontal: 20 }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Back color={arrowColor} />
          <View>
            <Text className="font-pregular text-white text-lg">Deliver To</Text>
            <Text className="font-psemibold text-white text-sm">
              The Mega Church Agbogba &#9660;
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Image
            source={require("@/assets/bitcoin-icons_cart-outline.png")}
            style={{ width: 30, height: 30 }}
          />
          <Image
            source={require("@/assets/lets-icons_paper-light.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </View>

      <View
        className="absolute z-50 w-full -bottom-6"
        style={{ alignSelf: "center" }}
      >
        <Search />
      </View>
    </ImageBackground>
  );
};

export default Mask;
