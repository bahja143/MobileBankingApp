import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import SettingItem from "../components/SettingItem";
import ActivityIndicator from "../components/ActivityIndicator";

import cache from "../utility/cache";

export default function AlertCustomizationScreen() {
  const [settings, setSettings] = useState({
    login: { sms: false, email: false },
    profile: { sms: false, email: false },
    transactions: { sms: false, email: false },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSettings = (name, value) => {
    setIsLoading(true);
    setSettings((s) => ({ ...s, login: { ...s.login, [name]: value } }));

    setTimeout(() => {
      setIsLoading(false);
      handleStoreCache({
        ...settings,
        login: { ...settings.login, [name]: value },
      });
    }, 2000);
  };
  const handleTransSettings = (name, value) => {
    setIsLoading(true);
    setSettings((s) => ({
      ...s,
      transactions: { ...s.transactions, [name]: value },
    }));

    setTimeout(() => {
      setIsLoading(false);
      handleStoreCache({
        ...settings,
        transactions: { ...settings.transactions, [name]: value },
      });
    }, 2000);
  };
  const handleProfileSettings = (name, value) => {
    setIsLoading(true);
    setSettings((s) => ({
      ...s,
      profile: { ...s.profile, [name]: value },
    }));

    setTimeout(() => {
      setIsLoading(false);
      handleStoreCache({
        ...settings,
        profile: { ...settings.profile, [name]: value },
      });
    }, 2000);
  };
  const handleStoreCache = async (sett) => {
    await cache.setItemAsync("AlertSettings", sett);
  };
  const handleGetCache = async () => {
    const sett = await cache.getItemAsync("AlertSettings");

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
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.NavTitle} semibold>
            Alert Customization
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.title} bold>
            Login Alerts
          </Text>
          <SettingItem
            name="sms"
            label="SMS"
            value={settings["login"].sms}
            onChange={handleLoginSettings}
            icon={
              <MaterialCommunityIcons
                size={26}
                color={colors.primary}
                name="message-processing"
              />
            }
          />

          <SettingItem
            name="email"
            label="Email"
            onChange={handleLoginSettings}
            value={settings["login"].email}
            icon={
              <MaterialCommunityIcons
                size={26}
                name="email-open"
                color={colors.primary}
              />
            }
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.title} bold>
            Profile Update Alerts
          </Text>
          <SettingItem
            name="sms"
            label="SMS"
            onChange={handleProfileSettings}
            value={settings["profile"].sms}
            icon={
              <MaterialCommunityIcons
                size={26}
                color={colors.primary}
                name="message-processing"
              />
            }
          />

          <SettingItem
            name="email"
            label="Email"
            onChange={handleProfileSettings}
            value={settings["profile"].email}
            icon={
              <MaterialCommunityIcons
                size={26}
                name="email-open"
                color={colors.primary}
              />
            }
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.title} bold>
            Transaction Alerts
          </Text>
          <SettingItem
            name="sms"
            label="SMS"
            onChange={handleTransSettings}
            value={settings["transactions"].sms}
            icon={
              <MaterialCommunityIcons
                size={26}
                color={colors.primary}
                name="message-processing"
              />
            }
          />

          <SettingItem
            name="email"
            label="Email"
            onChange={handleTransSettings}
            value={settings["transactions"].email}
            icon={
              <MaterialCommunityIcons
                size={26}
                name="email-open"
                color={colors.primary}
              />
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
    marginBottom: 2,
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "row",
  },
});
