import { useEffect } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Avatar from "../assets/avatar.png";

export default function UserProfileScreen() {
  const formatNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{5})+(?!\d))/g, " ");
  };

  useEffect(() => {
    showMessage({
      message: "Basic Information",
      description: "Successfully Updated",
      type: "info",
    });
  }, []);
  return (
    <>
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
          <View style={styles.avatarCont}>
            <Image style={styles.avatar} source={Avatar} />
          </View>

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
    marginTop: 40,
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
    width: 120,
    height: 120,
    borderWidth: 2,
    marginBottom: 10,
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
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
