import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { images } from "@/imports/images.imports";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors, textSize } from "@/constants/constants.global";
import { profileMenu } from "@/data/profile.data";
import { router } from "expo-router";
import AuthContext from "@/context/AuthContext";

const Profile = () => {
  const auth = useContext(AuthContext);
  const handleProfileNavigation = (name: string) => {
    switch (name) {
      case "Account Settings":
        return router.push("/accountsettings");
      case "Logout":
        return auth?.logout();
    }
  };
  console.log(auth?.user);
  return (
    <React.Fragment>
      <StatusBar style="dark" />
      <View className="flex-1 bg-main">
        <ImageBackground
          source={images.mask}
          resizeMode="cover"
          className="w-full h-48 relative z-10 "
          style={{ paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between h-full mt-5">
            <View className="flex-row items-center gap-2">
              <Text style={textSize.xl} className="font-pmedium text-white">
                Hi , {`${auth?.user?.username}`}
              </Text>
              <Ionicons name="pencil" size={20} color={colors.main} />
            </View>
            <View>
              <Image
                source={images.araba}
                resizeMode="cover"
                className="w-16 h-16 rounded-full relative"
              />
              <Ionicons
                className="absolute -bottom-2 -right-1"
                name="camera"
                size={24}
                color={colors.main}
              />
            </View>
          </View>
        </ImageBackground>
        {/* main section */}

        <View
          style={{ marginHorizontal: 20, marginTop: 20 }}
          className="flex-1"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets
            automaticallyAdjustContentInsets
            keyboardShouldPersistTaps="handled"
          >
            <Text className="font-psemibold text-xl">Profile Settings</Text>
            <View style={{ gap: 10, marginTop: 10 }}>
              {profileMenu &&
                profileMenu.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleProfileNavigation(item.name)}
                    key={item.id}
                    className="border-b pt-5 pb-7 flex-row items-center justify-between"
                  >
                    <Text className="font-pregular text-lg text-gray">
                      {item.name}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color={colors.gray}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Profile;
