import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../imports/images.imports";
import { StatusBar } from "expo-status-bar";
import { colors, textSize } from "../constants/constants.global";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const onboardingData = [
  {
    key: "one",
    image: images.onboardingOne,
    title: "Discover Restaurants Nearby",
    description:
      "Explore a wide variety of local restaurants and find your favorite dishes to order anytime.",
  },
  {
    key: "two",
    image: images.onboardingTwo,
    title: "Shop Essentials Instantly",
    description:
      "Get groceries, clothing, and more from nearby stores, ready for quick delivery at your doorstep",
  },
  {
    key: "three",
    image: images.onboardingThree,
    title: "Fast, Reliable Delivery",
    description:
      "Choose quick delivery to fit your schedule, with real-time order updates.",
    lastButton: true,
  },
];

const { width } = Dimensions.get("window");

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text
        className=" text-primary text-center font-pextrabold my-8"
        style={[styles.title, textSize.threeXl]}
      >
        {item.title}
      </Text>
      <Text className="font-pregular text-lg my-2" style={[styles.description]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <React.Fragment>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          ref={flatListRef}
          style={{ flex: 1 }}
        />
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        <View className="flex-row justify-center items-center px-8 pb-10">
          <View
            className={` ${
              activeIndex === 2 ? "border-none" : " border border-primary"
            } rounded-full`}
          >
            <TouchableOpacity
              className={`bg-primary m-3 justify-center items-center  ${
                activeIndex === onboardingData.length - 1
                  ? "rounded-lg py-4 px-24"
                  : "rounded-full p-4"
              }`}
              onPress={() => {
                if (activeIndex === onboardingData.length - 1) {
                  router.replace("/login");
                } else {
                  flatListRef.current?.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                  });
                }
              }}
            >
              {activeIndex === onboardingData.length - 1 ? (
                <Text className="font-psemibold text-xl text-white">
                  Get Started!
                </Text>
              ) : (
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={25}
                  color={colors.main}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: 400,
    maxHeight: 300,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    margin: 10,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.gray,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    backgroundColor: colors.gray,
  },
});

export default Index;
