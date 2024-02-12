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
import Modal from "react-native-modal";
import { Entypo, AntDesign } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { InputField1, BtnForm1 } from "../components/form";

const schema = Yup.object({
  id: Yup.number(),
  accountNo: Yup.string()
    .min(13, "Invalid Account No.")
    .required()
    .label("Account"),
  mobile: Yup.string("")
    .min(10, "Invalid Mobile No.")
    .required()
    .label("Mobile No."),
  isAccountValid: Yup.boolean().required(),
});

import data from "../data/accounts.json";

export default function SignUpScreen({ navigation }) {
  const [transfer, setTransfer] = useState({
    id: 0,
    mobile: "",
    accountNo: "",
    isAccountValid: true,
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (transfer) => {
    setErrorMessage("");
    if (loading) return setIsLoading(true);
    if (!transfer["isAccountValid"]) return setVisible(true);

    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (
        data.find((d) => d.Account == transfer["accountNo"]).mobile !==
        transfer["mobile"]
      )
        return setErrorMessage("Invalid Account!");

      setTransfer(transfer);
      navigation.navigate(
        "verify",
        data.find((d) => d.Account == transfer["accountNo"]).mobile
      );
      setIsLoading(false);
    }, 3000);
  };
  const handleCheckAccountNo = (accountNo, setFieldValue) => {
    setLoading(true);

    setTimeout(() => {
      let account = accountNo.split("");
      let count = 0;

      for (let index = 0; index < account.length; index++) {
        count++;
      }

      if (count == 13) {
        setLoading(false);
        let account = data.find((d) => d.Account == accountNo.toString());
        setIsLoading(false);

        if (account) {
          setFieldValue("accountNo", accountNo);
          setFieldValue("isAccountValid", true);

          return;
        }

        return setFieldValue("isAccountValid", false);
      }
    }, 5000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={600}
        animationOut="slideOutDown"
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={600}
      >
        <View style={styles.modal}>
          <AntDesign name="closecircleo" size={40} color={colors.danger} />
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Invalid Account!
            </Text>
            <Text style={styles.modalText} semibold>
              Please check your Account Number or Mobile Number
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText, { fontSize: 16 }]} bold>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.main}
      >
        <View style={styles.container}>
          <View style={styles.navCont}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.navIconCont}
            >
              <Entypo name="chevron-left" size={30} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.title} semibold>
              Onboarding
            </Text>
          </View>

          <Formik
            enableReinitialize
            onSubmit={handleSubmit}
            initialValues={transfer}
            validationSchema={schema}
          >
            {({ values, setFieldValue }) => (
              <>
                {errorMessage && (
                  <Text semibold style={styles.errorMessage}>
                    {errorMessage}
                  </Text>
                )}
                <InputField1
                  required
                  icon="wallet"
                  maxLength={13}
                  name="accountNo"
                  isLoading={loading}
                  keyboardType="numeric"
                  placeholder="Account No."
                  value={values["accountNo"]}
                  invalid={!values["isAccountValid"]}
                  onChange={(value) =>
                    handleCheckAccountNo(value, setFieldValue, values)
                  }
                  errorMessage={
                    values["isAccountValid"] ? null : "Invalid Account No."
                  }
                />

                <InputField1
                  name="mobile"
                  maxLength={10}
                  icon="mobile-alt"
                  keyboardType="numeric"
                  placeholder="09xxxxxxx"
                  value={values["accountNo"]}
                />

                <BtnForm1 title="NEXT" margin={7.5} />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessage: {
    top: -20,
    fontSize: 16,
    textAlign: "center",
    color: colors.danger,
  },
  modalBtn: {
    width: "100%",
    marginTop: 15,
    borderRadius: 7.5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  modalBtnText: {
    color: colors.white,
  },
  modal: {
    height: 210,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    top: -5,
    fontSize: 15,
    color: colors.black,
  },
  modalText: {
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 7.5,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
  },
});
