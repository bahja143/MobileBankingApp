import * as Share from "expo-sharing";
import { useRef, useState, useContext } from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { Entypo, FontAwesome, Feather } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Logo from "../assets/images/Logo.png";
import authContext from "../context/AuthContext";

export default function MyQRCodeScreen({ navigation }) {
  const { account: myAccount } = useContext(authContext);
  const [isSave, setIsSave] = useState(false);
  const ref = useRef();

  const handleCapture = async () => {
    if (isSave)
      return showMessage({
        type: "success",
        message: "QR Code",
        description: "Successfully saved to your gallery",
      });

    ref.current?.capture().then(async (uri) => {
      await MediaLibrary.saveToLibraryAsync(uri);
      setIsSave(true);
    });

    return showMessage({
      type: "success",
      message: "QR Code",
      description: "Successfully saved to your gallery",
    });
  };
  const handleShare = async () => {
    ref.current?.capture().then(async (uri) => {
      await Share.shareAsync(uri);
    });
  };

  console.log(myAccount);

  return (
    <>
      <FlashMessage
        position="top"
        backgroundColor={colors.primary}
        textStyle={{ textAlign: "center", color: colors.primary }}
        titleStyle={{
          fontSize: 18,
          textAlign: "center",
          color: colors.primary,
        }}
        style={{ backgroundColor: colors.secondary }}
      />
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navIconCont}
          >
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
                {myAccount.name}
              </Text>
              <Text semibold style={styles.text}>
                Share your <Text bold>personal code</Text> for what ever reason!
              </Text>
            </View>
            <View style={styles.qr}>
              <QRCode
                size={300}
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
                    size={20}
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
                  style={[styles.btnClose]}
                >
                  <FontAwesome
                    size={20}
                    name="share-square-o"
                    color={colors.primary}
                  />
                  <Text style={[styles.btnText, styles.btnCloseText]} semibold>
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
          <View
            style={[
              styles.qrContainer,
              {
                flex: 0.87,
              },
            ]}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title} bold>
                {myAccount.name}
              </Text>
              <Text semibold style={styles.text}>
                Share your <Text bold>personal code</Text> for what ever reason!
              </Text>
            </View>
            <View style={[styles.qr, { marginVertical: 20 }]}>
              <QRCode
                size={300}
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
    backgroundColor: colors.primary,
  },
  qr: {
    alignSelf: "center",
    marginVertical: 25,
  },
  logo: {
    width: 52,
    height: 47,
    marginHorizontal: 15,
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
    top: 85,
    height: 75,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: colors.light,
  },
  subBtnCont: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    width: 260,
    textAlign: "center",
    color: colors.medium,
  },
  title: {
    fontSize: 19,
    marginBottom: 5,
    textTransform: "uppercase",
    color: colors.black,
  },
  textContainer: {
    marginTop: 25,
    marginBottom: 30,
    alignItems: "center",
  },
  body: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 10,
    justifyContent: "flex-end",
  },
  qrContainer: {
    flex: 0.93,
    borderRadius: 15,
    paddingHorizontal: 20,
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
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7.5,
    backgroundColor: colors.primary,
  },
  btnContainer: {
    marginTop: 30,
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
    backgroundColor: colors.secondary,
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
