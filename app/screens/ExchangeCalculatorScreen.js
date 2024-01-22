import { useState } from "react";
import { View, Image, FlatList, TextInput, StyleSheet } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

const data = [
  {
    id: 1,
    currency: "ETB",
    placeholder: "00.0 Birr",
    url: require("../assets/Ethiopia.png"),
  },
  {
    id: 2,
    buy: 53.1589,
    sell: 52.1166,
    currency: "USD",
    placeholder: "00.0 $",
    url: require("../assets/US.png"),
  },
  {
    id: 3,
    buy: 54.0254,
    sell: 52.9661,
    currency: "EUR",
    placeholder: "00.0 €",
    url: require("../assets/EU.png"),
  },
  {
    id: 4,
    buy: 60.6612,
    sell: 59.4718,
    currency: "GBP",
    placeholder: "00.0 £",
    url: require("../assets/British.png"),
  },
];

export default function ExchangeCalculatorScreen() {
  const [rates, setRates] = useState([...data]);

  const handleChange = (currency, itemId) => {
    if (itemId === 1) {
      return setRates([
        ...rates.map((r) => {
          if (r.id !== 1) {
            r.amount = Math.round(currency / r.buy);
          }

          if (r.id === 1) {
            r.amount = currency;
          }

          return r;
        }),
      ]);
    }

    return setRates([
      ...rates.map((r) => {
        if (r.id === 1) {
          r.amount = Math.round(
            currency * rates.find((ra) => ra.id === itemId).sell
          );
        } else if (r.id === itemId) {
          r.amount = currency;
        }

        return r;
      }),
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rates}
        contentContainerStyle={styles.flatList}
        ItemSeparatorComponent={({}) => <View style={styles.itemSept} />}
        renderItem={({ item }) => (
          <View style={styles.item} key={item.id}>
            <View style={styles.itemFlagCont}>
              <Image style={styles.itemFlag} source={item.url} />
              <Text style={styles.itemTitle} bold>
                {item.currency}
              </Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={item.placeholder}
              value={item.amount?.toString()}
              selectionColor={colors.primary}
              onChangeText={(value) => handleChange(value, item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: colors.lighter,
  },
  flatList: { paddingBottom: 15 },
  itemSept: {
    height: 10,
    backgroundColor: colors.lighter,
  },
  itemTitle: {
    fontSize: 16,
    color: colors.medium,
  },
  itemFlagCont: {
    top: 2.5,
    marginRight: 25,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    fontSize: 17.5,
    borderRadius: 10,
    textAlign: "right",
    paddingVertical: 13,
    color: colors.medium,
    paddingHorizontal: 10,
    alignItems: "flex-end",
    fontFamily: "Inter_500Medium",
    backgroundColor: colors.lighter,
  },
  itemFlag: {
    width: 35,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
  },
  item: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    paddingHorizontal: 7.5,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
});
