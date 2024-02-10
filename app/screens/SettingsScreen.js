import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Entypo,
  Octicons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Setting from "../components/Setting";
import SettingItem from "../components/SettingItem";
import ActivityIndicator from "../components/ActivityIndicator";

import cache from "../utility/cache";

export default function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    pin: true,
    notify: true,
    biometric: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSettings = (name, value) => {
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

  useEffect(() => {
    handleGetCache();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
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
            onPress={() => navigation.navigate("forgotCredential")}
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
