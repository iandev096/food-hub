import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from './auth.types';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { AuthScreen } from './AuthScreen';

interface AuthStackProps {

};

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
  return (
    <Stack.Navigator screenOptions={{
      header: () => null
    }}
      initialRouteName='Auth'
    >
      <Stack.Screen name='Auth' component={AuthScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}