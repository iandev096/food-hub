import { RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export type RestaurantsTabsParamList = {
  OpenedRestaurants: {
    mode: 'opened',
  },
  ClosedRestaurants: {
    mode: 'closed'
  },
  NewRestaurants: {
    mode: 'new'
  },
  FoodHubChoice: {
    mode: 'choice'
  },
  Favorite: {
    mode: 'favorite'
  },

  //bubbled up
  RestaurantDetail: {
    restaurantId: string
  }
}
export type RestaurantsTabKey = keyof RestaurantsTabsParamList;

export type RestaurantsRouteProp<T extends keyof RestaurantsTabsParamList> = RouteProp<RestaurantsTabsParamList, T>;
export type RestaurantNavigationProp = MaterialTopTabNavigationProp<RestaurantsTabsParamList>;

export class DishItemExtraOption {
  constructor(
    public title: string,
    public price: number,
    public maxSelection?: number,
  ) { }
};
export class DishItemExtra {

  constructor(
    public title: string,
    public options: DishItemExtraOption[]
  ) {
    
  }
}

export interface Dish {
  id: string,
  restaurant: {
    id: string
  },
  title: string;
  description: string;
  price: number;
  cuisines: string[];
  image?: string;
};

interface UsersRating {
  [key: string]: {
    stars: number,
    comment?: string,
    date: Date | string;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisines: string[];
  images: {
    thumbnail: string,
    others?: string[]
  },
  location: {
    lat: number,
    lng: number
  },
  address: string;
  contactNumber: string;
  town: string;
  menu: {
    categories: string[],
    dishes: Dish[]
  },
  rating: UsersRating,
  estimatedTimeArrival?: {
    min: number, // in minutes varies with location
    max: number, // in minutes varies with location
  },
  closingHour: number;
  openingHour: number;
}


export type adhocRestaurant = {
  thumbnail: string;
  id: string;
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