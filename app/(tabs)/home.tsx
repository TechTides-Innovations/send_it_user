import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React from "react";
import { images } from "../../imports/images.imports";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../constants/constants.global";
const Home = () => {
  return (
    <View className="flex-1 bg-main">
      <ImageBackground
        resizeMode="cover"
        source={images.mask}
        className="w-full relative h-72 flex-row justify-end items-center "
      >
        <View className="mr-10 flex-col gap-2">
          <Text className="font-psemibold text-right text-2xl text-white">
            Seamless Shopping,
          </Text>
          <Text className="font-psemibold text-right text-2xl text-white">
            Fast Delivery
          </Text>

          <Text className="text-white font-pregular text-right text-sm">
            Get essentials and more, delivered fast
          </Text>
        </View>
        <Image
          source={images.motor}
          className="absolute w-48 h-72 -left-16 -bottom-10"
          resizeMode="cover"
        />
        <View
          className="absolute -bottom-6 bg-main right-7 left-36 rounded-xl flex-row items-center"
          style={
            Platform.OS === "android"
              ? { elevation: 10 }
              : {
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  shadowColor: colors.gray,
                }
          }
        >
          <View className="flex-row items-center py-4 px-3">
            <Feather name="search" size={20} color={colors.gray} />
            <TextInput
              className="flex-1 text-base ml-4 font-pmedium"
              placeholder="Search for anything"
            />
            <View>
              <Feather name="heart" size={20} color={colors.gray} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
