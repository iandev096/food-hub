import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, Switch } from 'react-native';
import { AppNavigationProp, AppRouteProp, ParamRouteAction } from '../Index/app.types';
import { ThemeContext, Button, CheckBox } from 'react-native-elements';
import { useEditScreen } from './UseEditScreen';
import { AccountFormikInputModel } from './account.types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Screen } from '../../../UIComponents/Screen';
import { Container } from '../../../UIComponents/Container';
import { AccountFormikInput } from './AccountFormikInput';
import { CustomCard } from '../../../UIComponents/CustomCard';

interface EditPaymentMethodsScreenProps {
  navigation: AppNavigationProp<'EditPaymentMethods'>;
  route: AppRouteProp<'EditPaymentMethods'>
}

const validationSchema = yup.object().shape({
  creditCardNumber: yup.string().required().matches(/^[0-9]+$/, 'Use numbers only').label('Card No.'),
  defaultPayment: yup.boolean().required().label('Default Card'),
  nameOfInstitution: yup.string().required().label('Name of Institution'),
  nameOnCard: yup.string().required().label('Name on Card'),
});
const formikInitialValues = new AccountFormikInputModel();

export const EditPaymentMethodsScreen: React.FC<EditPaymentMethodsScreenProps> = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);

  const { mode } = useEditScreen(
    'Payment Method',
    route,
    navigation,
    theme,
    () => { }
  );

  const submitHandler = useCallback(
    async (values: AccountFormikInputModel, cbOnErr: Function) => {
      try {
        if (mode === 'add') {

        } else {

        }
        navigation.goBack();
      } catch (err) {
        cbOnErr();
      }
    },
    [mode],
  );

  const backHandler = async () => {
    navigation.goBack();
  }

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <CustomCard containerStyle={styles.customCard}>
            <Formik
              initialValues={formikInitialValues}
              onSubmit={(values, actions,) => {
                submitHandler(
                  values,
                  () => actions.setSubmitting(false)
                )
              }}
              validationSchema={validationSchema}
            >{(formikProps) => (<>
              <AccountFormikInput
                formikKey='creditCardNumber'
                formikProps={formikProps}
                placeholder='Card Number'
                label='Card Number'
                leftIcon={{ type: 'font-awesome', name: 'credit-card', color: theme.colors?.primary }}
                keyboardType='number-pad'
              />
              <AccountFormikInput
                formikKey='nameOfInstitution'
                formikProps={formikProps}
                placeholder='Name of Institution'
                label='Name of Institution'
                leftIcon={{ type: 'font-awesome-5', name: 'building', color: theme.colors?.primary }}
                autoCapitalize='words'
              />
              <AccountFormikInput
                formikKey='nameOnCard'
                formikProps={formikProps}
                placeholder='Name on Card'
                label='Name on Card'
                leftIcon={{ type: 'font-awesome', name: 'user', color: theme.colors?.primary }}
                autoCapitalize='words'
              />
              <CheckBox
                title='Default Card'
                checked={formikProps.values.defaultPayment}
                onPress={() => formikProps.setFieldValue('defaultPayment', !formikProps.values.defaultPayment, true)}
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
