import React from 'react';
import { Input } from 'react-native-elements';
import { AccountFormInputProps } from './account.types';

export const AccountFormikInput: React.FC<AccountFormInputProps> = ({ placeholder, formikProps, formikKey, ...props }) => {
  
  return (
    <Input
      placeholder={placeholder}
      value={formikProps.values[formikKey].toString()}
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      labelProps={{
        style:{color: 'black', fontWeight: 'normal'}
      }}
      errorMessage={formikProps.touched[formikKey] ? formikProps.errors[formikKey] : ''}
      {...props}
    />
  );
}