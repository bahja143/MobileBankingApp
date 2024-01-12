import { useState } from "react";
import Modal from "react-native-modal";

import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  Entypo,
  Octicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

const transactions = [
  {
    id: 1,
    type: "Received",
    description: "Salary Shabelle Bank",
    amount: "45,000",
    Date: "Today",
  },
  {
    id: 2,
    type: "Transfer",
    description: "To Bahja Abdulaziz Hassen",
    amount: "100,000",
    Date: "Dec 26",
  },
  {
    id: 3,
    type: "withdraw",
    description: "Madina Branch",
    amount: "25,000",
    Date: "Oct 29",
  },
  {
    id: 4,
    type: "withdraw",
    description: "Madina Branch",
    amount: "10,000",
    Date: "Oct 29",
  },
];

export default function TransactionsScreen() {
  const [data] = useState([...transactions]);
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        isVisible={show}
        style={styles.modal}
        animationInTiming={500}
        animationIn="slideInUp"
        animationOutTiming={500}
        animationOut="slideOutDown"
        onBackdropPress={() => setShow(false)}
      >
        <View style={styles.filterCont}>
          <View style={styles.filterTitleCont}>
            <Octicons
              size={40}
              style={styles.icon}
              color={colors.light}
              name="horizontal-rule"
            />
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo size={30} color={colors.primary} name="chevron-left" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow(true)} style={styles.search}>
            <FontAwesome size={22} name="search" color={colors.medium} />
            <Text style={styles.searchText} semibold>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          style={styles.flatlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    size={32.5}
                    name="history"
                    color={colors.primary}
                  />
                </View>
                <View>
                  <Text style={styles.itemTitle} semibold>
                    {item.type}
                  </Text>
                  <Text style={styles.itemSubtitle} semibold>
                    {item.description}
                  </Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text
                  style={[
                    styles.itemAmount,
                    {
                      color:
                        item.type === "Received" ? colors.green : colors.danger,
                    },
                  ]}
                  bold
                >
                  {item.type === "Received"
                    ? "+" + item.amount
                    : "-" + item.amount}
                </Text>
                <Text style={styles.itemDate} semibold>
                  {item.Date}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSep} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  filterTitleCont: {
    marginTop: -7.5,
    borderBottomWidth: 0.75,
    borderBottomColor: colors.light,
  },
  icon: {
    alignSelf: "center",
  },
  filterTitle: {
    fontSize: 16,
    marginTop: -10,
    paddingLeft: 10,
    color: colors.black,
    alignItems: "flex-start",
  },
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
  },
  filterCont: {
    bottom: 0,
    height: 550,
    width: "100%",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: colors.white,
  },
  searchText: {
    fontSize: 16,
    marginLeft: 15,
    color: colors.medium,
  },
  search: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 100,
    flexDirection: "row",
    marginHorizontal: 7.5,
    paddingHorizontal: 15,
    paddingVertical: 12.5,
    borderColor: colors.light,
    backgroundColor: colors.white,
  },
  navIconCont: {
    padding: 4,
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  navCont: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  flatlist: {
    paddingTop: 10,
  },
  itemSep: {
    height: 5,
    backgroundColor: colors.lighter,
  },
  iconContainer: {
    width: 50,
    height: 50,
    marginRight: 7.5,
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  itemRight: {
    justifyContent: "center",
  },
  itemAmount: {
    marginBottom: 5,
    color: colors.green,
    alignSelf: "flex-end",
  },
  itemDate: {
    fontSize: 12.5,
    color: colors.medium,
    alignSelf: "flex-end",
  },
  itemSubtitle: {
    fontSize: 13,
    color: colors.medium,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 15,
    marginBottom: 5,
    color: colors.black,
    textTransform: "capitalize",
  },
  itemLeft: {
    flexDirection: "row",
  },
  item: {
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
});
