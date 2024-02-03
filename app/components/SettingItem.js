import { View, StyleSheet } from "react-native";
import CustomSwitch from "react-native-custom-switch-new";

import Text from "./CustomText";
import colors from "../config/colors";

export default function SettingItem({ label, value, name, icon, onChange }) {
  const handleOnSwitch = () => {
    onChange(name, true);
  };

  const handleOnSwitchReverse = () => {
    onChange(name, false);
  };

  return (
    <View style={styles.item}>
      <View style={styles.leftItem}>
        {icon}
        <Text style={styles.itemTitle} semibold>
          {label}
        </Text>
      </View>
      <CustomSwitch
        buttonWidth={21}
        switchWidth={49}
        startOnLeft={value}
        buttonPadding={3.15}
        onSwitch={handleOnSwitch}
        buttonColor={colors.white}
        onSwitchReverse={handleOnSwitchReverse}
        onSwitchBackgroundColor={colors.primary}
        switchBackgroundColor={colors.mediumBlack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 15.5,
    marginLeft: 7.5,
    color: colors.medium,
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
