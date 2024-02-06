import { Switch, View, StyleSheet } from "react-native";

import Text from "./CustomText";
import colors from "../config/colors";

export default function SettingItem({ icon, name, label, value, onChange }) {
  const handleOnChange = (value) => {
    onChange(name, value);
  };

  return (
    <View style={styles.item}>
      <View style={styles.leftItem}>
        {icon}
        <Text semibold style={styles.itemTitle}>
          {label}
        </Text>
      </View>
      <Switch
        value={value}
        checked={value}
        style={styles.switch}
        thumbColor={colors.white}
        onValueChange={handleOnChange}
        trackColor={{ false: colors.mediumBlack, true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
  },
  itemTitle: {
    width: 260,
    fontSize: 15,
    marginLeft: 7.5,
    color: colors.medium,
  },
  item: {
    marginBottom: 3,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
