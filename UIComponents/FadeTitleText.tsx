import React, { useState, useContext, useEffect } from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import { Text, TextProps, Theme } from 'react-native-elements';

interface FadeTitleTextProps extends TextProps {
  theme: Theme
}

export const FadeTitleText: React.FC<FadeTitleTextProps> = ({ children, theme, style, ...props }) => {
  const [computedStyle, setComputedStyle] = useState<StyleProp<TextProps>>()

  useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      fontWeight: 'bold',
      letterSpacing: 0.7,
      fontSize: 14,
      color: theme.colors?.grey2,
      textTransform: 'uppercase'
    }, style))
  }, [style]);

  return (
    <Text style={computedStyle} {...props}>
      {children}
    </Text>
  );
}