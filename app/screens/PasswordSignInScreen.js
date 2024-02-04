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
import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";

import colors from "../config/colors";
import Text from "../components/CustomText";

import SuspendModal from "../components/SuspendModal";
import { TextInputForm, BtnForm } from "../components/form";
import ActivityIndicator from "../components/ActivityIndicator";

import Logo from "../assets/images/Logo.png";

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
export default function PasswordSignInScreen() {
  const [myInfo] = useState({
    mobile: "0907005112",
    password: "Mysoul24@",
  });
  const [info] = useState({
    mobile: "",
    password: "",
  });
  const [isFingerAvailable, setFingerAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [maxTry, setMaxTry] = useState(0);

  const handleSubmit = (values) => {
    Keyboard.dismiss();
    setErrorMessage("");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (
        values["mobile"] === myInfo["mobile"] &&
        values["password"] === myInfo["password"]
      ) {
        return;
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

  useEffect(() => {
    HandleCheckFingerPrint();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <SuspendModal type="Password" isVisible={visible} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.container}
      >
        <Formik
          initialValues={info}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ handleSubmit }) => (
            <>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={Logo} />
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
                    !isFingerAvailable && { justifyContent: "flex-end" },
                  ]}
                >
                  {isFingerAvailable ? (
                    <TouchableOpacity style={styles.fingerPrinter}>
                      <FontAwesome5
                        size={40}
                        name="fingerprint"
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity>
                    <Text bold style={styles.forgetText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
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

          <TouchableOpacity style={styles.actionItem}>
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

          <TouchableOpacity style={styles.actionItem}>
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
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  actionItem: {
    top: -2,
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
    top: 75,
    width: "100%",
    borderRadius: 7.5,
    paddingVertical: 10,
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
    backgroundColor: colors.secondary,
  },
  forgotCont: {
    alignItems: "flex-end",
  },
  errorMessage: {
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
    width: 130,
    height: 100,
    alignSelf: "center",
  },
});
