import { useFormikContext } from "formik";
import { View, StyleSheet } from "react-native";

import InputField1 from "../InputField1";
import ErrorMessage from "../ErrorMessage";

const InputForm1 = ({
  name,
  value,
  invalid,
  onChange,
  required,
  maxWidth,
  password,
  maxLength,
  isLoading,
  margin = 90,
  errorMessage,
  onSubmitEditing,
  ...otherProps
}) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View style={{ height: margin }}>
      <InputField1
        required={required}
        password={password}
        maxWidth={maxWidth}
        value={values[name]}
        maxLength={maxLength}
        isLoading={isLoading}
        onChangeText={(text) => {
          setFieldValue(name, text);
          onChange && onChange(text);
        }}
        onBlur={() => {
          setFieldTouched(name);
        }}
        onSubmitEditing={onSubmitEditing}
        invalid={(errors[name] && touched[name]) || invalid}
        {...otherProps}
      />
      {errorMessage ? (
        <View style={styles.error}>
          <ErrorMessage message={errorMessage} />
        </View>
      ) : errors[name] && touched[name] ? (
        <View style={styles.error}>
          <ErrorMessage message={errors[name]} />
        </View>
      ) : null}
    </View>
  );
};

export default InputForm1;

const styles = StyleSheet.create({
  error: {
    top: 4.5,
    marginLeft: 5,
  },
});
