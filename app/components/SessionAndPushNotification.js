import { useRef, useState, useEffect } from "react";
import {
  View,
  Easing,
  Animated,
  Vibration,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import * as Device from "expo-device";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import Text from "./CustomText";
import colors from "../config/colors";
import SuspendModal from "./SuspendModal";

const IDLE_TIMEOUT = 1 * 60 * 1000;
const PROJECT_ID = "36f17d24-cd4f-4a6c-a87d-551b2d46005c";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SessionAndPushNotification() {
  const inputRef = useRef(null);
  const [myPin] = useState("6438");
  const [pin, setPing] = useState("");
  const inactivityTimer = useRef(null);
  const [token, setToken] = useState("");
  const [show, setShow] = useState(true);
  const [maxTry, setMaxTry] = useState(0);
  const lastInteraction = useRef(Date.now());
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleTouch = (num) => {
    setPing(num);

    if (num.length >= 4) {
      if (num === myPin) {
        return console.log("Success");
      }

      if (1 + maxTry === 5) {
        setShow(false);
        return setVisible(true);
      }

      setMaxTry(maxTry + 1);
      handleIncorrectPin();
      Vibration.vibrate(100);
      setTimeout(() => {
        setPing("");
      }, 500);
      return;
    }
  };
  const handleIncorrectPin = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 20,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.timing(shakeAnim, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start();
  };
  const handleOpenKeyboard = () => {
    inputRef.current.focus();
  };
  const handleSendPushNotification = async () => {
    const message = {
      to: token,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    console.log("Hello");

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    console.log("Response:", response);
  };
  const handleRegisterPushNotifications = async () => {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: PROJECT_ID,
      });
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    handleSendPushNotification();
    return setToken(token.data);
  };

  useEffect(() => {
    handleRegisterPushNotifications();
    const resetTimer = () => {
      clearTimeout(inactivityTimer.current);
      lastInteraction.current = Date.now();
    };

    inactivityTimer.current = setTimeout(() => {
      // Handle inactivity timeout
      setIsVisible(true);
    }, IDLE_TIMEOUT);

    // Add event listeners for user interactions
    const touchListener = () => resetTimer();
    const keyboardListener = () => resetTimer();

    // ... other event listeners

    return () => {
      clearTimeout(inactivityTimer.current);
      // Remove event listeners
    };
  }, []);

  return (
    <>
      <SuspendModal isVisible={visible} type="PIN" />
      <Modal style={styles.modal} isVisible={isVisible && show ? true : false}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={handleOpenKeyboard}
        >
          <View style={styles.container}>
            <TextInput
              value={pin}
              ref={inputRef}
              keyboardType="numeric"
              style={styles.textInput}
              cursorColor={colors.white}
              onChangeText={handleTouch}
            />
            <Text semibold style={styles.title}>
              Please enter your PIN
            </Text>
            <Text style={styles.subTitle}>
              For your security, your banking session has timed out{" "}
              <Text bold>due to inactivity</Text>
            </Text>
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <View style={styles.pinContainer}>
                <View style={styles.pin}>
                  {pin.length >= 1 ? <View style={styles.pinDot} /> : null}
                </View>

                <View style={styles.pin}>
                  {pin.length >= 2 ? <View style={styles.pinDot} /> : null}
                </View>
                <View style={styles.pin}>
                  {pin.length >= 3 ? <View style={styles.pinDot} /> : null}
                </View>

                <View style={styles.pin}>
                  {pin.length >= 4 ? <View style={styles.pinDot} /> : null}
                </View>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    width: "95%",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  subTitle: {
    width: 325,
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    color: colors.medium,
  },
  title: {
    top: -10,
    fontSize: 17,
    textAlign: "center",
    color: colors.primary,
  },
  pinDot: {
    top: 15,
    width: 10,
    height: 10,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: colors.primary,
  },
  pin: {
    width: 50,
    height: 40,
    borderBottomWidth: 5,
    backgroundColor: colors.white,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  pinContainer: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
  textInput: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: colors.primary,
  },
  textInput: {
    color: colors.white,
    position: "absolute",
  },
  modal: {
    flex: 1,
    margin: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
