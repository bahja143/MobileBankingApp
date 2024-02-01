import { Entypo } from "@expo/vector-icons";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

const schema = Yup.object({
  mobile: Yup.string()
    .min(10, "Invalid Mobile No.")
    .required()
    .label("Mobile No."),
});
export default function ForgotCredentialScreen() {
  const [info] = useState({
    mobile: "",
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
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    size={60}
                    name="lock-question"
                    color={colors["primary"]}
                  />
                </View>
                <Text style={styles.title} semibold>
                  Reset Credential
                </Text>
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

                <BtnForm textTransform="capitalize" title="Forgot Password" />
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
  title: {
    fontSize: 17,
    marginTop: 15,
    marginBottom: 40,
    textAlign: "center",
    color: colors["medium"],
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
  logo: {
    top: -140,
    width: 110,
    height: 90,
    alignSelf: "center",
    position: "absolute",
  },
});
