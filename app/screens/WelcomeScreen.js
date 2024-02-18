import { Image, View, StyleSheet, ImageBackground } from "react-native";

import Bg from "../assets/images/rose-petals.png";
import Logo from "../assets/images/splash-removebg-preview.png";

import colors from "../config/colors";
import Button from "../components/Button1";
import Text from "../components/CustomText";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <View style={styles.titleCont}>
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.title} bold>
          Welcome to Shabelle Bank
        </Text>
        {/* <Text style={styles.subTitle} semibold>
          Bank Of Ethics
        </Text> */}
      </View>

      <View style={styles.btnContainer}>
        <Button
          margin={6}
          color="primary"
          title="Sign in"
          backgroundColor="white"
          textTransform="capitalize"
          onPress={() =>
            navigation.navigate("normalPassword", { initial: true })
          }
        />

        <Button
          margin={6}
          color="white"
          borderWidth={1.5}
          borderRadius={10}
          textTransform="none"
          title="I'm new to the app"
          borderColor={colors.white}
          backgroundColor="transparent"
          onPress={() => navigation.navigate("signUp")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  btnContainer: {
    width: "100%",
  },
  subTitle: {
    fontSize: 18,
    color: "#00ff00",
  },
  titleCont: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 13,
    color: colors.white,
  },
  logo: {
    height: 90,
    width: 125,
  },
});
