import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Text from "../components/CustomText";
import colors from "../config/colors";

const PickerItem = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.dot} />
        <Text style={styles.text} medium>
          {item.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.medium,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  text: {
    fontSize: 17.5,
    color: colors["medium"],
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignSelf: "center",
    marginRight: 7.5,
  },
});

export default PickerItem;
