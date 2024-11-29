import { View, Text } from "react-native";
import React from "react";
import { TopBar } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountSettings = () => {
  return (
    <React.Fragment>
      <SafeAreaView
        className="flex-1 bg-main"
        style={{ paddingHorizontal: 20 }}
      >
        <TopBar title="Account Settings" />
      </SafeAreaView>
    </React.Fragment>
  );
};

export default AccountSettings;
