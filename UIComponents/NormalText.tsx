import React, { useEffect, useState, useContext } from 'react';
import { View, StyleProp, StyleSheet } from 'react-native';
import { Text, TextProps, ThemeContext } from 'react-native-elements';

interface NormalTextProps extends TextProps {

}

export const NormalText: React.FC<NormalTextProps> = ({children, style, ...props }) => {
 const [computedStyle, setComputedStyle] = useState<StyleProp<TextProps>>()
 const { theme } = useContext(ThemeContext);
 
 useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      fontSize: 17
    }, style))
  }, [style]);
  
  return (
    <Text style={computedStyle} {...props}>
      {children}
    </Text>
  );
}