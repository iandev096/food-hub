import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from 'react-native-elements';
import { AuthContext } from '../../../store/contexts/Auth/AuthProvider';
import { HeaderRightButton } from '../../../UIComponents/HeaderRightButton';
import { HeaderTitle, BottomTabsParamList } from './bottomTabs.types';
import { HomeScreen } from '../Home/HomeScreen';
import { AppNavigationProp, AppRouteProp } from '../Index/app.types';
import { OrdersTopTabs } from '../Orders/OrdersTopTabs';
import { OffersScreen } from '../Offers/OffersScreen';
import { AccountScreen } from '../Account/AccountScreen';
import { RestaurantsTopTabs } from '../Restaurants/RestaurantsTopTabs';

interface BottomTabsProps {
  navigation: AppNavigationProp<'Tabs'>
  route: AppRouteProp<'Tabs'>
}

const BottomTabsNavigator = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs: React.FC<BottomTabsProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const [header, setHeader] = useState<HeaderTitle>('Home');

  useEffect(() => {
    let headerRight: ((props: {
      tintColor?: string | undefined;
    }) => React.ReactNode) | undefined;

    if (header === 'Account') {
      headerRight = () => (<HeaderRightButton
        title='LOGOUT'
        color={theme.colors?.error}
        onPress={() => logout()}
      />);
    }
    navigation.setOptions({
      headerTitle: header,
      headerRight
    });
  }, [header])

  return (
    <BottomTabsNavigator.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName!: string;

          if (route.name === 'Home') iconName = 'ios-home';
          else if (route.name === 'Restaurants') iconName = 'ios-restaurant';
          else if (route.name === 'Offers') iconName = 'ios-card';
          else if (route.name === 'Orders') iconName = 'ios-list-box';
          else if (route.name === 'Account') iconName = 'ios-person';

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Home')
        })}
        name='Home' component={HomeScreen}
      />
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Restaurants')
        })}
        name='Restaurants' component={RestaurantsTopTabs}
      />
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Orders')
        })}
        name='Orders' component={OrdersTopTabs}
      />
      {/* <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Offers')
        })}
        name='Offers' component={OffersScreen}
      /> */}
      <BottomTabsNavigator.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Account')
        })}
        name='Account' component={AccountScreen}
      />
    </BottomTabsNavigator.Navigator>
  );
}