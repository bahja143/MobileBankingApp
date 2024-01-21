import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default function ExchangeCalculatorScreen() {
  return (
    <View style={styles.container}>
      <Text>Calculator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
});
