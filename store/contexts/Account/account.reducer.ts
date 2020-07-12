import { AccountState, AccountAction } from './account.types';

export const AccountReducer = (state: AccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case 'GET_CONTACT_DETAILS':
      const fetchedContactDetails = action.payload;
      return {
        ...state,
        contactDetails: fetchedContactDetails
      }

    case 'SET_CONTACT_DETAILS':
      const updatedContactDetails = action.payload;
      return {
        ...state,
        contactDetails: updatedContactDetails
      };

    case 'GET_ADDRESSES':
      const fetchedAddresses = action.payload;
      return {
        ...state,
        addresses: fetchedAddresses
      }

    case 'ADD_ADDRESS':
      const newAddress = action.payload;
      const updatedAddresses = state.addresses.concat(newAddress);
      return {
        ...state,
        addresses: updatedAddresses
      };

    case 'SET_ADDRESS':
      const updatedAddress = action.payload;
      return {
        ...state,
        addresses: state.addresses.map(address => {
          if (address.label === updatedAddress.label) {
            return updatedAddress;
          }
          return address;
        })
      }

    case 'REMOVE_ADDRESS':
      const addressLabel = action.payload.label;
      const updatedAddressesAfterRemove = state.addresses.filter(address => address.label !== addressLabel);
      return {
        ...state,
        addresses: updatedAddressesAfterRemove
      };

    case 'GET_PAYMENT_METHODS':
      const fetchedPaymentMethods = action.payload;
      return {
        ...state,
        paymentMethods: fetchedPaymentMethods
      }

    case 'ADD_PAYMENT_METHOD':
      const newPaymentMethod = action.payload;
      const updatedPaymentMethods = state.paymentMethods.concat(newPaymentMethod);
      return {
        ...state,
        paymentMethods: updatedPaymentMethods
      };

    case 'SET_PAYMENT_METHOD':
      const updatedPaymentMethod = action.payload;
      return {
        ...state,
        paymentMethods: state.paymentMethods.map(paymentMethod => {
          if (paymentMethod.cardNumber === updatedPaymentMethod.cardNumber) {
            return updatedPaymentMethod;
          }
          return paymentMethod;
        })
      }

    case 'REMOVE_PAYMENT_METHOD':
      const cardNumber = action.payload.cardNumber;
      const updatedPaymentMethodsAfterRemove = state.paymentMethods.filter(paymentMethod => paymentMethod.cardNumber !== cardNumber);
      return {
        ...state,
        paymentMethods: updatedPaymentMethodsAfterRemove
      };

    default:
      return state;
  }
}