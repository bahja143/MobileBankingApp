import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import colors from "../config/colors";
import {
  Octicons,
  Ionicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

const InputField1 = ({
  icon,
  value,
  onBlur,
  invalid,
  required,
  isLoading,
  placeholder,
  height = 62.5,
  password = false,
  maxWidth = "100%",
  ...otherProps
}) => {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(false);

  const handleFocus = () => {
    setActive(true);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: maxWidth,
          borderColor: active
            ? invalid
              ? colors.danger
              : colors.primary
            : invalid
            ? colors.danger
            : colors.light,
          height: height,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5
          size={20}
          name={icon}
          color={active ? colors.primary : colors.medium}
        />
      </View>
      <TextInput
        onBlur={() => {
          onBlur();
          setActive(false);
        }}
        value={value}
        {...otherProps}
        password={password}
        onFocus={handleFocus}
        style={[styles.input]}
        placeholder={placeholder}
        cursorColor={colors.primary}
        secureTextEntry={password && show}
      />
      {required ? (
        isLoading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator
              size="small"
              style={styles.spinner}
              color={colors.primary}
            />
          </View>
        ) : !invalid && value ? (
          <View style={styles.spinnerContainer}>
            <Octicons size={24} color={colors.green} name="check-circle" />
          </View>
        ) : null
      ) : null}

      {invalid && !isLoading ? (
        <View style={styles.spinnerContainer}>
          <AntDesign
            size={22}
            color={colors.danger}
            name="exclamationcircleo"
          />
        </View>
      ) : null}

      {password && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShow((sh) => (sh ? false : true))}
        >
          {show ? (
            <Ionicons name="eye" size={22} color={colors.medium} />
          ) : (
            <Ionicons name="eye-off" size={22} color={colors.medium} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1.5,
    overflow: "hidden",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-around",
  },
  input: {
    flex: 1,
    fontSize: 16.5,
    color: colors.black,
    marginHorizontal: 8,
    fontFamily: "Inter_500Medium",
    backgroundColor: colors.white,
  },
  spinnerContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
  },
  spinner: {
    width: 25,
    height: 25,
  },
  iconContainer: {
    left: -2.5,
  },
});

export default InputField1;
