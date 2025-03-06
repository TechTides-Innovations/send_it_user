import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SendLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="maps" />
      <Stack.Screen name="itemdetails" />
    </Stack>
  );
};

export default SendLayout;
