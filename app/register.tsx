import { View, Text, Dimensions, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, textSize } from "../constants/constants.global";
import * as Components from "../components";
import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Register = () => {
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
      <Components.Back />
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
        <Components.Header title="Hello" subTitle="there!" />
        <Components.SubTitle
          title="Create an account to access your package history and get real-time updates on all your partners"
          color={colors.gray}
        />
        <Components.InputField
          placeHolder="Enter email/phone number"
          item={<Feather name="mail" size={24} color="black" />}
        />
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

        <View style={{ marginVertical: 20 }}>
          <Components.Button
            bgColor={colors.primary}
            text="Sign Up"
            textColor={colors.main}
            onPress={() => console.log("Hello")}
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
            <Text style={[textSize.lg]} className="font-psemibold">
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
          <Text className="font-pregular">Already have an account?</Text>
          <Link
            href="/login"
            className="font-psemibold"
            style={[{ color: colors.primary }]}
          >
            Sign in
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
