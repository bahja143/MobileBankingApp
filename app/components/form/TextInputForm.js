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
  passStatus,
  labelColor,
  height = 105,
  errorMessage,
  autoCapitalize,
  password = false,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, values, errors } =
    useFormikContext();

  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (!password) return "Strength";

    // Define criteria for different strength levels
    const lengthCriteria = 8;
    const mediumCriteria = 12;

    // Check password length
    if (password.length < lengthCriteria) {
      return "Poor";
    }

    // Check for medium strength
    if (password.length < mediumCriteria) {
      // Check for the presence of at least one digit and one special character
      if (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
        return "Medium";
      }
    }

    // Check for strong strength
    // Strong passwords should have a mix of uppercase, lowercase, digits, and special characters
    if (
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    ) {
      return "Strong";
    }

    // If none of the above conditions are met, categorize as Weak
    return "Weak";
  };

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
      {passStatus && (
        <View style={styles.passStatCont}>
          <View style={{ width: "22%" }}>
            <View
              style={[
                styles.passStat,
                { width: "100%" },
                checkPasswordStrength(values[name]) === "Strong"
                  ? { backgroundColor: colors.green }
                  : checkPasswordStrength(values[name]) === "Medium"
                  ? { backgroundColor: colors.yellow }
                  : (checkPasswordStrength(values[name]) === "Weak") |
                    (checkPasswordStrength(values[name]) === "Poor")
                  ? { backgroundColor: colors.danger }
                  : { backgroundColor: colors.light },
              ]}
            />
            <Text
              semibold
              style={[
                styles.passStaText,
                checkPasswordStrength(values[name]) === "Strong"
                  ? { color: colors.green }
                  : checkPasswordStrength(values[name]) === "Medium"
                  ? { color: colors.yellow }
                  : (checkPasswordStrength(values[name]) === "Weak") |
                    (checkPasswordStrength(values[name]) === "Poor")
                  ? { color: colors.danger }
                  : { color: colors.medium },
              ]}
            >
              {checkPasswordStrength(values[name])}
            </Text>
          </View>
          <View
            style={[
              styles.passStat,
              checkPasswordStrength(values[name]) === "Strong"
                ? { backgroundColor: colors.green }
                : checkPasswordStrength(values[name]) === "Medium"
                ? { backgroundColor: colors.yellow }
                : checkPasswordStrength(values[name]) === "Weak"
                ? { backgroundColor: colors.danger }
                : { backgroundColor: colors.light },
            ]}
          />
          <View
            style={[
              styles.passStat,
              checkPasswordStrength(values[name]) === "Strong"
                ? { backgroundColor: colors.green }
                : checkPasswordStrength(values[name]) === "Medium"
                ? { backgroundColor: colors.yellow }
                : null,
            ]}
          />
          <View
            style={[
              styles.passStat,
              checkPasswordStrength(values[name]) === "Strong"
                ? { backgroundColor: colors.green }
                : null,
            ]}
          />
        </View>
      )}

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
  passStaText: {
    marginTop: 3,
    fontSize: 13,
    color: colors.medium,
  },
  passStat: {
    height: 5,
    width: "22%",
    backgroundColor: colors.light,
  },
  passStatCont: {
    marginTop: 7,
    marginHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optional: {
    bottom: 2,
    alignSelf: "flex-end",
  },
});
