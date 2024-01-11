import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import color from "../config/color";
import Text from "./CustomText";

import notificationApi from "../api/notificationApi";
import useAuth from "../hooks/useAuth";

export default function NotificationIcon({ onPress, color, size }) {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  const handleLoad = async () => {
    const response = await notificationApi.count(parseInt(user.id));

    response.ok && setCount(response.data === null ? 0 : response.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      {count !== 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
      <Ionicons name="notifications-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  badge: {
    backgroundColor: color.danger,
    position: "absolute",
    width: 19,
    height: 19,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    right: -3,
    top: -1,
  },
  badgeText: {
    color: color.white,
    fontSize: 12,
  },
});
