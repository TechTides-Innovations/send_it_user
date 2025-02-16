import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Mask } from "../../components";
import Foundation from "@expo/vector-icons/Foundation";
import { Feather } from "@expo/vector-icons";
import { colors, textSize } from "../../constants/constants.global";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { savedPlaces } from "../../data/data.global";

const SendPackage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [focusedInput, setFocusedInput] = useState<
    "pickup" | "destination" | null
  >(null);

  const handleOpen = (input: "pickup" | "destination") => {
    setFocusedInput(input);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Mask title="Send Package" />
      <View className="flex-1 bg-main relative">
        {/* Box Shadow View */}
        <View
          className="absolute bg-main z-10 -top-10 w-[90%] p-5 gap-5 rounded-xl"
          style={styles.shadow}
        >
          {/* Pickup Location */}
          <View>
            <View className="flex-row items-center justify-start gap-2">
              <Foundation name="target-two" size={20} color="blue" />
              <Text className="font-pregular">Pickup Location</Text>
            </View>
            <View className="flex-row items-center justify-between gap-5">
              <TextInput
                placeholder="Enter pickup"
                editable={false}
                value={pickupLocation}
                className="font-pregular text-base p-3 flex-1 border border-gray mt-2 rounded-lg"
              />
              <Feather
                onPress={() => handleOpen("pickup")}
                name="edit"
                size={20}
                color={colors.gray}
              />
            </View>
          </View>

          {/* Destination */}
          <View>
            <View className="flex-row items-center justify-start gap-2">
              <Foundation name="target-two" size={20} color="red" />
              <Text className="font-pregular">Destination</Text>
            </View>
            <View className="flex-row items-center justify-between gap-5">
              <TextInput
                editable={false}
                placeholder="Enter destination"
                value={destination}
                className="font-pregular text-base p-3 flex-1 border border-gray mt-2 rounded-lg"
              />
              <Feather
                onPress={() => handleOpen("destination")}
                name="edit"
                size={20}
                color={colors.gray}
              />
            </View>
          </View>
        </View>

        {/* Saved Addresses */}
        <View className="mt-56 mx-6">
          <Text className="font-pmedium" style={[textSize.lg]}>
            Saved address
          </Text>
          <View className="my-5 gap-8">
            {savedPlaces.map((item) => (
              <Pressable
                className="w-full flex-row gap-4 items-center"
                key={item.id}
              >
                <View className="w-fit bg-gray/20 p-3 rounded-full">
                  <Image
                    source={item.icon}
                    resizeMode="cover"
                    className="w-8 h-8"
                  />
                </View>
                <View>
                  <Text style={[textSize.xl]} className="font-pmedium">
                    {item.name}
                  </Text>
                  <Text className="font-pregular text-gray">
                    {item.location}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: "center",
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  textInput: {
    width: "100%",
    padding: 12,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
  },
});

export default SendPackage;
