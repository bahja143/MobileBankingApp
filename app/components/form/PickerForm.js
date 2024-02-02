import { useState } from "react";
import { useFormikContext } from "formik";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import Modal from "react-native-modal";

import Text from "../CustomText";
import colors from "../../config/colors";

import PickerItem from "../PickerItem";
import ErrorMessage from "../ErrorMessage";

const PickerForm = ({
  name,
  label,
  options,
  topLabel,
  margin = 90,
  numOfColumns = 1,
  Component = PickerItem,
}) => {
  const [show, setShow] = useState(false);
  const { setFieldValue, touched, values, errors } = useFormikContext();

  const handleSelect = (item) => {
    setFieldValue(name, item.id);
  };

  return (
    <View style={[{ height: margin }]}>
      {topLabel && <Text style={styles.label}>{topLabel}:</Text>}
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="apps"
            size={23}
            color={colors["primary"]}
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
            size={25}
            color={colors["medium"]}
          />
        </View>
      </TouchableWithoutFeedback>
      {touched[name] && errors[name] ? (
        <View style={styles.errorMessage}>
          <ErrorMessage message={errors[name]} />
        </View>
      ) : null}
      <Modal
        onBackdropPress={() => setShow(false)}
        style={styles.modal}
        isVisible={show}
      >
        <View style={styles.subModal}>
          <TouchableWithoutFeedback onPress={() => setShow(false)}>
            <AntDesign
              size={27}
              name="closecircleo"
              color={colors.black}
              style={styles.iconClose}
            />
          </TouchableWithoutFeedback>
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["white"],
    paddingVertical: 17,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: colors.light,
    marginBottom: -3,
  },
  iconClose: {
    top: -10,
    right: 10,
    marginVertical: 5,
    color: colors.medium,
    alignSelf: "flex-end",
  },
  text: {
    flex: 1,
    color: colors["medium"],
    fontSize: 16.5,
    marginLeft: 8,
    fontFamily: "Inter_500Medium",
  },
  textValue: {
    flex: 1,
    color: colors["black"],
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Inter_500Medium",
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
  subModal: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 20,
    alignSelf: "center",
    backgroundColor: colors.white,
  },
  label: {
    marginLeft: 4,
    fontSize: 15.5,
    marginBottom: 5,
  },
  modal: {
    margin: 0,
    paddingHorizontal: 12,
  },
  errorMessage: {
    top: 10,
  },
});

export default PickerForm;
