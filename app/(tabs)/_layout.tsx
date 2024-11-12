import React, { useState, useEffect } from "react";
import { Keyboard, View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "../../constants/constants.global";
import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

const TabLayout = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={
        isKeyboardVisible ? styles.containerWithKeyboard : styles.container
      }
    >
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.main,
            height: isKeyboardVisible ? 0 : 75,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: isKeyboardVisible ? 0 : 15,
            display: isKeyboardVisible ? "none" : "flex",
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 12,
            marginTop: -5,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={22}
                color={focused ? colors.primary : colors.gray}
              />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="activity"
                size={22}
                color={focused ? colors.primary : colors.gray}
              />
            ),
            tabBarLabel: "Activity",
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="chatbox-outline"
                size={22}
                color={focused ? colors.primary : colors.gray}
              />
            ),
            tabBarLabel: "Inbox",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={22}
                color={focused ? colors.primary : colors.gray}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWithKeyboard: {
    flex: 1,
    paddingBottom: 0,
  },
});

export default TabLayout;
