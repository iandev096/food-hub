import React, { useEffect, useState } from 'react';
import { StyleSheet, StyleProp } from 'react-native';
import { TextProps, Theme } from 'react-native-elements';
import { NormalText } from './NormalText';

interface SectionTitleProps extends TextProps {
  theme: Theme
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, style, theme }) => {
  const [computedStyle, setComputedStyle] = useState<StyleProp<TextProps>>()

  useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      fontSize: 21,
      fontWeight: 'bold',
      marginBottom: 9,
      color: theme.colors?.grey1
    }, style))
  }, [style]);

  return (
    <NormalText style={computedStyle}>
      {children}
    </NormalText>
  );
}