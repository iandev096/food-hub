import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { OrderNavigationProp, OrderRouteProp, OrderTabsKey } from './orders.types';
import { Order } from './orders.model';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { ListItem, Image, ThemeContext } from 'react-native-elements';
import { orderList } from '../../../data/fake-data';
import * as faker from 'faker';
import { TextOverlaidImage } from '../../../UIComponents/TextOverlaidImage';
import TouchableScale from 'react-native-touchable-scale';

interface OrdersListScreenProps {
  navigation: OrderNavigationProp,
  route: OrderRouteProp<OrderTabsKey>
}

export const OrdersListScreen: React.FC<OrdersListScreenProps> = ({ route }) => {
  const [mode, setMode] = useState<'active' | 'completed' | 'cancelled'>();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (route.name === 'ActiveOrders') {
      setMode('active');
    } else if (route.name === 'CompletedOrders') {
      setMode('completed');
    } else {
      setMode('cancelled');
    }
  }, [route.name]);

  const orders = orderList;

  const [filteredOrders, setFilteredOrders] = useState<Order[]>();
  useEffect(() => {
    let filtered;
    if (mode === 'active') {
      filtered = orders.filter(order => order.completed === false && order.cancelled === false);
    } else if (mode === 'cancelled') {
      filtered = orders.filter(order => order.cancelled === true);
    } else {
      filtered = orders.filter(order => order.completed === true);
    }
    if (filtered) {
      setFilteredOrders(filtered);
    }
  }, [orders, mode, setFilteredOrders]);

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          {filteredOrders && filteredOrders.map(order => (
            <TouchableScale style={styles.listItemContainer} key={order.orderNumber}>
              <TextOverlaidImage
                style={{ width: '100%', height: 80 }}
                imageText={{
                  show: true,
                  text: order.items[faker.random.number(order.items.length - 1)].dish.restaurant.name
                }}
                source={{ uri: order.items[faker.random.number(order.items.length - 1)].dish.restaurant.images?.thumbnail }}
                theme={theme}
              />
              <ListItem
                title={`NO. ${order.orderNumber}`}
                titleStyle={{color: theme.colors?.grey3}}
                rightTitle={order.price ? `GHC${order.totalCost}` : 'GHC N/A'}
                rightTitleStyle={{color: theme.colors?.primary, fontWeight: 'bold'}}
                subtitle={order.items.reduce((acc, cur) => acc += (cur.dish.title + ', '), '').slice(0, -2)}
                subtitleStyle={{ color: theme.colors?.grey1}}
                containerStyle={styles.listItem}
              />
            </TouchableScale>
          ))}
        </View>
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
  },
  inner: {
    width: '100%',
    height: '100%',
  },
  listItemContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2
  },
  listItem: {
  }
});
