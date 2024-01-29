import React, { useState } from "react";
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";

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

export default function VerificationScreen({ route }) {
  const [data] = useState({ code: "" });
  const [loading, setIsLoading] = useState(false);

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
      <ActivityIndicator visible={loading} />
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
              <FontAwesome5
                size={60}
                name="envelope-open-text"
                color={colors["primary"]}
              />
            </View>
            <Text style={styles.title} bold>
              Verification
            </Text>
            <Text style={styles.subtitle} semibold>
              You will get a OTP via <Text style={styles.bold}>SMS</Text>
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
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  maxLength={4}
                  style={styles.code}
                  label="Enter OTP"
                  icon={
                    <MaterialCommunityIcons
                      size={25}
                      color={colors.primary}
                      name="form-textbox-password"
                    />
                  }
                />
                <BtnForm title="Verify" />
              </>
            </Formik>
          </View>
        </KeyboardAvoidingView>

        <Text style={styles.text} semibold>
          Didn't receive the verification OTP?{" "}
          <Text style={styles.resend} bold>
            Resend again
          </Text>
        </Text>
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
  iconContainer: {
    width: 125,
    height: 125,
    borderRadius: 75,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["lighter"],
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
  text: {
    marginTop: 25,
    textAlign: "center",
    color: colors["medium"],
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
