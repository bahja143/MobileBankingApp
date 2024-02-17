import { Formik } from "formik";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";

import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";
import ActivityIndicator from "../components/ActivityIndicator";
import TransferDetailModal from "../components/TransferDetailModal";
import { InputField1, DatePickerInput, BtnForm1 } from "../components/form";

import transactionsData from "../data/transactions.json";

export default function TransactionsScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    id: 0,
    type: "All",
    account: "",
    endDate: "",
    startDate: "",
  });
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [detailTran, setDetailTran] = useState(false);

  const handleSubmit = (values) => {
    if (
      values["type"] === "All" &&
      values["account"] === "" &&
      values["endDate"] === "" &&
      values["startDate"] === ""
    )
      return setShow(false);

    setIsLoading(true);
    setShow(false);

    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      setFilter({ ...values });
    }, 3000);
  };
  const handelRefreshing = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const handleLoad = () => {
    setTransactions([...transactionsData]);
  };
  const handleTranDetail = (tran) => {
    setDetail(tran);
    setDetailTran(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      handleLoad();
    }, 3000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <TransferDetailModal
        detail={detail}
        isVisible={detailTran}
        setShow={setDetailTran}
      />
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
          <View style={styles.header}>
            <Text style={styles.headerTitle} bold>
              Filter
            </Text>
            <TouchableOpacity
              style={styles.headerIconContainer}
              onPress={() => setShow(false)}
            >
              <AntDesign
                name="closecircleo"
                size={25.5}
                color={colors.medium}
              />
            </TouchableOpacity>
          </View>
          <Formik
            enableReinitialize
            initialValues={filter}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <>
                <View style={styles.modalBody}>
                  <TouchableOpacity
                    onPress={() => setFieldValue("type", "All")}
                    style={[
                      styles.modalItem,
                      values["type"] === "All" && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modelItemText,
                        values["type"] === "All" && { color: colors.white },
                      ]}
                      semibold
                    >
                      All
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setFieldValue("type", "Received")}
                    style={[
                      styles.modalItem,
                      values["type"] === "Received" && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modelItemText,
                        values["type"] === "Received" && {
                          color: colors.white,
                        },
                      ]}
                      semibold
                    >
                      Received
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setFieldValue("type", "Transfer")}
                    style={[
                      styles.modalItem,
                      values["type"] === "Transfer" && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modelItemText,
                        values["type"] === "Transfer" && {
                          color: colors.white,
                        },
                      ]}
                      semibold
                    >
                      Transfer
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.form}>
                  <InputField1
                    height={60}
                    margin={90}
                    icon="wallet"
                    name="account"
                    maxLength={13}
                    placeholder="Account"
                    keyboardType="numeric"
                  />
                  <View style={styles.dateContainer}>
                    <DatePickerInput
                      margin={95}
                      height={60}
                      fontSize={15}
                      name="startDate"
                      placeholder="From Date"
                      maximumDate={new Date()}
                    />
                    <View style={styles.date} />
                    <DatePickerInput
                      margin={95}
                      height={60}
                      fontSize={15}
                      name="endDate"
                      placeholder="To Date"
                      maximumDate={new Date()}
                    />
                  </View>
                  <BtnForm1 textTransform="capitalize" title="Apply filter" />
                </View>
              </>
            )}
          </Formik>
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
          <TouchableOpacity onPress={() => setShow(true)} style={styles.search}>
            <FontAwesome size={22} name="search" color={colors.medium} />
            <Text style={styles.searchText} semibold>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        {transactions.length !== 0 ? (
          <FlatList
            data={transactions}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[colors["primary"]]}
                onRefresh={handelRefreshing}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTranDetail(item)}
                style={styles.item}
              >
                <View style={styles.itemLeft}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      size={32.5}
                      name="bank-transfer"
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
                          item.type === "Received"
                            ? colors.green
                            : colors.danger,
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
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              size={80}
              color="rgba(0, 0, 0, .2)"
              name="history"
            />
            <Text semibold style={styles.emptyText}>
              No transactions Available
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  headerTitle: {
    fontSize: 15,
    marginLeft: 12,
    color: colors.black,
  },
  headerIconContainer: {
    marginRight: 12,
    borderRadius: 250,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 9,
    flexDirection: "row",
    borderBottomWidth: 1.25,
    borderColor: colors.lighter,
    justifyContent: "space-between",
  },
  emptyText: {
    marginTop: 25,
    color: "rgba(0, 0, 0,.25)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  date: {
    width: "5%",
  },
  dateContainer: {
    width: "100%",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  form: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  modelItemText: {
    fontSize: 15,
    color: colors.primary,
  },
  modalItem: {
    height: 40,
    width: 100,
    borderWidth: 1.5,
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  modalBody: {
    marginTop: 25,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
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
    width: "100%",
    height: "85%",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.white,
  },
  searchText: {
    fontSize: 16,
    marginLeft: 12,
    color: colors.medium,
  },
  search: {
    flex: 1,
    borderWidth: 1.35,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderColor: colors.light,
    borderColor: colors.light,
    backgroundColor: colors.white,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    paddingVertical: 6,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistContainer: {
    paddingVertical: 15,
  },
  itemSep: {
    height: 3.5,
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
    fontSize: 14.25,
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
    fontSize: 13.5,
    color: colors.medium,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 15,
    marginBottom: 3,
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
