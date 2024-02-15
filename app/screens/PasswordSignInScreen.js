import {
  Entypo,
  Feather,
  Octicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState, useEffect, useContext } from "react";
import * as LocalAuthentication from "expo-local-authentication";

import Text from "../components/CustomText";
import SuspendModal from "../components/SuspendModal";
import { TextInputForm, BtnForm } from "../components/form";
import ActivityIndicator from "../components/ActivityIndicator";

import colors from "../config/colors";
import logo from "../assets/images/Logo.png";

import cache from "../utility/cache";
import data from "../data/accounts.json";
import authContext from "../context/AuthContext";

const schema = Yup.object({
  mobile: Yup.string()
    .min(10, "Invalid Mobile No.")
    .required()
    .label("Mobile No."),
  password: Yup.string()
    .min(6, "Invalid Password")
    .required()
    .label("Password"),
});
export default function PasswordSignInScreen({ navigation, route }) {
  const [info] = useState({
    mobile: "",
    password: "",
  });
  const {
    setUser,
    setIsAuth,
    setAccount,
    user: myInfo,
  } = useContext(authContext);
  const [isFingerAvailable, setFingerAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [maxTry, setMaxTry] = useState(0);

  const handleSubmit = (values) => {
    Keyboard.dismiss();
    setErrorMessage("");
    const user = myInfo["password"];

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (
        values["mobile"] === user["username"] &&
        values["password"] === user["password"]
      ) {
        return setIsAuth(true);
      }

      if (1 + maxTry === 5) return setVisible(true);

      setMaxTry(maxTry + 1);
      return setErrorMessage("Invalid credentials!");
    }, 3000);
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
      setIsLoading(true);
      return setTimeout(() => {
        setIsLoading(false);
        setIsAuth(true);
      }, 3000);
    }

    if (error === "lockout") {
      await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
      });
    }
  };
  const handleSignInInitial = async () => {
    const initialData = {
      user: {
        password: { password: "Mysoul24@", username: "0907005112" },
        type: "password",
        initial: true,
      },
      account: data[0],
    };

    setUser(initialData.user);
    setAccount(initialData.account);
    await cache.setItemAsync("auth", initialData.user);
    await cache.setItemAsync("account", initialData.account);
  };
  useEffect(() => {
    if (!myInfo) {
      handleSignInInitial();
    }
    HandleCheckFingerPrint();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <SuspendModal type="Password" isVisible={visible} />
      {myInfo?.initial ? (
        <View style={styles.navCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navIconCont}
          >
            <Entypo name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Sign In
          </Text>
        </View>
      ) : null}
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
      >
        <View />
        <Formik
          initialValues={info}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ handleSubmit }) => (
            <View>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logo} />
                <Text semibold style={styles.errorMessage}>
                  {errorMessage}
                </Text>
              </View>
              <TextInputForm
                name="mobile"
                maxLength={10}
                label="Mobile No"
                keyboardType="numeric"
                placeholder="09xxxxxxx"
                onSubmitEditing={handleSubmit}
                icon={<Entypo name="mobile" size={22} color={colors.primary} />}
              />
              <TextInputForm
                password={true}
                name="password"
                label="Password"
                autoCapitalize="sentences"
                onSubmitEditing={handleSubmit}
                icon={<Feather name="lock" size={22} color={colors.primary} />}
              />
              <View style={styles.btnCont}>
                <BtnForm textTransform="capitalize" title="SIGN IN" />

                <View
                  style={[
                    styles.bottomCont,
                    isFingerAvailable && myInfo.biometric?.fingerprint
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {isFingerAvailable && myInfo.biometric?.fingerprint ? (
                    <TouchableOpacity
                      onPress={handleFingerprintAuthentication}
                      style={styles.fingerPrinter}
                    >
                      <FontAwesome5
                        size={40}
                        name="fingerprint"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("forgot", { type: "password" })
                    }
                  >
                    <Text bold style={styles.forgetText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>

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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7.5,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  Navtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  navCont: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 7.5,
    alignItems: "center",
    flexDirection: "row",
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
    width: "100%",
    marginBottom: 15,
    borderRadius: 7.5,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.lighter,
  },
  bottomCont: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  fingerPrinter: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.lighter,
  },
  forgotCont: {
    alignItems: "flex-end",
  },
  errorMessage: {
    top: 10,
    fontSize: 16,
    color: colors.danger,
  },
  forgetText: {
    color: colors.primary,
  },
  logoContainer: {
    marginBottom: 35,
    alignSelf: "center",
  },
  logo: {
    width: 120,
    height: 93,
    alignSelf: "center",
  },
});
