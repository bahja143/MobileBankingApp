import { useState } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

const data = [
  {
    id: 1,
    buy: 53.1589,
    sell: 52.1166,
    currency: "USD",
    url: require("../assets/images/US.png"),
  },
  {
    id: 2,
    buy: 54.0254,
    sell: 52.9661,
    currency: "EUR",
    url: require("../assets/images/EU.png"),
  },
  {
    id: 3,
    buy: 60.6612,
    sell: 59.4718,
    currency: "GBP",
    url: require("../assets/images/British.png"),
  },
];

export default function ExchangeRateScreen() {
  const [rate] = useState([...data]);

  return (
    <View style={styles.container}>
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
              <Text semibold style={styles.itemSub}>
                BIRR
              </Text>
            </Text>
            <Text style={styles.itemPrice} semibold>
              {item.sell}{" "}
              <Text semibold style={styles.itemSub}>
                BIRR
              </Text>
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSept} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter,
  },
  bodyTitle: {
    fontSize: 15.5,
    color: colors.black,
    textTransform: "capitalize",
  },
  bodyTitleCont: {
    marginTop: 15,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemSept: {
    height: 7,
    backgroundColor: colors.lighter,
  },
  itemSub: {
    fontSize: 12,
    color: colors.medium,
    textTransform: "capitalize",
  },
  itemPrice: {
    fontSize: 16.25,
    color: "rgba(0, 0, 0, 0.75)",
  },
  itemFlagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 17,
    marginLeft: 5,
    color: colors.primary,
  },
  itemFlag: {
    width: 37.5,
    height: 25.5,
  },
  item: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
});
