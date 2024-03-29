import { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Profile from "../components/Profile";
import MenuItem from "../components/MenuItem";
import ItemSeparator from "../components/ItemSeparator";
import ActivityIndicator from "../components/ActivityIndicator";

import colors from "../config/colors";
import authContext from "../context/AuthContext";

const menuItems = [
  {
    id: 1,
    icon: "format-list-bulleted",
    title: "My profile",
    url: "userprofile",
    color: "primary",
  },
  {
    id: 2,
    title: "Bank branches",
    color: "primary",
    url: "branches",
    icon: "bank",
  },
  {
    id: 3,
    title: "Currency exchange",
    icon: "currency-usd",
    color: "primary",
    url: "exchange",
  },
  {
    id: 4,
    icon: "help-circle-outline",
    color: "primary",
    url: "support",
    title: "Help",
  },
  {
    id: 5,
    icon: "account-cog-outline",
    title: "Settings",
    color: "primary",
    url: "settings",
  },
  {
    id: 6,
    title: "Log Out",
    color: "danger",
    icon: "logout",
  },
];

const MyAccountScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { account, setIsAuth } = useContext(authContext);

  const handleSignOut = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuth(false);
    }, 1000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <Profile title={account.name} subtile={account.mobile} />
        <FlatList
          data={menuItems}
          style={styles.flatList}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <MenuItem
              icon={item.icon}
              title={item.title}
              color={item.color}
              onPress={() =>
                item.id !== 6 ? navigation.navigate(item.url) : handleSignOut()
              }
            />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
        />
      </View>
    </>
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
