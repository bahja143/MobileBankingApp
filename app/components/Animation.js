import { StyleSheet, View } from "react-native";
import Lotty from "lottie-react-native";

import colors from "../config/colors";

const Animation = ({ animation, height, width }) => {
  if (!animation) return;

  return (
    <View style={styles.container}>
      <Lotty
        style={{ width: width, height: height }}
        source={animation}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});

export default Animation;
