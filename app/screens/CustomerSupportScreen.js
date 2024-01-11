import { Linking, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";

import Text from "../components/CustomText";
import colors from "../config/colors";

export default function CustomerSupportScreen() {
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
        <TouchableOpacity style={styles.navIconCont}>
          <Entypo name="chevron-left" size={30} color={colors.primary} />
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
            Our 24x7 Customer Service
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
            Message Us
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
            Write Us
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
    backgroundColor: colors.white,
  },
  navCont: {
    marginTop: 10,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
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
    width: "100%",
    elevation: 2.5,
    borderRadius: 10,
    marginBottom: 7.5,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
});
