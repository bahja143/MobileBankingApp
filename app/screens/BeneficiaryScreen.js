import {
  View,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "react-native-modal";
import Lottie from "lottie-react-native";
import { useState, useContext } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";
import { InputField1, PickerForm, BtnForm1 } from "../components/form";

import cache from "../utility/cache";
import colors from "../config/colors";

import banks from "../data/banks.json";
import data from "../data/accounts.json";

import authContext from "../context/AuthContext";
import doneAnimation from "../assets/animation/Registered.json";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().label("Name"),
  isAccountValid: Yup.boolean().required(),
  accountNo: Yup.string()
    .min(13, "Invalid Account No.")
    .required()
    .label("Account"),
});

export default function BeneficiaryScreen({ route, navigation }) {
  const [beneficiary, setBeneficiary] = useState({
    id: 0,
    isAccountValid: true,
    name: route.params ? route.params.name : "",
    accountNo: route.params ? route.params.account : "",
    bankId: route.params?.bank
      ? banks.find((b) => b.name == route.params?.bank)?.id
      : 1,
  });
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [existBeneficiary, setExistBeneficiary] = useState({});
  const { setBeneficiaries } = useContext(authContext);

  const handleSubmit = async (beneficiary) => {
    if (loading) return setIsLoading(true);
    if (!beneficiary["isAccountValid"]) return;
    const beneficiaries = await cache.getItemAsync("beneficiaries");
    const data = beneficiaries ? beneficiaries : [];

    if (data.find((b) => b.accountNo == beneficiary["accountNo"])) {
      setExistBeneficiary(
        data.find((b) => b.accountNo == beneficiary["accountNo"])
      );
      return setIsAlreadyExist(true);
    }

    Keyboard.dismiss();
    setIsLoading(true),
      setTimeout(async () => {
        setBeneficiary(beneficiary);
        await cache.setItemAsync(
          "beneficiaries",
          [
            { ...beneficiary, id: data.length === 0 ? 1 : data.length++ },
            ...data,
          ].filter((b) => b !== undefined)
        );
        setBeneficiaries(
          [
            { ...beneficiary, id: data.length === 0 ? 1 : data.length++ },
            ...data,
          ].filter((b) => b !== undefined)
        );
        setIsLoading(false);
        setIsDone(true);
      }, 3000);
  };
  const handleCheckAccountNo = (accountNo, setFieldValue) => {
    setLoading(true);
    setFieldValue("name", "");

    setTimeout(() => {
      let account = accountNo.split("");
      let count = 0;

      for (let index = 0; index < account.length; index++) {
        count++;
      }

      if (count == 13) {
        setLoading(false);
        let account = data.find((d) => d.account == accountNo.toString());
        setIsLoading(false);

        if (account) {
          setFieldValue("name", account.name);
          setFieldValue("accountNo", accountNo);
          setFieldValue("isAccountValid", true);

          return;
        }

        return setFieldValue("isAccountValid", false);
      }
    }, 3000);
  };
  const handleTransferMoney = () => {
    setIsDone(false);
    navigation.navigate("transfer", {
      ...beneficiary,
      account: beneficiary.accountNo,
    });
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
              Beneficiary successful registered!
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleTransferMoney}
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
              Send Money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsDone(false);
              navigation.navigate("beneficiaries");
            }}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} semibold>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationOut="fadeOut"
        animationIn="slideInUp"
        animationOutTiming={50}
        isVisible={isAlreadyExist}
      >
        <View style={styles.modalDelete}>
          <View
            style={[
              styles.modalTrashIcon,
              { backgroundColor: colors.white, height: 75, width: 75 },
            ]}
          >
            <MaterialCommunityIcons
              size={32.5}
              color={colors.danger}
              name="account-convert"
            />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              {existBeneficiary.name}
            </Text>
            <Text style={styles.modalText} semibold>
              Beneficiary already exist!
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleTransferMoney}
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
              Send Money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsAlreadyExist(false)}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} semibold>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.navCont}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainNavigation")}
          style={styles.navIconCont}
        >
          <Entypo name="chevron-left" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title} semibold>
          New Beneficiary
        </Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.main}
      >
        <View style={styles.container}>
          <Formik
            enableReinitialize
            onSubmit={handleSubmit}
            validationSchema={schema}
            initialValues={beneficiary}
          >
            {({ values, setFieldValue }) => (
              <>
                <InputField1
                  required
                  maxLength={13}
                  icon="wallet"
                  name="accountNo"
                  isLoading={loading}
                  keyboardType="numeric"
                  placeholder="Account no."
                  value={values["accountNo"]}
                  invalid={!values["isAccountValid"]}
                  onChange={(value) =>
                    handleCheckAccountNo(value, setFieldValue, values)
                  }
                  errorMessage={
                    values["isAccountValid"] ? null : "Invalid Account No."
                  }
                />
                <InputField1 icon="user-alt" name="name" placeholder="Name" />
                <PickerForm
                  label="Bank"
                  name="bankId"
                  icon="align-justify"
                  autoCapitalize="words"
                  options={banks.map((b) => ({ id: b.id, label: b.name }))}
                />
                <BtnForm1 title="CREATE" margin={7.5} />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 7.5,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
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
  errorMessage: {
    alignSelf: "center",
  },
});
