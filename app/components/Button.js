import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default function Button({ margin = 10, title, ...props }) {
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: margin }]}
      {...props}
    >
      <Text style={styles.text} bold>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 7.5,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
  },
});
