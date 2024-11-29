import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const SendLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sendpackage" />
      <Stack.Screen name="maps" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default SendLayout;
