import React from "react";
import { StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors["danger"],
    position: "relative",
    marginLeft: 4,
    fontSize: 12.5,
    top: -5,
  },
});

export default ErrorMessage;
