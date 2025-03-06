import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/constants.global";
import { StatusBar } from "expo-status-bar";
import * as Components from "@/components";
import { Feather, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const ChangePassword = () => {
  const isTablet = Dimensions.get("window").width >= 768;
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.main,
        flex: 1,
        display: "flex",
        width: isTablet ? "70%" : "100%",
        paddingHorizontal: isTablet ? "auto" : 20,
      }}
    >
      <StatusBar style="dark" backgroundColor={colors.main} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <View>
          <Components.Back title="Change Password" />

          <Components.InputField
            placeHolder="Create password"
            icon={<Entypo name="eye-with-line" size={24} color="black" />}
            item={<Feather name="lock" size={24} color="black" />}
          />
          <Components.InputField
            placeHolder="Re-Type password"
            icon={<Entypo name="eye-with-line" size={24} color="black" />}
            item={<Feather name="lock" size={24} color="black" />}
          />
        </View>
        <Components.Button
          text="Change Password"
          bgColor={colors.primary}
          textColor={colors.main}
          onPress={() => router.replace("/login")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
