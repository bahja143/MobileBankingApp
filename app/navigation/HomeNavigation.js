import { useContext } from "react";
import Lottie from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

import SignUpScreen from "../screens/SignUpScreen";
import ExchangeNav from "../navigation/ExchangeNav";
import ReceiptScreen from "../screens/ReceiptScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyQRCodeScreen from "../screens/MyQRCodeScreen";
import TransferScreen from "../screens/TransferScreen";
import BranchesScreen from "../screens/BranchesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PinSignInScreen from "../screens/PinSignInScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import ChangePinScreen from "../screens/ChangePinScreen";
import CreatePinScreen from "../screens/CreatePinScreen";
import BeneficiaryScreen from "../screens/BeneficiaryScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import VerificationScreen from "../screens/VerificationScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import UpdateNextKinScreen from "../screens/UpdateNextKinScreen";
import UpdateAddressScreen from "../screens/UpdateAddressScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import QRCodeScannerScreen from "../screens/QRCodeScannerScreen";
import BeneficiariesScreen from "../screens/BeneficiariesScreen";
import BranchLocationScreen from "../screens/BranchLocationScreen";
import PasswordSignInScreen from "../screens/PasswordSignInScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import TransferDetailScreen from "../screens/TransferDetailScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";
import CustomerSupportScreen from "../screens/CustomerSupportScreen";
import UpdateBasicInfoScreen from "../screens/UpdateBasicInfoScreen";
import ForgotCredentialScreen from "../screens/ForgotCredentialScreen";
import UpdateContactInfoScreen from "../screens/UpdateContactInfoScreen";
import AlertCustomizationScreen from "../screens/AlertCustomizationScreen";

import colors from "../config/colors";
import authContext from "../context/AuthContext";
import themeNavigation from "../config/themeNavigation";
import qrCodeAnimation from "../assets/animation/QRCode.json";

const MainNavigation = ({ route, navigation }) => {
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
            onPress={() => navigate("qrcode")}
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
        component={({ route }) => (
          <DashboardScreen route={route} navigation={navigation} />
        )}
      />
      <CurvedBottomBarExpo.Screen
        name="Account"
        component={({ route }) => (
          <MyAccountScreen route={route} navigation={navigation} />
        )}
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
const HomeStackNavigator = () => {
  const { isAuth, user } = useContext(authContext);

  return !isAuth ? (
    user.type === "password" ? (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen
          name="normalPassword"
          component={PasswordSignInScreen}
        />
        <HomeStack.Screen name="signUp" component={SignUpScreen} />
        <HomeStack.Screen name="exchange" component={ExchangeNav} />
        <HomeStack.Screen name="welcome" component={WelcomeScreen} />
        <HomeStack.Screen name="verify" component={VerificationScreen} />
        <HomeStack.Screen name="forgot" component={ForgotCredentialScreen} />
        <HomeStack.Screen
          name="createPassword"
          component={CreatePasswordScreen}
        />
        <HomeStack.Screen name="support" component={CustomerSupportScreen} />
        <HomeStack.Screen name="location" component={BranchLocationScreen} />
        <HomeStack.Screen name="branches" component={BranchesScreen} />
      </HomeStack.Navigator>
    ) : (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="pin" component={PinSignInScreen} />
        <HomeStack.Screen name="exchange" component={ExchangeNav} />
        <HomeStack.Screen name="createPin" component={CreatePinScreen} />
        <HomeStack.Screen name="verifyPin" component={VerificationScreen} />
        <HomeStack.Screen name="forgot" component={ForgotCredentialScreen} />
        <HomeStack.Screen name="support" component={CustomerSupportScreen} />
        <HomeStack.Screen name="location" component={BranchLocationScreen} />
        <HomeStack.Screen name="branches" component={BranchesScreen} />
      </HomeStack.Navigator>
    )
  ) : (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="MainNavigation" component={MainNavigation} />
      <HomeStack.Screen name="myqr" component={MyQRCodeScreen} />
      <HomeStack.Screen name="exchange" component={ExchangeNav} />
      <HomeStack.Screen name="settings" component={SettingsScreen} />
      <HomeStack.Screen name="branches" component={BranchesScreen} />
      <HomeStack.Screen name="transfer" component={TransferScreen} />
      <HomeStack.Screen name="changePin" component={ChangePinScreen} />
      <HomeStack.Screen name="qrcode" component={QRCodeScannerScreen} />
      <HomeStack.Screen name="history" component={TransactionsScreen} />
      <HomeStack.Screen name="detail" component={TransferDetailScreen} />
      <HomeStack.Screen name="userprofile" component={UserProfileScreen} />
      <HomeStack.Screen name="beneficiaries" component={BeneficiariesScreen} />
      <HomeStack.Screen name="notifications" component={NotificationsScreen} />
      <HomeStack.Screen name="updateBasic" component={UpdateBasicInfoScreen} />
      <HomeStack.Screen
        name="updateContact"
        component={UpdateContactInfoScreen}
      />
      <HomeStack.Screen name="updateNextKin" component={UpdateNextKinScreen} />
      <HomeStack.Screen name="updateAddress" component={UpdateAddressScreen} />
      <HomeStack.Screen
        name="alertCustomize"
        component={AlertCustomizationScreen}
      />
      <HomeStack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
      />
      <HomeStack.Screen
        name="forgotCredential"
        component={ForgotCredentialScreen}
      />
      {/* <HomeStack.Screen name="pin" component={PinSignInScreen} /> */}
      <HomeStack.Screen name="receipt" component={ReceiptScreen} />
      <HomeStack.Screen name="createPin" component={CreatePinScreen} />
      <HomeStack.Screen name="location" component={BranchLocationScreen} />
      <HomeStack.Screen name="verifyPin" component={VerificationScreen} />
      <HomeStack.Screen name="support" component={CustomerSupportScreen} />
      <HomeStack.Screen name="forgot" component={ForgotCredentialScreen} />
      <HomeStack.Screen name="beneficiary" component={BeneficiaryScreen} />
    </HomeStack.Navigator>
  );
};

export default function HomeNavigation() {
  return (
    <NavigationContainer theme={themeNavigation}>
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
