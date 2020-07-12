import React, { useContext, useState, useEffect } from 'react';
import { StyleProp, ViewStyle, View, ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';

type T = StyleProp<ViewStyle>;
interface ScreenProps {
  style?: T
}

export const Screen: React.FC<ScreenProps> = ({ style, children }) => {
  const { theme } = useContext(ThemeContext);
  const [defualtStyle, setDefualtStyle] = useState<T>({
    backgroundColor: theme.colors?.grey5,
    // flex: 1
  });

  useEffect(() => {
    if (style) {
      setDefualtStyle(StyleSheet.compose(defualtStyle, style));
    };
  }, [style]);

  return (
    <ScrollView style={defualtStyle}>
      {children}
    </ScrollView>
  );
}