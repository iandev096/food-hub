import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { AppNavigationProp, AppRouteProp } from '../Index/app.types';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { Formik } from 'formik';
import { AccountFormikInput } from './AccountFormikInput';
import { ThemeContext, Button } from 'react-native-elements';
import { AccountFormikKeys, AccountFormikInputModel } from './account.types';
import * as yup from 'yup';
import { CustomCard } from '../../../UIComponents/CustomCard';
import { AccountContext } from '../../../store/contexts/Account/AccountContext';

interface EditContactDetailsScreenProps {
  navigation: AppNavigationProp<'EditContact'>,
  route: AppRouteProp<'EditContact'>
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  mobile: yup.string().required().label('Mobile number'),
  email: yup.string().email().required().label('Email'),
});
const formikInitialValues = new AccountFormikInputModel('Isaac');

export const EditContactDetailsScreen: React.FC<EditContactDetailsScreenProps> = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { dispatch, contactDetails } = useContext(AccountContext);
  const [formInitVal, setFormInitVal] = useState<AccountFormikInputModel>();

  useEffect(() => {
    setFormInitVal({
      ...formikInitialValues,
      firstName: contactDetails.firstName,
      lastName: contactDetails.lastName,
      mobile: contactDetails.mobileNumber,
      email: contactDetails.email
    });
  }, [contactDetails]);

  const submitHandler = async (values: AccountFormikKeys, cbOnErr: Function) => {
    try {
     await dispatch({
        type: 'SET_CONTACT_DETAILS',
        payload: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          mobileNumber: values.mobile
        }
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Contact Detail Error', 'There was an error updating contact details');
      cbOnErr();
    }
  }

  const backHandler = async () => {
    navigation.goBack();
  }

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <CustomCard containerStyle={styles.customCard}>
            {formInitVal &&
              <Formik
                initialValues={formInitVal}
                onSubmit={(values, actions) => {
                  submitHandler(
                    values,
                    () => actions.setSubmitting(false)
                  );
                }}
                validationSchema={validationSchema}
              >{(formikProps) => (<>
                <AccountFormikInput
                  formikKey='firstName'
                  formikProps={formikProps}
                  placeholder='First name'
                  label='First name'
                  leftIcon={{ type: 'font-awesome', name: 'user', color: theme.colors?.primary }}
                  autoCapitalize='words'
                  autoFocus={route.params.autofocus === 'firstName'}
                />
                <AccountFormikInput
                  formikKey='lastName'
                  formikProps={formikProps}
                  placeholder='Last name'
                  label='Last name'
                  leftIcon={{ type: 'font-awesome', name: 'user', color: theme.colors?.primary }}
                  autoCapitalize='words'
                  autoFocus={route.params.autofocus === 'lastName'}
                />
                <AccountFormikInput
                  formikKey='mobile'
                  formikProps={formikProps}
                  placeholder='Mobile number'
                  label='Mobile number'
                  leftIcon={{ type: 'font-awesome', name: 'phone', color: theme.colors?.primary }}
                  keyboardType='phone-pad'
                  autoFocus={route.params.autofocus === 'mobile'}
                />
                <AccountFormikInput
                  formikKey='email'
                  disabled
                  formikProps={formikProps}
                  placeholder='Email'
                  label='Email'
                  leftIcon={{ type: 'font-awesome', name: 'envelope', color: theme.colors?.primary }}
                  autoCapitalize='none'
                  autoCompleteType='email'
                  keyboardType='email-address'
                  autoFocus={route.params.autofocus === 'email'}
                />
                <View style={styles.bottomButtons}>
                  <Button
                    title='BACK'
                    type='outline'
                    disabled={formikProps.isSubmitting}
                    onPress={() => backHandler()}
                    buttonStyle={{ ...styles.backButton }}
                  />
                  <Button
                    title='SUBMIT'
                    onPress={() => formikProps.handleSubmit()}
                    loading={formikProps.isSubmitting}
                  />
                </View>
              </>)}</Formik>
            }
          </CustomCard>
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

  },
  customCard: {
    margin: 0
  },
  bottomButtons: {
    marginTop: 40
  },
  backButton: {
    marginBottom: 6
  }
});
