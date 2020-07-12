import React from 'react';
import { Input } from 'react-native-elements';
import { AuthFormInputProps } from './auth.types';

export const AuthFormikInput: React.FC<AuthFormInputProps> = ({ placeholder, onChangeText, formikProps, formikKey, ...props }) => {
  return (
    <Input
      placeholder={formikKey}
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      errorMessage={formikProps.touched[formikKey] ? formikProps.errors[formikKey] : ''}
      {...props}
    />
  );
}