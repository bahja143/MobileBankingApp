import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
