import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

const PickerItem = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesome
            size={20}
            name="bank"
            style={styles.icon}
            color={colors.primary}
          />
        </View>
        <Text style={styles.text} semibold>
          {item.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 10,
    flexDirection: "row",
    marginHorizontal: 10,
    paddingHorizontal: 7.5,
    alignContent: "center",
    backgroundColor: colors.white,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 5,
    marginRight: 7.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  text: {
    fontSize: 15.5,
    alignSelf: "center",
    color: colors["black"],
  },
});

export default PickerItem;
