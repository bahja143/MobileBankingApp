import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Linking, View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

export default function CustomerSupportScreen({ navigation }) {
  const handleEmail = () => {
    Linking.openURL("mailto:support@shabellebank.com");
  };
  const handleCallUs = () => {
    Linking.openURL("tel:966");
  };
  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=+251907005112`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navCont}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navIconCont}
        >
          <Entypo name="chevron-left" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title} semibold>
          Contact Support
        </Text>
      </View>
      <TouchableOpacity onPress={handleCallUs} style={styles.item}>
        <View style={styles.iconContainer}>
          <Ionicons size={27.5} name="call" color={colors.primary} />
        </View>
        <View>
          <Text style={styles.itemText} semibold>
            Our 24x7 customer service
          </Text>
          <Text style={styles.itemTitle} semibold>
            966
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleWhatsApp} style={styles.item}>
        <View style={styles.iconContainer}>
          <FontAwesome name="whatsapp" size={27.5} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.itemText} semibold>
            Message us
          </Text>
          <Text style={styles.itemTitle} semibold>
            251907005112
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEmail} style={styles.item}>
        <View style={styles.iconContainer}>
          <Entypo name="email" size={27.5} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.itemText} semibold>
            Write us
          </Text>
          <Text style={styles.itemTitle} semibold>
            support@shabellebank.com
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 17,
    textAlign: "center",
    color: colors.black,
  },
  navIconCont: {
    padding: 3,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: colors.primary,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: "center",
    flexDirection: "row",
  },
  itemTitle: {
    fontSize: 15,
    marginTop: 3,
    color: colors.black,
  },
  itemText: {
    color: colors.medium,
  },
  item: {
    elevation: 1,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 7.5,
    paddingVertical: 13,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderColor: colors.light,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 45,
    height: 45,
    marginRight: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
});
