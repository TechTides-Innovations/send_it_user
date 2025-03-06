import React, { useEffect, useState, useCallback } from "react";
import "../global.css";
import * as Font from "expo-font";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { Slot, Stack } from "expo-router";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
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
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          setAppReady(true);
        } else {
          setAppReady(false);
        }
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
    return null;
  }

  return (
    <AuthProvider>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Slot />
      </View>
    </AuthProvider>
  );
};

export default RootLayout;
