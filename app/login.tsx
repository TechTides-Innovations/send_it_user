import { View, Text, Dimensions, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, textSize } from "../constants/constants.global";
import * as Components from "../components";
import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Login = () => {
  const router = useRouter();
  const isTablet = Dimensions.get("window").width >= 768;
  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        flex: 1,
        width: isTablet ? "70%" : "100%",
        paddingHorizontal: isTablet ? "auto" : 20,
        backgroundColor: colors.main,
        alignSelf: "center",
      }}
    >
      <StatusBar style="dark" backgroundColor={colors.main} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Components.Header title="Welcome" subTitle="back!" />
        <Components.SubTitle
          title="Please login into your account in order to proceed with your scan"
          color={colors.gray}
        />
        <Components.InputField
          placeHolder="Enter email/phone number"
          item={<Feather name="mail" size={24} color="black" />}
        />
        <Components.InputField
          placeHolder="Enter password"
          item={<Feather name="lock" size={24} color="black" />}
          icon={<Entypo name="eye-with-line" size={24} color="black" />}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginVertical: 10,
          }}
        >
          <Link
            href={"/forgotpassword"}
            className="font-psemibold"
            style={[{ textDecorationLine: "underline", color: colors.primary }]}
          >
            Forgot Password?
          </Link>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Components.Button
            bgColor={colors.primary}
            text="Sign In"
            onPress={() => router.replace("/(tabs)/home")}
            textColor={colors.main}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text className="font-pbold">Or</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1.5,
            paddingVertical: 10,
            marginVertical: 10,
            borderRadius: 16,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <AntDesign name="google" size={30} color="black" />
            <Text className="font-psemibold" style={[textSize.lg]}>
              Continue With Google
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginVertical: 5,
          }}
        >
          <Text className="font-pregular">Don't have an account?</Text>
          <Link
            href="/register"
            className="font-psemibold"
            style={[{ color: colors.primary }]}
          >
            Create new account.
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
