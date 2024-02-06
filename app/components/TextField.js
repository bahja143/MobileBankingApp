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
  labelColor = colors.black,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <>
      <View style={[styles.labelCont, { color: labelColor }]}>
        {icon}
        <Text style={[styles.label, { color: labelColor }]} semibold>
          {label}:
        </Text>
      </View>
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused ? colors.primary : colors.light,
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
              <Ionicons name="eye" size={22} color={colors.primary} />
            ) : (
              <Ionicons name="eye-off" size={22} color={colors.primary} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    paddingLeft: 15,
    borderRadius: 10,
    paddingRight: 35,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: colors.light,
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
    fontSize: 16,
    paddingRight: 10,
    paddingVertical: 13,
    color: colors.medium,
    fontFamily: "Inter_500Medium",
  },
});

export default TextField;
