import { StatusBar, PanResponder } from "react-native";
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

import AuthNavigation from "./app/navigation/AuthNavigation";
import HomeNavigation from "./app/navigation/HomeNavigation";
import SessionAndPushNotification from "./app/components/SessionAndPushNotification";

import cache from "./app/utility/cache";
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
  const [idleTime, setIdleTime] = useState(0); // Track inactivity duration
  const [isVisible, setIsVisible] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(new Date()); // Track last interaction time
  const IDLE_THRESHOLD = 50 * 60 * 1000; // Logout after 5 minutes of inactivity (in milliseconds)
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
  const handleLoadAuth = async () => {
    const auth = await cache.getItemAsync("auth");
    const account = await cache.getItemAsync("account");

    setUser(auth);
    setAccount(account);
  };

  // useEffect(() => {
  //   const updateIdleTime = () => {
  //     const now = new Date();
  //     setIdleTime(now.getTime() - lastInteraction.getTime()); // Update idle time in milliseconds
  //   };

  //   // Start the interval when the component mounts or re-renders
  //   inactivityTimerRef.current = setInterval(updateIdleTime, 1000); // Check every second

  //   // Clear the interval on cleanup
  //   return () => clearInterval(inactivityTimerRef.current);
  // }, [lastInteraction]);

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

  // useEffect(() => {
  //   // if (isVisible) return;
  //   if (idleTime >= IDLE_THRESHOLD) {
  //     // Logout logic here (clear tokens, redirect to login screen, etc.)
  //     setIsVisible(true);
  //     handleExpoNotification();
  //     setLastInteraction(new Date());
  //     console.log("Logged out due to inactivity!");
  //   }
  // }, [idleTime]);

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
      {/* <SessionAndPushNotification
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      /> */}
      <AuthContext.Provider
        value={{ user, setUser, account, setAccount, isAuth, setIsAuth }}
      >
        <Screen onLayout={onLayoutRootView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primary}
          />
          {user ? <HomeNavigation /> : <AuthNavigation />}
        </Screen>
      </AuthContext.Provider>
    </>
  );
}
