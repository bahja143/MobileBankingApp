import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import colors from "../../config/colors";

import Text from "../CustomText";
import TextField from "../TextField";

export default function TextInputForm({
  icon,
  name,
  width,
  error,
  label,
  optional,
  labelColor,
  height = 105,
  errorMessage,
  autoCapitalize,
  password = false,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, values, errors } =
    useFormikContext();

  return (
    <View style={[{ height: height }]}>
      {optional && <Text style={styles.optional}>(Optional)</Text>}
      <TextField
        icon={icon}
        width={width}
        label={label}
        {...otherProps}
        password={password}
        value={values[name]}
        labelColor={labelColor}
        autoCapitalize={autoCapitalize}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
      />
      {errors[name] && touched[name] ? (
        <Text style={styles.errorLabel}>{errors[name]}</Text>
      ) : (
        error && <Text style={styles.errorLabel}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    fontSize: 12,
    marginLeft: 2.5,
    marginBottom: -10,
    color: colors.danger,
  },
  optional: {
    bottom: 2,
    alignSelf: "flex-end",
  },
});
