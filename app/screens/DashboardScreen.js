import {
  View,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Bg from "../assets/images/Bg.png";
import Avatar from "../assets/images/avatar.png";

import ActivityIndicator from "../components/ActivityIndicator";
import TransferDetailModal from "../components/TransferDetailModal";

import cache from "../utility/cache";
import authContext from "../context/AuthContext";
import transactionsData from "../data/transactions.json";

export default function DashboardScreen({ navigation }) {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [detailTran, setDetailTran] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user, account: myAccount, setUser } = useContext(authContext);

  const handleRefreshing = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const handleLoad = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTransactions([...transactionsData.slice(0, 5)]);
    }, 1000);
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
  const handleCheckPin = async () => {
    if (!user["pin"]) {
      setUser({ ...user, initial: false });
      await cache.setItemAsync("auth", { ...user, initial: false });
      navigation.navigate("createPin");
    }
  };
  const handleTranDetail = (tran) => {
    setDetail(tran);
    setDetailTran(true);
  };

  useEffect(() => {
    if (user.initial) {
      handleCheckPin();
    }

    handleLoad();
  }, []);

  return (
    <>
      <TransferDetailModal
        detail={detail}
        isVisible={detailTran}
        setShow={setDetailTran}
      />
      <ActivityIndicator visible={loading} />
      <FlatList
        data={[1]}
        style={style.main}
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
                    onPress={() => navigation.navigate("notifications")}
                    style={[style.imageContainer, style.iconBell]}
                  >
                    <MaterialCommunityIcons
                      size={22}
                      color={colors.primary}
                      name="bell-badge-outline"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("userprofile")}
                    style={style.imageContainer}
                  >
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
                    color={colors.medium}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={style.title} bold>
              Suggested Actions
            </Text>
            <View style={style.nav}>
              <TouchableOpacity
                onPress={() => navigation.navigate("transfer")}
                style={style.navCont}
              >
                <View style={style.navItem}>
                  <Feather size={28} name="send" style={style.navIcon} />
                  <Text style={style.navTitle} semibold>
                    Transfer
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("beneficiaries")}
                style={style.navCont}
              >
                <View style={style.navItem}>
                  <MaterialCommunityIcons
                    size={29}
                    style={style.navIcon}
                    name="account-multiple-outline"
                  />
                  <Text style={style.navTitle} semibold>
                    Beneficiary
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("history")}
                style={style.navCont}
              >
                <View style={style.navItem}>
                  <MaterialCommunityIcons
                    size={29}
                    name="history"
                    style={style.navIcon}
                  />
                  <Text style={style.navTitle} semibold>
                    History
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("myqr")}
                style={style.navCont}
              >
                <View style={style.navItem}>
                  <MaterialCommunityIcons
                    size={27}
                    name="qrcode-scan"
                    style={style.navIcon}
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

              <TouchableOpacity onPress={() => navigation.navigate("history")}>
                <Text>See All</Text>
              </TouchableOpacity>
            </View>
            {transactions.length !== 0 ? (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={style.itemSep} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleTranDetail(item)}
                    style={style.TranCont}
                  >
                    <View style={style.Tran} key={item}>
                      <View style={style.TranTextCont}>
                        <View style={style.TranIconCont}>
                          <MaterialCommunityIcons
                            size={32.5}
                            style={style.tranIcon}
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
        contentContainerStyle={style.container}
      />
    </>
  );
}

const style = StyleSheet.create({
  main: { flex: 1, backgroundColor: colors.lighter },
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
    paddingBottom: 90,
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
    color: "rgba(0, 0, 0, 0.7)",
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
  tranIcon: {
    color: colors.primary,
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
    paddingHorizontal: 7.5,
    marginHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  Tran: {
    flexDirection: "row",
    marginHorizontal: 2.5,
    justifyContent: "space-between",
  },
  tranTitleCont: {
    marginTop: 11,
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7.5,
    justifyContent: "space-between",
  },
  NavImage: {
    width: "100%",
    height: "100%",
  },
  navCont: {
    alignItems: "center",
  },
  navIcon: {
    color: "rgba(0, 0, 0, 0.7)",
  },
  navTitle: {
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "Inter_600SemiBold",
  },
  navItem: {
    width: 81,
    height: 75,
    paddingTop: 2.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lighter,
  },
  nav: {
    marginTop: 7.5,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7.5,
    backgroundColor: colors.white,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 15,
    marginTop: 15,
    marginHorizontal: 7.5,
    color: "rgba(0, 0, 0, 0.7)",
  },
  topHeader: {
    height: 210,
    paddingTop: 10,
    paddingHorizontal: 7.5,
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
    fontFamily: "Inter_600SemiBold",
  },
  accountBalanceText: {
    fontSize: 15,
    color: colors.black,
  },
  myBalance: {
    elevation: 4,
    paddingVertical: 14,
    paddingHorizontal: 25,
    marginHorizontal: 7.5,
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.white,
  },
  myAccountText: {
    fontSize: 15,
    color: colors.white,
  },
  accountNo: {
    fontSize: 20,
    marginTop: 7.5,
    color: colors.white,
    fontFamily: "Inter_600SemiBold",
  },
  myAccount: {
    elevation: 4,
    paddingVertical: 14,
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
    fontSize: 15,
    color: colors.white,
  },
  name: {
    top: 2.5,
    fontSize: 18.5,
    color: colors.white,
    textTransform: "capitalize",
  },
});
