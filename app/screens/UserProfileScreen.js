import { useState } from "react";
import Modal from "react-native-modal";
import * as Media from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import FlashMessage, { showMessage } from "react-native-flash-message";
import {
  View,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Entypo,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";

import Avatar from "../assets/avatar.png";

export default function UserProfileScreen() {
  const [imageUri, setImageUri] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{5})+(?!\d))/g, " ");
  };
  const handleMedia = async () => {
    setIsLoading(true);
    const { granted, canAskAgain } = await Media.requestPermissionsAsync();

    if (granted) {
      let { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!canceled) {
        setTimeout(async () => {
          setIsLoading(false);
          setImageUri(assets[0].uri);
          showMessage({
            type: "success",
            message: "Profile Picture",
            description: "Successfully Updated",
          });
        }, 3000);
        return;
      }

      setIsLoading(false);
    } else if (!canAskAgain) {
      setIsLoading(false);
      return setVisible(true);
    }
  };
  const handleOpenSettings = () => {
    setVisible(false);
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <Modal
        isVisible={visible}
        animationOut="fadeOut"
        animationIn="slideInUp"
        animationOutTiming={50}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalTrashIcon}>
            <MaterialCommunityIcons
              size={32.5}
              color={colors.danger}
              name="folder-multiple-image"
            />
          </View>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle} bold>
              Gallery Permission
            </Text>
            <Text style={styles.modalText}>
              Allow this app to access your gallery
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
            onPress={() => setVisible(false)}
            style={[styles.modalBtn, { paddingVertical: 10 }]}
          >
            <Text style={[styles.modalBtnText]} bold>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        <FlashMessage
          position="top"
          backgroundColor={colors.primary}
          textStyle={{ textAlign: "center" }}
          titleStyle={{ textAlign: "center", fontSize: 18 }}
          style={{ backgroundColor: colors.primary, color: colors.black }}
        />
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.Navtitle} semibold>
            Profile
          </Text>
        </View>

        <View style={styles.body}>
          <TouchableOpacity onPress={handleMedia} style={styles.avatarCont}>
            <Image
              style={[styles.avatar, imageUri && { top: 0 }]}
              source={imageUri ? { uri: imageUri } : Avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMedia} style={styles.iconCamera}>
            <Ionicons name="camera-outline" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.avatarTitle} semibold>
            Change Picture
          </Text>

          <View style={styles.titleCont}>
            <Text style={styles.title} bold>
              Abdisalam Farah Abdi
            </Text>
            <Text style={styles.subTitle} semibold>
              {formatNumberWithSpaces("0272010000033")}
            </Text>
          </View>

          <View style={styles.menus}>
            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons
                  size={30}
                  color={colors.primary}
                  name="account-circle-outline"
                />
                <View style={styles.itemTextCont}>
                  <Text style={styles.itemTitle} semibold>
                    Update Basic Information
                  </Text>
                  <Text style={styles.itemSubtitle} semibold>
                    Gender, Nationality, Occupation
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                size={25}
                name="chevron-right"
                color={colors.medium}
                style={styles.itemChevron}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons
                  name="contacts-outline"
                  size={25}
                  color={colors.primary}
                />
                <View style={styles.itemTextCont}>
                  <Text style={styles.itemTitle} semibold>
                    Update Contact Information
                  </Text>
                  <Text style={styles.itemSubtitle} semibold>
                    Mobile, Email
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                size={25}
                name="chevron-right"
                color={colors.medium}
                style={styles.itemChevron}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <AntDesign
                  name="addusergroup"
                  size={30}
                  color={colors.primary}
                />
                <View style={styles.itemTextCont}>
                  <Text style={styles.itemTitle} semibold>
                    Update Next Of Kin
                  </Text>
                  <Text style={styles.itemSubtitle} semibold>
                    Name, Phone, Relationship
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                size={25}
                name="chevron-right"
                color={colors.medium}
                style={styles.itemChevron}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, styles.lastItem]}>
              <View style={styles.itemLeft}>
                <Entypo name="address" size={30} color={colors.primary} />
                <View style={styles.itemTextCont}>
                  <Text style={styles.itemTitle} semibold>
                    Update Address
                  </Text>
                  <Text style={styles.itemSubtitle} semibold>
                    City, Region, Address
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons
                size={25}
                name="chevron-right"
                color={colors.medium}
                style={styles.itemChevron}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  avatarTitle: {
    top: -25,
    fontSize: 15.5,
    color: colors.primary,
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
  modalTrashIcon: {
    width: 55,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
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
  iconCamera: {
    top: -30,
    width: 34,
    right: -32,
    height: 34,
    borderRadius: 30,
    borderWidth: 2.25,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.white,
    backgroundColor: colors.primary,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemChevron: {
    marginRight: 7.5,
  },
  itemTextCont: {
    marginLeft: 12,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.medium,
  },
  itemTitle: {
    fontSize: 14.5,
    marginBottom: 2,
    color: colors.black,
  },
  itemLeft: {
    paddingLeft: 12.5,
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    marginTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.15,
    justifyContent: "space-between",
    borderColor: "rgba(0, 0, 0, 0.125)",
  },
  menus: {
    width: "95%",
    marginTop: 35,
    paddingTop: 15,
    borderRadius: 20,
    paddingBottom: 30,
    backgroundColor: colors.lighter,
  },
  title: {
    fontSize: 20,
    color: colors.black,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.medium,
  },
  titleCont: {
    textAlign: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCont: {
    width: 130,
    height: 130,
    borderWidth: 1.5,
    borderRadius: 150,
    overflow: "hidden",
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  avatar: {
    top: 12,
    width: "100%",
    height: "100%",
    borderRadius: 50,
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
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
