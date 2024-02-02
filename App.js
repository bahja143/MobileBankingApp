import { StatusBar } from "react-native";
import { useEffect, useCallback, useState } from "react";

import {
  Inter_700Bold,
  Inter_300Light,
  Inter_500Medium,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import colors from "./app/config/colors";
import Screen from "./app/components/Screen";

import ExchangeNav from "./app/navigation/ExchangeNav";
import PinCodeModal from "./app/components/PinCodeModal";

import SignUpScreen from "./app/screens/SignUpScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ReceiptScreen from "./app/screens/ReceiptScreen";
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
import ForgotCredentialScreen from "./app/screens/ForgotCredentialScreen";
import BranchLocationScreen from "./app/screens/BranchLocationScreen";
import TransferDetailScreen from "./app/screens/TransferDetailScreen";
import CustomerSupportScreen from "./app/screens/CustomerSupportScreen";
import UpdateBasicInfoScreen from "./app/screens/UpdateBasicInfoScreen";
import UpdateContactInfoScreen from "./app/screens/UpdateContactInfoScreen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Screen onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <PinSignInScreen />
    </Screen>
  );
}
