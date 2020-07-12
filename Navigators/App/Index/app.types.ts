import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
 
export type ParamRouteAction = 'add' | {editKey: string};
export type EditScreenAppStackParamList = {
  EditAddress: {
    action: ParamRouteAction
  },
  EditPaymentMethods: {
    action: ParamRouteAction
  },
}
export type AppStackParamList = {
  Tabs:undefined,
  EditContact: {
    autofocus?: 'firstName' | 'lastName' | 'mobile' | 'email'
  },

  RestaurantDetail: {
    restaurantId: string
  },
  RestaurantAddToCart: {
    dishId: string,
  }
} & EditScreenAppStackParamList

export type AppNavigationProp<T extends keyof AppStackParamList> = StackNavigationProp<AppStackParamList, T>;

export type AppRouteProp<T extends keyof AppStackParamList> = RouteProp<AppStackParamList, T>;
