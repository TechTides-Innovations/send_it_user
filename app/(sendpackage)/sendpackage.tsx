import { View, Text, TextInput } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { InputField, Mask } from "../../components";
import Foundation from "@expo/vector-icons/Foundation";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/constants.global";
import { router } from "expo-router";

const SendPackage = () => {
  return (
    <React.Fragment>
      <StatusBar style="dark" />
      <Mask title="Send Package" />
      <View className="flex-1 bg-main relative">
        {/* view with box shadow */}
        <View
          className="absolute bg-main z-10 -top-10 w-[90%] p-5 gap-5 rounded-xl "
          style={{
            shadowColor: "gray",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            alignSelf: "center",
          }}
        >
          <View>
            <View className="flex-row items-center justify-start gap-2">
              <Foundation name="target-two" size={20} color="blue" />
              <Text className="font-pregular">Pickup Location</Text>
            </View>
            <View className="flex-row items-center justify-between gap-5">
              <TextInput
                placeholder="Enter pickup"
                className="font-pregular text-base p-3 flex-1 border border-gray mt-2 rounded-lg"
              />
              <Feather
                onPress={() => router.push("/(sendpackage)/maps")}
                name="edit"
                size={20}
                color={colors.gray}
              />
            </View>
          </View>
          {/* destination */}
          <View>
            <View className="flex-row items-center justify-start gap-2">
              <Foundation name="target-two" size={20} color="red" />
              <Text className="font-pregular">Destination</Text>
            </View>
            <View className="flex-row items-center justify-between gap-5">
              <TextInput
                placeholder="Enter destination"
                className="font-pregular text-base p-3 flex-1 border border-gray mt-2 rounded-lg"
              />
              <Feather name="edit" size={20} color={colors.gray} />
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default SendPackage;
