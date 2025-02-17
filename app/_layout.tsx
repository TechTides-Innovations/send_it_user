import React, { useEffect, useState, useCallback } from "react";
import "../global.css";
import * as Font from "expo-font";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync(); // Prevents splash from hiding automatically

const RootLayout = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
          "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
          "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
          "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
          "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
          "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        });

        // Request location permission
        await Location.requestForegroundPermissionsAsync();

        // Everything is ready
        setAppReady(true);
      } catch (error) {
        console.warn("Error loading app resources:", error);
      }
    };

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null; // Keeps splash screen visible
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="login"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgotpassword" />
        <Stack.Screen name="changepassword" />
        <Stack.Screen
          name="(tabs)"
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack>
    </View>
  );
};

export default RootLayout;
