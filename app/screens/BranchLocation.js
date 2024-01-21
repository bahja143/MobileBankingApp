import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { Dimensions, StyleSheet, View, Text } from "react-native";

import colors from "../config/colors";
// import PermissionsModal from "../components/PermissionsModal";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 9.56;
const LONGITUDE = 44.06;
const LATITUDE_DELTA = 10.43;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyAdcgm5LvfAevml-ae6OuXqVZ8WqQWo5hc";
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

export default function BranchLocation() {
  const [center, setCenter] = useState({});
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mapView, setMapView] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [showPermissions, setShowPermissions] = useState(false);

  const handlePermissions = (input) => {
    setShowPermissions(input);
  };

  const getUserLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();

      coordinates.push({ latitude, longitude });

      setCoordinates((c) => [...c, { latitude, longitude }]);
    } catch (error) {
      console.log(error);
      handlePermissions(true);
    }
  };

  const getUserLocationOnchange = async () => {
    try {
      const { coordinates } = this.state;

      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();

      coordinates.pop();
      coordinates.push({ latitude, longitude });

      this.setState({ coordinates });
    } catch (error) {
      console.log(error);
      handlePermissions(true);
    }
  };

  useEffect(() => {
    // const item = this.props.route?.params;
    const item = { location: { latitude: 9.561287, longitude: 44.058293 } };
    setCoordinates(() => [
      { latitude: 9.561287, longitude: 44.058293 },
      { latitude: 9.612016, longitude: 43.882136 },
    ]);

    getUserLocation();
    setCenter({ ...item });
  }, []);

  return (
    <View style={styles.container}>
      {/* <PermissionsModal
        show={showPermissions}
        setShow={this.handlePermissions}
        message="For better experience please turn on you Location."
      /> */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{Math.ceil(distance)}Km away, </Text>
        <Text style={styles.text1}>
          You will get after {Math.ceil(duration)} Menutes
        </Text>
      </View>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        ref={(c) => setMapView(c)}
        showsUserLocation
        followsUserLocation
        focusable
        onUserLocationChange={() => getUserLocationOnchange()}
        showsCompass={true}
        chacheEnabled={false}
        zoomEnabled={true}
        loadingEnabled
        loadingIndicatorColor={colors["primary"]}
        style={styles.map}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    backgroundColor: colors["white"],
    height: 75,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  map: {
    flex: 1,
    top: -25,
    height: 8500,
  },
  text: {
    color: colors["primary"],
    fontSize: 16,
    fontFamily: "sans-serif-light",
  },
  text1: {
    color: colors["secondary"],
    fontSize: 16,
    fontFamily: "sans-serif-light",
  },
});
