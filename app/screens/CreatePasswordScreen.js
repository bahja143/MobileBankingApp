import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

const schema = Yup.object({
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required()
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    )
    .label("Password"),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});
export default function CreatePasswordScreen() {
  const [info] = useState({
    confirm: "",
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
  const checkPasswordStrength = (password) => {
    let strength = 0;

    // Check for password length
    if (password.length < 8) {
      strength += 1; // Weak
    } else if (password.length >= 12) {
      strength += 2; // Medium
    } else if (password.length >= 16) {
      strength += 3; // Strong
    }

    // Check for mixed case letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 1;
    }

    // Check for numbers
    if (/\d/.test(password)) {
      strength += 1;
    }

    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
      strength += 1;
    }

    // Determine strength status
    if (strength <= 2) {
      return "Poor";
    } else if (strength <= 4) {
      return "Weak";
    } else if (strength <= 6) {
      return "Medium";
    } else {
      return "Strong";
    }
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
            {({ values }) => (
              <>
                <Text semibold style={styles.title}>
                  New Password
                </Text>
                <TextInputForm
                  height={130}
                  password={true}
                  name="password"
                  label="New Password"
                  passStatus={checkPasswordStrength(values["password"])}
                />
                <TextInputForm
                  password={true}
                  name="confirm"
                  label="Confirm Password"
                />
                <View style={styles.btnCont}>
                  <BtnForm textTransform="capitalize" title="Create Password" />
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
    marginTop: 25,
    paddingHorizontal: 7.5,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 125,
    height: 125,
    borderRadius: 75,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["lighter"],
  },
  forgetText: {
    color: colors.primary,
  },
  forgetPass: {
    top: 15,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 17,
    marginBottom: 40,
    textAlign: "center",
    color: colors["primary"],
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
