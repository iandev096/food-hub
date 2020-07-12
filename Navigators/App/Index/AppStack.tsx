import React, { useContext, useState, useEffect } from 'react';
import { createStackNavigator, TransitionSpecs, HeaderBackButton } from '@react-navigation/stack';
import { AppStackParamList } from './app.types';
import { ThemeContext, Header, SearchBar, IconProps, withBadge, Icon } from 'react-native-elements';
import { BottomTabs } from '../BottomTabs/BottomTabs';
import { EditAddressScreen } from '../Account/EditAddressScreen';
import { EditContactDetailsScreen } from '../Account/EditContactDetailsScreen';
import { EditPaymentMethodsScreen } from '../Account/EditPaymentMethodsScreen';
import { RestaurantDetailScreen } from '../Restaurants/RestaurantDetailScreen';
import { CustomSearchBar } from '../../../UIComponents/CustomSearchBar';
import { RestaurantAddToCartScreen } from '../Restaurants/RestaurantAddToCartScreen';

interface AppStackProps {

}

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack: React.FC<AppStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');

  let BadgedIcon: React.ComponentType<IconProps> = withBadge(1)(Icon);
  useEffect(() => {
    BadgedIcon = withBadge(3)(Icon);
  }, []);

  return (
    <Stack.Navigator
      initialRouteName='Tabs'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors?.primary }
        }}
        name='Tabs'
        component={BottomTabs}
      />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors?.primary }
        }}
        name='EditAddress'
        component={EditAddressScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors?.primary }
        }}
        name='EditContact'
        component={EditContactDetailsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors?.primary }
        }}
        name='EditPaymentMethods'
        component={EditPaymentMethodsScreen}
      />

      <Stack.Screen
        options={{
          header: ({ navigation }) => (
            <Header
              containerStyle={{
                height: 70,
                paddingTop: 0,
                paddingLeft: 0
              }}
              rightContainerStyle={{
                marginRight: 10
              }}
              // leftComponent={{ icon: 'md-arrow-back', type: 'ionicon', color: '#fff', onPress: () => navigation.goBack() }}
              leftComponent={<HeaderBackButton
                tintColor='#fff'
                onPress={() => navigation.goBack()}
              />}
              centerComponent={
                <CustomSearchBar
                  onSubmit={(text) => console.log(text)}
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                  theme={theme}
                  round={true}
                  placeholder='Search Dish'
                />
              }
              rightComponent={
                <BadgedIcon color='#fff' type='ionicon' name='md-cart' />
              }
            />

          )
        }}
        name='RestaurantDetail'
        component={RestaurantDetailScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors?.primary },
          transitionSpec: {
            open: TransitionSpecs.ScaleFromCenterAndroidSpec,
            close: TransitionSpecs.FadeOutToBottomAndroidSpec
          },
        }}
        name='RestaurantAddToCart'
        component={RestaurantAddToCartScreen}
      />

    </Stack.Navigator>

  );
}