import { StatusBar, PanResponder, AppState } from "react-native";
import { useEffect, useCallback, useState, useRef } from "react";

import {
  Inter_700Bold,
  Inter_300Light,
  Inter_500Medium,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

import colors from "./app/config/colors";
import Screen from "./app/components/Screen";

import ExchangeNav from "./app/navigation/ExchangeNav";
import SessionAndPushNotification from "./app/components/SessionAndPushNotification";

import SignUpScreen from "./app/screens/SignUpScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ReceiptScreen from "./app/screens/ReceiptScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import MyQRCodeScreen from "./app/screens/MyQRCodeScreen";
import TransferScreen from "./app/screens/TransferScreen";
import BranchesScreen from "./app/screens/BranchesScreen";
import ChangePinScreen from "./app/screens/ChangePinScreen";
import PinSignInScreen from "./app/screens/PinSignInScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import CreatePinScreen from "./app/screens/CreatePinScreen";
import UserProfileScreen from "./app/screens/UserProfileScreen";
import BeneficiaryScreen from "./app/screens/BeneficiaryScreen";
import VerificationScreen from "./app/screens/VerificationScreen";
import TransactionsScreen from "./app/screens/TransactionsScreen";
import BeneficiariesScreen from "./app/screens/BeneficiariesScreen";
import QRCodeScannerScreen from "./app/screens/QRCodeScannerScreen";
import NotificationsScreen from "./app/screens/NotificationsScreen";
import UpdateNextKinScreen from "./app/screens/UpdateNextKinScreen";
import UpdateAddressScreen from "./app/screens/UpdateAddressScreen";
import ChangePasswordScreen from "./app/screens/ChangePasswordScreen";
import PasswordSignInScreen from "./app/screens/PasswordSignInScreen";
import CreatePasswordScreen from "./app/screens/CreatePasswordScreen";
import BranchLocationScreen from "./app/screens/BranchLocationScreen";
import TransferDetailScreen from "./app/screens/TransferDetailScreen";
import CustomerSupportScreen from "./app/screens/CustomerSupportScreen";
import UpdateBasicInfoScreen from "./app/screens/UpdateBasicInfoScreen";
import ForgotCredentialScreen from "./app/screens/ForgotCredentialScreen";
import UpdateContactInfoScreen from "./app/screens/UpdateContactInfoScreen";
import AlertCustomizationScreen from "./app/screens/AlertCustomizationScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(new Date()); // Track last interaction time
  const [idleTime, setIdleTime] = useState(0); // Track inactivity duration
  const IDLE_THRESHOLD = 0.25 * 60 * 1000; // Logout after 5 minutes of inactivity (in milliseconds)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Handle any touch event
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setLastInteraction(new Date()); // Reset idle time on interaction
      },
    })
  ).current;

  // Use a ref to store the interval ID for efficient clearing
  const inactivityTimerRef = useRef(null);

  const handleExpoNotification = async () => {
    if (isVisible) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Shabelle Bank! 🔒",
        body: "For your security, your banking session has timed out due to inactivity",
      },
      trigger: null,
    });
  };

  useEffect(() => {
    const updateIdleTime = () => {
      const now = new Date();
      setIdleTime(now.getTime() - lastInteraction.getTime()); // Update idle time in milliseconds
    };

    // Start the interval when the component mounts or re-renders
    inactivityTimerRef.current = setInterval(updateIdleTime, 1000); // Check every second

    // Clear the interval on cleanup
    return () => clearInterval(inactivityTimerRef.current);
  }, [lastInteraction]);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_700Bold,
          Inter_300Light,
          Inter_500Medium,
          Inter_400Regular,
          Inter_600SemiBold,
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    // if (isVisible) return;
    if (idleTime >= IDLE_THRESHOLD) {
      // Logout logic here (clear tokens, redirect to login screen, etc.)
      setIsVisible(true);
      handleExpoNotification();
      setLastInteraction(new Date());
      console.log("Logged out due to inactivity!");
    }
  }, [idleTime]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <SessionAndPushNotification
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Screen onLayout={onLayoutRootView} {...panResponder.panHandlers}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <DashboardScreen />
      </Screen>
    </>
  );
}
