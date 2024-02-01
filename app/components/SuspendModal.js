import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import Text from "./CustomText";
import colors from "../config/colors";

import Modal from "react-native-modal";

export default function SuspendModal({ isVisible, type }) {
  return (
    <Modal
      isVisible={isVisible}
      animationOut="fadeOut"
      animationIn="slideInUp"
      animationOutTiming={50}
    >
      <View style={styles.modalDelete}>
        <AntDesign
          size={36}
          name="warning"
          color={colors.danger}
          style={styles.modalTrashIcon}
        />
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalTitle} bold>
            Temporary suspended
          </Text>
          <Text style={styles.modalText}>
            The maximum number of {type} attempts has been reached.{" "}
            <Text semibold>Account paused for an hour. </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalTrashIcon: {
    marginVertical: 5,
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
    color: colors.black,
  },
  modalDelete: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    top: -5,
    fontSize: 15,
    marginBottom: 10,
    color: colors.black,
  },
  modalText: {
    lineHeight: 19.5,
    marginBottom: 5,
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});
