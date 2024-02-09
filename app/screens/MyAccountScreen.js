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
  },
  {
    id: 2,
    title: "Bank Branches",
    color: "primary",
    icon: "bank",
  },
  {
    id: 3,
    title: "Currency Exchange",
    icon: "currency-usd",
    color: "primary",
  },
  {
    id: 4,
    icon: "account-cog-outline",
    title: "Settings",
    color: "primary",
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
          <MenuItem title={item.title} icon={item.icon} color={item.color} />
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
