import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

const TextField = ({
  icon,
  label,
  password,
  width = "100%",
  autoCapitalize,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <>
      <View style={styles.labelCont}>
        {icon}
        <Text style={styles.label} semibold>
          {label}:
        </Text>
      </View>
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused ? colors.primary : colors.medium,
            backgroundColor: disabled ? colors.lighter : colors.white,
          },
        ]}
      >
        <TextInput
          {...props}
          editable={!disabled}
          cursorColor={colors.primary}
          selectTextOnFocus={!disabled}
          autoCapitalize={autoCapitalize}
          selectionColor={colors.secondary}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={password && show}
          style={[styles.input, { width: width }]}
        />
        {password ? (
          <TouchableOpacity
            onPress={() => setShow((sh) => (sh ? false : true))}
          >
            {show ? (
              <Ionicons name="eye" size={22} color={colors.medium} />
            ) : (
              <Ionicons name="eye-off" size={22} color={colors.medium} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingRight: 20,
    borderWidth: 0.8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  label: {
    marginLeft: 8,
    fontSize: 14.5,
    color: colors.black,
  },
  labelCont: {
    marginLeft: 5,
    marginBottom: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    width: "90%",
    fontSize: 15,
    marginRight: 20,
    color: colors.medium,
    paddingVertical: 12,
    paddingHorizontal: 7.5,
    fontFamily: "Inter_500Medium",
  },
});

export default TextField;
