import { useState } from "react";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import colors from "../../config/colors";
import Text from "../CustomText";

import PickerItem from "../PickerItem";
import ErrorMessage from "../ErrorMessage";

const PickerForm = ({
  name,
  label,
  options,
  topLabel,
  margin = 10,
  numOfColumns = 1,
  Component = PickerItem,
}) => {
  const [show, setShow] = useState(false);
  const { setFieldValue, touched, values, errors } = useFormikContext();

  const handleSelect = (item) => {
    setFieldValue(name, item.id);
  };

  return (
    <View style={[{ marginVertical: margin }]}>
      {topLabel && <Text style={styles.label}>{topLabel}:</Text>}
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="apps"
            size={20}
            color={colors["medium"]}
          />
          {values[name] ? (
            <Text style={styles.textValue}>
              {options.find((o) => o.id == values[name]).label}
            </Text>
          ) : (
            <Text style={styles.text}>{label}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={23}
            color={colors["medium"]}
          />
        </View>
      </TouchableWithoutFeedback>
      {touched[name] && errors[name] ? (
        <View style={styles.errorMessage}>
          <ErrorMessage message={errors[name]} />
        </View>
      ) : null}
      <Modal visible={show} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.subModal}>
            <FlatList
              data={options}
              keyExtractor={(option) => option.id.toString()}
              renderItem={({ item }) => (
                <Component
                  item={item}
                  onPress={() => {
                    setShow(false);
                    handleSelect(item);
                  }}
                />
              )}
              numColumns={numOfColumns}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["white"],
    paddingVertical: 17,
    borderRadius: 7.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    overflow: "hidden",
    borderWidth: 0.8,
    borderColor: colors.medium,
    marginBottom: -3,
  },
  text: {
    flex: 1,
    color: colors["medium"],
    fontSize: 16,
    marginLeft: 8,
  },
  textValue: {
    flex: 1,
    color: colors["black"],
    fontSize: 18,
    marginLeft: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 22.5,
    color: colors["secondary"],
    fontFamily: "sans-serif-medium",
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
    left: 130,
  },
  closeBtn: {
    backgroundColor: colors["light"],
    color: colors["medium"],
    left: -22.5,
    top: 15,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  subModal: {
    backgroundColor: colors.lighter,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 5,
    borderRadius: 15,
  },
  label: {
    fontSize: 15.5,
    marginBottom: 5,
    marginLeft: 4,
  },
  modal: {
    backgroundColor: "red",
  },
  errorMessage: {
    top: 10,
  },
});

export default PickerForm;
