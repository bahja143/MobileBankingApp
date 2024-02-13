import { Entypo } from "@expo/vector-icons";
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

import colors from "../config/colors";
import authContext from "../context/AuthContext";

const schema = Yup.object({
  mobile: Yup.string()
    .min(10, "Invalid Mobile No.")
    .required()
    .label("Mobile No."),
});
export default function ForgotCredentialScreen({ route, navigation }) {
  const [info] = useState({
    mobile: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(authContext);

  const handleSubmit = (values) => {
    setErrorMessage(null);
    Keyboard.dismiss();

    if (user["password"].username !== values["mobile"])
      return setErrorMessage("Invalid Mobile No.");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      if (route.params?.type === "pin")
        return navigation.navigate("verifyPin", values["mobile"]);

      navigation.navigate("verify", values["mobile"]);
    }, 3000);
  };
  console.log(route.params);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.navCont}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navIconCont}
        >
          <Entypo name="chevron-left" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.Navtitle} semibold>
          Forgot Credential
        </Text>
      </View>
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
                <Text style={styles.errorMessage}>{errorMessage}</Text>

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
                <BtnForm title="NEXT" />
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
    paddingHorizontal: 7.5,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  errorMessage: {
    top: -10,
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
    color: colors.danger,
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
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 7.5,
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
    top: -25,
    width: 120,
    height: 120,
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
