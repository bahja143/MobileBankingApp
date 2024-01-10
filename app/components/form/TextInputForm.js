import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import colors from "../../config/colors";

import Text from "../CustomText";
import TextField from "../TextField";

export default function TextInputForm({
  name,
  width,
  error,
  label,
  optional,
  margin = 10,
  errorMessage,
  password = false,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, values, errors } =
    useFormikContext();

  return (
    <View style={[{ marginVertical: margin }]}>
      {optional && <Text style={styles.optional}>(Optional)</Text>}
      <TextField
        width={width}
        label={label}
        {...otherProps}
        password={password}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
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
    color: colors.danger,
    marginBottom: -10,
    marginLeft: 2.5,
  },
  optional: {
    alignSelf: "flex-end",
    bottom: 2,
  },
});
