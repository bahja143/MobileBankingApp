import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

const Profile = ({ title, subtile }) => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../assets/mosh.jpg")} /> */}
      <MaterialIcons
        size={65}
        style={styles.image}
        name="account-circle"
        color={colors["mediumBlack"]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textHeader} semibold>
          {title}
        </Text>
        <Text style={styles.subTitle} semibold>
          {subtile}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={25}
        color={colors["medium"]}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors["white"],
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 7,
    borderRadius: 35,
  },
  textHeader: {
    fontSize: 17,
    marginBottom: 3,
    color: colors.black,
  },
  subTitle: {
    fontSize: 15,
    color: colors["medium"],
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});

export default Profile;
