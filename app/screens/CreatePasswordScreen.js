import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  BackHandler,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState, useContext, useEffect } from "react";

import Text from "../components/CustomText";
import { TextInputForm, BtnForm } from "../components/form";
import ActivityIndicator from "../components/ActivityIndicator";

import cache from "../utility/cache";
import colors from "../config/colors";
import authContext from "../context/AuthContext";

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
export default function CreatePasswordScreen({ route, navigation }) {
  const [info] = useState({
    confirm: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAuth, account, setAccount } = useContext(authContext);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    Keyboard.dismiss();
    const mobile = route.params;
    const auth = {
      type: "password",
      password: {
        username: mobile,
        password: values.password,
      },
    };

    setTimeout(async () => {
      setIsLoading(false);
      setAccount(account);
      await cache.setItemAsync("auth", auth);
      await cache.setItemAsync("account", account);

      setUser(auth);
      setIsAuth(true);
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
    paddingTop: 25,
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
