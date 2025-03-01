import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Back, Button, InputField } from "../../components";
import { colors, textSize } from "../../constants/constants.global";
import { packages } from "../../data/data.global";

const ItemDetails = () => {
  const [packs, setPacks] = useState(packages);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [packagePrices, setPackagePrices] = useState<{ [key: number]: number }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  // const fetchPackagePrices = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await useApiRequest("/package-prices", "GET");
  //     if (response.success) {
  //       setPackagePrices(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching prices:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchPackagePrices();
  // }, []);

  return (
    <SafeAreaView className="bg-main flex-1">
      <StatusBar style="dark" />
      <View className="flex-1">
        <View style={{ marginHorizontal: 20 }}>
          <Back title="Add Item Details" />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
        >
          <View>
            <Text style={[textSize.lg]} className="font-pmedium my-5">
              Package Size
            </Text>
            <View className="gap-6">
              {packs.map((pack) => (
                <Pressable
                  key={pack.id}
                  className={`flex-row items-center gap-4 border rounded-lg px-3 ${
                    selectedPackage === pack.id
                      ? "border-primary bg-primary/10"
                      : "border-gray"
                  }`}
                  onPress={() => setSelectedPackage(pack.id)}
                >
                  <Image
                    source={pack.image}
                    className="w-20"
                    resizeMode="contain"
                  />
                  <View className="flex-1">
                    <Text className="font-pmedium text-lg">{pack.name}</Text>
                    <Text className="text-dark/70 text-xs font-plight">
                      {pack.desc}
                    </Text>
                    {loading ? (
                      <ActivityIndicator size="small" color={colors.primary} />
                    ) : (
                      <Text className="text-primary font-psemibold">
                        GHC {packagePrices[pack.id] || "--"}
                      </Text>
                    )}
                  </View>
                </Pressable>
              ))}
              <InputField label="Package Details" />
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          shadowColor: colors.gray,
          shadowOffset: { width: 1, height: -1 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
        }}
        className="bg-main"
      >
        <View className="mb-4">
          <View className="flex-row items-center justify-center">
            <View className="w-16 h-1 bg-gray rounded-2xl"></View>
          </View>
          <View className="flex-row items-center justify-between w-full">
            <Text className="font-pregular">Package size</Text>
            <Text className="font-pregular">
              GHC{" "}
              {selectedPackage ? packagePrices[selectedPackage] || "--" : "--"}
            </Text>
          </View>
          <View className="flex-row items-center justify-between w-full my-1">
            <Text className="font-pregular">Distance Fare</Text>
            <Text className="font-pregular">GHC --</Text>
          </View>
          <View className="flex-row items-center justify-between w-full">
            <Text className="font-pregular">Total</Text>
            <Text className="font-psemibold">
              GHC {selectedPackage ? packagePrices[selectedPackage] || 0 : "--"}
            </Text>
          </View>
        </View>
        <Button
          text="Continue"
          bgColor={colors.primary}
          textColor={colors.main}
          disabled={!selectedPackage}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemDetails;
