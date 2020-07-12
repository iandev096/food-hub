import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { NormalText } from './NormalText';
import { Button, ListItemProps, ListItem, Theme } from 'react-native-elements';

interface CustomSectionListProps extends ListItemProps {
  title: string;
  titleBtn?: {
    text: string,
    onPress: ((event: GestureResponderEvent) => void) | undefined
  };
  listItemsProps: ListItemProps[],
  theme: Theme,
  style: StyleProp<ViewStyle>
}

export const CustomSectionList: React.FC<CustomSectionListProps> = ({ title, titleBtn, listItemsProps, theme, style }) => {
  
  return (
    <View style={style}>
      <View style={{ ...styles.header }}>
        <NormalText style={styles.headerTitle}>{title}</NormalText>
        {titleBtn && <Button title={titleBtn.text} buttonStyle={styles.titleBtn} onPress={titleBtn.onPress}></Button>}
      </View>
      <View style={styles.listItems}>
        {
          listItemsProps.map((listItemProps, index) => {
            return <ListItem 
              style={styles.listItem}
              key={index}
              {...listItemProps}
            />
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionList: {

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: 'grey'
  },
  headerTitle: {
    fontSize: 17,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  titleBtn: {
    borderRadius: 25,
    transform: [{scale: 0.8}]
  },
  listItems: {

  },
  listItem: {

  }
})