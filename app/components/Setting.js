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
        size={22}
        name="chevron-right"
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
    marginRight: 5,
  },
  item: {
    marginBottom: 3,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  leftItem: {
    flexDirection: "row",
  },
});
