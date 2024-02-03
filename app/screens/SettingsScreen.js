import { useState } from "react";
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

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    pin: true,
    notify: true,
    biometric: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSettings = (name, value) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSettings((s) => ({ ...s, [name]: value }));
    }, 2000);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.NavTitle} semibold>
            Settings
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.title} bold>
            Notifications
          </Text>
          <Setting
            label="Customize your notifications"
            icon={
              <Entypo size={26} color={colors.primary} name="notification" />
            }
          />

          <SettingItem
            name="notify"
            onChange={handleSettings}
            value={settings["notify"]}
            label="Receive notifications on this device"
            icon={<AntDesign size={26} name="warning" color={colors.danger} />}
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.title} bold>
            Security
          </Text>
          <Setting
            label="Change Password"
            icon={<Octicons name="key" size={26} color={colors.primary} />}
          />

          <Setting
            label="Change PIN"
            icon={
              <MaterialCommunityIcons
                size={26}
                color={colors.primary}
                name="form-textbox-password"
              />
            }
          />

          <Setting
            label="Forgot PIN"
            icon={
              <MaterialCommunityIcons
                size={26}
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
  NavTitle: {
    fontSize: 17,
    marginLeft: 7.5,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  navCont: {
    marginTop: 8,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
