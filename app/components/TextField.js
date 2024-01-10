import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

const TextField = ({ icon, password, width = "100%", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? colors.primary : colors.medium,
        },
      ]}
    >
      <FontAwesome5
        size={21}
        name={icon}
        color={isFocused ? colors.primary : colors.medium}
      />
      <TextInput
        {...props}
        style={[styles.input, { width: width }]}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        secureTextEntry={password && show}
      />
      {password ? (
        <TouchableOpacity onPress={() => setShow((sh) => (sh ? false : true))}>
          {show ? (
            <Ionicons name="eye" size={22} color={colors.medium} />
          ) : (
            <Ionicons name="eye-off" size={22} color={colors.medium} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9,
    paddingRight: 20,
    borderWidth: 0.8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.lighter,
  },
  input: {
    width: "90%",
    fontSize: 16,
    marginRight: 20,
    color: colors.black,
    paddingHorizontal: 7.5,
    paddingVertical: 13.75,
    fontFamily: "Inter_400Regular",
  },
});

export default TextField;
