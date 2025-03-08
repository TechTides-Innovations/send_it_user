import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/constants.global";

const Search = () => {
  return (
    <View
      className="flex-row flex-1  items-center bg-main justify-between p-3 rounded-xl "
      style={{
        shadowColor: colors.gray,
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name="search" size={24} color={colors.gray} />
        <TextInput
          placeholder="What you go chop today?..."
          className="font-pregular text-sm"
        />
      </View>
      <View className="border-l pl-2 border-gray">
        <Ionicons name="options" size={24} color={colors.gray} />
      </View>
    </View>
  );
};

export default Search;
