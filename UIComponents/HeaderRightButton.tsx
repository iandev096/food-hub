import React from 'react';
import { View, Text } from 'react-native';
import { Button, ButtonProps, Theme } from 'react-native-elements';

interface HeaderRightButtonProps extends ButtonProps {
  color?: string;
}

export const HeaderRightButton: React.FC<HeaderRightButtonProps> = ({title, color, onPress, ...props}) => {
  return (
    <Button
        title={title}
        raised={true}
        // buttonStyle={{ backgroundColor: color }}
        titleStyle={{ color: 'white' }}
        containerStyle={{ marginRight: 10 }}
        onPress={onPress}
        type='clear'
        {...props}
      />
  );
}