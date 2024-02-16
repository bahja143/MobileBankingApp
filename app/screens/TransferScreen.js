import {
  View,
  Keyboard,
  StyleSheet,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from "react-native";

import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "react-native-modal";
import { useState, useEffect, useContext } from "react";
import { Entypo, Octicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import ActivityIndicator from "../components/ActivityIndicator";
import ConfirmPinCodeModal from "../components/ConfirmPinCodeModal";
import { InputField1, PickerForm, BtnForm1 } from "../components/form";

import banks from "../data/banks.json";
import data from "../data/accounts.json";
import authContext from "../context/AuthContext";

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

export default function TransferScreen({ route, navigation }) {
  const [transfer, setTransfer] = useState({
    id: 0,
    amount: "",
    bankId: 1,
    comment: "",
    isAccountValid: true,
    accountNo: route.params?.account,
  });
  const [account, setAccount] = useState({
    ...data.find((d) => d.account == route.params?.account),
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const { user, account: myAccount } = useContext(authContext);

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
        let account = data.find((d) => d.account == accountNo.toString());
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
      setIsLoading(false);
      navigation.navigate("receipt", { transfer, toAccount: account });
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ConfirmPinCodeModal
        user={user}
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
                {Number(transfer.amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "ETB",
                })}
              </Text>
            </View>
          </View>

          <View style={styles.detail}>
            <View style={styles.detailItem}>
              <Text style={styles.detailItemLabel} semibold>
                To account name:
              </Text>

              <Text style={styles.detailItemValue} semibold>
                {account?.name}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailItemLabel} semibold>
                To account no:
              </Text>

              <Text style={styles.detailItemValue} semibold>
                {account?.account}
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
            <Text semibold style={styles.modalText}>
              You don't have enough balance
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
      <View style={styles.navCont}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainNavigation")}
          style={styles.navIconCont}
        >
          <Entypo name="chevron-left" size={30} color={colors.white} />
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
                <InputField1
                  name="amount"
                  placeholder="0.00"
                  icon="dollar-sign"
                  keyboardType="numeric"
                />
                <InputField1
                  name="comment"
                  icon="comment"
                  autoCapitalize="words"
                  placeholder="Comment"
                />
                <BtnForm1 semibold title="NEXT" margin={7.5} />
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
    color: colors.black,
    textTransform: "capitalize",
  },
  confirmBtnClose: {
    height: 50,
    justifyContent: "center",
    backgroundColor: colors.light,
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
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    color: colors.black,
  },
  modalText: {
    color: colors.medium,
    textTransform: "capitalize",
  },
  modalTextContainer: {
    marginVertical: 15,
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
