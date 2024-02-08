import { Alert, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";

import DashboardScreen from "../screens/DashboardScreen";
import MyAccountScreen from "../screens/MyAccountScreen";

import colors from "../config/colors";

export default function App() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = "home-variant";
        break;
      case "Account":
        icon = "account-settings";
        break;
    }

    return (
      <MaterialCommunityIcons
        size={routeName === selectedTab ? 29 : 29}
        name={routeName === selectedTab ? icon : icon + "-outline"}
        color={routeName === selectedTab ? colors.white : colors.light}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.white, elevation: 25 },
        }}
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={57}
        circleWidth={57}
        bgColor={colors.primary}
        initialRouteName="qrcode"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("Click Action")}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                color={colors.white}
                size={29}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="Home"
          position="LEFT"
          component={() => <DashboardScreen />}
        />
        <CurvedBottomBarExpo.Screen
          name="Account"
          component={() => <MyAccountScreen />}
          position="RIGHT"
          options={{
            tabBarItemStyle: { marginVertical: 2 },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <MaterialCommunityIcons
                  size={size}
                  name="account"
                  color={color}
                />
              ) : (
                <MaterialCommunityIcons
                  size={size}
                  color={color}
                  name="account-outline"
                />
              ),
          }}
        />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
});
