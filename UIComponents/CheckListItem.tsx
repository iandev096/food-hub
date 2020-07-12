import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Theme, ListItemProps } from 'react-native-elements';
import { NormalText } from './NormalText';
import TouchableScale from 'react-native-touchable-scale';

interface CheckListItemProps extends ListItemProps {
  title: string,
  rightTitle: string,
  theme: Theme,
  active: boolean,
  icon?: {
    active: string,
    inactive: string
  }
}

export const CheckListItem: React.FC<CheckListItemProps> = ({ title, theme, active, icon, rightTitle, ...props }) => {
  const [checkIconName, setCheckIconName] = useState('md-radio-button-off');
  const [iconOptions, setIconOptions] = useState({ active: 'md-radio-button-on', inactive: 'md-radio-button-off' })

  useEffect(() => {
    if (icon) {
      setIconOptions({ active: icon.active, inactive: icon.inactive });
    }
  }, [icon]);
  useEffect(() => {
    if (active) {
      setCheckIconName(iconOptions.active);
    } else {
      setCheckIconName(iconOptions.inactive)
    }
  }, [active]);

  return (
    <ListItem
      containerStyle={styles.listItem}
      Component={TouchableScale}
      title={title}
      titleStyle={styles.listItemTitleText}
      subtitleStyle={{display: 'none'}}
      leftIcon={{ type: 'ionicon', name: checkIconName, color: theme.colors?.primary }}
      rightTitle={`GHC${rightTitle}`}
      rightTitleStyle={styles.listItemRightTitleText}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
    elevation: 1
  },
  listItemTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8
  },
  listItemTitleText: {

  },
  listItemRightTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8
  },
  listItemRightTitleText: {
    fontWeight: 'bold'
  },
});
