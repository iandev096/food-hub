import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Icon, IconProps, TextProps } from 'react-native-elements';
import { NormalText } from './NormalText';

type T = StyleProp<ViewStyle>;
interface IconTextProps {
  iconProps: IconProps,
  textProps?: TextProps,
  containerStyle?: T
}

export const IconText: React.FC<IconTextProps> = ({ iconProps, textProps, containerStyle, children }) => {
  const [computedContainerStyle, setComputedContainerStyle] = useState<T>();
  useEffect(() => {
    setComputedContainerStyle(StyleSheet.compose(containerStyle, {
      flexDirection: 'row',
      alignItems: 'center',
    }));
  }, [containerStyle]);

  return (
    <View style={computedContainerStyle}>
      <Icon
        {...iconProps}
      />
      {/* <NormalText style={{ width: '98%', paddingLeft: '2%' }} {...textProps}>{children}</NormalText> */}
      <NormalText {...textProps}>{children}</NormalText>
    </View>
  );
}
