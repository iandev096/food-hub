import React, { useState, useCallback, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { auth, User, firestore } from 'firebase';
import { AuthContextProps, authContextInit, asyncStorageUserKey } from "./AuthProviderTypes";

const usersColRef = 'users';

function getUserInfo(user: User | null) {
  if (user) {
    return {
      username: user?.displayName,
      email: user?.email,
      emailVerified: user?.emailVerified
    };
  } else {
    throw new Error('No user credential');
  }
}

const useAuthContext = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authContext, setAuthContext] = useState<AuthContextProps>(authContextInit);

  const initHandler = useCallback(async () => {
    try {
      const userString = await AsyncStorage.getItem(asyncStorageUserKey);
      if (userString) {
        setUser(JSON.parse(userString));
      }
    } catch (err) {
      throw err;
    }
  }, [setUser])

  const authSignupHandler = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      const userInfo = getUserInfo(userCredential.user);
      console.log('signing up \n', userInfo);

      await firestore().collection(usersColRef).doc(userCredential.user?.uid).set({
        email: userInfo.email,
        emailVerified: userInfo.emailVerified
      });

      setUser(userInfo);

      await AsyncStorage.setItem(asyncStorageUserKey, JSON.stringify(userInfo));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, [setIsLoading, setUser]);

  const authLoginHandler = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userInfo = getUserInfo(userCredential.user);
      console.log('signing up \n', userInfo);

      await firestore().collection(usersColRef).doc(userCredential.user?.uid).set({
        email: userInfo.email,
        emailVerified: userInfo.emailVerified
      }, {
        merge: true
      });

      setUser(userInfo);

      await AsyncStorage.setItem(asyncStorageUserKey, JSON.stringify(userInfo));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, [setUser, setIsLoading]);

  const authLogoutHandler = useCallback(async () => {
    setUser(null);
    try {
      console.log('logout');
      await auth().signOut();
      await AsyncStorage.removeItem(asyncStorageUserKey);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, [setUser]);

  useEffect(() => {
    setAuthContext({
      user,
      init: initHandler,
      login: authLoginHandler,
      logout: authLogoutHandler,
      signup: authSignupHandler,
      isLoading
    });
  }, [user, isLoading, setAuthContext, authLogoutHandler, authLogoutHandler]);

  return { authContext };
}

export default useAuthContext;
