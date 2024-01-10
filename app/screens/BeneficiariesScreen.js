import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../components/CustomText";
import colors from "../config/colors";

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
];

export default function BeneficiariesScreen() {
  return (
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
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
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
                  {`${item.Name.firstName} ${item.Name.middleName} ${item.Name.lastName}`}
                </Text>
                <Text style={styles.itemSubtitle} numberOfLines={1}>
                  {item.Account} - Shabelle Bank jsdkhsjk kjgh
                </Text>
              </View>
            </View>
            <View>
              <Octicons name="chevron-right" size={22} color={colors.medium} />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSept} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 7.5,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 19,
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
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  itemSept: {
    height: 5,
    backgroundColor: colors.white,
  },
  iconContainer: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  itemSubtitle: {
    fontSize: 13,
    maxWidth: 270,
    color: colors.medium,
  },
  itemTitle: {
    fontSize: 15,
    marginBottom: 5,
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
    justifyContent: "space-between",
    backgroundColor: colors.lighter,
  },
});
