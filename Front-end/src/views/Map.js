import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, Paragraph, Portal, FAB, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../styles/map/mapStyle";
import iconMarker from "../assets/iconMarkerMini.png";
import { CENTER_MAP } from "../utils/constants";
import { createZone, getAllZones, setMyZone } from "../store/zoneSlice/zoneThunk";

export default function Map() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, zones, myZone } = useSelector(state => state.zone);
  const [location, setLocation] = useState(null);
  const [loc, setLoc] = useState(null);
  const [first, setFirst] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [selectedZone, setSelectedZone] = useState(null);
  const [newZone, setNewZone] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [errorCreateZone, setErrorCreateZone] = useState(true);
  const [inZone, setInZone] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [diagCreateZone , setDiagCreateZone] = useState(false);
  const [MaxRangeLatZone, setMaxRangeLatZone] = useState([]);
  const [MinRangeLatZone, setMinRangeLatZone] = useState([]);
  const [MaxRangeLongZone, setMaxRangeLongZone] = useState([]);
  const [MinRangeLongZone, setMinRangeLongZone] = useState([]);
  const [defaultRegion, setDefaultRegion] = useState({
    latitude: CENTER_MAP.latitude,
    longitude: CENTER_MAP.longitude,
    latitudeDelta: CENTER_MAP.latitudeDelta,
    longitudeDelta: CENTER_MAP.latitudeDelta,
  });

  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: "whenInUse",
  });

  useEffect(() => {
    getCurrentPosition();
    dispatch(getAllZones());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, [location, myZone, inZone, loading, zones, errorCreateZone, MaxRangeLatZone, MinRangeLatZone, MaxRangeLongZone, MinRangeLongZone]);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      setLocation(position.coords);
      if (first) {
        setLoc(position.coords);
        setFirst(false);
      }
    }, error => {
      console.warn(error);
    }, {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 3600000,
    });
  };

  const updateLocation = (e) => {
    e.persist();
    setDefaultRegion((prevState => ({
      ...prevState,
      longitude: e.nativeEvent.coordinate ? e.nativeEvent.coordinate.longitude : location.longitude,
      latitude: e.nativeEvent.coordinate ? e.nativeEvent.coordinate.latitude : location.latitude,
    })));
    setLocation((prevState => ({
      ...prevState,
      longitude: e.nativeEvent.coordinate ? e.nativeEvent.coordinate.longitude : location.longitude,
      latitude: e.nativeEvent.coordinate ? e.nativeEvent.coordinate.latitude : location.latitude,
    })));
  };

  const zoneInOrOut = () => {
    let count = 0;
    let rangeZone = {
      "MaxRangeLatZone" : [],
      "MinRangeLatZone" : [],
      "MaxRangeLongZone" : [],
      "MinRangeLongZone" : [],
    };
    zones.map((data) => {
      if (MaxRangeLatZone.indexOf(data.topX.latitude) === -1){
        setMaxRangeLatZone( prevState => [...prevState, data.topX.latitude]);
        rangeZone.MaxRangeLatZone.push(data.topX.latitude);
      }
      if (MinRangeLatZone.indexOf(data.bottomX.latitude) === -1){
        setMinRangeLatZone( prevState => [...prevState, data.bottomX.latitude]);
        rangeZone.MinRangeLatZone.push(data.bottomX.latitude);
      }
      if (MaxRangeLongZone.indexOf(data.topY.longitude) === -1){
        setMaxRangeLongZone( prevState => [...prevState, data.topY.longitude]);
        rangeZone.MaxRangeLongZone.push(data.topY.longitude);
      }
      if (MinRangeLongZone.indexOf(data.bottomY.longitude) === -1){
        setMinRangeLongZone( prevState => [...prevState, data.bottomY.longitude]);
        rangeZone.MinRangeLongZone.push(data.bottomY.longitude);
      }
    });

    while (rangeZone.MaxRangeLatZone.length >= (count + 1)){
      if (loc.latitude < rangeZone.MaxRangeLatZone[count] && loc.latitude > rangeZone.MinRangeLatZone[count] && loc.longitude < rangeZone.MaxRangeLongZone[count] && loc.longitude > rangeZone.MinRangeLongZone[count]) {
        return true;
      }
      count++;
    }
    return count === 0;
  };


  const selectZone = () => {
    if (!name) {
      return;
    }

    const MaxRangeLat = location.latitude + 0.013;
    const MinRangeLat = location.latitude - 0.013;
    const MaxRangeLong = location.longitude + 0.02;
    const MinRangeLong = location.longitude - 0.02;

      if (loc.latitude < MaxRangeLat && loc.latitude > MinRangeLat && loc.longitude < MaxRangeLong && loc.longitude > MinRangeLong ) {
        if (!zoneInOrOut()){
          dispatch(createZone({
            name: name,
            topX: {
              latitude: location.latitude + 0.013,
              longitude: location.longitude - 0.020,
            },
            topY: {
              latitude: location.latitude + 0.013,
              longitude: location.longitude + 0.020,
            },
            bottomY: {
              latitude: location.latitude - 0.013,
              longitude: location.longitude - 0.020,
            },
            bottomX: {
              latitude: location.latitude - 0.013,
              longitude: location.longitude + 0.020,
            },
          }));
          return;
        } else {
          setErrorCreateZone(false);
        }
      }
      hideDialog();
      setDiagCreateZone(true);
  };

  const switchZoom = () => {
    if (zoom === 1) {
      setZoom(2);
    }
    if (zoom === 2) {
      setZoom(3);
    }
    if (zoom === 3) {
      setZoom(1);
    }
  };

  const showDialog = () => setDialogVisible(true);

  const hideDialog = () => {
    setDialogVisible(false);
    setSelectedZone(null);
    setNewZone(false);
  };
  const hideDialogAlt = () => {
   setDiagCreateZone(false);
   setInZone(true);
   setErrorCreateZone(true);
  };

  const inZoneOrNot = (zone) => {
    const MaxRangeLat = zone.topX.latitude;
    const MinRangeLat = zone.bottomX.latitude;
    const MaxRangeLong = zone.topY.longitude;
    const MinRangeLong = zone.bottomY.longitude;

      if (loc.latitude < MaxRangeLat && loc.latitude > MinRangeLat && loc.longitude < MaxRangeLong && loc.longitude > MinRangeLong ) {
        setSelectedZone(zone);
        return;
      }
      setInZone(false);
  };

  const goToZone = () => {
    if (!myZone && !selectedZone) {
      return;
    }

    dispatch(setMyZone(selectedZone ? selectedZone : myZone));
    navigation.navigate("Chat");
    hideDialog();
  };

  const createNewZone = () => {
    setNewZone(true);
    setIsCreating(true);
    showDialog();
  };

  if (!location || !location.latitude || !location.longitude || loading) {
    return (
      <View style={styles.loading}>
        <Text>{loading ? "Map is loading..." : "Geolocation is not authorized"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={defaultRegion}
        showsUserLocation={true}
      >
        <Marker
          draggable
          key={1}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={iconMarker}
          onDragEnd={(e) => updateLocation(e)}
        />

        {zones && zones.length > 0 ? zones.map((zone) => (
          <Polygon
            key={zone.name}
            coordinates={[
              {
                latitude: zone.topX.latitude,
                longitude: zone.topX.longitude,
              },
              {
                latitude: zone.topY.latitude,
                longitude: zone.topY.longitude,
              },
              {
                latitude: zone.bottomX.latitude,
                longitude: zone.bottomX.longitude,
              },
              {
                latitude: zone.bottomY.latitude,
                longitude: zone.bottomY.longitude,
              },
            ]}
            fillColor="rgba(0, 181, 204, 0.4)"
            strokeColor="rgba(0, 0, 0, 0.5)"
            strokeWidth={1}
            tappable
            onPress={() => {
              inZoneOrNot(zone);
              showDialog();
            }}
          />
        )) : null}
        {zoom === 1 ? <Polygon
          coordinates={[
            {
              latitude: location.latitude - 0.013,
              longitude: location.longitude + 0.02,
            },
            {
              latitude: location.latitude - 0.013,
              longitude: location.longitude - 0.02,
            },
            {
              latitude: location.latitude + 0.013,
              longitude: location.longitude - 0.02,
            },
            {
              latitude: location.latitude + 0.013,
              longitude: location.longitude + 0.02,
            },
          ]}
          fillColor="rgba(220,20,60, 0.3)"
          strokeColor="rgba(0,0,0,0.5)"
          strokeWidth={3}
          tappable
          onPress={switchZoom}

        /> : null}
        {zoom === 2 ?
          <Polygon
            coordinates={[
              {
                latitude: location.latitude - 0.02,
                longitude: location.longitude + 0.027,
              },
              {
                latitude: location.latitude - 0.02,
                longitude: location.longitude - 0.027,
              },
              {
                latitude: location.latitude + 0.02,
                longitude: location.longitude - 0.027,
              },
              {
                latitude: location.latitude + 0.02,
                longitude: location.longitude + 0.027,
              },
            ]}
            fillColor="rgba(220,20,60, 0.3)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={3}
            tappable
            onPress={switchZoom}
          /> : null}
        {zoom === 3 ?
          <Polygon
            coordinates={[
              {
                latitude: location.latitude - 0.033,
                longitude: location.longitude + 0.04,
              },
              {
                latitude: location.latitude - 0.033,
                longitude: location.longitude - 0.04,
              },
              {
                latitude: location.latitude + 0.033,
                longitude: location.longitude - 0.04,
              },
              {
                latitude: location.latitude + 0.033,
                longitude: location.longitude + 0.04,
              },
            ]}
            fillColor="rgba(220,20,60, 0.3)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={3}
            tappable
            onPress={switchZoom}
          /> : null}
      </MapView>
      {selectedZone || newZone ?
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>{selectedZone ? "Join a discussion zone" : "Create a discussion zone"}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {selectedZone
                  ? "Would you like to join " + selectedZone.name + " ?"
                  : "Would you like to create a new discussion zone on this perimeter ?"}
              </Paragraph>
              {!selectedZone && isCreating ? (
                <TextInput
                  mode="outlined"
                  label="Zone name"
                  value={name}
                  onChangeText={zone => setName(zone)}
                />
              ) : null}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              {selectedZone
                ? <Button onPress={goToZone}>Join</Button>
                : <Button onPress={selectZone} disabled={!name}>Create</Button>}
            </Dialog.Actions>
          </Dialog>
        </Portal> : null}

        <Dialog visible={!inZone} onDismiss={hideDialogAlt}>
            <Dialog.Title>You need to be on the current zone if you want join.</Dialog.Title>
            <Dialog.Actions>
                  <Button onPress={hideDialogAlt}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>

        <Dialog visible={diagCreateZone} onDismiss={hideDialogAlt}>
            <Dialog.Title>{errorCreateZone ? "You need to be in the current create zone .." : "Only one zone by place sorry bruh.." }</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={hideDialogAlt}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>


      <FAB icon="plus" style={styles.fabColor} onPress={createNewZone} testID="fab-map" />
    </View>
  );
}
