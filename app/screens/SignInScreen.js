import { Entypo, Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import colors from "../config/colors";
import Text from "../components/CustomText";
import Logo from "../assets/images/Logo.png";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

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
export default function SignInScreen() {
  const [info] = useState({
    mobile: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
    }, 3000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => 25,
          })()}
        >
          <Formik
            initialValues={info}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {() => (
              <>
                <Image style={styles.logo} source={Logo} />
                <TextInputForm
                  name="mobile"
                  maxLength={10}
                  label="Mobile No"
                  keyboardType="numeric"
                  placeholder="09xxxxxxx"
                  icon={
                    <Entypo name="mobile" size={22} color={colors.primary} />
                  }
                />
                <TextInputForm
                  password={true}
                  name="password"
                  label="Password"
                  icon={
                    <Feather name="lock" size={22} color={colors.primary} />
                  }
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
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 7.5,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  forgetText: {
    color: colors.primary,
  },
  forgetPass: {
    top: 15,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 22,
    marginBottom: 50,
    textAlign: "center",
  },
  logo: {
    top: -140,
    width: 110,
    height: 90,
    alignSelf: "center",
    position: "absolute",
  },
  btnCont: {
    marginTop: 5,
  },
});
