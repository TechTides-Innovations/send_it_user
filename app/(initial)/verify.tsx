import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import { Back, Button } from "../../components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors, textSize } from "@/constants/constants.global";
import { useLocalSearchParams } from "expo-router";
import { useApiRequest } from "@/hooks/useApiRequest";
import { BASE_URL } from "@/constants/constants.global";
import { OtpInput } from "react-native-otp-entry";
import AuthContext from "@/context/AuthContext";
const Verify = () => {
  const params = useLocalSearchParams();
  const { username } = params;
  const { execute, loading } = useApiRequest();
  const auth = useContext(AuthContext);

  console.log(username);
  const [otp, setOtp] = useState<string>("");

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Enter otp");
      return;
    }
    const dataToSubmit = {
      username,
      otp,
    };
    console.log(dataToSubmit);
    const { data, error } = await execute(
      `${BASE_URL}/otp/verify`,
      "POST",
      dataToSubmit
    );
    data && (await handleUserInfo(data?.accessToken));
    error && console.log(error);
  };

  const handleUserInfo = async (token: string) => {
    const { data, error } = await execute(`${BASE_URL}/user/`, "GET", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      await auth?.login(token);
      await auth?.setUser(data);
    }
    error && console.log(error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Back title="" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustContentInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={[textSize.threeXl]} className="font-pbold">
          Verify OTP
        </Text>
        <Text style={[textSize.lg, styles.text]} className="font-pregular">
          Enter the OTP sent to your phone number
        </Text>

        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          autoFocus={true}
          hideStick={true}
          placeholder=""
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          theme={{
            containerStyle: {
              marginBottom: 40,
              marginTop: 20,
            },
          }}
          focusStickBlinkingDuration={500}
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blurred")}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => setOtp(text)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
        />
        {loading && (
          <View className="w-full flex-row items-center justify-center my-5">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        <Button
          text="Verify"
          bgColor={colors.primary}
          textColor={colors.main}
          onPress={() => handleVerifyOtp()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 20,
    backgroundColor: colors.main,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 20,
  },
  text: {
    marginVertical: 10,
  },
});

export default Verify;
