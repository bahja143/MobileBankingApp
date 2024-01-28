import { Image, View, StyleSheet, ImageBackground } from "react-native";

import colors from "../config/colors";

import Button from "../components/Button1";
import Text from "../components/CustomText";
import Bg from "../assets/images/rose-petals.png";
import Logo from "../assets/images/splash-removebg-preview.png";

export default function WelcomeScreen() {
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <View style={styles.titleCont}>
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.title} bold>
          Welcome To Shabelle Bank
        </Text>

        <Text style={styles.subTitle} semibold>
          Bank Of Ethics
        </Text>
      </View>

      <Button
        margin={8}
        color="primary"
        title="Get Started"
        backgroundColor="white"
        textTransform="capitalize"
      />
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
  subTitle: {
    fontSize: 19,
    color: "#00ff00",
  },
  titleCont: {
    alignItems: "center",
  },
  title: {
    fontSize: 19,
    marginTop: 20,
    color: colors.white,
    textTransform: "uppercase",
  },
  logo: {
    width: 125,
    height: 90,
  },
});
