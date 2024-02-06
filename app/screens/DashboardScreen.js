import {
  View,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Bg from "../assets/images/Bg.png";
import Avatar from "../assets/images/avatar.png";
import ActivityIndicator from "../components/ActivityIndicator";

const data = [
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

export default function DashboardScreen() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myAccount] = useState({
    id: 1,
    balance: 550000,
    account: "0272010000033",
    name: "Abdisalam Farah Abdi",
  });
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleRefreshing = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const handleLoad = () => {
    setTransactions([...data]);
  };
  const hideMiddleDigits = (accountNumber) => {
    // Ensure account number is 13 digits long
    if (accountNumber?.length !== 13) return accountNumber;

    // Extract first and last digit
    const firstDigit = accountNumber.substring(0, 2);
    const lastDigit = accountNumber.substring(10);

    // Create string of 10 asterisks to replace middle digits
    const hiddenDigits = "**********"; // Adjust for desired number of hidden digits

    // Combine the parts to create the hidden account number
    const hiddenAccountNumber = firstDigit + hiddenDigits + lastDigit;

    return hiddenAccountNumber;
  };
  const formatNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{5})+(?!\d))/g, " ");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      handleLoad();
    }, 3000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={style.container}>
        <FlatList
          data={[1]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[colors["primary"]]}
              onRefresh={handleRefreshing}
            />
          }
          keyExtractor={(item) => item.toString()}
          renderItem={() => (
            <>
              <ImageBackground source={Bg} style={style.topHeader}>
                <View style={style.header}>
                  <View style={style.headerTextCont}>
                    <Text style={style.welcomeText} semibold>
                      Welcome Back
                    </Text>
                    <Text style={style.name} bold>
                      {myAccount.name}
                    </Text>
                  </View>
                  <View style={style.rightNav}>
                    <TouchableOpacity
                      style={[style.imageContainer, style.iconBell]}
                    >
                      <MaterialCommunityIcons
                        size={22}
                        color={colors.primary}
                        name="bell-badge-outline"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.imageContainer}>
                      <Image style={style.image} source={Avatar} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={style.myAccount}>
                  <Text style={style.myAccountText}>My Account</Text>
                  <Text style={style.accountNo} bold>
                    {show
                      ? formatNumberWithSpaces(myAccount.account)
                      : hideMiddleDigits(myAccount.account)}
                  </Text>
                </View>
              </ImageBackground>
              <View style={style.myBalance}>
                <Text style={style.accountBalanceText}>Account Balance</Text>
                <View style={style.balanceCont}>
                  <Text style={style.accountBalanceNo} bold>
                    {show
                      ? loading
                        ? "**********"
                        : `ETB ${myAccount.balance.toLocaleString()}`
                      : "**********"}
                  </Text>
                  <TouchableOpacity
                    style={style.showIcon}
                    onPress={() => (show ? setShow(false) : setShow(true))}
                  >
                    <Feather
                      name={show ? "eye-off" : "eye"}
                      size={22.5}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={style.title} bold>
                Suggested Actions
              </Text>
              <View style={style.nav}>
                <TouchableOpacity style={style.navCont}>
                  <View style={style.navItem}>
                    <Feather size={29} name="send" color={colors.primary} />
                    <Text style={style.navTitle} semibold>
                      Transfer
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={style.navCont}>
                  <View style={style.navItem}>
                    <MaterialCommunityIcons
                      size={30}
                      color={colors.primary}
                      name="account-multiple-outline"
                    />
                    <Text style={style.navTitle} semibold>
                      Beneficiary
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={style.navCont}>
                  <View style={style.navItem}>
                    <MaterialCommunityIcons
                      size={30}
                      name="history"
                      color={colors.primary}
                    />
                    <Text style={style.navTitle} semibold>
                      History
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={style.navCont}>
                  <View style={style.navItem}>
                    <MaterialCommunityIcons
                      size={29}
                      name="qrcode-scan"
                      color={colors.primary}
                    />
                    <Text style={style.navTitle} semibold>
                      My QR
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={style.tranTitleCont}>
                <Text style={style.RecentText} bold>
                  Recent Transactions
                </Text>

                <TouchableOpacity>
                  <Text>See All</Text>
                </TouchableOpacity>
              </View>
              {transactions.length !== 0 ? (
                <FlatList
                  data={transactions}
                  ItemSeparatorComponent={() => <View style={style.itemSep} />}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={style.TranCont}>
                      <View style={style.Tran} key={item}>
                        <View style={style.TranTextCont}>
                          <View style={style.TranIconCont}>
                            <MaterialCommunityIcons
                              size={32.5}
                              color={colors.primary}
                              name="credit-card-fast-outline"
                            />
                          </View>
                          <View>
                            <Text style={style.TranItemTitle} semibold>
                              {item.type}
                            </Text>
                            <Text style={style.TranItemSub} semibold>
                              {item.description}
                            </Text>
                          </View>
                        </View>

                        <View style={style.TranNoCont}>
                          <Text
                            style={[
                              style.TranNo,
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
                          <Text style={style.TranItemSub} semibold>
                            {item.Date}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={style.emptyContainer}>
                  <MaterialCommunityIcons
                    size={70}
                    color="rgba(0, 0, 0, .2)"
                    name="credit-card-fast-outline"
                  />
                  <Text semibold style={style.emptyText}>
                    No transaction available
                  </Text>
                </View>
              )}
            </>
          )}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  emptyText: {
    marginTop: 25,
    color: "rgba(0, 0, 0,.25)",
  },
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  showIcon: {
    top: -2,
    right: 2.5,
    marginLeft: 20,
  },
  itemSep: {
    height: 4,
    backgroundColor: colors.lighter,
  },
  RecentText: {
    fontSize: 15,
    color: colors.black,
  },
  TranNoCont: {
    alignItems: "center",
  },
  TranNo: {
    marginBottom: 5,
    color: colors.danger,
  },
  TranItemSub: {
    fontSize: 12.5,
    color: colors.medium,
  },
  TranItemTitle: {
    marginBottom: 2.5,
    color: colors.black,
    textTransform: "capitalize",
  },
  TranIconCont: {
    padding: 5,
    borderRadius: 11,
    marginRight: 12.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  TranTextCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  TranCont: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 11,
    paddingHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  Tran: {
    flexDirection: "row",
    marginHorizontal: 2.5,
    justifyContent: "space-between",
  },
  tranTitleCont: {
    marginTop: 11,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 11,
    justifyContent: "space-between",
  },
  NavImage: {
    width: "100%",
    height: "100%",
  },
  navCont: {
    alignItems: "center",
  },
  navTitle: {
    top: 5,
    fontSize: 11.5,
    color: colors.black,
    textAlign: "center",
  },
  navItem: {
    width: 80,
    height: 75,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  nav: {
    marginTop: 8,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 15,
    marginLeft: 11,
    marginTop: 15,
    color: colors.black,
  },
  topHeader: {
    height: 210,
    paddingTop: 10,
    paddingHorizontal: 11,
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  headerTextCont: {
    marginTop: 18,
  },
  balanceCont: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  accountBalanceNo: {
    fontSize: 17,
    color: colors.black,
  },
  accountBalanceText: {
    color: colors.black,
  },
  myBalance: {
    elevation: 4,
    paddingVertical: 15,
    marginHorizontal: 11,
    paddingHorizontal: 25,
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.white,
  },
  myAccountText: {
    color: colors.white,
  },
  accountNo: {
    fontSize: 20,
    marginTop: 7.5,
    color: colors.white,
  },
  myAccount: {
    elevation: 4,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    borderTopRightRadius: 15,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBell: {
    marginRight: 9,
    backgroundColor: colors.white,
  },
  rightNav: {
    top: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    top: 4,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  welcomeText: {
    top: 2,
    color: colors.white,
  },
  name: {
    top: 4,
    fontSize: 18.5,
    color: colors.white,
    textTransform: "capitalize",
  },
});
