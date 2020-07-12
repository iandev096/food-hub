import { AccountAction, SetContactDetailsAction, RemoveAddressAction, AddAddressAction, AddPaymentMethodAction, RemovePaymentMethodAction, GetContactDetailsAction, FetchContactDetailsAction, FetchAddressesAction, GetAddressesAction, Address, PaymentMethod, GetPaymentMethodsAction, SetAddressAction, SetPaymentMethodAction, AccountDispatch } from './account.types';
import { firestore, auth, User } from 'firebase';

const usersColRef = 'users';
const usersAddressRef = 'addresses';
const usersPaymentMethodRef = 'paymentMethods';

async function fetchContactDetailsCase(user: User, dispatch: AccountDispatch) {
  try {
    const fetchedContactDetailsDoc = await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .get();

    if (fetchedContactDetailsDoc.exists) {
      const dispatchAction: GetContactDetailsAction = {
        type: 'GET_CONTACT_DETAILS',
        payload: {
          email: fetchedContactDetailsDoc.data()?.email,
          firstName: fetchedContactDetailsDoc.data()?.firstName,
          lastName: fetchedContactDetailsDoc.data()?.lastName,
          mobileNumber: fetchedContactDetailsDoc.data()?.mobileNumber
        }
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Contact details not found'); 
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching contact details');
  }
}

async function setContactDetailsCase(user: User, action: SetContactDetailsAction, dispatch: AccountDispatch) {
  try {
    await firestore().collection(usersColRef).doc(user?.uid).set({
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      mobileNumber: action.payload.mobileNumber
    }, {
      merge: true
    });
    return dispatch(action);
  } catch (err) {
    throw new Error('Error updating contact details');
  }
}

async function fetchAddressesCase(user: User, dispatch: AccountDispatch) {
  try {
    const fetchedAddressesSnapshot = await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .collection(usersAddressRef)
      .get()

    const fetchedAddressDocs: Address[] = [];
    fetchedAddressesSnapshot.forEach((doc) => {
      fetchedAddressDocs.push({
        label: doc.data()?.label,
        location: {
          lat: doc.data()?.location?.lat,
          lng: doc.data()?.location?.lng
        },
        residentialAddress: doc.data()?.residential
      });
    });

    if (fetchedAddressDocs.length > 0) {
      const dispatchAction: GetAddressesAction = {
        type: 'GET_ADDRESSES',
        payload: fetchedAddressDocs
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Addresses not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching contact details');
  }
}

async function addAddressCase(user: User, action: AddAddressAction | SetAddressAction, dispatch: AccountDispatch) {
  const addressLabel = action.payload.label;
  try {
    await firestore()
      .collection(usersColRef)
      .doc(user?.uid)
      .collection(usersAddressRef)
      .doc(addressLabel)
      .set({
        label: action.payload.label,
        residential: action.payload.residentialAddress,
        location: {
          lat: action.payload.location.lat,
          lng: action.payload.location.lng
        }
      });
    return dispatch(action);
  } catch (err) {
    throw new Error('Error adding address');
  }
}

async function removeAddressCase(user: User, action: RemoveAddressAction, dispatch: AccountDispatch) {
  const removeAddressLabel = action.payload.label;
  try {
    await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .collection(usersAddressRef)
      .doc(removeAddressLabel)
      .delete();
    return dispatch(action);
  } catch (err) {
    throw new Error('Error removing address');
  }
}

async function fetchPaymentMethodsCase(user: User, dispatch: AccountDispatch) {
  try {
    const fetchedPaymentMethodsSnapshot = await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .collection(usersPaymentMethodRef)
      .get()

    const fetchedPaymentMethodsDocs: PaymentMethod[] = [];
    fetchedPaymentMethodsSnapshot.forEach((doc) => {
      if (doc.exists) {
        fetchedPaymentMethodsDocs.push({
          cardNumber: doc.data()?.cardNumber,
          defaultPayment: doc.data()?.default,
          nameOfInstitution: doc.data().nameOfInstitution,
          nameOnCard: doc.data()?.nameOnCard
        });
      }
    });

    if (fetchedPaymentMethodsDocs.length > 0) {
      const dispatchAction: GetPaymentMethodsAction = {
        type: 'GET_PAYMENT_METHODS',
        payload: fetchedPaymentMethodsDocs
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Addresses not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching contact details');
  }
}

async function addPaymentMethodCase(user: User, action: AddPaymentMethodAction | SetPaymentMethodAction, dispatch: AccountDispatch) {
  const cardNumber = action.payload.cardNumber;

  try {
    await firestore()
      .collection(usersColRef)
      .doc(user?.uid)
      .collection(usersPaymentMethodRef)
      .doc(cardNumber)
      .set({
        cardNumber: action.payload.cardNumber,
        default: action.payload.defaultPayment,
        nameOnCard: action.payload.nameOnCard,
        nameOfInstitution: action.payload.nameOfInstitution,
        type: 'credit card'
      });

    return dispatch(action);
  } catch (err) {
    throw new Error('Error adding address');
  }
}

async function removePaymentMethodCase(user: User, action: RemovePaymentMethodAction, dispatch: AccountDispatch) {
  const removeCardNumber = action.payload.cardNumber;
  try {
    await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .collection(usersPaymentMethodRef)
      .doc(removeCardNumber)
      .delete();
    return dispatch(action);
  } catch (err) {
    throw new Error('Error removing payment method');
  }
}

export const AccountDispatchMiddleware = (dispatch: AccountDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: AccountAction) => {
      switch (action.type) {
        case 'FETCH_CONTACT_DETAILS':
          return fetchContactDetailsCase(user, dispatch)
            .then()
            .catch(err => { throw err });

        case 'SET_CONTACT_DETAILS':
          return setContactDetailsCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });

        case 'FETCH_ADDRESSES':
          return fetchAddressesCase(user, dispatch)
            .then()
            .catch(err => { throw err });

        case 'SET_ADDRESS':
        case 'ADD_ADDRESS':
          return addAddressCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });


        case 'REMOVE_ADDRESS':
          return removeAddressCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });

        case 'FETCH_ADDRESSES':
          return fetchPaymentMethodsCase(user, dispatch)
            .then()
            .catch(err => { throw err });

        case 'SET_PAYMENT_METHOD':
        case 'ADD_PAYMENT_METHOD':
          return addPaymentMethodCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });

        case 'REMOVE_PAYMENT_METHOD':
          return removePaymentMethodCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
