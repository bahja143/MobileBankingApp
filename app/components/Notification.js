import { View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";

import Text from "./CustomText";
import colors from "../config/colors";

export default function Notification({ data, onPress }) {
  const handleTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  const handleDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) {
      return handleTime(date);
    }

    return date.toDateString();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: data.seen ? colors["lighter"] : colors["white"] },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          data.seen && { backgroundColor: colors.white },
        ]}
      >
        <FontAwesome5
          size={30}
          name="bell"
          color={data.seen ? colors.medium : colors.primary}
        />
      </View>

      <View
        style={[
          styles.iconContainer,
          { backgroundColor: data.seen ? colors.lighter : colors.secondary },
        ]}
      >
        <Octicons
          size={14}
          name="arrow-switch"
          color={data.seen ? colors.medium : colors.primary}
        />
      </View>
      <View style={styles.textMainContainer}>
        <View style={styles.textContainer}>
          <Text semibold style={styles.name} numberOfLines={1}>
            {data?.Title}
          </Text>
        </View>
        <View>
          <Text style={styles.text} semibold numberOfLines={1}>
            {data?.text}
          </Text>
          <Text style={styles.time} semibold>
            {handleDate(new Date(data.date))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 7.5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  avatar: {
    top: 7.5,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginLeft: 5,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  iconContainer: {
    top: 22.5,
    right: 25,
    width: 25,
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  textContainer: {
    flexDirection: "row",
  },
  name: {
    marginRight: 5,
    maxWidth: 188.55,
    marginBottom: 3.5,
    color: colors.black,
    fontSize: Platform.OS === "android" ? 15 : 17.5,
  },
  time: {
    top: 6,
    marginBottom: 6,
    color: colors.medium,
    fontSize: Platform.OS === "android" ? 13 : 16,
  },
  text: {
    maxWidth: 280,
    color: colors.medium,
    fontSize: Platform.OS === "android" ? 13 : 17,
  },
  textMainContainer: {
    position: "relative",
    right: 15,
  },
  notiText: {
    fontSize: Platform.OS === "android" ? 14 : 17,
  },
});
