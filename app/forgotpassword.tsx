import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, textSize } from "../constants/constants.global";
import { StatusBar } from "expo-status-bar";
import * as Components from "../components";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

const ForgotPassword = () => {
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
          <Components.Back title="Forgot password" />
          <Components.SubTitle
            title="Don't worry! we got you covered. Please enter select password recovery methods below"
            color={colors.gray}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.gray,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color="black"
            />
            <View>
              <Text className="font-pregular" style={[{ color: colors.gray }]}>
                Via sms
              </Text>
              <Text className="font-pbold" style={[textSize.xl]}>
                +233204058384
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.gray,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: colors.primary,
            }}
          >
            <Feather name="mail" size={28} color="white" />
            <View>
              <Text className="font-pregular" style={[{ color: colors.main }]}>
                Via email
              </Text>
              <Text
                className="font-pbold"
                style={[textSize.xl, { color: colors.main }]}
              >
                okantey195@gmail.com
              </Text>
            </View>
          </View>
        </View>
        <Components.Button
          text="Continue"
          bgColor={colors.primary}
          textColor={colors.main}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
