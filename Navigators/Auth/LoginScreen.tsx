import React from 'react';
import { View, Text } from 'react-native';
import { AuthNavigationProp, AuthRouteProp } from './auth.types';

interface LoginScreenProps {
  navigation: AuthNavigationProp<'Login'>,
  route: AuthRouteProp<'Login'>
}

export const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
}