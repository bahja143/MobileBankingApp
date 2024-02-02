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
import { Entypo, Octicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import ActivityIndicator from "../components/ActivityIndicator";
import ConfirmPinCodeModal from "../components/ConfirmPinCodeModal";
import { InputField1, PickerForm, BtnForm1 } from "../components/form";

const schema = Yup.object({
  id: Yup.number(),
  bankId: Yup.number().label("Bank"),
  accountNo: Yup.string()
    .min(13, "Invalid Account No.")
    .required()
    .label("Account"),
  amount: Yup.number("Amount must be Number")
    .typeError("Amount must be Number")
    .required()
    .label("Amount"),
  isAccountValid: Yup.boolean().required(),
  description: Yup.string().label("Description"),
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

export default function TransferScreen() {
  const [transfer, setTransfer] = useState({
    id: 0,
    amount: "",
    bankId: 1,
    comment: "",
    accountNo: "",
    isAccountValid: true,
  });
  const [myAccount] = useState({
    id: 1,
    name: "Abdisalam Farah Abdi",
    accountNo: "0272010000033",
    balance: 125,
  });
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleTransfer = (transfer) => {
    if (loading) return setIsLoading(true);
    if (!transfer["isAccountValid"]) return;
    if (transfer.amount >= myAccount.balance) return setVisible(true);

    Keyboard.dismiss();
    setIsLoading(true);
    setTimeout(() => {
      setTransfer(transfer);
      setShowConfirm(true);
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
          setAccount(account);
          setFieldValue("accountNo", accountNo);
          setFieldValue("isAccountValid", true);

          return;
        }

        return setFieldValue("isAccountValid", false);
      }
    }, 5000);
  };
  const handleSubmit = () => {
    setShowConfirmPin(false);
    setIsLoading(true);
    setTimeout(() => {
      console.log("submitted: ", transfer);
      setIsLoading(false);
    }, 3000);
  };
  const handleConfirm = () => {
    setShowConfirm(false);
    setShowConfirmPin(true);
  };
  const handleClose = () => {
    setShowConfirm(true);
    setShowConfirmPin(false);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ConfirmPinCodeModal
        onClose={handleClose}
        onSubmit={handleSubmit}
        isVisible={showConfirmPin}
      />
      <Modal
        swipeDirection="down"
        isVisible={showConfirm}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={600}
        animationOut="slideOutDown"
        style={styles.modalContainer}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={600}
        onSwipeComplete={() => setShowConfirm(false)}
        onBackdropPress={() => setShowConfirm(false)}
      >
        <View style={styles.confirmModal}>
          <View style={styles.subConfirmModal}>
            <Octicons name="horizontal-rule" size={40} color={colors.light} />
            <View style={styles.confirmIconContainer}>
              <FontAwesome5 name="exclamation" size={25} color={colors.white} />
            </View>
            <Text style={styles.confirmModalTitle} semibold>
              Confirm Transaction
            </Text>
            <View style={styles.confirmBalanceCont}>
              <Text style={styles.confirmBalance} bold>
                {transfer.amount}.00
              </Text>
            </View>
          </View>

          <View style={styles.detail}>
            <View style={styles.detailItem}>
              <Text style={styles.detailItemLabel} semibold>
                To Account Name:
              </Text>

              <Text style={styles.detailItemValue} semibold>
                {account.Name?.firstName} {account.Name?.middleName}{" "}
                {account.Name?.lastName}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailItemLabel} semibold>
                To Account No:
              </Text>

              <Text style={styles.detailItemValue} semibold>
                {account.Account}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailItemLabel} semibold>
                Date:
              </Text>

              <View style={styles.detailDate}>
                <Text style={styles.detailItemValue} semibold>
                  {new Date().toDateString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.confirmBtnCont}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[styles.modalBtn, styles.confirmBtnConfirm]}
            >
              <Text
                style={[styles.modalBtnText, styles.confirmBtnConfirmText]}
                semibold
              >
                CONFIRM
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowConfirm(false)}
              style={[styles.modalBtn, styles.confirmBtnClose]}
            >
              <Text
                style={[styles.modalBtnText, styles.confirmBtnCloseText]}
                semibold
              >
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
              Failed Transaction!
            </Text>
            <Text style={styles.modalText}>You don't have enough balance</Text>
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
      <View style={styles.navCont}>
        <TouchableOpacity style={styles.navIconCont}>
          <Entypo name="chevron-left" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title} semibold>
          Transfer Money
        </Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.main}
      >
        <View style={styles.container}>
          <Formik
            enableReinitialize
            initialValues={transfer}
            validationSchema={schema}
            onSubmit={handleTransfer}
          >
            {({ values, setFieldValue }) => (
              <>
                <PickerForm
                  label="Bank"
                  name="bankId"
                  icon="align-justify"
                  autoCapitalize="words"
                  options={banks.map((b) => ({ id: b.id, label: b.name }))}
                />
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
                <InputField1
                  name="amount"
                  placeholder="0.00"
                  icon="money-bill-alt"
                  keyboardType="numeric"
                />
                <InputField1
                  name="comment"
                  icon="align-justify"
                  autoCapitalize="words"
                  placeholder="Comment"
                />
                <BtnForm1 bold title="NEXT" margin={7.5} />
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
    backgroundColor: colors.lighter,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  confirmBtnConfirmText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  confirmBtnConfirm: {
    height: 50,
    justifyContent: "center",
  },
  confirmBtnCloseText: {
    fontSize: 16,
    color: colors.primary,
    textTransform: "capitalize",
  },
  confirmBtnClose: {
    height: 50,
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  confirmBtnCont: {
    marginHorizontal: 5,
  },
  detailDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItemLabel: {
    fontSize: 14.5,
    color: colors.medium,
  },
  detailItemValue: {
    fontSize: 14.5,
    color: colors.black,
    alignItems: "baseline",
    textTransform: "capitalize",
  },
  detailItem: {
    marginVertical: 15,
    paddingBottom: 7.5,
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    borderBottomColor: colors.lighter,
  },
  detail: {
    marginTop: 30,
    marginHorizontal: 5,
  },
  confirmBalanceCont: {
    width: 200,
    height: 50,
    marginTop: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  confirmBalance: {
    fontSize: 22,
    color: colors.black,
  },
  confirmIconContainer: {
    width: 50,
    height: 50,
    marginTop: -7.5,
    borderRadius: 50,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  confirmModalTitle: {
    marginTop: 5,
    color: colors.medium,
  },
  modalContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },
  subConfirmModal: {
    alignItems: "center",
  },
  confirmModal: {
    width: "100%",
    marginLeft: -20,
    marginBottom: -25,
    paddingBottom: 40,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.white,
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
    textTransform: "uppercase",
  },
  modal: {
    height: 200,
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
    color: colors.medium,
    textTransform: "capitalize",
  },
  modalTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  main: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: 7.5,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
  },
  errorMessage: {
    alignSelf: "center",
  },
});
