import Modal from "react-native-modal";
import Lotty from "lottie-react-native";
import { StyleSheet } from "react-native";

import Loading from "../assets/animation/Loading.json";

const ActivityIndicator = ({ visible }) => {
  if (!visible) return null;

  return (
    <Modal isVisible style={styles.container}>
      <Lotty style={styles.lotify} source={Loading} autoPlay loop />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lotify: {
    width: 110,
    height: 110,
  },
});

export default ActivityIndicator;
