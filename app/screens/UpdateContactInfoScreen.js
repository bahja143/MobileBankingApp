import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  mobile: Yup.string().label("Mobile"),
  email: Yup.string().email().label("Email"),
});

export default function UpdateContactInfoScreen() {
  const [info] = useState({
    mobile: "+252636438641",
    email: "",
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
      <View style={styles.navCont}>
        <TouchableOpacity style={styles.navIconCont}>
          <Entypo name="chevron-left" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.Navtitle} semibold>
          Update Contact Information
        </Text>
      </View>

      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
                <TextInputForm
                  disabled
                  name="mobile"
                  label="Mobile"
                  icon={
                    <FontAwesome5
                      size={22}
                      name="mobile-alt"
                      color={colors.primary}
                    />
                  }
                />

                <TextInputForm
                  name="email"
                  label="Email"
                  keyboardType="email-address"
                  icon={
                    <MaterialCommunityIcons
                      size={23}
                      name="email-outline"
                      color={colors.primary}
                    />
                  }
                />

                <View style={styles.btnCont}>
                  <BtnForm title="Save Update" />
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  btnCont: {
    marginTop: 25,
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
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
});
