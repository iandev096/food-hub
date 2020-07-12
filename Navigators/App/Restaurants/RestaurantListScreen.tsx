import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RestaurantNavigationProp, RestaurantsRouteProp, RestaurantsTabKey, Restaurant } from './restaurants.types';
import { RestaurantsList } from '../../../UIComponents/RestaurantsList';
import { restaurants } from '../../../data/fake-data';
import { ThemeContext } from 'react-native-elements';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';

interface RestaurantListScreenProps {
  navigation: RestaurantNavigationProp;
  route: RestaurantsRouteProp<RestaurantsTabKey>
}

export const RestaurantListScreen: React.FC<RestaurantListScreenProps> = ({ route, navigation }) => {
  const [mode, setMode] = useState<'opened' | 'closed' | 'new' | 'choice' | 'favorite'>();
  const { theme } = useContext(ThemeContext);
  let restaurantsList = restaurants();
  const [restList, setRestList] = useState(restaurantsList)

  useEffect(() => {
    if (route.name === 'OpenedRestaurants') {
      console.log(route.name)
      setMode('opened');
    } else if (route.name === 'ClosedRestaurants') {
      setMode('closed');
    } else if (route.name === 'FoodHubChoice') {
      setMode('choice');
    }
    else if (route.name === 'Favorite') {
      setMode('favorite');
    } else {
      setMode('new');
    }
  }, [route.name]);

  const [filteredOrders, setFilteredOrders] = useState<Restaurant[]>();
  useEffect(() => {
    if (route.name === 'OpenedRestaurants') {
      setRestList(restaurantsList.filter(item => !item.closed));
    } else if (route.name === 'ClosedRestaurants') {
      setRestList(restaurantsList.filter(item => item.closed));
    } else if (route.name === 'FoodHubChoice') {

    }
    else if (route.name === 'Favorite') {

    } else if (route.name === 'NewRestaurants') {
      setRestList(restaurantsList.filter(item => item.badges.includes('NEW')));
    }
  }, [route.name, setFilteredOrders]);

  const selectRestaurantHandler = (restId: string) => {
    navigation.navigate('RestaurantDetail', { restaurantId: restId });
  }

  return (
    <Container style={styles.container}>
      <View style={styles.inner}>
        <RestaurantsList
          horizontal={false}
          data={restList}
          theme={theme}
          onSelectRestaurant={(restId) => selectRestaurantHandler(restId)}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 0,
    minHeight: Dimensions.get('window').height - 50,
  },
  contain: {
    paddingHorizontal: 10
  },
  inner: {
    width: '100%',
    height: '100%',
  }
});