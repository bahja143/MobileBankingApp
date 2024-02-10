import Modal from "react-native-modal";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Linking,
  Platform,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";
import BranchItem from "../components/BranchItem";

const initialData = [
  {
    id: 1,
    name: "Durdur center",
    address: "26th june, Togdheer",
    location: { latitude: 9.561287, longitude: 44.058293 },
  },
  {
    id: 2,
    name: "Xera-awr center",
    address: "Xera-awr district, Maroodi-jeex Hargeisa-Somaliland",
    location: { latitude: 9.612016, longitude: 43.882136 },
  },
  {
    id: 3,
    name: "150 ka center",
    address: "150 district, Hargiesa",
    location: { latitude: 9.523422, longitude: 44.07887 },
  },
];

export default BranchesScreen = ({ navigation }) => {
  const [data] = useState(initialData);
  const [showPermissions, setShowPermissions] = useState(false);

  const handleRedirect = async (item) => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted) return setShowPermissions(true);

      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenSettings = () => {
    setShowPermissions(false);
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };
  const handlePermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) return setShowPermissions(true);
  };

  useEffect(() => {
    handlePermission();
  }, []);

  return (
    <>
      <Modal
        animationOut="fadeOut"
        animationIn="slideInUp"
        animationOutTiming={50}
        isVisible={showPermissions}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <MaterialIcons
              name="my-location"
              size={32.5}
              color={colors.danger}
            />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Location Permission
            </Text>
            <Text style={styles.modalText}>
              To get <Text bold>Bank Branch</Text>, allow this app access to
              your location.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleOpenSettings}
            style={[
              styles.modalBtn,
              {
                borderWidth: 0,
                paddingVertical: 11,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={[styles.modalBtnText, { color: colors.white }]} bold>
              Go to settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowPermissions(false)}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} bold>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navIconCont}
          >
            <Entypo name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Bank Branches
          </Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BranchItem item={item} onPress={() => handleRedirect(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSep} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: colors["lighter"],
  },
  modalBtn: {
    width: "100%",
    marginTop: 8,
    borderWidth: 1.25,
    borderRadius: 7.5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.light,
    backgroundColor: colors.white,
  },
  modalBtnText: {
    color: colors.black,
  },
  modalDelete: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    fontSize: 14.5,
    color: colors.black,
  },
  modalText: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  itemSep: {
    height: 4,
    backgroundColor: colors.Linking,
  },
  Navtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: "center",
    flexDirection: "row",
  },
});
