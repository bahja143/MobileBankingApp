import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";
import LottiView from "lottie-react-native";
import * as Share from "expo-sharing";
import { Audio } from "expo-av";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Logo from "../assets/Logo.png";
import Ding from "../assets/sound/Ding.mp3";
import Done from "../assets/animation/Done.json";

export default function ReceiptScreen() {
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
  const handlePlay = async () => {
    const { sound } = await Audio.Sound.createAsync(Ding);
    await sound.playAsync();
  };

  useEffect(() => {
    handlePlay();
  }, []);

  return (
    <>
      <View style={[styles.container]}>
        <View ref={ref} style={styles.receipt}>
          <View style={styles.receiptHeader}>
            <View style={styles.iconContainer}>
              <LottiView
                autoPlay
                loop={false}
                source={Done}
                style={styles.done}
              />
            </View>
            <Text style={styles.title} bold>
              Success
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

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText} bold>
                Done
              </Text>
            </TouchableOpacity>
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
              <LottiView
                style={styles.done}
                source={Done}
                autoPlay
                loop={false}
              />
            </View>
            <Text style={styles.title} bold>
              Success
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
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 7.5,
    backgroundColor: colors.primary,
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
    marginHorizontal: 10,
    borderRadius: 7.5,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  btn: {
    marginTop: 20,
    borderRadius: 7.5,
    paddingVertical: 12.5,
    alignItems: "center",
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
    marginTop: 7.5,
    fontSize: 13,
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
  done: {
    width: 150,
    height: 150,
  },
  receiptHeader: {
    alignItems: "center",
  },
  receipt: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
});
