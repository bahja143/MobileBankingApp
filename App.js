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
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState({});
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetTimer();
      },
    })
  ).current;

  const handleExpoNotification = async () => {
    if (isVisible) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        vibrate: [],
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
  const startTimer = () => {
    setIsRunning(true);
  };
  const stopTimer = () => {
    setIsRunning(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeElapsed >= 60) {
      // Run code after 1 minute
      if (isAuth) {
        setIsVisible(true);
        handleExpoNotification();
      }
      stopTimer();
    }
  }, [timeElapsed]);

  const resetTimer = () => {
    stopTimer();
    startTimer();
  };

  useEffect(() => {
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
        onReset={resetTimer}
        isVisible={false}
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
