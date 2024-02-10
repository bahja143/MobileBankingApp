import { useState, useEffect, useCallback } from "react";
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

const schema = Yup.object({
  code: Yup.string()
    .min(4, "Code must be at least 4 numbers")
    .required()
    .label("Code"),
});

export default function VerificationScreen({ navigation }) {
  const [data] = useState({ code: "" });
  const [timer, setTimer] = useState(120);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setIsLoading(false);
      console.log("Hello, world");
      navigation.navigate("createPassword", values);
    }, 3000);
  };
  const resetTimer = function () {
    console.log("Hello");
    if (!timer) {
      setTimer(120);
    }
  };

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.navCont}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navIconCont}
        >
          <Entypo name="chevron-left" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.Navtitle} semibold>
          OTP
        </Text>
      </View>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => -250,
          })()}
        >
          <View>
            <View style={styles.iconContainer}>
              <Text style={styles.timer} bold>
                {timer}
              </Text>
            </View>
            <Text style={styles.title} bold>
              Verification
            </Text>
            <Text style={styles.subtitle} semibold>
              You will get a OTP via <Text bold>0907005112</Text>
            </Text>
          </View>

          <View style={styles.form}>
            <Formik
              initialValues={data}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              <>
                <TextInputForm
                  name="code"
                  maxLength={4}
                  label="Enter OTP"
                  placeholder="Enter"
                  style={styles.code}
                  keyboardType="numeric"
                  icon={
                    <MaterialCommunityIcons
                      size={25}
                      color={colors.primary}
                      name="form-textbox-password"
                    />
                  }
                />
                <BtnForm disabled={timer === 0} title="Verify" />
              </>
            </Formik>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.BottomTextCont}>
          <Text style={styles.bottomText} semibold>
            Didn't receive the verification OTP?
          </Text>
          <TouchableOpacity disabled={timer !== 0} onPress={resetTimer}>
            <Text
              style={[styles.resend, timer !== 0 && { color: colors.medium }]}
              bold
            >
              Resend again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
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
  timer: {
    fontSize: 40,
    color: colors.primary,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderWidth: 1.5,
    borderRadius: 75,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.secondary,
    backgroundColor: colors["white"],
  },
  title: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    color: colors["black"],
  },
  subtitle: {
    fontSize: 15,
    marginTop: 2,
    textAlign: "center",
    color: colors["medium"],
  },
  form: {
    width: "100%",
    marginTop: 45,
    paddingHorizontal: 10,
  },
  code: {
    fontSize: 25,
    width: "100%",
    letterSpacing: 10,
    textAlign: "center",
  },
  bottomText: {
    color: colors["medium"],
  },
  BottomTextCont: {
    marginTop: 25,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  resend: {
    color: colors["primary"],
  },
  invalidCode: {
    top: 45,
    left: -45,
    fontSize: 16,
    textAlign: "center",
    color: colors.danger,
  },
  box: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderColor: "red",
    marginVertical: 20,
  },
});
