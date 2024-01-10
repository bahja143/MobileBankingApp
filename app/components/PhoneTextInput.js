import { View, TextInput, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "./CustomText";

export default function PhoneTextInput({
  name,
  label,
  value,
  dial_code,
  placeholder,
  setFieldValue,
  width = "100%",

  ...otherProps
}) {
  const handleOnChangeText = (num) => {
    setFieldValue(name, num);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <Text title style={styles.code} numberOfLines={1} bold>
            +251
          </Text>
        </View>
        <TextInput
          value={value}
          onChangeText={(num) => handleOnChangeText(num)}
          style={styles.textInput}
          placeholder={placeholder}
          keyboardType="numeric"
          {...otherProps}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    overflow: "hidden",
    paddingRight: 55,
    borderWidth: 0.8,
    borderColor: colors.medium,
  },
  textInput: {
    fontSize: 16,
    width: "100%",
    color: colors.medium,
    marginLeft: 7.5,
    fontFamily: "Inter_400Regular",
  },
  code: {
    fontSize: 16,
    color: colors.primary,
    paddingRight: 7.5,
  },
  codeContainer: {
    height: "100%",
    maxWidth: 150,
    borderRightWidth: 1,
    borderRightColor: colors.black,
    top: 2.5,
  },
});
