import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "./CustomText";
import colors from "../config/colors";

const Button1 = ({
  title,
  color,
  onPress,
  margin = 10,
  textTransform,
  borderColor,
  borderRadius = 10,
  borderWidth,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginVertical: margin,
          backgroundColor: backgroundColor
            ? colors[backgroundColor]
            : colors.primary,
          borderColor: borderColor,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          {
            textTransform: textTransform ? textTransform : "uppercase",
            color: color ? colors[color] : colors.white,
          },
        ]}
        semibold
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
    fontSize: 16.5,
    color: colors["white"],
    textTransform: "uppercase",
  },
});

export default Button1;
