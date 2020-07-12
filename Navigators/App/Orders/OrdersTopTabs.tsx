import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { OrderTabsParamList } from './orders.types';
import { ThemeContext } from 'react-native-elements';
import { OrdersListScreen } from './OrdersListScreen';

interface OrdersTopTabsProps {

}

const TopTabs = createMaterialTopTabNavigator<OrderTabsParamList>();

export const OrdersTopTabs: React.FC<OrdersTopTabsProps> = ({}) => {
  const {theme} = useContext(ThemeContext);
  
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
        indicatorStyle: { backgroundColor: theme.colors?.primary }
      }}
    >
      <TopTabs.Screen
        options={{ title: 'Active Orders' }}
        initialParams={{mode: 'active'}}
        name='ActiveOrders'
        component={OrdersListScreen}
      />
      <TopTabs.Screen
        options={{ title: 'Completed Orders' }}
        initialParams={{mode: 'completed'}}
        name='CompletedOrders'
        component={OrdersListScreen}
        />
        <TopTabs.Screen
          options={{ title: 'Cancelled Orders' }}
          initialParams={{mode: 'cancelled'}}
          name='CancelledOrders'
          component={OrdersListScreen}
          />
    </TopTabs.Navigator>
  );
}