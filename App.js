import { StatusBar } from "react-native";
import { useEffect, useCallback, useState } from "react";

import {
  Inter_700Bold,
  Inter_300Light,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import colors from "./app/config/colors";
import Screen from "./app/components/Screen";

import ReceiptScreen from "./app/screens/ReceiptScreen";
import TransferScreen from "./app/screens/TransferScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import BeneficiaryScreen from "./app/screens/BeneficiaryScreen";
import TransactionsScreen from "./app/screens/TransactionsScreen";
import BeneficiariesScreen from "./app/screens/BeneficiariesScreen";
import QRCodeScannerScreen from "./app/screens/QRCodeScannerScreen";
import NotificationsScreen from "./app/screens/NotificationsScreen";
import TransferDetailScreen from "./app/screens/TransferDetailScreen";
import CustomerSupportScreen from "./app/screens/CustomerSupportScreen";

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
    <>
      <Screen onLayout={onLayoutRootView}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <QRCodeScannerScreen />
      </Screen>
    </>
  );
}
