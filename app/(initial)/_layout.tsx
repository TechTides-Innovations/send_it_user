import React from "react";
import { Stack } from "expo-router";

const InitialLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="register" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="forgotpassword" />
      <Stack.Screen name="changepassword" />
    </Stack>
  );
};

export default InitialLayout;
