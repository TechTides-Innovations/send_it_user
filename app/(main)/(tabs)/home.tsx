import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { images } from "@/imports/images.imports";
import { currentTracking, homeOptions } from "@/data/home.data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native-virtualized-view";
import { router } from "expo-router";
import { colors } from "@/constants/constants.global";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SkeletonLoader } from "@/components";
import { CurrentTrackingType, PromosType } from "@/types/types.global";

const promos = [
  {
    id: "1",
    image: require("@/assets/promo-1.png"),
  },
  {
    id: "2",
    image: require("@/assets/promo-2.png"),
  },
  {
    id: "3",
    image: require("@/assets/promo-3.png"),
  },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleRouting = (name: string) => {
    switch (name) {
      case "Send Package":
        return router.push("/maps");
    }
  };

  const Promos: React.FC<PromosType> = ({ image }) => {
    return (
      <Image
        source={image}
        style={{ width: 280, height: 140 }}
        resizeMode="cover"
        className="rounded-lg mr-5"
      />
    );
  };

  const CurrentTracking: React.FC<CurrentTrackingType> = ({
    date,
    icon,
    id,
    name,
    number,
    status,
  }) => {
    return (
      <Pressable className="flex-row justify-between items-center border border-gray/40 rounded-xl p-4 mb-5">
        <View>
          <View className="bg-dark w-20 rounded-2xl p-2 ">
            <Text className="font-psemibold text-sm text-center  text-white">
              {status}
            </Text>
          </View>
          <Text className="font-pbold text-lg my-2">{name}</Text>
          <Text className="font-pregular text-gray mb-2">{number}</Text>
          <Text className="font-pregular text-gray mb-2">{date}</Text>
        </View>
        <View>
          <Image source={icon} resizeMode="contain" className="w-12" />
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-main">
      <StatusBar style="dark" />
      <ImageBackground
        resizeMode="cover"
        source={images.mask}
        className="w-full relative z-10 h-64 flex-row justify-end items-center"
      >
        <View className="mr-10 flex-col gap-2">
          <Text className="font-psemibold text-right text-2xl text-white">
            Seamless Shopping,
          </Text>
          <Text className="font-psemibold text-right text-2xl text-white">
            Fast Delivery
          </Text>
          <Text className="text-white font-pmedium text-right text-xs">
            Get essentials and more, delivered fast
          </Text>
        </View>

        <Image
          source={images.motor}
          className="absolute w-48 h-72 -left-16 -bottom-10"
          resizeMode="cover"
        />

        <View
          className="absolute -bottom-6 bg-main right-7 left-36 rounded-xl flex-row items-center"
          style={
            Platform.OS === "android"
              ? { elevation: 10 }
              : {
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  shadowColor: colors.gray,
                }
          }
        >
          <View
            className="flex-row items-center  px-3"
            style={{ paddingVertical: Platform.OS === "android" ? 4 : 10 }}
          >
            <Feather name="search" size={20} color={colors.gray} />
            <TextInput
              className="flex-1 text-sm ml-4 font-pmedium"
              placeholder="Search for anything"
            />
            <View>
              <Feather name="heart" size={20} color={colors.gray} />
            </View>
          </View>
        </View>
      </ImageBackground>

      <View className="flex-1 mt-5">
        <ScrollView>
          {isLoading ? (
            <View className="flex-row mt-8 mb-5 justify-between px-5">
              {[1, 2, 3, 4].map((item) => (
                <View key={item} className="items-center gap-2">
                  <SkeletonLoader width={80} height={80} radius={40} />
                  <SkeletonLoader width={60} height={12} radius={4} />
                </View>
              ))}
            </View>
          ) : (
            <View className="flex-row mt-8 mb-5 justify-between px-5">
              {homeOptions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleRouting(item.name)}
                  className="items-center gap-2"
                >
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    className="w-20 h-20"
                  />
                  <Text className="font-pmedium text-sm">{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View className="pl-5 mt-5">
            {isLoading ? (
              <>
                <SkeletonLoader width={120} height={20} radius={4} />
                <View className="flex-row mt-5">
                  {[1, 2, 3].map((item) => (
                    <SkeletonLoader
                      key={item}
                      width={280}
                      height={140}
                      radius={8}
                      style={{ marginRight: 20 }}
                    />
                  ))}
                </View>
              </>
            ) : (
              <>
                <View className="flex-row justify-between items-center">
                  <Text className="font-psemibold text-base">
                    Promos for you
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
                <FlatList
                  contentContainerStyle={{ paddingTop: 20 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={promos}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Promos id={item.id} image={item.image} />
                  )}
                />
              </>
            )}
          </View>

          <View className="px-5 mt-5">
            {isLoading ? (
              <>
                <SkeletonLoader width={140} height={20} radius={4} />
                <View className="mt-5">
                  {[1, 2, 3].map((item) => (
                    <View
                      key={item}
                      className="mb-5 p-4 border border-gray/40 rounded-xl"
                    >
                      <SkeletonLoader width={80} height={24} radius={12} />
                      <SkeletonLoader
                        width={120}
                        height={20}
                        radius={4}
                        style={{ marginVertical: 8 }}
                      />
                      <SkeletonLoader
                        width={200}
                        height={16}
                        radius={4}
                        style={{ marginBottom: 4 }}
                      />
                      <SkeletonLoader width={180} height={16} radius={4} />
                      <SkeletonLoader
                        width={48}
                        height={48}
                        radius={8}
                        style={{ alignSelf: "flex-end" }}
                      />
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <>
                <View className="flex-row justify-between items-center">
                  <Text className="font-psemibold text-base">
                    Current Tracking
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={currentTracking}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <CurrentTracking
                      id={item.id}
                      icon={item.icon}
                      date={item.date}
                      status={item.status}
                      name={item.name}
                      number={item.number}
                    />
                  )}
                />
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
