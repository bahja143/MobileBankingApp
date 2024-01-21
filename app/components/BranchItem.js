import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default BranchItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Entypo name="location" size={30} color={colors["primary"]} />
      </View>
      <View style={styles.textContainer}>
        <Text semibold style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text semibold style={styles.subText} numberOfLines={1}>
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors["white"],
  },
  textContainer: {
    paddingLeft: 5,
  },
  title: {
    width: 275,
    fontSize: 15,
    marginBottom: 3,
    color: colors["lightBlack"],
    textTransform: "capitalize",
  },
  subText: {
    width: 250,
    color: colors["medium"],
  },
});
