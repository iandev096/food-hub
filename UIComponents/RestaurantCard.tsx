import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, StyleProp, ViewProps } from 'react-native';
import { CustomCard } from './CustomCard';
import { NormalText } from './NormalText';
import { CardProps, Image, Theme, Icon, IconProps } from 'react-native-elements';
import { TextOverlaidImage } from './TextOverlaidImage';

interface RestaurantCardProps extends CardProps {
  onPress: Function;
  theme: Theme,
  title: string,
  badges?: string[],
  cuisines?: string[],
  closed: boolean,
  thumbnailUrl: string,
  size?: 'big' | 'small',
  pricingStars?: number,
  duration?: { min: number, max: number }
}

interface CardBodyIconProps extends IconProps {
  theme: Theme
}

function CardBodyIcon({ theme, ...props }: CardBodyIconProps) {
  return <Icon color={theme.colors?.success} size={14} {...props} />
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ badges, thumbnailUrl, size, title, cuisines, closed, pricingStars, onPress, duration, containerStyle, theme, ...props }) => {
  const [computedStyle, setComputedStyle] = useState<StyleProp<ViewProps>>();
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      width: size === 'small' ? 280 : '100%',
      margin: 0,
      padding: 0,
      marginRight: 20
    }, containerStyle))
  }, [containerStyle, size]);

  if (pricingStars && pricingStars > 3) {
    pricingStars = 3
  }

  return (
    <CustomCard containerStyle={computedStyle} {...props}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress()}>
        <TextOverlaidImage
          placeholderStyle={{ width: size === 'small' ? 280 : '100%', backgroundColor: theme.colors?.grey3 }}
          style={{
            height: size === 'small' ? 140 : 200
          }}
          source={{ uri: thumbnailUrl }}
          theme={theme}
          imageText={{
            show: closed,
            text: 'CLOSED'
          }}
          badges={badges}
        />
       
        <View style={styles.cardBody}>
          <NormalText numberOfLines={1} style={{ ...styles.cardTitle, color: theme.colors?.grey1 }} >
            {title}
          </NormalText>
          <NormalText numberOfLines={1} style={{ ...styles.cuisine, color: theme.colors?.grey3 }}>
            {cuisines?.join(' • ')}
          </NormalText>
          <View style={styles.pricing}>
            <CardBodyIcon theme={theme} size={18} name='cash-usd' type='material-community' />
            <NormalText style={{ color: theme.colors?.grey3 }}> | </NormalText>
            <View style={styles.pricingStars}>
              {new Array(pricingStars).fill('').map((_, idx) => (
                <CardBodyIcon key={idx} theme={theme} size={14} name='star' type='material-community' />
              ))}
            </View>
          </View>
          {duration && <NormalText style={styles.duration}>
            {duration?.min}-{duration?.max}<NormalText style={styles.durationUnit}>MIN</NormalText>
          </NormalText>}
        </View>
      </TouchableOpacity>
    </CustomCard>
  );
}

const styles = StyleSheet.create({
  cardImgGroup: {

  },
  cardImg: {
    width: '100%',
    height: 200,
    borderRadius: 4
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
  cardBody: {
    paddingVertical: 18,
    paddingHorizontal: 10
  },
  cardTitle: {
    fontSize: 20
  },
  cuisine: {
    fontSize: 14,
    marginVertical: 5
  },
  pricing: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pricingStars: {
    flexDirection: 'row'
  },
  duration: {
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 18,
    position: 'absolute',
    top: 0,
    right: 10,
    marginTop: -18,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontWeight: 'bold'
  },
  durationUnit: {
    fontSize: 12,
    fontWeight: 'normal'
  }
});
