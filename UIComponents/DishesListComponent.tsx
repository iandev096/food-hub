import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Dish } from '../Navigators/App/Restaurants/restaurants.types';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

interface DishesListComponentProps {
  dishes: Dish[],
  onSelectDish: (dishId: string) => any
}

export const DishesListComponent: React.FC<DishesListComponentProps> = ({ dishes, onSelectDish }) => {
  return (
    <>
    {
      dishes && dishes.map(dish => <ListItem
        key={dish.id}
        title={dish.title}
        Component={TouchableScale}
        onPress={() => onSelectDish(dish.id)}
        subtitle={`GH${dish.price}`}
        leftAvatar={{
          source: { uri: dish.image }
        }}
        containerStyle={{borderLeftColor: 'grey', borderLeftWidth: 0.5}}
        bottomDivider
      />)
    }
    </>
  );
}