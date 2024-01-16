import { View } from "react-native";
import { useFormikContext } from "formik";

import DatePickerCom from "../DatePicker";
import ErrorMessage from "../ErrorMessage";

const DatePickerInput = ({ placeholder, name, margin = 90, ...otherProps }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const handleChange = (value) => {
    setFieldValue(name, value);
  };

  return (
    <View style={{ flex: 1, height: margin }}>
      <DatePickerCom
        {...otherProps}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <ErrorMessage touched={touched[name]} error={errors[name]} />
    </View>
  );
};

export default DatePickerInput;
