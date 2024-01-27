import { View, StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

import colors from "../config/colors";

import Button from "../components/Button1";
import Text from "../components/CustomText";
import Animation from "../components/Animation";

const data = [
  {
    id: 1,
    width: 150,
    height: 150,
    title: "Save Today, Smile Tomorrow",
    animation: require("../assets/animation/Savings.json"),
    text: "Start your savings journey today for a secure and prosperous tomorrow. With us, every penny you save is a step towards a brighter financial future.",
  },
  {
    id: 1,
    width: 150,
    height: 150,
    title: "Save Today, Smile Tomorrow",
    animation: require("../assets/animation/Savings.json"),
    text: "Start your savings journey today for a secure and prosperous tomorrow. With us, every penny you save is a step towards a brighter financial future.",
  },
  {
    id: 1,
    width: 150,
    height: 150,
    title: "Save Today, Smile Tomorrow",
    animation: require("../assets/animation/Savings.json"),
    text: "Start your savings journey today for a secure and prosperous tomorrow. With us, every penny you save is a step towards a brighter financial future.",
  },
  {
    id: 2,
    width: 225,
    height: 225,
    title: "Prosperity Guided by Faith",
    animation: require("../assets/animation/Growth.json"),
    text: "Grow your wealth ethically with Islamic banking. Invest with peace of mind and share profits fairly, aligned with Sharia principles.",
  },
];

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <SliderBox
        images={data}
        ImageComponent={({ source }) => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Animation
              height={source.height}
              width={source.width}
              animation={source.animation}
            />
            <Text style={styles.title} bold>
              {source.title}
            </Text>
            <Text style={styles.text} semibold>
              {source.text}
            </Text>
          </View>
        )}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 15,
          marginHorizontal: 10,
          padding: 0,
          margin: 0,
        }}
        inactiveDotColor={colors["medium"]}
        dotColor={colors["primary"]}
        circleLoop
        autoplay
        resizeMethod={"resize"}
        resizeMode={"cover"}
        imageLoadingColor={colors["primary"]}
        ImageComponentStyle={{ width: 400, height: 148 }}
        LoaderComponent={() => <View />}
      />
      <View>
        <Button
          margin={8}
          title="Next"
          color="white"
          textTransform="capitalize"
          backgroundColor="primary"
        />
        <Button
          margin={3}
          title="SKIP"
          color="black"
          backgroundColor="lighter"
          textTransform="capitalize"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 16,
    marginTop: 50,
    marginBottom: 10,
    color: colors.black,
  },
  text: {
    fontSize: 15,
    maxWidth: 340,
    lineHeight: 20,
    marginBottom: 60,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
  },
});
