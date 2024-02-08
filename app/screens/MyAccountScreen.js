import { View, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import Profile from "../components/Profile";
import MenuItem from "../components/MenuItem";
import ItemSeparator from "../components/ItemSeparator";

const menuItems = [
  {
    id: 1,
    title: "My Profile",
    icon: "format-list-bulleted",
    color: "primary",
  },
  {
    id: 2,
    title: "Bank Branches",
    icon: "bank",
    color: "primary",
  },
  {
    id: 3,
    title: "Currency Exchange",
    icon: "currency-usd",
    color: "primary",
  },
  {
    id: 4,
    title: "Settings",
    icon: "account-cog-outline",
    color: "yellow",
  },
  {
    id: 5,
    title: "Log Out",
    icon: "logout",
    color: "danger",
  },
];

const MyAccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Profile title="Abdisalam Farah Abdi" subtile="0907005112" />

      <FlatList
        data={menuItems}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            icon={item.icon}
            color={item.color}
            onPress={() =>
              item.id === 2 ? navigation.navigate("messages") : null
            }
          />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors["lighter"],
  },
  flatList: {
    paddingTop: 45,
  },
});

export default MyAccountScreen;
