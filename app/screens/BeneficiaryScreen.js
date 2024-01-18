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

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import { InputField1, PickerForm, BtnForm1 } from "../components/form";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().label("Name"),
  isAccountValid: Yup.boolean().required(),
  accountNo: Yup.string()
    .min(13, "Invalid Account No.")
    .required()
    .label("Account"),
});

const data = [
  {
    Id: 1,
    Name: {
      firstName: "Diana",
      lastName: "Jack",
      middleName: "Irene",
    },
    Account: "5189175660838",
  },
  {
    Id: 2,
    Name: {
      firstName: "Charlie",
      lastName: "Grace",
      middleName: "Bob",
    },
    Account: "3703284264799",
  },
  {
    Id: 3,
    Name: {
      firstName: "Harry",
      lastName: "Harry",
      middleName: "Diana",
    },
    Account: "8752994657829",
  },
  {
    Id: 4,
    Name: {
      firstName: "Bob",
      lastName: "Jack",
      middleName: "Frank",
    },
    Account: "1400698080874",
  },
  {
    Id: 5,
    Name: {
      firstName: "Alice",
      lastName: "Irene",
      middleName: "Frank",
    },
    Account: "7579333944348",
  },
  {
    Id: 6,
    Name: {
      firstName: "Harry",
      lastName: "Eve",
      middleName: "Frank",
    },
    Account: "1194989860702",
  },
  {
    Id: 7,
    Name: {
      firstName: "Bob",
      lastName: "Harry",
      middleName: "Jack",
    },
    Account: "9962878623715",
  },
  {
    Id: 8,
    Name: {
      firstName: "Frank",
      lastName: "Grace",
      middleName: "Irene",
    },
    Account: "6382348098347",
  },
  {
    Id: 9,
    Name: {
      firstName: "Alice",
      lastName: "Diana",
      middleName: "Jack",
    },
    Account: "1828359688819",
  },
  {
    Id: 10,
    Name: {
      firstName: "Charlie",
      lastName: "Jack",
      middleName: "Grace",
    },
    Account: "1481311198646",
  },
];
const banks = [
  { id: 1, name: "Shabelle Bank" },
  { id: 2, name: "Awash Bank" },
  { id: 3, name: "Commercial Bank" },
  { id: 4, name: "Dashen Bank" },
];

export default function BeneficiaryScreen() {
  const [beneficiary, setBeneficiary] = useState({
    id: 0,
    name: "",
    bankId: 1,
    accountNo: "",
    isAccountValid: true,
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (beneficiary) => {
    if (loading) return setIsLoading(true);
    if (!beneficiary["isAccountValid"]) return;

    Keyboard.dismiss();
    setIsLoading(true),
      setTimeout(() => {
        setBeneficiary(beneficiary);
        console.log("submitted: ", beneficiary);
        setIsLoading(false);
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
        let account = data.find((d) => d.Account == accountNo.toString());
        setIsLoading(false);

        if (account) {
          setFieldValue(
            "name",
            `${account.Name?.firstName} ${account.Name?.middleName} ${account.Name?.lastName}`
          );
          setFieldValue("accountNo", accountNo);
          setFieldValue("isAccountValid", true);

          return;
        }

        return setFieldValue("isAccountValid", false);
      }
    }, 3000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.navCont}>
        <TouchableOpacity style={styles.navIconCont}>
          <Entypo name="chevron-left" size={30} color={colors.primary} />
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
                <InputField1 icon="user-alt" name="name" placeholder="Name" />
                <PickerForm
                  label="Bank"
                  name="bankId"
                  options={banks.map((b) => ({ id: b.id, label: b.name }))}
                  icon="align-justify"
                  autoCapitalize="words"
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
    padding: 4,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.lighter,
  },
  navCont: {
    marginTop: 15,
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
  errorMessage: {
    alignSelf: "center",
  },
});
