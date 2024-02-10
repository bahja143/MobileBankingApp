import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default function Button({
  title,
  disabled,
  margin = 10,
  textTransform,
  ...props
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        {
          marginTop: margin,
          backgroundColor: disabled ? colors.medium : colors.primary,
        },
      ]}
      {...props}
    >
      <Text style={[styles.text, { textTransform: textTransform }]} bold>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 7.5,
    paddingVertical: 17,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 15,
    color: colors.white,
    textTransform: "uppercase",
  },
});
