import { Audio } from "expo-av";
import Modal from "react-native-modal";
import * as Media from "expo-media-library";
import { Camera, FlashMode } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Linking,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

import BarcodeScannerPeep from "../assets/sound/store-scanner-beep.mp3";

export default function QRCodeScannerScreen({ route, navigation }) {
  const [flash, setFlash] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [invalidQr, setInvalidQr] = useState(true);
  const [cameraPer, setCameraPer] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleBarcodeScanned = async (e) => {
    setScanned(true);
    await handlePlay();

    if (route.params?.beneficiary)
      return navigation.navigate("beneficiary", JSON.parse(e.data));

    return navigation.navigate("transfer", JSON.parse(e.data));
  };
  const handlePlay = async () => {
    const { sound } = await Audio.Sound.createAsync(BarcodeScannerPeep);
    await sound.playAsync();
  };
  const handleFlash = () => {
    setFlash(flash ? false : true);
  };
  const handleMedia = async () => {
    const { granted, canAskAgain } = await Media.requestPermissionsAsync();

    if (granted) {
      let { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!canceled) {
        let decodedBarcodeImage = await BarCodeScanner.scanFromURLAsync(
          assets[0].uri
        );

        if (decodedBarcodeImage.length !== 0) {
          handlePlay();
          return navigation.navigate(
            "transfer",
            JSON.parse(decodedBarcodeImage[0].data)
          );
        }

        return setInvalidQr(true);
      }
    }
    if (!canAskAgain) return setVisible(true);
  };
  const handleOpenSettings = () => {
    setVisible(false);
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };
  const handleCameraPermission = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();

    if (!granted) return setCameraPer(true);
  };

  useEffect(() => {
    handleCameraPermission();
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 245, // Move the line up 50 pixels
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0, // Move the line back down to its original position
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <Modal
        isVisible={invalidQr}
        animationOut="fadeOut"
        animationIn="slideInUp"
        animationOutTiming={50}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <AntDesign name="qrcode" size={32.5} color={colors.danger} />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Invalid QR Code
            </Text>
            <Text style={styles.modalText} semibold>
              Apologies, but it seems the QR code provided is invalid or not
              recognized.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setInvalidQr(false)}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} bold>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="fadeOut"
        animationOutTiming={50}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <MaterialCommunityIcons
              size={32.5}
              color={colors.danger}
              name="folder-multiple-image"
            />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Gallery Permission
            </Text>
            <Text style={styles.modalText} semibold>
              Allow this app to access your gallery
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleOpenSettings}
            style={[
              styles.modalBtn,
              {
                borderWidth: 0,
                paddingVertical: 11,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={[styles.modalBtnText, { color: colors.white }]} bold>
              Go to settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} bold>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={cameraPer}
        animationIn="slideInUp"
        animationOut="fadeOut"
        animationOutTiming={50}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <Ionicons name="camera-outline" size={32.5} color={colors.danger} />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Camera Permission
            </Text>
            <Text style={styles.modalText}>
              Kindly grant camera permission to this application for seamless QR
              code scanning. Your cooperation is appreciated
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleOpenSettings}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} bold>
              Go to settings
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.navCont}>
        <Text style={styles.title} semibold>
          Scan QR Code
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navIconCont}
        >
          <Text style={styles.navText} bold>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <Camera
        ratio="16:9"
        focusDepth={1}
        style={styles.container}
        flashMode={flash ? FlashMode.torch : FlashMode.off}
        onBarCodeScanned={!scanned ? handleBarcodeScanned : null}
      >
        <View style={styles.access}>
          <TouchableOpacity onPress={handleMedia} style={styles.accessBtn}>
            <MaterialCommunityIcons
              size={27.5}
              color={colors.white}
              name="image-size-select-actual"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFlash} style={styles.accessBtn}>
            <MaterialCommunityIcons
              size={27.5}
              color={colors.white}
              name={flash ? "flash-off" : "flash"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.camera}>
          <View style={styles.topFocus}></View>
          <View style={styles.focusContainer}>
            <View style={styles.topFocus} />
            <View style={styles.focus}>
              {!scanned ? (
                <Animated.View
                  style={[
                    styles.line,
                    { transform: [{ translateY: animatedValue }] },
                  ]}
                >
                  <View style={styles.qrCodeLine} />
                </Animated.View>
              ) : null}
            </View>
            <View style={styles.topFocus} />
          </View>
          <View style={[styles.topFocus, { top: -0.0 }]} />
          <Text semibold style={styles.cameraText}>
            Align QR code to fill inside the frame
          </Text>
        </View>
      </Camera>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalTrashIcon: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
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
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    top: -5,
    fontSize: 15,
    color: colors.black,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  accessBtn: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  access: {
    width: "100%",
    paddingVertical: 15,
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  qrCodeLine: {
    height: 2,
    width: "100%",
    borderBottomWidth: 0.65,
    borderBottomColor: colors.white,
    backgroundColor: colors.primary,
  },
  focusContainer: {
    flexDirection: "row",
  },
  topFocus: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cameraText: {
    bottom: 15,
    fontSize: 14.5,
    position: "absolute",
    color: colors.white,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: colors.white,
  },
  navText: {
    fontSize: 15,
    color: colors.lighter,
  },
  navIconCont: {
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: colors.lighter,
    backgroundColor: colors.primary,
  },
  navCont: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
  },
  focus: {
    width: 285,
    height: 250,
    borderWidth: 1.75,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
