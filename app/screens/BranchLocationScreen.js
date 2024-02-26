import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Text from "../components/CustomText";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 9.145;
const LATITUDE_DELTA = 10;
const LONGITUDE = 40.489673;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = "AIzaSyBPu8BqybdnkeahLkTajf5H0OezipCnNk4";

const MapWithDirections = ({ route, navigation }) => {
  let mapView = useRef();
  const info = useNetInfo();
  const [branch, setBranch] = useState({});
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [coordinates, setCoordinates] = useState([]);

  const handleUserLocationOnchange = async () => {
    try {
      if (info.type !== "unknown" && info.isInternetReachable === false) return;

      const response = await Location.getLastKnownPositionAsync();

      if (!response?.coords) return;

      const data = [...coordinates];
      if (data.length !== 1) {
        data.pop();
      }

      data.push({
        latitude: response?.coords?.latitude,
        longitude: response?.coords?.longitude,
      });
      setCoordinates([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = route.params;

    setBranch(data.branch);
    setCoordinates([...data.coordinates]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navIconCont}
        >
          <Entypo size={30} color={colors.white} name="chevron-left" />
        </TouchableOpacity>
        <Text style={styles.text} semibold>
          {parseFloat(distance).toFixed(1)} KM away,{" "}
        </Text>
        <Text style={styles.text1}>
          you will get after {parseFloat(duration).toFixed(1)} Minutes
        </Text>
      </View>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        focusable
        ref={(c) => (mapView = c)}
        loadingEnabled
        showsUserLocation
        style={styles.map}
        zoomEnabled={true}
        followsUserLocation
        showsCompass={true}
        cacheEnabled={false}
        loadingIndicatorColor={colors["primary"]}
        onUserLocationChange={handleUserLocationOnchange}
      >
        {coordinates
          .slice(0, coordinates.length - 1)
          .map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={coordinate}
              title={`Shabelle Bank - ${branch.name}`}
            >
              <FontAwesome name="bank" color={colors.primary} size={30} />
            </Marker>
          ))}

        {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[coordinates.length - 1]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            strokeWidth={5}
            lineDashPattern={[1]}
            optimizeWaypoints={true}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor={colors["green"]}
            destination={coordinates[0]}
            onReady={(result) => {
              setDistance(result.distance);
              setDuration(result.duration);

              mapView?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    zIndex: 1,
    height: 60,
    paddingLeft: 5,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors["white"],
  },
  navIconCont: {
    padding: 3,
    marginRight: 7,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: colors.primary,
  },
  map: {
    flex: 1,
    height: 8500,
  },
  text: {
    fontSize: 15,
    color: colors["black"],
  },
  text1: {
    fontSize: 15,
    color: colors["black"],
  },
});

export default MapWithDirections;
