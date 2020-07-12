import { IOrder, IOrderItem, IOrderItemDish, IOrderItemExtra, IOrderItemExtraOptions, IPrice, IAddress, IPayment } from "./orders.types";

const accPriceFn = (acc: number, cur: IPrice) => {
  acc += cur.price;
  return acc;
}

export class OrderItemExtra implements IOrderItemExtra {
  options: IOrderItemExtraOptions[];
  price: number;

  constructor(
    public title: string,
    options: IOrderItemExtraOptions[]
  ) {
    this.options = options;
    this.price = this.options.reduce(accPriceFn, 0);
  }
}

export class OrderItem implements IOrderItem {
  price: number;

  constructor(
    public dish: IOrderItemDish,
    public orderItemExtras: IOrderItemExtra[] = [],
  ) {
    this.price = this.getOrderItemPrice(dish, orderItemExtras);
  }

  private getOrderItemPrice(dish: IOrderItemDish, orderItemExtras: IOrderItemExtra[]) {
    const orderItemExtrasPrice = orderItemExtras.reduce(accPriceFn, 0);
    const price = orderItemExtrasPrice + (dish.price * dish.quantity);
    return price;
  }
}

export class Order implements IOrder {
  price: number;
  totalCost: number;
  
  constructor(
    public orderNumber: string,
    public items: IOrderItem[],
    public deliveryFee: number,
    public address: IAddress,
    public userName: string,
    public userContactNumber: string,
    public payment: IPayment,
    public completed: boolean = false,
    public cancelled: boolean = false
  ) {
    this.price = items.reduce(accPriceFn, 0);
    this.totalCost = this.price + this.deliveryFee;
  }
}
