import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar, Icon, Theme, Button } from 'react-native-elements';


interface CustomSearchBarProps {
  theme: Theme,
  value: string,
  onChangeText: (text: string) => void,
  onSubmit: (text: string) => any,
  placeholder: string,
  onFilter?: Function,
  round?: boolean
}

export const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ theme, onFilter, round, placeholder, onChangeText, onSubmit, value }) => {
  return (
    <View style={{
      ...styles.searchGroup,
      overflow: 'hidden',
      borderRadius: round ? 30 : 0,
    }}>
      <SearchBar
        onClear={() => console.log('clear')}
        // clearIcon={<Button title='GO' onPress={() => onSubmit(value)}/>}
        returnKeyType='search'
        value={value}
        onSubmitEditing={() => onSubmit(value)}
        onChangeText={onChangeText}
        lightTheme={true}
        containerStyle={styles.searchBarContainer}
        inputStyle={{ ...styles.searchBarInput, color: theme.colors?.grey1 }}
        inputContainerStyle={styles.searchBarInputContainer}
        placeholder={placeholder}
      />
      {onFilter && <Icon
          onPress={() => onFilter()}
          containerStyle={{ ...styles.filterBtn, borderLeftColor: theme.colors?.grey4 }}
          type='ionicon'
          name='md-options'
          color={theme.colors?.primary}
        />}
    </View>
  );
}

const styles = StyleSheet.create({
  searchGroup: {
    display: 'flex',
    flexDirection: 'row',
    elevation: 6,
  },
  searchGroupRound: {
    overflow: 'hidden',
    borderRadius: 30
  },
  searchBarContainer: {
    padding: 0,
    flexGrow: 1,
    backgroundColor: 'white',
  },
  searchBarInputContainer: {
    borderRadius: 0,
    backgroundColor: 'white'
  },
  searchBarInput: {
    fontSize: 15,
  },
  filterBtn: {
    flexGrow: 0,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'white'
  }
});
