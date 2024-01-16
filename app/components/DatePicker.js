import { useState } from "react";
import { TouchableOpacity, View, Button, StyleSheet } from "react-native";
import DatePickerCalendar from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../components/CustomText";
import colors from "../config/colors";

const DatePicker = ({
  fontSize = 16.5,
  height = 62.5,
  placeholder,
  onChange,
  value,
  ...props
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <>
      <DatePickerCalendar
        {...props}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isVisible={isDatePickerVisible}
      />

      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.container, { height: height }]}
      >
        <MaterialCommunityIcons
          size={25}
          name="calendar"
          color={colors["medium"]}
        />
        <Text semibold style={[styles.label, { fontSize: fontSize }]}>
          {value
            ? new Date(value).toLocaleDateString("en-GB").split("/").join("-")
            : placeholder}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 62.5,
    width: "100%",
    paddingLeft: 18,
    borderRadius: 10,
    borderWidth: 1.5,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.lighter,
    backgroundColor: colors["white"],
  },
  label: {
    fontSize: 16.5,
    marginHorizontal: 8,
    color: colors.medium,
    backgroundColor: colors.white,
  },
});

export default DatePicker;
