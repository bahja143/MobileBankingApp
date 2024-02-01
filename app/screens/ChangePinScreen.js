import { useRef, useState } from "react";
import {
  View,
  Keyboard,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

import colors from "../config/colors";
import Button from "../components/Button1";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

function ChangePinScreen() {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const [myPin] = useState("6538");
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPing] = useState({ oldPin: "", pin: "", confirm: "" });

  const handleOnchange = (name, value) => {
    setPing({ ...pin, [name]: value });

    if (name == "oldPin" && value.length == 4) return inputRef1.current.focus();
    if (name == "pin" && value.length == 4) return inputRef2.current.focus();
  };
  const handleOpenKeyboard1 = () => {
    inputRef1.current.focus();
  };
  const handleOpenKeyboard2 = () => {
    inputRef2.current.focus();
  };
  const handleOpenKeyboard3 = () => {
    inputRef3.current.focus();
  };
  const handleSubmit = () => {
    Keyboard.dismiss();
    if (pin["oldPin"].length !== 4)
      return showMessage({
        message: "PIN Code",
        description: "Please enter valid current PIN Code",
      });
    if (pin["oldPin"] !== myPin)
      return showMessage({
        message: "PIN Code",
        description: "Invalid Current PIN Code",
      });

    if (pin["pin"].length !== 4 || pin["confirm"].length !== 4)
      return showMessage({
        message: "PIN Code",
        description: "Please Complete",
      });
    else if (pin["pin"] !== pin["confirm"])
      return showMessage({
        message: "PIN Code",
        description: "New PIN and Confirm PIN Must Mach",
      });

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <FlashMessage
        position="top"
        duration={2000}
        style={styles.flashMess}
        textStyle={styles.flashMessText}
        titleStyle={styles.flashMessTitle}
      />
      <View style={styles.navCont}>
        <TouchableOpacity style={styles.navIconCont}>
          <Entypo name="chevron-left" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title} semibold>
          Change PIN Code
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scroll}
      >
        <TouchableWithoutFeedback onPress={handleOpenKeyboard3}>
          <View>
            <TextInput
              maxLength={4}
              ref={inputRef3}
              value={pin["oldPin"]}
              keyboardType="numeric"
              style={styles.textInput}
              cursorColor={colors.white}
              onChangeText={(value) => handleOnchange("oldPin", value)}
            />
            <Text semibold style={styles.label}>
              Current PIN
            </Text>

            <View style={styles.pinContainer}>
              <View style={styles.pin}>
                {pin["oldPin"].length >= 1 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>

              <View style={styles.pin}>
                {pin["oldPin"].length >= 2 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>
              <View style={styles.pin}>
                {pin["oldPin"].length >= 3 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>

              <View style={styles.pin}>
                {pin["oldPin"].length >= 4 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={handleOpenKeyboard1}>
          <View style={styles.inputCont}>
            <TextInput
              maxLength={4}
              ref={inputRef1}
              value={pin["pin"]}
              keyboardType="numeric"
              style={styles.textInput}
              cursorColor={colors.white}
              onChangeText={(value) => handleOnchange("pin", value)}
            />
            <Text semibold style={styles.label}>
              Enter New PIN
            </Text>

            <View style={styles.pinContainer}>
              <View style={styles.pin}>
                {pin["pin"].length >= 1 ? <View style={styles.pinDot} /> : null}
              </View>

              <View style={styles.pin}>
                {pin["pin"].length >= 2 ? <View style={styles.pinDot} /> : null}
              </View>
              <View style={styles.pin}>
                {pin["pin"].length >= 3 ? <View style={styles.pinDot} /> : null}
              </View>

              <View style={styles.pin}>
                {pin["pin"].length >= 4 ? <View style={styles.pinDot} /> : null}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={handleOpenKeyboard2}>
          <View style={styles.inputCont}>
            <TextInput
              maxLength={4}
              ref={inputRef2}
              value={pin["confirm"]}
              keyboardType="numeric"
              style={styles.textInput}
              cursorColor={colors.white}
              onSubmitEditing={handleSubmit}
              onChangeText={(value) => handleOnchange("confirm", value)}
            />
            <Text semibold style={styles.label}>
              Re-Enter New PIN
            </Text>

            <View style={styles.pinContainer}>
              <View style={styles.pin}>
                {pin["confirm"].length >= 1 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>

              <View style={styles.pin}>
                {pin["confirm"].length >= 2 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>
              <View style={styles.pin}>
                {pin["confirm"].length >= 3 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>

              <View style={styles.pin}>
                {pin["confirm"].length >= 4 ? (
                  <View style={styles.pinDot} />
                ) : null}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.btnCont}>
          <Button onPress={handleSubmit} title="Change PIN" margin={50} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  scroll: {
    justifyContent: "flex-start",
  },
  flashMessText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.white,
  },
  flashMess: {
    height: 75,
    backgroundColor: colors.danger,
  },
  flashMessTitle: {
    fontSize: 17,
    textAlign: "center",
    color: colors.white,
  },
  btnCont: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.lighter,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  inputCont: {
    marginTop: 40,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 16,
    marginBottom: -5,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
  textInput: {
    alignSelf: "center",
    color: colors.white,
    position: "absolute",
    backgroundColor: colors.white,
  },
});

export default ChangePinScreen;
