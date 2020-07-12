import React, { useReducer, createContext, useCallback, useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { AccountState, AccountDispatch } from './account.types';
import { AccountReducer } from './account.reducer';
import { AccountDispatchMiddleware } from './account.middleware';

interface AccountContextProps extends AccountState {
  dispatch: AccountDispatch;
  init: () => Promise<any>,
  isInitializing: boolean
}

const accountContextInit: AccountContextProps = {
  addresses: [],
  contactDetails: {
    email: '',
    firstName: '',
    lastName: '',
    mobileNumber: ''
  },
  paymentMethods: [],
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const AccountContext = createContext<AccountContextProps>(accountContextInit);

export const AccountContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AccountReducer, accountContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  //initializations
  const init = useCallback(async () => {
    try {
      setIsInitializing(true);
      await AccountDispatchMiddleware(dispatch)({ type: 'FETCH_CONTACT_DETAILS' })
      await AccountDispatchMiddleware(dispatch)({ type: 'FETCH_CONTACT_DETAILS' });
      await AccountDispatchMiddleware(dispatch)({ type: 'FETCH_ADDRESSES' });
      await AccountDispatchMiddleware(dispatch)({ type: 'FETCH_PAYMENT_METHODS' });
      setIsInitializing(false);
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [AccountDispatchMiddleware]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <AccountContext.Provider value={{
      dispatch: AccountDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      init: init,
      addresses: state.addresses,
      contactDetails: state.contactDetails,
      paymentMethods: state.paymentMethods
    }}>
      {children}
    </AccountContext.Provider>
  );
}
