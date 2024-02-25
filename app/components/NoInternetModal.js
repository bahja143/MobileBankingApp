import Modal from "react-native-modal";
import WifiManager from "react-native-wifi-reborn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, View, TouchableOpacity, StyleSheet } from "react-native";

import Text from "./CustomText";
import colors from "../config/colors";

export default function NoInternetModal({ isVisible }) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOutTiming={500}
      animationOut="slideOutDown"
    >
      <View style={styles.modalDelete}>
        <View style={styles.modalTrashIcon}>
          <MaterialCommunityIcons
            size={40}
            name="wifi-alert"
            color={colors.primary}
          />
        </View>
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalTitle} bold>
            NO INTERNET
          </Text>
          <Text style={styles.modalText}>
            Check your internet connection and try again.
          </Text>
        </View>

        {/* <Text semibold style={styles.checkText}>
          Please turn on
        </Text>
        <View style={styles.bottomCont}>
          <TouchableOpacity
            onPress={handleOpenWifi}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]}>WIFI</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.modalBtn, { paddingVertical: 10 }]}>
            <Text style={[styles.modalBtnText]}>MOBILE DATA</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  checkText: {
    top: -4,
    fontSize: 15,
    marginTop: 20,
    color: colors.medium,
  },
  modalTrashIcon: {
    width: 60,
    height: 60,
    marginBottom: 7,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  modalBtn: {
    width: 127,
    height: 48,
    marginTop: 8,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  modalBtnText: {
    fontSize: 13,
    color: colors.white,
  },
  modalDelete: {
    width: "100%",
    borderRadius: 7.5,
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    top: -5,
    fontSize: 16.5,
    color: colors.black,
    textTransform: "capitalize",
  },
  modalText: {
    marginTop: 3,
    fontSize: 15,
    maxWidth: 279,
    marginBottom: 5,
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});
