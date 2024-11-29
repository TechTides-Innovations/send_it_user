import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Back from "./back";
import { colors } from "../constants/constants.global";

interface TopBarProps {
  title: string;
}

const TopBar = ({ title }: TopBarProps) => {
  return (
    <React.Fragment>
      <StatusBar style="dark" />
      <View
        className="h-60 relative"
        style={{
          elevation: 10,
        }}
      >
        <Back title={title} />
      </View>
    </React.Fragment>
  );
};

export default TopBar;
