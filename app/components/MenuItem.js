import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./CustomText";
import colors from "../config/colors";

const MenuItem = ({ icon, title, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors["secondary"] },
          ]}
        >
          <MaterialCommunityIcons name={icon} size={25} color={colors[color]} />
        </View>
        <Text style={styles.title} semibold>
          {title}
        </Text>
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
    height: 65,
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
    fontSize: 15,
    marginLeft: 10,
    color: colors.black,
  },
});

export default MenuItem;
