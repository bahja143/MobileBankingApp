import { useRef, useState } from "react";
import {
  View,
  Animated,
  Vibration,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";

import Text from "./CustomText";
import colors from "../config/colors";
import SuspendModal from "./SuspendModal";

export default function PinCodeModal({ isVisible }) {
  const inputRef = useRef(null);
  const [myPin] = useState("6438");
  const [pin, setPing] = useState("");
  const [show, setShow] = useState(true);
  const [maxTry, setMaxTry] = useState(0);
  const [visible, setVisible] = useState(false);
  const shake = useRef(new Animated.Value(0.5)).current;

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
  const handleOpenKeyboard = () => {
    inputRef.current.focus();
  };

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
              Please enter your pin
            </Text>
            <Text style={styles.subTitle}>
              For your security, your banking session has timed out due to
              inactivity
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
    width: 300,
    lineHeight: 20,
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
    marginTop: 20,
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
