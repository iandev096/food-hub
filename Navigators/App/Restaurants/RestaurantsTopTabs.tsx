import React, { useContext, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RestaurantsTabsParamList } from './restaurants.types';
import { ThemeContext } from 'react-native-elements';
import { RestaurantListScreen } from './RestaurantListScreen';
import { AppRouteProp } from '../Index/app.types';
import { BottomRouteProp } from '../BottomTabs/bottomTabs.types';
import { ActivityIndicator } from 'react-native';

interface RestaurantsTopTabsProps {
  route: BottomRouteProp<'Restaurants'>,
}

const TopTabs = createMaterialTopTabNavigator<RestaurantsTabsParamList>();

export const RestaurantsTopTabs: React.FC<RestaurantsTopTabsProps> = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const [jumpTo, setJumpTo] = useState<keyof RestaurantsTabsParamList>();

  return (
    <TopTabs.Navigator
      lazy
      lazyPlaceholder={() => <ActivityIndicator color={theme.colors?.primary}/>}
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
        indicatorStyle: { backgroundColor: theme.colors?.primary }
      }}
    >
      <TopTabs.Screen
        options={{ title: 'Opened' }}
        initialParams={{ mode: 'opened' }}
        name='OpenedRestaurants'
        component={RestaurantListScreen}
      />
      <TopTabs.Screen
        options={{ title: 'Your Favorite' }}
        initialParams={{ mode: 'favorite' }}
        name='Favorite'
        component={RestaurantListScreen}
      />
      <TopTabs.Screen
        options={{ title: 'Our Favorite' }}
        initialParams={{ mode: 'choice' }}
        name='FoodHubChoice'
        component={RestaurantListScreen}
      />
      <TopTabs.Screen
        options={{ title: 'New' }}
        initialParams={{ mode: 'new' }}
        name='NewRestaurants'
        component={RestaurantListScreen}
      />
      <TopTabs.Screen
        options={{ title: 'Closed' }}
        initialParams={{ mode: 'closed' }}
        name='ClosedRestaurants'
        component={RestaurantListScreen}
      />
    </TopTabs.Navigator>
  );
}
