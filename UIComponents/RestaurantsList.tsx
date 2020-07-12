import React from 'react';
import { View, FlatList, FlatListProps } from 'react-native';
import { RestaurantCard } from './RestaurantCard';
import { Theme } from 'react-native-elements';

type restaurantItem =  {
  id: string;
  thumbnail: string;
  title: string;
  badges: string[];
  closed: boolean;
  duration: {
    max: number;
    min: number;
  };
  pricingStars: number;
  cuisines: string[];
};
interface RestaurantsListProps {
  data: restaurantItem[],
  theme: Theme,
  horizontal: boolean,
  onSelectRestaurant: (restaurantId: string) => any
}

export const RestaurantsList: React.FC<RestaurantsListProps> = ({ data, horizontal, theme, onSelectRestaurant, ...props }) => {
  
  return (
    <FlatList
      horizontal={horizontal}
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: horizontal ? 10 : 0, paddingBottom: !horizontal ? 50 : 0 }}
      renderItem={({ item, index }) => (
        <View style={{ paddingVertical: 5 }}>
          <RestaurantCard
            thumbnailUrl={item.thumbnail}
            key={item.id}
            onPress={() => onSelectRestaurant(item.id)}
            title={item.title}
            size={horizontal ? 'small' : 'big'}
            theme={theme}
            closed={item.closed}
            badges={item.badges}
            duration={item.duration}
            pricingStars={item.pricingStars}
            cuisines={item.cuisines}
          />
        </View>
      )}
    />
  );
}