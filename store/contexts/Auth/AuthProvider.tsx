import React from 'react';
import useAuthContext from './UseAuthContext';
import { AuthContextProps, authContextInit } from './AuthProviderTypes';

export const AuthContext = React.createContext<AuthContextProps>(authContextInit);

interface AuthProviderProps {

}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { authContext } = useAuthContext();
  
  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}
