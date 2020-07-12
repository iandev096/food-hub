import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { AppNavigationProp } from '../Index/app.types';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { CustomSectionList } from '../../../UIComponents/CustomSectionList';
import { AccountContext } from '../../../store/contexts/Account/AccountContext';

interface AccountScreenProps {
  navigation: AppNavigationProp<'Tabs'>
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { dispatch, contactDetails, addresses } = useContext(AccountContext);
  
  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <CustomSectionList
            style={styles.sectionList}
            theme={theme}
            title='Contact details'
            titleBtn={{ text: 'CHANGE', onPress: () => navigation.navigate('EditContact', { autofocus: 'firstName' }) }}
            listItemsProps={[
              {
                title: 'First Name',
                leftIcon: { type: 'font-awesome', name: 'user', color: theme.colors?.primary },
                subtitle: contactDetails.firstName,
                Component: TouchableScale,
                onPress: () => navigation.navigate('EditContact', { autofocus: 'firstName' }),
                bottomDivider: true
              },
              {
                title: 'Last Name',
                leftIcon: { type: 'font-awesome', name: 'user', color: theme.colors?.primary },
                subtitle: contactDetails.lastName,
                Component: TouchableScale,
                onPress: () => navigation.navigate('EditContact', { autofocus: 'lastName' }),
                bottomDivider: true
              },
              {
                title: 'Moblie Number',
                leftIcon: { type: 'font-awesome', name: 'phone', color: theme.colors?.primary },
                subtitle: contactDetails.mobileNumber,
                Component: TouchableScale,
                onPress: () => navigation.navigate('EditContact', { autofocus: 'mobile' }),
                bottomDivider: true
              },
              {
                title: 'E-mail',
                leftIcon: { type: 'font-awesome', name: 'envelope', color: theme.colors?.primary },
                subtitle: contactDetails.email,
                Component: TouchableScale,
                onPress: () => navigation.navigate('EditContact', { autofocus: 'email' }),
                bottomDivider: true
              },
            ]}
          />
          <CustomSectionList
            style={styles.sectionList}
            theme={theme}
            title='Address'
            titleBtn={{ text: 'ADD', onPress: () => navigation.navigate('EditAddress', { action: 'add' }) }}
            listItemsProps={addresses.map(address => ({
              title: address.label,
              leftIcon: { type: 'font-awesome', name: address.label.toLowerCase() === 'default' ? 'address-card' : 'address-card-o', color: theme.colors?.primary },
              subtitle: address.residentialAddress,
              onPress: () => navigation.navigate('EditAddress', { action: { editKey: address.label } }),
              Component: TouchableScale,
              bottomDivider: true
            }))}
          />
          <CustomSectionList
            style={styles.sectionList}
            theme={theme}
            title='Payment Methods'
            titleBtn={{ text: 'ADD', onPress: () => navigation.navigate('EditPaymentMethods', { action: 'add' }) }}
            listItemsProps={[
              {
                title: 'Credit Card',
                leftIcon: { type: 'font-awesome', name: 'credit-card-alt', color: theme.colors?.primary },
                subtitle: 'Ecobank, 1000 3839 9909',
                onPress: () => navigation.navigate('EditPaymentMethods', { action: { editKey: '0' } }),
                Component: TouchableScale,
                bottomDivider: true
              },
              {
                title: 'Credit Card',
                leftIcon: { type: 'font-awesome', name: 'credit-card', color: theme.colors?.primary },
                subtitle: 'Stanbic, 1000 3839 9909',
                onPress: () => navigation.navigate('EditPaymentMethods', { action: { editKey: '0' } }),
                Component: TouchableScale,
                bottomDivider: true
              },
              {
                title: 'MTN Mobile Money',
                leftIcon: { type: 'font-awesome', name: 'credit-card', color: theme.colors?.primary },
                subtitle: '+233 24 5905 899',
                onPress: () => navigation.navigate('EditPaymentMethods', { action: { editKey: '0' } }),
                Component: TouchableScale,
                bottomDivider: true
              },
            ]}
          />
        </View>
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
  },
  inner: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  sectionList: {
    marginBottom: 16
  }
})