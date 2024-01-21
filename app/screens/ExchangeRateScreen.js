import { useState } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

const data = [
  {
    id: 1,
    buy: 150.621,
    sell: 150.624,
    currency: "US",
    url: require("../assets/US.png"),
  },
  {
    id: 2,
    buy: 175.541,
    sell: 176.654,
    currency: "EU",
    url: require("../assets/EU.png"),
  },
];

export default function ExchangeRateScreen() {
  const [rate] = useState([...data]);

  return (
    <>
      <View style={styles.bodyTitleCont}>
        <View />
        <Text style={styles.bodyTitle} bold>
          Buy
        </Text>
        <Text style={styles.bodyTitle} bold>
          Sell
        </Text>
      </View>
      <FlatList
        data={rate}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemFlagContainer}>
              <Image style={styles.itemFlag} source={item.url} />
              <Text style={styles.itemTitle} bold>
                {item.currency}
              </Text>
            </View>

            <Text style={styles.itemPrice} semibold>
              {item.buy}{" "}
              <Text semibold style={styles.itemSubt}>
                BIRR
              </Text>
            </Text>
            <Text style={styles.itemPrice} semibold>
              {item.sell}{" "}
              <Text semibold style={styles.itemSubt}>
                BIRR
              </Text>
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSept} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bodyTitle: {
    fontSize: 14.5,
    color: colors.black,
    textTransform: "uppercase",
  },
  bodyTitleCont: {
    marginTop: 20,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemSept: {
    height: 5,
    backgroundColor: colors.lighter,
  },
  itemSubt: {
    fontSize: 9.5,
    color: colors.medium,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.black,
  },
  itemFlagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 18,
    marginLeft: 5,
    color: colors.primary,
  },
  itemFlag: {
    width: 37.5,
    height: 25.5,
  },
  item: {
    width: "100%",
    borderRadius: 7.5,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
});
