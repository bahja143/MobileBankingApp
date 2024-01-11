import { useState } from "react";
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

import Notification from "../components/Notification";
import ActivityIndicator from "../components/ActivityIndicator";

const data = [
  {
    Title: "Payment to Acme Corp",
    text: "Debit from John Doe to Acme Corp for monthly internet service",
    date: "2024-01-05",
    seen: true,
  },
  {
    Title: "Grocery Purchase",
    text: "Debit from Jane Smith at Green Grocers for $85.67",
    date: "2024-01-08",
    seen: true,
  },
  {
    Title: "ATM Withdrawal",
    text: "Cash withdrawal of $200 by David Lee at ATM 12345",
    date: "2024-01-10",
    seen: true,
  },
  {
    Title: "Paycheck Deposit",
    text: "Direct deposit from ABC Company to Mary Johnson",
    date: "2024-01-11",
  },
  {
    Title: "Transfer to Savings",
    text: "Transfer of $500 from checking to savings by Emily Jones",
    date: "2024-01-11",
  },
];

export default function NotificationsScreen() {
  const [refresh] = useState(false);
  const [loading] = useState(false);
  const [notifications] = useState([...data]);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <View style={styles.navCont}>
          <TouchableOpacity style={styles.navIconCont}>
            <Entypo name="chevron-left" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title} semibold>
            Contact Support
          </Text>
        </View>
        {notifications?.length > 0 ? (
          <FlatList
            refreshing={refresh}
            data={notifications.reverse((n) => new Date(n.date))}
            keyExtractor={(d) => d.Title}
            renderItem={({ item }) => <Notification data={item} />}
          />
        ) : loading ? null : (
          <Text style={styles.noDataText}>No notification</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  itemSep: {
    height: 3,
    backgroundColor: colors.lighter,
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
    backgroundColor: colors.lighter,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 25,
    paddingHorizontal: 7.5,
    flexDirection: "row",
    alignItems: "center",
  },
  noDataText: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.medium,
    fontSize: Platform.OS === "android" ? 18 : 22.5,
  },
});
