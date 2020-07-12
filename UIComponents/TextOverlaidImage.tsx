import React, { useState, useEffect } from 'react';
import { View, ImageStyle, StyleProp, StyleSheet, ActivityIndicator } from 'react-native';
import { ImageProps, Image, Theme } from 'react-native-elements';
import { NormalText } from './NormalText';

interface TextOverlaidImageProps extends ImageProps {
  badges?: string[],
  theme: Theme,
  imageText?: {
    show: boolean,
    text: string
  },
  solidImgBorders?: boolean
}

export const TextOverlaidImage: React.FC<TextOverlaidImageProps> = ({ source, badges, style, imageText, solidImgBorders, theme, ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [computedStyle, setComputedStyle] = useState<StyleProp<ImageStyle>>();

  useEffect(() => {
    setComputedStyle(StyleSheet.flatten(StyleSheet.compose({
      width: '100%',
      height: 200,
      borderRadius: solidImgBorders ? 0 : 4, 
    }, style)));
  }, [style]);
  
  return (
    <View style={styles.cardImgGroup}>
      <Image
        onLoad={() => setImageLoaded(true)}
        PlaceholderContent={
          <View style={styles.cardImgPlaceholderContent}>
             <ActivityIndicator color={theme.colors?.primary}/>
          </View>
        }
        style={computedStyle}
        source={source}
        {...props}
      />

      {imageLoaded && imageText?.show && <>
        <View style={{...styles.cardImgOverlay, borderRadius: solidImgBorders ? 0 : 4}}></View>
        <View style={styles.cardImgTextContainer}>
          <NormalText style={styles.cardImgText}>{imageText.text}</NormalText>
        </View>
      </>}

      <View style={styles.cardBadges}>
        {imageLoaded && badges?.map(badge => <NormalText key={badge}
          style={{ ...styles.cardBadgeText, backgroundColor: theme.colors?.primary }}>
          {badge}
        </NormalText>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardImgGroup: {

  },
  cardImg: {

  },
  cardImgOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4
  },
  cardImgPlaceholderContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImgTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImgText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  },
  cardBadges: {
    position: 'absolute',
    top: 15,
    right: 0,
    alignItems: 'flex-end'
  },
  cardBadgeText: {
    color: 'rgba(255,255,255, 0.9)',
    elevation: 4,
    textAlign: 'right',
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    paddingVertical: 1,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 10
  },
});
