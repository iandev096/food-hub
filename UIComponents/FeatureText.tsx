import React, { useEffect } from 'react';
import { Theme, TextProps } from 'react-native-elements';
import { IconText } from './IconText';
import { StyleSheet } from 'react-native';

interface FeatureTextProps extends TextProps {
  theme: Theme,
  center?: boolean
}

export const FeatureText: React.FC<FeatureTextProps> = ({children, theme, center, ...textProps}) => {
  useEffect(() => {
    if (center) {
      textProps.style = StyleSheet.compose(textProps.style, {
        textAlign: 'center'
      });
    }
  }, [center, textProps.style]);

  return (
    <IconText containerStyle={{ marginBottom: 15 }} iconProps={{
      name: 'check-circle',
      color: theme.colors?.success
    }}
    textProps={textProps}
    >{children}</IconText>
  );
}