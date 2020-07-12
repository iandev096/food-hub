import { RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'

export type OrderTabsParamList = {
  ActiveOrders: {
    mode: 'active'
  },
  CompletedOrders: {
    mode: 'completed'
  },
  CancelledOrders: {
    mode: 'cancelled'
  }
}
export type OrderTabsKey = keyof OrderTabsParamList;

export type OrderRouteProp<T extends keyof OrderTabsParamList> = RouteProp<OrderTabsParamList, T>;
export type OrderNavigationProp = MaterialTopTabNavigationProp<OrderTabsParamList>

export interface IPrice {
  price: number;
}
export interface IOrderItemExtraOptions extends IPrice {
  title: string,
};
export interface IOrderItemExtra extends IPrice {
  title: string,
  options: IOrderItemExtraOptions[],
  maxSelection?: number
}
export interface IOrderItemDish extends IPrice {
  restaurant: {
    id: string,
    name: string,
    description: string,
    images?:{
      thumbnail: string,
      others?: string[]
    }
  },
  quantity: number,
  title: string,
  description: string,
  cuisines?: string[],
  image?: string,
}
export interface IOrderItem extends IPrice {
  dish: IOrderItemDish,
  orderItemExtras?: IOrderItemExtra[],
}
export interface IPayment {
  type: 'momo' | 'credit-card' | 'cash',
  payload?: {
    cardNumber: string,
    nameOfInstitution: string,
    nameOnCard: string
  } | {
    contactNumber: string
  }
}
export interface IAddress {
  location: string,
  lat: number,
  lng: number
}
export interface IOrder extends IPrice {
  orderNumber: string,
  items: IOrderItem[],
  deliveryFee: number,
  address: IAddress,
  userName: string,
  userContactNumber: string,
  payment: IPayment,
  totalCost: number,
  completed?: boolean,
  cancelled?: boolean,
  discount?: boolean,
};
