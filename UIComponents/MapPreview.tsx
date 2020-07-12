import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { Image, Theme } from 'react-native-elements';
import ENV from '../constants/env';

interface MapPreviewProps extends TouchableOpacityProps {
  theme: Theme,
  location: { lat: number, lng: number } | null,
  initialLocation?: { lat: number, lng: number } 
}

export const MapPreview: React.FC<MapPreviewProps> = ({ onPress, children, initialLocation, style, theme, location }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [computedStyle, setComputedStyle] = useState<StyleProp<ViewStyle>>();
  const [prevLoc, setPrevLoc] = useState(initialLocation);

  useEffect(() => {
    if (location) {
      setPrevLoc(location);
    }
  }, [location])

  useEffect(() => {
    
    setComputedStyle(StyleSheet.compose({
      ...styles.imageContainer,
      borderColor: theme.colors?.grey3,
    }, style));

  }, [style]);

  useEffect(() => {

    if (prevLoc && prevLoc.lat && prevLoc.lng) {
      setImagePreviewUrl(
        `https://maps.googleapis.com/maps/api/staticmap?center=${prevLoc.lat},${prevLoc.lng}&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${prevLoc.lat},${prevLoc.lng}&key=${ENV.googleApiKey}`
      );
    }
    
  }, [setImagePreviewUrl, prevLoc]);

  return (
    <TouchableOpacity style={computedStyle} onPress={onPress} >
      {
        imagePreviewUrl ?
          <Image
            containerStyle={styles.mapImage}
            source={{ uri: imagePreviewUrl }}
          /> : children
      }
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})