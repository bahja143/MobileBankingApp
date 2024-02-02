import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "./CustomText";
import colors from "../config/colors";

const Button1 = ({
  bold,
  title,
  color,
  onPress,
  height = 55,
  borderColor,
  margin = 10,
  borderWidth,
  textTransform,
  semibold = true,
  backgroundColor,
  borderRadius = 10,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height: height,
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
        bold={bold}
        semibold={semibold}
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
    color: colors["white"],
    textTransform: "uppercase",
  },
});

export default Button1;
