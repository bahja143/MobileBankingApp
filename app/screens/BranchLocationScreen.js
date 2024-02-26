import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/CustomText";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 9.145;
const LONGITUDE = 40.489673;
const LATITUDE_DELTA = 10;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyBPu8BqybdnkeahLkTajf5H0OezipCnNk4";

class BranchLocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      distance: 0,
      duration: 0,
      center: {},
      showPermissions: false,
    };

    this.mapView = null;
  }

  render() {
    const { showPermissions, distance, duration } = this.state;

    console.log();

    return (
      <>
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.navIconCont}
          >
            <Entypo size={30} color={colors.white} name="chevron-left" />
          </TouchableOpacity>
          <Text style={styles.text} bold>
            {parseFloat(distance).toFixed(1)}Km
          </Text>
          <Text style={styles.text} semibold>
            {" "}
            Away, After{" "}
          </Text>
          <Text style={styles.text} bold>
            {parseFloat(duration).toFixed(1)} Minutes
          </Text>
        </View>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // focusable
          loadingEnabled
          showsUserLocation
          zoomEnabled={true}
          style={styles.map}
          followsUserLocation
          showsCompass={true}
          cacheEnabled={false}
          ref={(c) => (this.mapView = c)}
          loadingIndicatorColor={colors["primary"]}
          onUserLocationChange={() => this.getUserLocationOnchange()}
        >
          {this.state.coordinates.slice(0, 1).map((coordinate, index) => (
            <Marker
              title={`Shabelle Bank - ${this.state.center?.name}`}
              key={`coordinate_${index}`}
              coordinate={coordinate}
            >
              <FontAwesome name="bank" color={colors.primary} size={30} />
            </Marker>
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={
                this.state.coordinates.length > 2
                  ? this.state.coordinates.slice(1, -1)
                  : undefined
              }
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              mode="WALKING"
              strokeWidth={5}
              lineDashPattern={[1]}
              optimizeWaypoints={true}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeColor={colors["green"]}
              onStart={(params) => {
                //   console.log(
                //     `Started routing between "${params.origin}" and "${params.destination}"`
                //   );
              }}
              onReady={(result) => {
                this.setState({
                  distance: result.distance,
                  duration: result.duration,
                });

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
      </>
    );
  }

  componentDidMount() {
    const item = this.props.route.params;
    const { coordinates } = this.state;
    coordinates.push(item.location);

    this.getUserLocation();
    this.setState({ center: item });
  }

  handlePermissions = (input) => {
    this.setState({ showPermissions: input });
  };

  getUserLocation = async () => {
    try {
      const { coordinates } = this.state;

      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();

      coordinates.push({ latitude, longitude });

      this.setState({ coordinates });
    } catch (error) {
      console.log(error);
      this.handlePermissions(true);
    }
  };

  getUserLocationOnchange = async () => {
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
      this.handlePermissions(true);
    }
  };
}

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
    fontSize: 15,
    color: colors["black"],
  },
});

export default BranchLocationScreen;
