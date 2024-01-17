import { useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Entypo,
  Feather,
  Ionicons,
  Octicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";

import colors from "../config/colors";
import Text from "../components/CustomText";

const data = [
  {
    Id: 4,
    Name: {
      firstName: "Bob",
      lastName: "Jack",
      middleName: "Frank",
    },
    Account: "1400698080874",
  },
  {
    Id: 5,
    Name: {
      firstName: "Alice",
      lastName: "Irene",
      middleName: "Frank",
    },
    Account: "7579333944348",
  },
  {
    Id: 6,
    Name: {
      firstName: "Harry",
      lastName: "Eve",
      middleName: "Frank",
    },
    Account: "1194989860702",
  },
  {
    Id: 7,
    Name: {
      firstName: "Bob",
      lastName: "Harry",
      middleName: "Jack",
    },
    Account: "9962878623715",
  },
  {
    Id: 8,
    Name: {
      firstName: "Frank",
      lastName: "Grace",
      middleName: "Irene",
    },
    Account: "6382348098347",
  },
  {
    Id: 9,
    Name: {
      firstName: "Alice",
      lastName: "Diana",
      middleName: "Jack",
    },
    Account: "1828359688819",
  },
  {
    Id: 10,
    Name: {
      firstName: "Charlie",
      lastName: "Jack",
      middleName: "Grace",
    },
    Account: "1481311198646",
  },
  {
    Id: 4,
    Name: {
      firstName: "Bob",
      lastName: "Jack",
      middleName: "Frank",
    },
    Account: "1400698080874",
  },
  {
    Id: 5,
    Name: {
      firstName: "Alice",
      lastName: "Irene",
      middleName: "Frank",
    },
    Account: "7579333944348",
  },
  {
    Id: 6,
    Name: {
      firstName: "Harry",
      lastName: "Eve",
      middleName: "Frank",
    },
    Account: "1194989860702",
  },
  {
    Id: 7,
    Name: {
      firstName: "Bob",
      lastName: "Harry",
      middleName: "Jack",
    },
    Account: "9962878623715",
  },
  {
    Id: 8,
    Name: {
      firstName: "Frank",
      lastName: "Grace",
      middleName: "Irene",
    },
    Account: "6382348098347",
  },
  {
    Id: 9,
    Name: {
      firstName: "Alice",
      lastName: "Diana",
      middleName: "Jack",
    },
    Account: "1828359688819",
  },
  {
    Id: 10,
    Name: {
      firstName: "Charlie",
      lastName: "Jack",
      middleName: "Grace",
    },
    Account: "1481311198646",
  },
];

export default function BeneficiariesScreen() {
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const spinValue1 = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  const spin1 = spinValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const handleRefreshing = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const handleAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };
  const handleAnimation1 = () => {
    Animated.timing(spinValue1, {
      toValue: 1,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };
  const handleCloseModal = () => {
    spinValue.setValue(0);
    handleAnimation();

    setTimeout(() => {
      setShow(false);
      spinValue1.setValue(0);
    }, 50);
  };
  const handelShowModal = () => {
    spinValue1.setValue(0);
    handleAnimation1();
    setTimeout(() => {
      setShow(true);
      spinValue.setValue(0);
    }, 50);
  };

  return (
    <>
      <Modal
        isVisible={show}
        style={styles.modal}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOutTiming={1000}
        animationOut="slideOutDown"
        onBackdropPress={handleCloseModal}
      >
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text semibold style={styles.menuText}>
              Manually
            </Text>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons
                size={25}
                color={colors.primary}
                name="format-list-bulleted"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text semibold style={styles.menuText}>
              Via QR
            </Text>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons
                size={25}
                name="qrcode-scan"
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.iconContainerPlus}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <AntDesign size={32.5} name="close" color={colors.white} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title} semibold>
            Beneficiaries
          </Text>
        </View>

        <FlatList
          data={data}
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[colors["primary"]]}
              onRefresh={handleRefreshing}
            />
          }
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <Swipeable
                renderLeftActions={() => (
                  <TouchableOpacity style={styles.swipeLeft}>
                    <Feather name="send" size={24} color={colors.white} />
                    <Text semibold style={styles.swipeLeftText}>
                      Send Money
                    </Text>
                  </TouchableOpacity>
                )}
                renderRightActions={() => (
                  <View style={styles.swipeRight}>
                    <TouchableOpacity style={styles.deleteAction}>
                      <Ionicons
                        name="trash-outline"
                        size={22}
                        color={colors.danger}
                      />
                      <Text semibold style={styles.deleteActionText}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editAction}>
                      <FontAwesome5
                        name="edit"
                        size={20}
                        color={colors.white}
                      />
                      <Text semibold style={styles.editActionText}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              >
                <View style={styles.item}>
                  <View style={styles.itemLeft}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        size={30}
                        color={colors.primary}
                        name="account-convert"
                      />
                    </View>
                    <View>
                      <Text style={styles.itemTitle} semibold>
                        {`${item.Name.firstName} ${item.Name.middleName} ${item.Name.lastName}`}{" "}
                      </Text>
                      <Text style={styles.itemSubtitle} numberOfLines={1}>
                        {item.Account} - Shabelle Bank jsdkhsjk kjgh
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Octicons
                      name="chevron-right"
                      size={22}
                      color={colors.medium}
                    />
                  </View>
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSept} />}
        />
      </View>
      <TouchableWithoutFeedback onPress={handelShowModal}>
        <View style={styles.iconContainerPlus}>
          <Animated.View style={{ transform: [{ rotate: spin1 }] }}>
            <Octicons name="plus" size={35} color={colors.white} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: colors.lighter,
  },
  swipeLeftText: {
    marginTop: 5,
    color: colors.white,
  },
  swipeLeft: {
    width: "40%",
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
  },
  deleteActionText: {
    fontSize: 13,
    marginTop: 5,
    color: colors.danger,
  },
  deleteAction: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    borderTopLeftRadius: 10,
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    backgroundColor: colors.white,
  },
  editActionText: {
    fontSize: 13,
    marginTop: 6,
    color: colors.white,
  },
  editAction: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: colors.primary,
  },
  swipeRight: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
  },
  menuIconContainer: {
    width: 32.5,
    height: 32.5,
    borderRadius: 5,
    marginLeft: 7.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  menuText: {
    fontSize: 15,
    color: colors.white,
  },
  menuItem: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menu: {
    right: 50,
    bottom: 115,
    position: "absolute",
  },
  flatlist: {
    marginTop: 10,
    paddingTop: 10,
  },
  modal: {
    padding: 0,
    margin: 0,
  },
  iconContainerPlus: {
    width: 55,
    right: 40,
    bottom: 50,
    height: 55,
    elevation: 15,
    borderRadius: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 4,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  navCont: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  itemSept: {
    height: 5,
    backgroundColor: colors.lighter,
  },
  iconContainer: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.lighter,
  },
  itemSubtitle: {
    maxWidth: 270,
    color: colors.medium,
  },
  itemTitle: {
    fontSize: 15.5,
    marginBottom: 3,
    color: colors.black,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
});
