import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

const Button1 = ({ title, textTransform, onPress, margin = 10 }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { marginVertical: margin }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { textTransform: textTransform ? "capitalize" : "uppercase" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: colors["white"],
    textTransform: "uppercase",
    fontFamily: "Inter_400Regular",
  },
});

export default Button1;
