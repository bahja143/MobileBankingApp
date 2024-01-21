import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ExchangeRateScreen from "../screens/ExchangeRateScreen";
import ExchangeCalculatorScreen from "../screens/ExchangeCalculatorScreen";

import colors from "../config/colors";
import Text from "../components/CustomText";

const Tab = createMaterialTopTabNavigator();

const TabNav = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: {
        height: "100%",
        backgroundColor: colors.primary,
      },
      tabBarStyle: styles.topNavCont,
      tabBarLabelStyle: styles.topNavLabel,
      tabBarActiveTintColor: colors.white,
      tabBarShowLabel: { color: colors.white },
    }}
  >
    <Tab.Screen options={{}} name="Currency" component={ExchangeRateScreen} />
    <Tab.Screen name="Calculator" component={ExchangeCalculatorScreen} />
  </Tab.Navigator>
);

export default function ExchangeNav() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.titleNav} semibold>
            Exchange Rate
          </Text>
        </View>
        <View style={styles.body}>
          <TabNav />
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  topNavLabel: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: "Inter_500Medium",
  },
  topNavCont: {
    elevation: 0,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  body: {
    width: "100%",
    paddingTop: 25,
    height: "100%",
    paddingHorizontal: 5,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.lighter,
  },
  titleNav: {
    fontSize: 17,
    textAlign: "center",
    color: colors.white,
  },
  navIconCont: {
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 2,
    backgroundColor: colors.white,
  },
  navCont: {
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});
