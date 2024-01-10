import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import color from "../../config/colors";

import Text from "../CustomText";
import PhoneTextInput from "../PhoneTextInput";

export default function PhoneTextInputForm({
  name,
  width,
  label,
  margin = 10,
  dial_code,
  ...otherProps
}) {
  const { setFieldValue, touched, values, errors } = useFormikContext();

  return (
    <>
      {label && <Text style={styles.label}>{label}:</Text>}
      <View style={[{ width: width, marginVertical: margin }]}>
        <PhoneTextInput
          value={values[name]}
          name={name}
          setFieldValue={setFieldValue}
          width={width}
          label={label}
          dial_code={values[dial_code]}
          {...otherProps}
        />
        {errors[name] && touched[name] ? (
          <Text style={styles.errorLabel}>{errors[name]}</Text>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  errorLabel: {
    color: color.danger,
    marginBottom: -10,
    marginLeft: 2.5,
  },
  label: {
    fontSize: 15.5,
    marginBottom: 5,
    marginLeft: 4,
  },
});
