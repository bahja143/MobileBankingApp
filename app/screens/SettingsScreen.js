import { useState, useEffect, useContext } from "react";
import {
  View,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Entypo,
  Ionicons,
  Octicons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as Notifications from "expo-notifications";
import * as LocalAuthentication from "expo-local-authentication";
import FlashMessage, { showMessage } from "react-native-flash-message";

import colors from "../config/colors";

import Text from "../components/CustomText";
import Setting from "../components/Setting";
import SettingItem from "../components/SettingItem";
import ActivityIndicator from "../components/ActivityIndicator";

import cache from "../utility/cache";
import authContext from "../context/AuthContext";

export default function SettingsScreen({ navigation }) {
  const [isFingerAvailable, setFingerAvailable] = useState(false);
  const [settings, setSettings] = useState({
    pin: false,
    notify: false,
    biometric: false,
  });
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setIsAuth, setUser } = useContext(authContext);

  const handleSettings = async (name, value) => {
    if (name === "biometric") {
      if (!isFingerAvailable)
        return showMessage({
          type: "success",
          message: "Biometric",
          description: "Biometric hardware not available on you phone",
        });
    }
    if (name === "notify") {
      const { granted } = await Notifications.requestPermissionsAsync();

      if (!granted) return setVisible(true);
    }
    if (name === "pin") {
      if (!user.pin) return navigation.navigate("createPin", { pin: true });

      setIsLoading(true);
      setSettings((s) => ({ ...s, [name]: value }));

      if (value) {
        return setTimeout(async () => {
          setIsLoading(false);
          setUser({ ...user, type: "pin" });
          handleStoreCache({ ...settings, [name]: value });
          await cache.setItemAsync("auth", { ...user, type: "pin" });
          setIsAuth(false);
        }, 2000);
      }

      return setTimeout(async () => {
        setIsLoading(false);
        setUser({ ...user, type: "password" });
        handleStoreCache({ ...settings, [name]: value });
        await cache.setItemAsync("auth", { ...user, type: "password" });
        setIsAuth(false);
      }, 2000);
    }

    setIsLoading(true);
    setSettings((s) => ({ ...s, [name]: value }));

    setTimeout(() => {
      setIsLoading(false);
      handleStoreCache({ ...settings, [name]: value });
    }, 2000);
  };
  const handleStoreCache = async (sett) => {
    await cache.setItemAsync("settings", sett);
  };
  const handleGetCache = async () => {
    const sett = await cache.getItemAsync("settings");
    setIsLoading(false);
    if (!sett) return;

    setSettings({ ...sett });
  };
  const handleOpenSettings = () => {
    setVisible(false);
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };
  const HandleCheckFingerPrint = async () => {
    const response = await LocalAuthentication.hasHardwareAsync();
    setFingerAvailable(response);
  };

  useEffect(() => {
    handleGetCache();
    HandleCheckFingerPrint();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <FlashMessage
        position="top"
        textStyle={{ textAlign: "center", color: colors.white }}
        titleStyle={{
          fontSize: 18,
          textAlign: "center",
          color: colors.white,
        }}
        style={{ backgroundColor: colors.primary }}
      />
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="fadeOut"
        animationOutTiming={50}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <Ionicons size={24} name="notifications" color={colors.danger} />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Notifications Permission
            </Text>
            <Text style={styles.modalText} semibold>
              Allow this app to notify you, your account activities
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
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navIconCont}
          >
            <Entypo name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Settings
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.title} bold>
            Notifications
          </Text>
          <Setting
            onPress={() => navigation.navigate("alertCustomize")}
            label="Customize your notifications"
            icon={
              <Entypo size={25} color={colors.primary} name="notification" />
            }
          />

          <SettingItem
            name="notify"
            onChange={handleSettings}
            value={settings["notify"]}
            label="Receive notifications on this device"
            icon={<AntDesign size={25} name="warning" color={colors.yellow} />}
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.title} bold>
            Security
          </Text>
          <Setting
            onPress={() => navigation.navigate("changePassword")}
            label="Change Password"
            icon={<Octicons name="key" size={25} color={colors.primary} />}
          />

          <Setting
            label="Change PIN"
            onPress={() => navigation.navigate("changePin")}
            icon={
              <MaterialCommunityIcons
                size={25}
                color={colors.primary}
                name="form-textbox-password"
              />
            }
          />

          <Setting
            label="Forgot PIN"
            onPress={() =>
              navigation.navigate("forgotCredential", { type: "pin" })
            }
            icon={
              <MaterialCommunityIcons
                size={25}
                color={colors.yellow}
                name="lock-open-variant-outline"
              />
            }
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.title} bold>
            Login
          </Text>
          <SettingItem
            name="biometric"
            onChange={handleSettings}
            // disabled={!isFingerAvailable}
            value={settings["biometric"]}
            label="Fingerprint / Touch Id / Face Id"
            icon={
              <FontAwesome5
                name="fingerprint"
                size={23}
                color={colors.danger}
              />
            }
          />

          <SettingItem
            name="pin"
            label="Enable PIN"
            value={settings["pin"]}
            onChange={handleSettings}
            icon={
              <MaterialIcons name="fiber-pin" size={26} color={colors.danger} />
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
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
    paddingHorizontal: 20,
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
  group: {
    marginTop: 15,
  },
  title: {
    fontSize: 15,
    marginLeft: 7.5,
    marginBottom: 7.5,
    color: "rgba(0, 0, 0, 0.6)",
  },
  Navtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 7.5,
    alignItems: "center",
    flexDirection: "row",
  },
});
