import { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";

import colors from "../config/colors";
import Button from "../components/Button1";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import cache from "../utility/cache";
import authContext from "../context/AuthContext";

function CreatePinScreen({ route }) {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPing] = useState({ pin: "", confirm: "" });
  const { user, setIsAuth, setUser } = useContext(authContext);

  const handleOnchange = (name, value) => {
    setPing({ ...pin, [name]: value });

    if (name == "pin" && value.length == 4) return inputRef2.current.focus();
  };
  const handleOpenKeyboard1 = () => {
    inputRef1.current.focus();
  };
  const handleOpenKeyboard2 = () => {
    inputRef2.current.focus();
  };
  const handleSubmit = async () => {
    setErrorMessage(null);
    const enablePin = route.params?.pin ? true : false;
    const settings = await cache.getItemAsync("settings");

    Keyboard.dismiss();
    if (pin["pin"].length !== 4 || pin["confirm"].length !== 4) {
      return setErrorMessage("Please Complete");
    }

    if (pin["pin"] !== pin["confirm"]) {
      return setErrorMessage("New PIN and Confirm PIN Must Mach");
    }

    setIsLoading(true);
    setTimeout(async () => {
      await cache.setItemAsync("auth", {
        ...user,
        pin: pin["pin"],
        type: enablePin ? "pin" : user.type,
      });
      await cache.setItemAsync("settings", { ...settings, pin: true });
      setIsLoading(false);
      setIsAuth(false);
      setUser({
        ...user,
        pin: pin["pin"],
        type: enablePin ? "pin" : user.type,
      });
    }, 3000);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={handleOpenKeyboard1}
        >
          <View>
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

        <TouchableWithoutFeedback
          style={styles.container}
          onPress={handleOpenKeyboard2}
        >
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
          <Button onPress={handleSubmit} title="Create PIN" margin={50} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  errorMessage: {
    fontSize: 15,
    marginTop: 25,
    marginBottom: 20,
    textAlign: "center",
    color: colors.danger,
  },
  flashMessText: {
    textAlign: "center",
    color: colors.primary,
  },
  flashMess: {
    backgroundColor: colors.secondary,
  },
  flashMessTitle: {
    textAlign: "center",
    color: colors.primary,
  },
  btnCont: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
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

export default CreatePinScreen;
