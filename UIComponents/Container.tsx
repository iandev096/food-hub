import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ViewProps, StyleProp, ViewStyle } from 'react-native';

interface ContainerProps extends ViewProps {

}

export const Container: React.FC<ContainerProps> = ({children, style}) => {
  const [computedStyle , setComputedStyle ] = useState<StyleProp<ViewStyle>>();

  useEffect(() => {
    setComputedStyle(StyleSheet.compose({
      padding: 10,
      minHeight: Dimensions.get('window').height - 50,
    }, style));
  }, [style]);
  
  return (
    <View style={computedStyle}>
      {children}
    </View>
  );
}
