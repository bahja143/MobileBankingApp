import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";

import Text from "./CustomText";
import colors from "../config/colors";

export default function Setting({ label, icon }) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.leftItem}>
        {icon}
        <Text semibold style={styles.itemTitle}>
          {label}
        </Text>
      </View>
      <Octicons
        style={styles.chevronIcon}
        name="chevron-right"
        size={22}
        color={colors.medium}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 15,
    marginLeft: 7.5,
    color: colors.medium,
  },
  chevronIcon: {
    marginRight: 3,
  },
  item: {
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12.5,
    paddingHorizontal: 12.5,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  leftItem: {
    flexDirection: "row",
  },
});
