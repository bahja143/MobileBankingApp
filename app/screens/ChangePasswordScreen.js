import {
  View,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

const schema = Yup.object({
  current: Yup.string().min(6, "Invalid Password").required().label("Password"),
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
    .label("New Password"),
  confirm: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});
export default function ChangePasswordScreen() {
  const [info] = useState({
    current: "",
    confirm: "",
    password: "",
  });
  const [myInfo] = useState({ password: "Mysoul25@" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    Keyboard.dismiss();
    if (values["current"] !== myInfo.password)
      return showMessage({
        message: "Password",
        description: "Invalid Current Password",
      });

    setIsLoading(true);
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
      <FlashMessage
        position="top"
        duration={2000}
        style={styles.flashMess}
        textStyle={styles.flashMessText}
        titleStyle={styles.flashMessTitle}
      />
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollStyle}
      >
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Change Password
          </Text>
        </View>
        <Formik
          initialValues={info}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ values, handleSubmit }) => (
            <>
              <TextInputForm
                name="current"
                password={true}
                label="Current Password"
                onSubmitEditing={handleSubmit}
              />
              <TextInputForm
                height={140}
                name="password"
                password={true}
                label="New Password"
                onSubmitEditing={handleSubmit}
                passStatus={checkPasswordStrength(values["password"])}
              />
              <TextInputForm
                height={120}
                name="confirm"
                password={true}
                label="Confirm Password"
                onSubmitEditing={handleSubmit}
              />
              <BtnForm textTransform="capitalize" title="Create Password" />
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
    backgroundColor: colors.white,
  },
  scrollStyle: {
    paddingBottom: 10,
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
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.lighter,
  },
  Navtitle: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
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
});
