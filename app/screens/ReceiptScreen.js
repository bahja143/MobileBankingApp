import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRef, useState, useContext, useEffect } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";
import LottiView from "lottie-react-native";
import * as Share from "expo-sharing";
import { Audio } from "expo-av";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Ding from "../assets/sound/Ding.mp3";
import Logo from "../assets/images/Logo.png";
import Done from "../assets/animation/Done.json";

import authContext from "../context/AuthContext";

export default function ReceiptScreen({ route, navigation }) {
  const ref = useRef();
  const { account } = useContext(authContext);
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
    sound.setVolumeAsync(0.5);

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
              {Number(route.params?.transfer?.amount).toLocaleString("en-US", {
                style: "currency",
                currency: "ETB",
              })}
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                From:
              </Text>
              <Text style={styles.itemLabel} semibold>
                {account.name}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Account No:
              </Text>

              <Text style={styles.itemValue} semibold>
                {account.account}
              </Text>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text style={styles.itemLabel} semibold>
                To:
              </Text>
              <Text style={styles.itemLabel} semibold>
                {route.params?.toAccount.name}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemValue} semibold>
                Account No:
              </Text>

              <Text style={styles.itemValue} semibold>
                {route.params?.toAccount.account}
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

            <TouchableOpacity
              onPress={() => navigation.navigate("MainNavigation")}
              style={styles.btn}
            >
              <Text style={styles.btnText} semibold>
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
            position: "absolute",
          },
        ]}
        options={{ fileName: "TransferNote" }}
      >
        <View style={styles.receipt}>
          <View style={styles.receiptHeader}>
            <View>
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

          <View style={styles.body}>
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
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  body: {
    height: 225,
    justifyContent: "space-between",
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
    marginRight: 8,
    marginLeft: 12,
    backgroundColor: colors.white,
  },
  bottomTitle: {
    fontSize: 16,
    color: colors.primary,
  },
  bottomText: {
    fontSize: 15,
    color: colors.green,
  },
  bottomContainer: {
    top: 20,
    height: 75,
    width: "100%",
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
    top: 20,
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
    borderBottomWidth: 0.8,
    borderBottomColor: colors.lighter,
  },
  itemLabel: {
    fontSize: 15,
    color: colors.black,
  },
  itemValue: {
    fontSize: 15,
    marginTop: 7.5,
    color: colors.medium,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balance: {
    fontSize: 25,
    paddingVertical: 10,
    color: colors.black,
    paddingHorizontal: 15,
  },
  balanceContainer: {
    top: -7.5,
    height: 70,
    width: "75%",
    borderRadius: 10,
    marginBottom: 20,
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
    flex: 0.95,
    borderRadius: 18,
    paddingHorizontal: 15,
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
});
