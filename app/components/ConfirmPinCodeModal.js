import { useRef, useState } from "react";
import {
  View,
  Easing,
  Animated,
  Vibration,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";

import Button from "./Button1";
import Text from "./CustomText";
import colors from "../config/colors";
import SuspendModal from "./SuspendModal";

export default function ConfirmPinCodeModal({ isVisible, onSubmit, onClose }) {
  const inputRef = useRef(null);
  const [myPin] = useState("6438");
  const [pin, setPing] = useState("");
  const [show, setShow] = useState(true);
  const [maxTry, setMaxTry] = useState(0);
  const [visible, setVisible] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleTouch = (num) => {
    setPing(num);

    if (num.length >= 4) {
      if (num === myPin) {
        setPing("");
        return onSubmit();
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
    console.log("Hello");
    inputRef.current?.focus();
  };

  return (
    <>
      <SuspendModal isVisible={visible} type="PIN" />
      <Modal style={styles.modal} isVisible={isVisible && show ? true : false}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.subContainer}
            onPress={handleOpenKeyboard}
          >
            <>
              <TextInput
                value={pin}
                ref={inputRef}
                keyboardType="numeric"
                style={styles.textInput}
                cursorColor={colors.white}
                onChangeText={handleTouch}
              />
              <Text semibold style={styles.title}>
                Enter pin to confirm transaction
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

              <View style={styles.btnCont}>
                <Button onPress={onClose} height={47} title="Go Back" />
              </View>
            </>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 7.5,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  subContainer: {
    flex: 1,
  },
  btnCont: {
    top: 8,
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 15.5,
    marginBottom: 45,
    textAlign: "center",
    color: colors.primary,
  },
  pinDot: {
    top: -20,
    width: 10,
    height: 10,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: colors.primary,
  },
  pin: {
    height: 5,
    width: 50,
    borderBottomWidth: 5,
    backgroundColor: colors.white,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  pinContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
  textInput: {
    width: "100%",
    height: "100%",
    color: colors.white,
    position: "absolute",
    backgroundColor: colors.white,
  },
  modal: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});
