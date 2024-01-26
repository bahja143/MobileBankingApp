import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, FontAwesome5, FontAwesome, Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";
import { useRef, useState } from "react";
import * as Share from "expo-sharing";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Logo from "../assets/Logo.png";

export default function TransferDetailScreen() {
  const ref = useRef();
  const [isSave, setIsSave] = useState(false);

  const handleCapture = async () => {
    if (isSave) return;

    ref.current?.capture().then(async (uri) => {
      await MediaLibrary.saveToLibraryAsync(uri);
      setIsSave(true);
    });
  };
  const handleShare = async () => {
    ref.current?.capture().then(async (uri) => {
      await Share.shareAsync(uri);
    });
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.titleNav} semibold>
            Transfer Detail
          </Text>
        </View>
        <View ref={ref} style={styles.receipt}>
          <View style={styles.receiptHeader}>
            <View style={styles.iconContainer}>
              <View style={styles.iconSubContainer}>
                <FontAwesome5
                  size={50}
                  name="check"
                  style={styles.done}
                  color={colors.white}
                />
              </View>
            </View>
            <Text style={styles.title} bold>
              Transfer
            </Text>
            <Text style={styles.subTitle}>
              You've successfully transferred money
            </Text>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balance} bold>
              ETB 25,000
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                From:
              </Text>
              <Text style={styles.itemLabel} semibold>
                Abdisalam Farah Abdi
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Account No:
              </Text>

              <Text style={styles.itemValue} semibold>
                0272010000033
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                To:
              </Text>
              <Text style={styles.itemLabel} semibold>
                Bahja Abdiaziz Hassan
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Account No:
              </Text>

              <Text style={styles.itemValue} semibold>
                0032010002420
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                Date:
              </Text>
              <Text style={styles.itemLabel} semibold>
                {new Date().toDateString()}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Time:
              </Text>

              <Text style={styles.itemValue} semibold>
                {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <View style={styles.subBtnCont}>
              <TouchableOpacity
                onPress={handleCapture}
                style={[
                  styles.btnClose,
                  isSave && { backgroundColor: colors.lighter },
                ]}
              >
                <Feather
                  size={23}
                  name="download"
                  color={colors.primary}
                  style={isSave && { color: colors.medium }}
                />
                <Text
                  style={[
                    styles.btnText,
                    styles.btnCloseText,
                    isSave && { color: colors.medium },
                  ]}
                  semibold
                >
                  {isSave ? "Saved" : "Save"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleShare}
                style={[
                  styles.btnClose,
                  isSave && { backgroundColor: colors.lighter },
                ]}
              >
                <FontAwesome
                  size={23}
                  name="share-square-o"
                  color={colors.primary}
                />
                <Text
                  style={[
                    styles.btnText,
                    styles.btnCloseText,
                    isSave && { color: colors.medium },
                  ]}
                  semibold
                >
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ViewShot
        ref={ref}
        style={[
          styles.container,
          {
            zIndex: -9999,
            width: "100%",
            height: "100%",
            paddingTop: 80,
            position: "absolute",
          },
        ]}
        options={{ fileName: "TransferNote" }}
      >
        <View style={styles.receipt}>
          <View style={styles.receiptHeader}>
            <View style={styles.iconContainer}>
              <View style={styles.iconSubContainer}>
                <FontAwesome5
                  size={50}
                  name="check"
                  style={styles.done}
                  color={colors.white}
                />
              </View>
            </View>
            <Text style={styles.title} bold>
              Transfer
            </Text>
            <Text style={styles.subTitle}>
              You've successfully transferred money
            </Text>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balance} bold>
              ETB 25,000
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                From:
              </Text>
              <Text style={styles.itemLabel} semibold>
                Abdisalam Farah Abdi
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Account No:
              </Text>

              <Text style={styles.itemValue} semibold>
                0272010000033
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                To:
              </Text>
              <Text style={styles.itemLabel} semibold>
                Bahja Abdiaziz Hassan
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Account No:
              </Text>

              <Text style={styles.itemValue} semibold>
                0032010002420
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                Date:
              </Text>
              <Text style={styles.itemLabel} semibold>
                {new Date().toDateString()}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Time:
              </Text>

              <Text style={styles.itemValue} semibold>
                {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Image style={styles.logo} source={Logo} />
            <View>
              <Text style={styles.bottomTitle} bold>
                Shabelle Bank
              </Text>
              <Text style={styles.bottomText} semibold>
                Bank of Ethics
              </Text>
            </View>
          </View>
        </View>
      </ViewShot>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  titleNav: {
    fontSize: 17,
    textAlign: "center",
    color: colors.white,
  },
  navIconCont: {
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 2,
    backgroundColor: colors.white,
  },
  navCont: {
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  iconSubContainer: {
    width: 75,
    padding: 5,
    height: 75,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
  },
  iconContainer: {
    borderWidth: 20,
    borderRadius: 250,
    marginVertical: 25,
    backgroundColor: colors.green,
    borderColor: "rgba(75, 181, 67, 0.15)",
  },
  subBtnCont: {
    width: "auto",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 45,
    marginHorizontal: 15,
    backgroundColor: colors.white,
  },
  bottomTitle: {
    fontSize: 16,
    color: colors.black,
  },
  bottomText: {
    color: colors.green,
  },
  bottomContainer: {
    height: 75,
    width: "100%",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: colors.light,
  },
  btnContainer: {
    marginVertical: 20,
  },
  btnCloseText: {
    fontSize: 13,
    marginTop: 5,
    color: colors.medium,
  },
  btnClose: {
    borderRadius: 7.5,
    paddingVertical: 12,
    marginHorizontal: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  btn: {
    marginTop: 20,
    borderRadius: 7.5,
    alignItems: "center",
    paddingVertical: 12.5,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
    color: colors.white,
    textTransform: "capitalize",
  },
  itemContainer: {
    marginTop: 22.5,
    paddingBottom: 2.5,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.lighter,
  },
  itemLabel: {
    color: colors.black,
  },
  itemValue: {
    fontSize: 13,
    marginTop: 7.5,
    color: colors.medium,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balance: {
    fontSize: 24,
    paddingVertical: 10,
    color: colors.black,
    paddingHorizontal: 15,
  },
  balanceContainer: {
    height: 70,
    width: "85%",
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 12.5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  subTitle: {
    fontSize: 13.5,
    color: colors.medium,
  },
  title: {
    fontSize: 22,
    color: colors.black,
  },
  receiptHeader: {
    alignItems: "center",
  },
  receipt: {
    flex: 1,
    paddingHorizontal: 15,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
});
