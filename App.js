import { StatusBar, PanResponder, View } from "react-native";
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

import Screen from "./app/components/Screen";
import AuthNavigation from "./app/navigation/AuthNavigation";
import HomeNavigation from "./app/navigation/HomeNavigation";
import SessionAndPushNotification from "./app/components/SessionAndPushNotification";

import cache from "./app/utility/cache";
import colors from "./app/config/colors";
import AuthContext from "./app/context/AuthContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState({});
  const [timeForInactivityInSecond] = useState(60);
  const timerId = useRef(false);

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
  const handleLoadAuth = async () => {
    const auth = await cache.getItemAsync("auth");
    const account = await cache.getItemAsync("account");
    const beneficiaries = await cache.getItemAsync("beneficiaries");

    setUser(auth);
    setAccount(account);
    setBeneficiaries(beneficiaries);
  };
  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      if (isAuth) {
        setIsVisible(true);
        handleExpoNotification();
      }
    }, timeForInactivityInSecond * 1);
  };

  useEffect(() => {
    resetInactivityTimeout();
    async function prepare() {
      try {
        await handleLoadAuth();
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
      },
    })
  ).current;

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
        user={user}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <AuthContext.Provider
        value={{
          user,
          isAuth,
          setUser,
          account,
          setIsAuth,
          setAccount,
          beneficiaries,
          setBeneficiaries,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <Screen onLayout={onLayoutRootView}>
          {user ? (
            <View style={{ flex: 1 }} {...panResponder.panHandlers}>
              <HomeNavigation />
            </View>
          ) : (
            <AuthNavigation />
          )}
        </Screen>
      </AuthContext.Provider>
    </>
  );
}
