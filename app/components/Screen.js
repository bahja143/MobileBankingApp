import { StyleSheet, SafeAreaView } from "react-native";

export default function Screen({ children, ...otherProps }) {
  return (
    <SafeAreaView style={styles.container} {...otherProps}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
