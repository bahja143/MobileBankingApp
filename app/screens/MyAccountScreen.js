import { View, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import Profile from "../components/Profile";
import MenuItem from "../components/MenuItem";
import ItemSeparator from "../components/ItemSeparator";

const menuItems = [
  {
    id: 1,
    icon: "format-list-bulleted",
    title: "My Profile",
    color: "primary",
    url: "userprofile",
  },
  {
    id: 2,
    title: "Bank Branches",
    color: "primary",
    icon: "bank",
    url: "branches",
  },
  {
    id: 3,
    title: "Currency Exchange",
    icon: "currency-usd",
    color: "primary",
    url: "exchange",
  },
  {
    id: 4,
    icon: "account-cog-outline",
    title: "Settings",
    color: "primary",
    url: "settings",
  },
  {
    id: 5,
    title: "Log Out",
    color: "danger",
    icon: "logout",
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
            icon={item.icon}
            title={item.title}
            color={item.color}
            onPress={() => item.id !== 5 && navigation.navigate(item.url)}
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
    paddingTop: 25,
    backgroundColor: colors["lighter"],
  },
  flatList: {
    paddingTop: 45,
  },
});

export default MyAccountScreen;
