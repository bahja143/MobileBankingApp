import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const MenuItem = ({ icon, title, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={[styles.iconContainer, { backgroundColor: colors[color] }]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={colors["white"]}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons
          size={25}
          name="chevron-right"
          color={colors["medium"]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors["white"],
  },
  iconContainer: {
    width: 43,
    height: 43,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["primary"],
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default MenuItem;
