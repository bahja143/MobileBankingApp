import { Entypo, Feather } from "@expo/vector-icons";
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
import { useState } from "react";

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
  const [myInfo] = useState({ mobile: "0907005112", password: "Mysoul24@" });
  const [info] = useState({
    mobile: "",
    password: "",
  });
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
                <TouchableOpacity style={styles.forgetPass}>
                  <Text bold style={styles.forgetText}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
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
  errorMessage: {
    fontSize: 16,
    color: colors.danger,
  },
  forgetText: {
    color: colors.primary,
  },
  forgetPass: {
    top: 15,
    alignSelf: "flex-end",
  },
  logoContainer: {
    marginBottom: 35,
    alignSelf: "center",
  },
  logo: {
    width: 110,
    height: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
  btnCont: {
    marginTop: 5,
  },
});
