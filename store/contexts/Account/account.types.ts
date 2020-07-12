
export type ContactDetails = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}
export type Address = {
  label: string;
  residentialAddress: string;
  location: {
    lat: number,
    lng: number,
  }
}
export type PaymentMethod = {
  cardNumber: string;
  defaultPayment: boolean;
  nameOfInstitution: string;
  nameOnCard: string;
}
export interface AccountState {
  contactDetails: ContactDetails;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}

export type FetchContactDetailsAction = {type: 'FETCH_CONTACT_DETAILS'}
export type GetContactDetailsAction = { type: 'GET_CONTACT_DETAILS', payload: ContactDetails };
export type SetContactDetailsAction = { type: 'SET_CONTACT_DETAILS', payload: ContactDetails };

export type FetchAddressesAction = {type: 'FETCH_ADDRESSES'}
export type GetAddressesAction = { type: 'GET_ADDRESSES', payload: Address[] };
export type AddAddressAction = { type: 'ADD_ADDRESS', payload: Address };
export type SetAddressAction = { type: 'SET_ADDRESS', payload: Address };
export type RemoveAddressAction = { type: 'REMOVE_ADDRESS', payload: { label: string } };

export type FetchPaymentMethodsAction = { type: 'FETCH_PAYMENT_METHODS' }
export type GetPaymentMethodsAction = { type: 'GET_PAYMENT_METHODS', payload: PaymentMethod[] };
export type AddPaymentMethodAction = { type: 'ADD_PAYMENT_METHOD', payload: PaymentMethod };
export type SetPaymentMethodAction = { type: 'SET_PAYMENT_METHOD', payload: PaymentMethod };
export type RemovePaymentMethodAction = { type: 'REMOVE_PAYMENT_METHOD', payload: { cardNumber: string } };

export type AccountAction =
  | FetchContactDetailsAction
  | GetContactDetailsAction
  | SetContactDetailsAction

  | FetchAddressesAction
  | GetAddressesAction
  | AddAddressAction
  | SetAddressAction
  | RemoveAddressAction

  | FetchPaymentMethodsAction
  | GetPaymentMethodsAction
  | AddPaymentMethodAction
  | SetPaymentMethodAction
  | RemovePaymentMethodAction;

export type AccountDispatch = (action: AccountAction) => any;
