import {
  View,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import { useState, useContext } from "react";

import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

import cache from "../utility/cache";
import colors from "../config/colors";
import authContext from "../context/AuthContext";

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
export default function ChangePasswordScreen({ navigation }) {
  const [info] = useState({
    current: "",
    confirm: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser, setIsAuth } = useContext(authContext);

  const handleSubmit = async (values) => {
    const settings = await cache.getItemAsync("settings");

    Keyboard.dismiss();
    if (values["current"] !== user["password"].password)
      return setErrorMessage("Invalid Current Password");

    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      await cache.setItemAsync("auth", {
        ...user,
        type: "password",
        password: { ...user.password, password: values["password"] },
      });
      await cache.setItemAsync("settings", { ...settings, pin: false });
      setUser({ ...user, type: "password" });
      setIsAuth(false);
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
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollStyle}
      >
        <View style={styles.navCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navIconCont}
          >
            <Entypo name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Change Password
          </Text>
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
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
  errorMessage: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    color: colors.danger,
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
    backgroundColor: colors.primary,
  },
  Navtitle: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 15,
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
