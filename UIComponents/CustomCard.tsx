import React, { useState, useEffect } from 'react';
import { Card, CardProps } from 'react-native-elements';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface CustomCardProps extends CardProps {

}

export const CustomCard: React.FC<CustomCardProps> = ({children, containerStyle, ...props}) => {
  const [computedContainerStyle , setComputedContainerStyle ] = useState<StyleProp<ViewStyle>>();

  useEffect(() => {
    setComputedContainerStyle(StyleSheet.compose({
      borderRadius: 4,
    }, containerStyle));
  }, [containerStyle]);
  
  return (
    <Card containerStyle={computedContainerStyle} {...props}>
      {children}
    </Card>
  );
}