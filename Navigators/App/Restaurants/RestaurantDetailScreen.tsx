import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppNavigationProp, AppRouteProp } from '../Index/app.types';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { Image, ThemeContext, Icon } from 'react-native-elements';
import { restaurantList } from '../../../data/fake-data';
import { TextOverlaidImage } from '../../../UIComponents/TextOverlaidImage';
import { NormalText } from '../../../UIComponents/NormalText';
import { adhocRestaurant } from './restaurants.types';
import { RestaurantDetailTopTabs } from './RestaurantDetailTopTabs';
import { LinkText } from '../../../UIComponents/LinkText';
import { RestaurantInfoModal } from './RestaurantInfoModal';

interface RestaurantDetailScreenProps {
  navigation: AppNavigationProp<'RestaurantDetail'>,
  route: AppRouteProp<'RestaurantDetail'>
}

const restList = restaurantList;

export const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({ navigation, route }) => {
  const [restaurant, setRestaurant] = useState<adhocRestaurant>();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const restaurantId = route.params.restaurantId;
    if (restaurantId) setRestaurant(restList.find(rest => rest.id === restaurantId));
  }, [route.params.restaurantId]);

  return (
    <>
      <RestaurantInfoModal
        location={{
          lat: 5.719390607942531,
          lng: -0.24202879518270493
        }}
        isVisible={showInfoModal}
        theme={theme}
        onClose={() => setShowInfoModal(false)}
        cuisines={restaurant?.cuisines}
      />
      <Screen>
        <Container style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.restaurantGroup}>
              <TextOverlaidImage
                source={{ uri: restaurant?.thumbnail }}
                theme={theme}
                imageText={{
                  text: 'CLOSED',
                  show: restaurant?.closed ?? false
                }}
                solidImgBorders={true}
              />
              <View style={styles.restaurantDetails}>
                {restaurant?.duration.min && <NormalText style={styles.duration}>
                  {restaurant.duration?.min}-{restaurant.duration?.max}<NormalText style={styles.durationUnit}>MIN</NormalText>
                </NormalText>}
                <NormalText style={{ ...styles.title, color: theme.colors?.grey1 }}>
                  {restaurant?.title}
                </NormalText>
                <View style={styles.subTitleContainer}>
                  <View style={styles.rating}>
                    <Icon type='material-community' name='star' style={{ ...styles.ratingIcon, borderRightColor: theme.colors?.grey3 }} color={theme.colors?.warning} size={18} />
                    <NormalText style={{ ...styles.subTitle, color: theme.colors?.grey3, marginLeft: 3 }}>4.3</NormalText>
                  </View>
                  <NormalText style={{ ...styles.separator, ...styles.subTitle, color: theme.colors?.grey3 }}>•</NormalText>
                  <NormalText style={{ ...styles.subTitle, color: theme.colors?.grey3 }}>$ Min Order GH15</NormalText>
                  <NormalText style={{ ...styles.separator, ...styles.subTitle, color: theme.colors?.grey3 }}>•</NormalText>
                  <NormalText style={{ ...styles.subTitle, color: theme.colors?.grey3 }}>Delivery fee GH10</NormalText>
                  <NormalText style={{ ...styles.separator, ...styles.subTitle, color: theme.colors?.grey3 }}>•</NormalText>
                  <LinkText onPress={() => setShowInfoModal(true)} style={styles.subTitle}>More</LinkText>
                </View>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              {restaurant && <RestaurantDetailTopTabs
                navigation={navigation}
                restaurant={restaurant} />}
            </View>
          </View>

        </Container>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0
  },
  inner: {
    height: '100%',
    width: '100%'
  },
  restaurantGroup: {

  },
  restaurantDetails: {
    paddingTop: 19,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  subTitle: {
    fontSize: 14
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    borderRightWidth: 1,
    paddingRight: 3
  },
  separator: {
    marginHorizontal: 5
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
