import { useState, useEffect, useRef } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
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

import Logo from "../assets/images/Logo.png";

export default function PinSignInScreen() {
  const [myPin] = useState("6438");
  const [pin, setPing] = useState("");
  const [maxTry, setMaxTry] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const shake = useRef(new Animated.Value(0.5)).current;
  const [isFingerAvailable, setFingerAvailable] = useState(false);

  const handleTouch = (num) => {
    setPing((e) => e + num);

    if (pin.length === 3) {
      if (pin + num === myPin) {
        return console.log("Success");
      }

      if (1 + maxTry === 5) return setVisible(true);

      setMaxTry(maxTry + 1);
      Vibration.vibrate(100);
      handleIncorrectPin();
      setTimeout(() => {
        setPing("");
      }, 500);
      return;
    }
  };
  const handleDelete = () => {
    setPing(pin.substring(0, pin.length - 1));
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
      setPing(myPin);
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
        <Image style={styles.logo} source={Logo} />
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
                  size={30}
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
        <TouchableOpacity>
          <Text style={styles.bottomText} semibold>
            Forgot PIN Code?
          </Text>
        </TouchableOpacity>
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
  pinContainer: {
    marginTop: 25,
    marginBottom: 20,
    flexDirection: "row",
  },
  pin: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 25,
    marginHorizontal: 12,
    borderColor: colors.primary,
  },
  bottomText: {
    top: 30,
    fontSize: 16,
    color: colors.primary,
  },
  number: {
    fontSize: 24,
    color: colors.primary,
  },
  numCont: {
    width: 77,
    height: 77,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  subBody: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  body: {
    marginTop: 30,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    color: colors.black,
  },
  logo: {
    width: 100,
    height: 85,
    marginBottom: 17,
    alignSelf: "center",
  },
});
