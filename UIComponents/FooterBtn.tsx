import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon, Theme, ButtonProps } from 'react-native-elements';

interface FooterBtnProps extends ButtonProps {
  theme: Theme,
  title: string,
}

export const FooterBtn: React.FC<FooterBtnProps> = ({ theme, title, ...props }) => {
  return (
    <Button
      iconRight
      icon={<Icon color={theme.colors?.primary}
        name='chevron-right'
        type='material-community' />
      }
      titleStyle={{ fontSize: 14 }}
      title={title}
      type='clear'
      {...props}
    />
  );
}