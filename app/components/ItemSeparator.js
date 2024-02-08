import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

const ItemSeparator = ({ height = 2 }) => {
  return <View style={[styles.container, { height: height }]}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["light"],
    width: "100%",
    height: 3,
  },
});

export default ItemSeparator;
