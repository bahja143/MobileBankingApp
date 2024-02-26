import Modal from "react-native-modal";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import {
  View,
  Linking,
  Platform,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import Text from "../components/CustomText";
import BranchItem from "../components/BranchItem";
import ActivityIndicator from "../components/ActivityIndicator";

import colors from "../config/colors";
import data from "../data/branches.json";

export default BranchesScreen = ({ navigation }) => {
  const info = useNetInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([...data]);
  const [refreshing, setRefreshing] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const handleRedirect = async (item) => {
    try {
      if (info.type !== "unknown" && info.isInternetReachable === false) return;

      setIsLoading(true);
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return setShowPermissions(true);

      setIsLoading(false);
      navigation.navigate("location", {
        branch: item,
        coordinates: [item.location],
      });
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
  const handleCallUs = (num) => {
    Linking.openURL(`tel:${num}`);
  };
  const handleCalculateDistance = (
    lattitude1,
    longittude1,
    lattitude2,
    longittude2
  ) => {
    const toRadian = (n) => (n * Math.PI) / 180;

    let lat2 = lattitude2;
    let lon2 = longittude2;
    let lat1 = lattitude1;
    let lon1 = longittude1;

    let R = 6371; // km
    let x1 = lat2 - lat1;
    let dLat = toRadian(x1);
    let x2 = lon2 - lon1;
    let dLon = toRadian(x2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) *
        Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return Math.ceil(d);
  };
  const handleSortCoord = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      const output = data.map((d) => {
        d.distance = handleCalculateDistance(
          coords.latitude,
          coords.longitude,
          d.location.latitude,
          d.location.longitude
        );

        return d;
      });

      setBranches(output.sort((a, b) => a.distance - b.distance));
    } catch (error) {
      console.warn("Error getting current location:", error);
    }
  };
  const handleLoad = async () => {
    setIsLoading(true);
    await handlePermission();
    await handleSortCoord();
    setIsLoading(false);
  };
  const handleGetNearestBranch = async () => {
    await handleRedirect(branches[0]);
  };
  const handleRefreshing = async () => {
    setRefreshing(true);
    await handleSortCoord();
    setRefreshing(false);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
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
              Go Back
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
            <Entypo size={30} color={colors.white} name="chevron-left" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGetNearestBranch}
            style={styles.search}
          >
            <MaterialIcons size={24} name="my-location" color={colors.medium} />
            <Text style={styles.searchText} semibold>
              Get your nearest branch
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={branches}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[colors.primary]}
              onRefresh={handleRefreshing}
            />
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BranchItem
              item={item}
              onPress={() => handleRedirect(item)}
              onCall={() => handleCallUs(item.phone)}
            />
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
    backgroundColor: colors["white"],
  },
  searchText: {
    fontSize: 15.5,
    marginLeft: 12,
    color: colors.medium,
  },
  search: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1.35,
    marginHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 14.5,
    borderColor: colors.light,
    borderColor: colors.light,
    backgroundColor: colors.white,
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
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  modalTitle: {
    fontSize: 14.5,
    marginBottom: 5,
    color: colors.black,
  },
  modalText: {
    fontSize: 13,
    marginBottom: 5,
    maxWidth: 300,
    textAlign: "center",
    color: colors.medium,
  },
  modalTextContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  itemSep: {
    height: 8,
    backgroundColor: colors.Linking,
  },
  Navtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    marginRight: 7,
    borderRadius: 5,
    paddingVertical: 7.5,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: "center",
    flexDirection: "row",
  },
});
