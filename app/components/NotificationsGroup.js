import { View, StyleSheet, FlatList } from "react-native";

import color from "../config/color";

import Text from "../components/CustomText";
import Notification from "./Notification";

export default function NotificationsGroup({ data, navigation }) {
  const handleDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) {
      return "New";
    }

    return "Earlier";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} title>
        {handleDate(new Date(data.date))}
      </Text>
      <FlatList
        data={data.notifications}
        keyExtractor={(d) => d.id.toString()}
        renderItem={({ item }) => (
          <Notification
            data={item}
            onPress={() => navigation.navigate("postdetail")}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  title: {
    marginLeft: 15,
    fontSize: 16,
    marginTop: 7,
  },
});
