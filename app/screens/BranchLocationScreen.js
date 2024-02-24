import MapViewDirections from "react-native-maps-directions";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";

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
  const [branch, setBranch] = useState({});
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  let mapView = useRef();

  const handleGetUserLocationOnchange = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();

      coordinates.shift();
      coordinates.unshift({ latitude, longitude });

      setCoordinates(coordinates);
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
    <View style={{ flex: 1 }}>
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navIconCont}
        >
          <Entypo size={30} color={colors.white} name="chevron-left" />
        </TouchableOpacity>
        <Text style={styles.text} semibold>
          {Math.ceil(distance)} KM away,{" "}
        </Text>
        <Text style={styles.text1}>
          you will get after {Math.ceil(duration)} Menutes
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
        loadingEnabled
        showsUserLocation
        style={styles.map}
        zoomEnabled={true}
        followsUserLocation
        showsCompass={true}
        cacheEnabled={false}
        ref={(c) => (mapView = c)}
        loadingIndicatorColor={colors["primary"]}
        onUserLocationChange={handleGetUserLocationOnchange}
      >
        {coordinates.slice(1).map((coordinate, index) => (
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
            origin={coordinates[0]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            strokeWidth={5}
            lineDashPattern={[1]}
            optimizeWaypoints={true}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor={colors["green"]}
            destination={coordinates[coordinates.length - 1]}
            onReady={(result) => {
              setDistance(result.distance);
              setDuration(result.duration);

              mapView.fitToCoordinates(result.coordinates, {
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
    fontSize: 15.5,
    color: colors["black"],
  },
  text1: {
    fontSize: 15.5,
    color: colors["black"],
  },
});

export default MapWithDirections;
