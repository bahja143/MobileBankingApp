import Lottie from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import MyQRCodeScreen from "../screens/MyQRCodeScreen";
import TransferScreen from "../screens/TransferScreen";
import BranchesScreen from "../screens/BranchesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import ExchangeNavigation from "../navigation/ExchangeNav";
import UserProfileScreen from "../screens/UserProfileScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import QRCodeScannerScreen from "../screens/QRCodeScannerScreen";
import BeneficiariesScreen from "../screens/BeneficiariesScreen";
import TransferDetailScreen from "../screens/TransferDetailScreen";

import colors from "../config/colors";
import qrCodeAnimation from "../assets/animation/QRCode.json";

const MainNavigation = ({ navigation }) => {
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
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      height={60}
      circleWidth={60}
      bgColor={colors.primary}
      style={styles.bottomBar}
      initialRouteName="qrcode"
      shadowStyle={styles.shawdow}
      screenOptions={{ headerShown: false }}
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("qrcodeScanner")}
          >
            <Lottie
              loop
              autoPlay
              style={styles.lotify}
              source={qrCodeAnimation}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="Home"
        position="LEFT"
        component={() => <DashboardScreen navigation={navigation} />}
      />
      <CurvedBottomBarExpo.Screen
        name="Account"
        component={() => <MyAccountScreen />}
        position="RIGHT"
        options={{
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
  );
};

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="MainNavigation" component={MainNavigation} />
    <HomeStack.Screen name="myqr" component={MyQRCodeScreen} />
    <HomeStack.Screen name="transfer" component={TransferScreen} />
    <HomeStack.Screen name="qrcode" component={QRCodeScannerScreen} />
    <HomeStack.Screen name="history" component={TransactionsScreen} />
    <HomeStack.Screen name="userprofile" component={UserProfileScreen} />
    <HomeStack.Screen name="beneficiaries" component={BeneficiariesScreen} />
    <HomeStack.Screen name="notifications" component={NotificationsScreen} />
  </HomeStack.Navigator>
);

export default function HomeNavigation() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lotify: {
    width: 40,
    height: 40,
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
