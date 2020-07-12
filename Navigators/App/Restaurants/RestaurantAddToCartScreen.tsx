import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { AppNavigationProp, AppRouteProp } from '../Index/app.types';
import { Dish, DishItemExtraOption } from './restaurants.types';
import { dishList, dishItemExtrasList } from '../../../data/fake-data';
import { Screen } from '../../../UIComponents/Screen';
import { Image, ThemeContext, Icon, Button } from 'react-native-elements';
import { NormalText } from '../../../UIComponents/NormalText';
import { CheckListItem } from '../../../UIComponents/CheckListItem';
import { FadeTitleText } from '../../../UIComponents/FadeTitleText';

interface RestaurantAddToCartScreenProps {
  navigation: AppNavigationProp<'RestaurantAddToCart'>,
  route: AppRouteProp<'RestaurantAddToCart'>,
}

type selectedDishExtra = (DishItemExtraOption & { exTitle: string });

export const RestaurantAddToCartScreen: React.FC<RestaurantAddToCartScreenProps> = ({ navigation, route }) => {
  const [dish, setDish] = useState<Dish>();
  const [qty, setQty] = useState(1);
  const [selectedDishExtras, setSelectedDishExtras] = useState<selectedDishExtra[]>([]);
  
  const toggleSelectedExtra = (exTitle: string, option: DishItemExtraOption) => {
    let newSelectedDishExtras: selectedDishExtra[] = [];
    if (selectedDishExtras.length === 0) {
      newSelectedDishExtras.push({
        exTitle,
        ...option,
      });
    } else {

      newSelectedDishExtras = selectedDishExtras.reduce<selectedDishExtra[]>((acc, cur, idx, arr) => {
        
        if (cur.exTitle !== exTitle && cur.title !== option.title) {
          console.log('not equal')
          acc.push({
            ...cur
          });
        }
  
        if (idx === arr.length - 1) {
          acc.push({
            exTitle,
          ...option,
          })
        }
  
        return acc;
      }, []);
    }

    setSelectedDishExtras(newSelectedDishExtras);
  }

  const getSelectedExtraStatus = (exTitle: string, option: DishItemExtraOption) => {
    const selected = selectedDishExtras.find(dishExtra => {
      if (dishExtra.exTitle === exTitle && dishExtra.title === option.title) {
        return true;
      }
      return false;
    });
    console.log(selected);
    return Boolean(selected);
  }

  const incrementQty = () => setQty(cur => ++cur);
  const decrementQty = () => {
    if (qty > 1) setQty(cur => --cur);
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Dish To Cart'
    })
  }, []);

  useEffect(() => {
    if (route.params.dishId) {
      setDish(dishList.find(dish => dish.id === route.params.dishId));
      console.log(dishItemExtrasList)
    }
  }, [route])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dishInfo}>
        <Image
          PlaceholderContent={
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator color={theme.colors?.primary} />
            </View>
          }
          style={styles.image}
          source={{ uri: dish?.image }}
        />
        <View style={styles.dishInfoTexts}>
          <NormalText style={[styles.dishTitle, { color: theme.colors?.grey1 }]}>
            {dish?.title}
          </NormalText>
          <NormalText style={[styles.dishSubTitle, { color: theme.colors?.grey1 }]}>
            GHC{dish?.price}
          </NormalText>
          {/* <View style={styles.dishDescContainer}>
            <Text style={[styles.desc, { color: theme.colors?.grey2 }]}>{dish?.description}</Text>
          </View> */}
        </View>
      </View>
      <Screen style={styles.extrasView}>
        {dishItemExtrasList.map((extra, idx) => 
          <View key={extra.title + idx} style={styles.extras}>
            <FadeTitleText theme={theme}>{extra.title}</FadeTitleText>
            {extra.options.map((option, idx) => 
            <CheckListItem
              onPress={() => toggleSelectedExtra(extra.title, option)}
              key={option.title + idx}
              theme={theme}
              title={option.title}
              rightTitle={option.price.toString()}
              active={getSelectedExtraStatus(extra.title, option)}
            />)}
          </View>
        )}

      </Screen>
      <View style={styles.footer}>
        <View style={styles.qtyControl}>
          <Icon
            onPress={() => decrementQty()}
            size={41}
            type='antdesign'
            name='minussquareo'
            color={qty <= 1 ? theme.colors?.grey4 : theme.colors?.error}
          />
          <NormalText style={styles.qtyText}>{qty}</NormalText>
          <Icon
            onPress={() => incrementQty()}
            size={41}
            type='antdesign'
            name='plussquareo'
            color={theme.colors?.success}
          />
        </View>
        <Button
          containerStyle={styles.cta}
          title='Add To Cart'
          icon={{
            name: 'cart-plus', 
            type: 'font-awesome-5',
            color: 'white',
            size: 15
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dishInfo: {
    elevation: 3,
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  dishInfoTexts: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  image: {
    width: '100%',
    height: 200,
    maxHeight: Dimensions.get('window').height * 0.3,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dishSubTitle: {
    fontSize: 15
  },
  dishDescContainer: {
    borderTopWidth: 0.5,
    paddingTop: 5,
    borderTopColor: 'lightgrey'
  },
  desc: {

  },
  extrasView: {

  },
  extras: {
    marginVertical: 15,
    paddingHorizontal: 10
  },
  footer: {
    paddingHorizontal: 10,
    height: 65,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.5,
    paddingRight: 10
  },
  qtyText: {
    fontSize: 25
  },
  cta: {
    flex: 0.5,
    paddingLeft: 10
  }
})