import * as Share from "expo-sharing";
import { useRef, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { Entypo, FontAwesome, Feather } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Logo from "../assets/Logo.png";

export default function MyQRCodeScreen() {
  const [isSave, setIsSave] = useState(false);
  const [myAccount] = useState({
    bank: "Shabelle Bank",
    account: "0272010000033",
    name: "Abdisalam Farah Abdi",
  });
  const ref = useRef();

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
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            My QR Code
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.qrContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title} bold>
                Abdisalam Farah Abdi
              </Text>
              <Text semibold style={styles.text}>
                Share your <Text bold>personal code</Text> for what ever reason!
              </Text>
            </View>
            <View style={styles.qr}>
              <QRCode
                size={275}
                logo={Logo}
                logoSize={65}
                style={styles.qr}
                color={colors.black}
                logoBorderRadius={5}
                value={JSON.stringify(myAccount)}
                logoBackgroundColor={colors.white}
              />
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
        options={{ fileName: "ShabelleBankQRCode" }}
      >
        <View style={styles.body}>
          <View style={styles.qrContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title} bold>
                Abdisalam Farah Abdi
              </Text>
              <Text semibold style={styles.text}>
                Share your <Text bold>personal code</Text> for what ever reason!
              </Text>
            </View>
            <View style={styles.qr}>
              <QRCode
                size={275}
                logo={Logo}
                logoSize={50}
                style={styles.qr}
                color={colors.black}
                logoBorderRadius={5}
                value={JSON.stringify(myAccount)}
                logoBackgroundColor={colors.white}
              />
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
        </View>
      </ViewShot>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
  },
  qr: {
    marginVertical: 10,
    alignSelf: "center",
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
    height: 70,
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: colors.light,
  },
  subBtnCont: {
    width: "auto",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    width: 260,
    textAlign: "center",
    color: colors.medium,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  textContainer: {
    marginTop: 25,
    marginBottom: 30,
    alignItems: "center",
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  qrContainer: {
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
  Navtitle: {
    fontSize: 17,
    textAlign: "center",
    color: colors.white,
  },
  navIconCont: {
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 1,
    backgroundColor: colors.white,
  },
  navCont: {
    paddingTop: 10,
    marginLeft: -5,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
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
});
