import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, StyleProp, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Text, TextProps, ThemeContext } from 'react-native-elements';
import { NormalText } from './NormalText';

interface LinkTextProps extends TextProps {
  onPress?: ((event: GestureResponderEvent) => void)
}

export const LinkText: React.FC<LinkTextProps> = ({ children, onPress, style }) => {
  const { theme } = useContext(ThemeContext);
  const [computedStyle, setComputedStyle] = useState<StyleProp<TextProps>>()

  useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      color: theme.colors?.primary
    }, style));
  }, [theme, style]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <NormalText style={computedStyle}>
        {children}
      </NormalText>
    </TouchableOpacity>
  );
}