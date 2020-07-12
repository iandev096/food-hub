import * as faker from 'faker';
import { Dish, DishItemExtra } from '../Navigators/App/Restaurants/restaurants.types';
import { Order, OrderItem, OrderItemExtra } from '../Navigators/App/Orders/orders.model';
const foodPicsSm = [
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/2228559/pexels-photo-2228559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&dpr=1&w=200',
  'https://images.pexels.com/photos/3730946/pexels-photo-3730946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200',
  'https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
  'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=50&w=200',
]

const foodPics = [
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/2228559/pexels-photo-2228559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&dpr=1&w=600',
  'https://images.pexels.com/photos/3730946/pexels-photo-3730946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600',
  'https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
  'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=600',
]
const cuisines = ['Continental', 'Salads', 'Pizzas', 'Sandwiches', 'Soups', 'Pastries', 'Drinks', 'Local', 'Chinese'];

export const restaurants = () => new Array(10).fill('').map((_, idx) => {
  const min = faker.random.number({ min: 20, max: 50 });
  return {
    thumbnail: foodPics[idx],
    id: idx.toString(),
    title: faker.company.companyName(),
    badges: Array.from(
      new Set(
        new Array(faker.random.number({ max: 2, min: 1 })).fill('').map(() => faker.helpers.randomize(['NEW', 'DISCOUNT']))
      )
    ).sort(),
    closed: faker.random.boolean(),
    duration: {
      max: min + faker.random.number(15),
      min
    },
    pricingStars: faker.random.number({ min: 1, max: 3 }),
    cuisines: Array.from(
      new Set(
        new Array(faker.random.number({ min: 2, max: 6 })).fill('').map(() => faker.helpers.randomize(cuisines))
      )
    )
  }
});
export const restaurantList = restaurants(); 

export const dishes = () => new Array(10).fill('').map((_, idx) => {
  return {
    id: idx.toString(),
    description: faker.lorem.sentences(2),
    price: faker.random.number({max: 150, min: 10}),
    title: faker.commerce.product(),
    image: foodPics[idx],
    cuisines: Array.from(
      new Set(
        new Array(faker.random.number({ min: 2, max: 6 })).fill('').map(() => faker.helpers.randomize(cuisines))
      )
    )
  } as Dish;
});
export const dishList = dishes();

const duplicateDishItemExtraCheckHash: {[key: string]: boolean} = {};
const dishItemExtras = () => new Array(3).fill('').map((_, idx) => {
  return new DishItemExtra(
    faker.helpers.randomize(['Toppings', 'Spices', 'Size']),
    new Array(faker.random.number({min: 1, max: 3})).fill('').map((_, ix) => ({
      price: faker.random.number(70),
      title: faker.commerce.product()
    }))
  )
}).filter(dishItemExtra => {
  if (duplicateDishItemExtraCheckHash[dishItemExtra.title]) {
    return false;
  }
  duplicateDishItemExtraCheckHash[dishItemExtra.title] = true;
  return true;
});
export const dishItemExtrasList = dishItemExtras();

const orderItemExtras = () => new Array(faker.random.number(3)).fill('').map((_, idx) => {
  return new OrderItemExtra(
    faker.helpers.randomize(['Toppings', 'Spices', '']),
    new Array(faker.random.number({min: 1, max: 3})).fill('').map((_, ix) => ({
      price: faker.random.number(70),
      title: faker.commerce.product()
    }))
  )
});

const orderItems = () => new Array(faker.random.number({min: 1, max: 3})).fill('').map((_, idx) => {
  return new OrderItem(
    {
      description: dishList[idx].description,
      price: dishList[idx].price,
      quantity: faker.random.number({min: 1, max: 4}),
      restaurant: {
        id: restaurantList[idx].id,
        description: faker.lorem.sentences(2),
        name: restaurantList[idx].title,
        images: {
          thumbnail: restaurantList[idx].thumbnail
        }
      },
      title: dishList[idx].title,
      cuisines: dishList[idx].cuisines,
      image: dishList[idx].image,
    },
    orderItemExtras()
  )
});
export const orders = () => new Array(10).fill('').map((_, idx) => {
  const completed = faker.random.boolean();
  const cancelled = completed ? false : faker.random.boolean();
  return new Order(
    idx.toString(),
    orderItems(),
    faker.random.number(40),
    {
      lat: 0.2323599049,
      lng: 8.7474831234,
      location: faker.address.streetAddress()
    },
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    {
      type: 'cash'
    },
    completed,
    cancelled
  )
});
export const orderList = orders();