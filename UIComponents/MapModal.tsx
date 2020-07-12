import React, { useState, useEffect, useCallback } from 'react';
import { View, Dimensions, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import Modal from 'react-native-modal';
import { Theme, Icon, Header } from 'react-native-elements';
import { NormalText } from './NormalText';

interface MapModalProps {
  isVisible: boolean;
  onClose: Function,
  onLocationSelected: (location: { lng: number, lat: number }) => any,
  theme: Theme,
  readOnly: boolean,
  initialLocation: {lat: number, lng: number} | null;
}

export const MapModal: React.FC<MapModalProps> = ({ isVisible, onClose, onLocationSelected, initialLocation, readOnly, theme, ...props }) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number }>({ 
    lat: initialLocation ? initialLocation.lat : 5.719390607942531, 
    lng: initialLocation ? initialLocation.lng : -0.24202879518270493
  });
  const [locationDelta, setLocationDelta] = useState<{ lat: number, lng: number }>({ 
    lat: 0.3707595832564925, 
    lng: 0.2551860362291336
  });
  const [mapType, setMapType] = useState<'standard' | 'hybrid'>('standard');
  const [isDraggable, setIsDraggable] = useState(true);

  useEffect(() => {
    if (readOnly) setIsDraggable(false);
    else setIsDraggable(true);
  }, [readOnly]);

  const selectLocationHandler = (ev: MapEvent<{}>) => {
    setSelectedLocation({
      lat: ev.nativeEvent.coordinate.latitude,
      lng: ev.nativeEvent.coordinate.longitude
    });
  }

  const saveSelectedLocationHandler = useCallback(
    () => {
      if (selectedLocation) {
        onLocationSelected(selectedLocation);
        onClose();
      } else {
        Alert.alert('Select a location', 'Please ensure that a location is selected');
      }
    },
    [selectedLocation],
  )

  return (
    <Modal
      coverScreen={true}
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={() => onClose()}
      {...props}
    >
      <View style={styles.mapContainer}>

        <MapView
          showsUserLocation
          style={styles.mapView}
          initialRegion={{
            latitude: selectedLocation.lat,
            latitudeDelta: locationDelta.lat,
            longitude: selectedLocation.lng,
            longitudeDelta: locationDelta.lng
          }}
          onPress={selectLocationHandler}
          zoomEnabled
          rotateEnabled={true}
          mapType={mapType}
          onRegionChangeComplete={(data) => console.log('[region]', data)}
        >
          <Marker
            draggable={isDraggable}
            onDragEnd={selectLocationHandler}
            title='Selected Location'
            coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
        </MapView>
        <View style={styles.bottom}>
          <View style={{ ...styles.mapTypes, borderColor: theme.colors?.primary }}>
            <TouchableOpacity
              style={{ ...styles.mapType, borderColor: theme.colors?.primary }}
              onPress={() => setMapType('hybrid')}
            >
              <Icon name='globe' type='font-awesome' color={theme.colors?.primary} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapType}
              onPress={() => setMapType('standard')}
            >
              <Icon name='map' type='font-awesome' color={theme.colors?.primary} size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{ ...styles.saveButton, backgroundColor: theme.colors?.error, marginRight: 5 }}>
              <NormalText style={{ color: 'white' }}>CANCEL</NormalText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => saveSelectedLocationHandler()}
              style={{ ...styles.saveButton, backgroundColor: theme.colors?.success }}>
              <NormalText style={{ color: 'white' }}>SAVE</NormalText>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </Modal>

  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modal: {
    margin: 10
  },
  mapView: {
    width: '100%',
    height: '90%',

  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  mapTypes: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'transparent',
    opacity: 0.7,
    borderWidth: 0.5,
    overflow: 'hidden'
  },
  mapType: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderWidth: 0.5,
  },
  action: {
    flexDirection: 'row',
    opacity: 0.78
  },
  saveButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: 'center',
  }
});
