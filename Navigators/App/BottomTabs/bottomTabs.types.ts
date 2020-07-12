import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RestaurantsTabsParamList } from '../Restaurants/restaurants.types';

export type BottomTabsParamList = {
  Home: undefined,
  Restaurants: {
    jumpTo: keyof RestaurantsTabsParamList;
  },
  Orders: undefined,
  Offers: undefined,
  Account: undefined,
  Help: undefined,
  
  //bubbled up
  RestaurantDetail: {
    restaurantId: string
  }
}

export type HeaderTitle = keyof BottomTabsParamList;

export type BottomNavigationProp<T extends keyof BottomTabsParamList> = BottomTabNavigationProp<BottomTabsParamList, T>
export type BottomRouteProp<T extends keyof BottomTabsParamList> = RouteProp<BottomTabsParamList, T>;