import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Entypo,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default BranchItem = ({ item, onCall, onPress }) => {
  return (
    <TouchableOpacity disabled style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          size={30}
          name="bank-outline"
          color={colors["primary"]}
        />
      </View>

      <View style={styles.textContainer}>
        <Text semibold style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.subCont}>
          <TouchableOpacity onPress={onCall} style={styles.subCont}>
            <Entypo
              name="mobile"
              size={15}
              color={colors.primary}
              style={{ top: 1 }}
            />

            <Text style={[styles.subText, { right: 1 }]} numberOfLines={1}>
              {item.phone}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPress} style={styles.subCont}>
            <Feather name="map-pin" size={15} color={colors.primary} />

            <Text style={styles.subText} numberOfLines={1}>
              Show map
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomCont}>
          <View style={styles.bottom}>
            <MaterialIcons name="access-time" size={14} color={colors.danger} />

            <Text style={styles.bottomText} numberOfLines={1}>
              Open until <Text semibold>5:30 pm</Text>
            </Text>
          </View>

          {item.distance && (
            <View style={styles.bottom}>
              <MaterialCommunityIcons
                size={14}
                color={colors.danger}
                name="map-marker-distance"
              />

              <Text style={styles.bottomText} numberOfLines={1}>
                <Text semibold>{parseFloat(item.distance).toFixed(1)}KM</Text>{" "}
                away
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 47,
    height: 47,
    marginRight: 3,
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  bottomCont: {
    top: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 12,
    marginLeft: 2.75,
    color: colors["medium"],
  },
  bottom: {
    marginTop: 13,
    marginRight: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
  },
  subCont: {
    marginRight: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    borderWidth: 1.2,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: 10,
    borderColor: colors.light,
    backgroundColor: colors["white"],
  },
  textContainer: {
    paddingLeft: 5,
  },
  title: {
    width: 275,
    fontSize: 15,
    marginBottom: 4,
    color: colors["lightBlack"],
    textTransform: "capitalize",
  },
  subText: {
    fontSize: 13,
    marginLeft: 3,
    marginTop: 2.5,
    color: colors["medium"],
  },
});
