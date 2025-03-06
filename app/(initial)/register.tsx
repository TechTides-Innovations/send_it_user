import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL, colors, textSize } from "@/constants/constants.global";
import * as Components from "@/components";
import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useEffect, useState } from "react";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "./login";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

interface FormData {
  firstName: "";
  lastName: "";
  email: "";
  phone: "";
  password: "";
  role: "customer";
}

const Register = () => {
  const { execute, loading } = useApiRequest();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });
  const [secure, setSecure] = useState<boolean>(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    scopes: ["profile", "email"],
  });
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleResponse = async () => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;
      token && (await handleUserInfo(token));
    }
  };

  const handleUserInfo = async (token: string) => {
    const { data, error } = await execute(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      "GET",
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data && console.log(data);
    error && console.log(error);
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    )
      return Alert.alert("Please fill all fields");
    const { data, error } = await execute(`${BASE_URL}/register/`, "POST", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone_number: formData.phone,
      role: formData.role,
    });
    console.log(data);
    data &&
      router.push({
        pathname: "/verify",
        params: {
          username: data.username,
        },
      });
    error && console.log(error);
  };

  useEffect(() => {
    handleGoogleResponse();
  }, [response]);
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
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="font-pbold text-3xl mt-5 text-primary">
          Create new Account.
        </Text>
        <Components.InputField
          placeHolder="Enter First Name"
          value={formData.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          item={<Feather name="user" size={24} color="black" />}
        />
        <Components.InputField
          placeHolder="Enter Last Name"
          value={formData.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          item={<Feather name="user" size={24} color="black" />}
        />
        <Components.InputField
          placeHolder="Enter phone number"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          item={<Feather name="phone" size={24} color="black" />}
        />
        <Components.InputField
          placeHolder="Enter Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          item={<Feather name="mail" size={24} color="black" />}
        />
        <Components.InputField
          placeHolder="Create password"
          value={formData.password}
          secureText={secure}
          onChangeText={(text) => handleChange("password", text)}
          icon={
            <Entypo
              name={secure ? "eye-with-line" : "eye"}
              size={24}
              color="black"
              onPress={() => setSecure(!secure)}
            />
          }
          item={<Feather name="lock" size={24} color="black" />}
        />

        <View style={{ marginVertical: 20 }}>
          <Components.Button
            bgColor={colors.primary}
            text="Sign Up"
            textColor={colors.main}
            loading={loading}
            onPress={() => handleSubmit()}
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
            onPress={() => promptAsync()}
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
