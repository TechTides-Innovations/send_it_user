import React, { useState, useEffect } from "react";
import { Keyboard, View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "@/constants/constants.global";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabLayout = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
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
            backgroundColor: "#ffffff",
            height: isKeyboardVisible ? 0 : 85,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            paddingHorizontal: 14,
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 11,
            marginBottom: 4,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#94a3b8",
          tabBarItemStyle: {
            paddingVertical: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={28}
                color={focused ? colors.primary : "#94a3b8"}
              />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "chart-box" : "chart-box-outline"}
                size={28}
                color={focused ? colors.primary : "#94a3b8"}
              />
            ),
            tabBarLabel: "Activity",
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "message-text" : "message-text-outline"}
                size={28}
                color={focused ? colors.primary : "#94a3b8"}
              />
            ),
            tabBarLabel: "Inbox",
            tabBarBadge: 3,
            tabBarBadgeStyle: {
              color: colors.main,
              backgroundColor: colors.primary,
            }, // Remove if not needed
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                size={28}
                color={focused ? colors.primary : "#94a3b8"}
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
