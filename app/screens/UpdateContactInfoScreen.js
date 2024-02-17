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
import Modal from "react-native-modal";
import Lottie from "lottie-react-native";

import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { TextInputForm, BtnForm } from "../components/form";

import colors from "../config/colors";
import doneAnimation from "../assets/animation/Registered.json";

const schema = Yup.object({
  mobile: Yup.string().label("Mobile"),
  email: Yup.string().email().label("Email"),
});

export default function UpdateContactInfoScreen({ navigation }) {
  const [info] = useState({
    mobile: "+252636438641",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);
    }, 3000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Modal
        isVisible={isDone}
        animationOut="fadeOut"
        animationIn="slideInUp"
        animationOutTiming={50}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <Lottie loop={false} autoPlay source={doneAnimation} />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Success
            </Text>
            <Text style={styles.modalText} semibold>
              Contact info successful updated
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsDone(false);
              navigation.goBack();
            }}
            style={[
              styles.modalBtn,
              {
                borderWidth: 0,
                paddingVertical: 11,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text
              style={[styles.modalBtnText, { color: colors.white }]}
              semibold
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navIconCont}
          >
            <Entypo name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Update Contact Information
          </Text>
        </View>

        <ScrollView keyboardShouldPersistTaps="always">
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  modalTrashIcon: {
    top: -10,
    width: 110,
    height: 110,
    borderRadius: 150,
    alignItems: "center",
    marginVertical: -20,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalBtn: {
    width: "100%",
    marginTop: 8,
    borderWidth: 1.25,
    borderRadius: 7.5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.light,
    backgroundColor: colors.white,
  },
  modalBtnText: {
    fontSize: 15,
    color: colors.black,
  },
  modalDelete: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    top: -2,
    fontSize: 15,
    color: colors.black,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginVertical: 10,
    alignItems: "center",
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
    marginTop: 10,
    marginBottom: 25,
    alignItems: "center",
    flexDirection: "row",
  },
});
