import { useState, useEffect, useRef, useContext } from "react";
import {
  Feather,
  Octicons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Image,
  Animated,
  Vibration,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import colors from "../config/colors";
import Text from "../components/CustomText";
import SuspendModal from "../components/SuspendModal";
import ActivityIndicator from "../components/ActivityIndicator";

import logo from "../assets/images/Logo.png";
import authContext from "../context/AuthContext";

export default function PinSignInScreen({ navigation }) {
  const [pin, setPin] = useState("");
  const [maxTry, setMaxTry] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const shake = useRef(new Animated.Value(0.5)).current;
  const [isFingerAvailable, setFingerAvailable] = useState(false);
  const { user, setIsAuth } = useContext(authContext);

  const handleTouch = (num) => {
    setPin((e) => e + num);
    const myPin = user.pin;

    if (pin.length === 3) {
      if (pin + num === myPin) {
        setIsLoading(true);
        return setTimeout(() => {
          setPin("");
          setIsLoading(false);
          setIsAuth(true);
          navigation.navigate("MainNavigation");
        }, 1000);
      }

      if (1 + maxTry === 5) return setVisible(true);

      setMaxTry(maxTry + 1);
      Vibration.vibrate(100);
      handleIncorrectPin();
      setTimeout(() => {
        setPin("");
      }, 500);
      return;
    }
  };
  const handleDelete = () => {
    setPin(pin.substring(0, pin.length - 1));
  };
  const handleIncorrectPin = () => {
    Animated.sequence([
      Animated.timing(shake, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const HandleCheckFingerPrint = async () => {
    const response = await LocalAuthentication.hasHardwareAsync();
    setFingerAvailable(response);
  };
  const handleFingerprintAuthentication = async () => {
    const { error, success } = await LocalAuthentication.authenticateAsync({
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (success) {
      setPin(user.pin);
      setIsLoading(true);
      return setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    if (error === "lockout") {
      await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
      });
    }
  };

  useEffect(() => {
    HandleCheckFingerPrint();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <SuspendModal isVisible={visible} type="PIN" />
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title} semibold>
          Welcome back, <Text bold>Abdisalam Farah!</Text>
        </Text>
        <Animated.View
          style={[
            styles.pinView,
            {
              transform: [
                {
                  translateX: shake.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-15, 15],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.pinContainer}>
            <View
              style={[
                styles.pin,
                pin.length >= 1 && { backgroundColor: colors.primary },
              ]}
            />
            <View
              style={[
                styles.pin,
                pin.length >= 2 && { backgroundColor: colors.primary },
              ]}
            />
            <View
              style={[
                styles.pin,
                pin.length >= 3 && { backgroundColor: colors.primary },
              ]}
            />
            <View
              style={[
                styles.pin,
                pin.length >= 4 && { backgroundColor: colors.primary },
              ]}
            />
          </View>
        </Animated.View>
        <View style={styles.body}>
          <View style={styles.subBody}>
            <TouchableOpacity
              onPress={() => handleTouch(1)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                1
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTouch(2)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                2
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTouch(3)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                3
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subBody}>
            <TouchableOpacity
              onPress={() => handleTouch(4)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                4
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTouch(5)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                5
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTouch(6)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                6
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subBody}>
            <TouchableOpacity
              onPress={() => handleTouch(7)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                7
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTouch(8)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                8
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleTouch(9)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                9
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subBody}>
            {isFingerAvailable ? (
              <TouchableOpacity
                onPress={handleFingerprintAuthentication}
                style={[styles.numCont, { backgroundColor: colors.white }]}
              >
                <Ionicons
                  size={35}
                  color={colors.primary}
                  name="finger-print-sharp"
                />
              </TouchableOpacity>
            ) : (
              <View
                style={[styles.numCont, { backgroundColor: colors.white }]}
              />
            )}
            <TouchableOpacity
              onPress={() => handleTouch(0)}
              style={styles.numCont}
            >
              <Text semibold style={styles.number}>
                0
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.numCont, { backgroundColor: colors.white }]}
            >
              <Feather size={29} name="delete" color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("forgot", { type: "pin" })}
          style={styles.bottomCont}
        >
          <Text style={styles.bottomText} bold>
            Forgot PIN Code?
          </Text>
        </TouchableOpacity>
        <View style={styles.actionsCont}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Octicons name="location" size={25} color={colors.white} />
            </View>
            <Text style={styles.actionTitle} semibold>
              LOCATOR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("exchange")}
            style={styles.actionItem}
          >
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                size={25}
                name="currency-usd"
                color={colors.white}
              />
            </View>
            <Text style={styles.actionTitle} semibold>
              EXCHANGER
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("support")}
            style={styles.actionItem}
          >
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons
                size={25}
                name="help"
                color={colors.white}
              />
            </View>
            <Text style={styles.actionTitle} semibold>
              HELP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  actionItem: {
    alignItems: "center",
  },
  actionTitle: {
    top: 7.5,
    fontSize: 11,
    color: colors.black,
  },
  actionIcon: {
    width: 43.5,
    height: 43.5,
    elevation: 3,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  actionsCont: {
    top: 30,
    width: "100%",
    borderRadius: 7.5,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.lighter,
  },
  pinContainer: {
    marginVertical: 18,
    flexDirection: "row",
  },
  pin: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 25,
    marginHorizontal: 12,
    borderColor: colors.primary,
  },
  bottomCont: {
    top: 15,
    marginTop: 5,
  },
  bottomText: {
    fontSize: 15,
    color: colors.primary,
  },
  number: {
    fontSize: 24,
    color: colors.primary,
  },
  numCont: {
    width: 77,
    height: 75,
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  subBody: {
    width: "100%",
    marginVertical: 11,
    flexDirection: "row",
  },
  body: {
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.black,
  },
  logo: {
    top: -5,
    width: 90,
    height: 80,
    marginBottom: 10,
    alignSelf: "center",
  },
});
