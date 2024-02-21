import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import Text from "./CustomText";
import colors from "../config/colors";

export default function TransferDetailModal({ isVisible, setShow, detail }) {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOutTiming={500}
      animationOut="slideOutDown"
      onBackdropPress={() => setShow(false)}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} bold>
            Transaction Detail
          </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShow(false)}
          >
            <AntDesign name="closecircleo" size={25.5} color={colors.medium} />
          </TouchableOpacity>
        </View>

        <View style={styles.detail}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle} bold>
              Status:
            </Text>

            <View style={styles.detailIconCont}>
              <MaterialCommunityIcons
                size={17}
                color={colors.green}
                name="check-decagram"
              />
              <Text
                style={[styles.detailItemSubt, { color: colors.green }]}
                semibold
              >
                Success
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle} bold>
              Amount:
            </Text>

            <View style={styles.detailIconCont}>
              <Text
                style={[
                  styles.detailItemAmount,
                  detail.type !== "Received" && {
                    color: colors.danger,
                    backgroundColor: "rgba(255, 82, 82, 0.15)",
                  },
                ]}
                semibold
              >
                {detail.type === "Received"
                  ? "+" + detail.amount?.toLocaleString("en-US")
                  : "-" + detail.amount?.toLocaleString("en-US")}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle} bold>
              Type:
            </Text>

            <View style={styles.detailIconCont}>
              <Text style={styles.detailItemSubt} semibold>
                {detail.type}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle} bold>
              Date:
            </Text>

            <View style={styles.detailIconCont}>
              <Text style={styles.detailItemSubt} semibold>
                {new Date().toDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle} bold>
              Description:
            </Text>

            <View style={styles.detailIconCont}>
              <Text style={styles.detailItemSubt} numberOfLines={1} semibold>
                {detail.description}
              </Text>
            </View>
          </View>

          <View style={[styles.detailItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailItemTitle} bold>
              Transaction Key:
            </Text>

            <View style={styles.detailIconCont}>
              <Text style={styles.detailItemSubt} semibold>
                9635678974
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: "100%",
    paddingTop: 12,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.white,
  },
  detailItemAmount: {
    fontSize: 15.6,
    marginRight: 20,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 7.5,
    marginVertical: -1.75,
    color: colors.primary,
    fontFamily: "Inter_600SemiBold",
    backgroundColor: colors.secondary,
  },
  detailIconCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItemSubt: {
    fontSize: 15,
    maxWidth: 230,
    marginLeft: 3,
    marginRight: 18,
    color: colors.black,
    fontFamily: "Inter_500Medium",
  },
  detailItemTitle: {
    fontSize: 15,
    marginLeft: 18,
    color: colors.medium,
    fontFamily: "Inter_500Medium",
  },
  detailItem: {
    marginTop: 19,
    paddingBottom: 14,
    flexDirection: "row",
    borderBottomWidth: 1.45,
    borderColor: colors.lighter,
    justifyContent: "space-between",
  },
  detail: {
    borderWidth: 1.5,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 25,
    paddingVertical: 12,
    marginHorizontal: 15,
    borderColor: colors.lighter,
    backgroundColor: "rgba(0,0,0,0.01)",
  },
  title: {
    fontSize: 15,
    marginLeft: 12,
    color: colors.black,
  },
  iconContainer: {
    marginRight: 12,
    borderRadius: 250,
  },
  header: {
    paddingBottom: 8,
    flexDirection: "row",
    borderBottomWidth: 1.25,
    borderColor: colors.lighter,
    justifyContent: "space-between",
  },
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
});
