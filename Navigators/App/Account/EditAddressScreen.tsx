import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { View, Dimensions, StyleSheet, Alert } from 'react-native';
import { AppNavigationProp, AppRouteProp, ParamRouteAction } from '../Index/app.types';
import { Screen } from '../../../UIComponents/Screen';
import { AccountFormikInput } from './AccountFormikInput';
import { Container } from '../../../UIComponents/Container';
import { CustomCard } from '../../../UIComponents/CustomCard';
import { Formik } from 'formik';
import { Button, ThemeContext } from 'react-native-elements';
import { AccountFormikInputModel } from './account.types';
import * as yup from 'yup';
import { LocationInput } from '../../../UIComponents/LocationInput';
import { useEditScreen } from './UseEditScreen';
import { AccountContext } from '../../../store/contexts/Account/AccountContext';
import { Address } from '../../../store/contexts/Account/account.types';

interface EditAddressScreenProps {
  navigation: AppNavigationProp<'EditAddress'>,
  route: AppRouteProp<'EditAddress'>
}

const validationSchema = yup.object().shape({
  addressLabel: yup.string().required().label('Address label'),
  residentialAddress: yup.string().required().label('Residential Address'),
  lat: yup.number().required().label('Lattitude'),
  lng: yup.number().required().label('Longitude')
});
const formikInitialValues = new AccountFormikInputModel();

export const EditAddressScreen: React.FC<EditAddressScreenProps> = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { addresses, dispatch } = useContext(AccountContext);
  const [ formInitVal, setFormInitVal ] = useState<AccountFormikInputModel>();
  const { mode, isDeleting } = useEditScreen(
    'Address',
    route,
    navigation,
    theme,
    (addressLabel: string) => dispatch({
      type: 'REMOVE_ADDRESS',
      payload: {
        label: addressLabel
      }
    })
  );

  useEffect(() => {
    if (mode !== 'add' && mode) {
      const address = addresses.find(address => address.label.toLowerCase() === mode.editKey.toLowerCase());

      if (address) {
        setFormInitVal({
          ...formikInitialValues,
          addressLabel: mode.editKey,
          residentialAddress: address.residentialAddress,
          lat: address.location.lat,
          lng: address.location.lng
        });
      }
    } else if (mode === 'add') {
      if (addresses.length <= 0) {
        setFormInitVal({
          ...formikInitialValues,
          addressLabel: 'Default'
        })
      } else {
        setFormInitVal({...formikInitialValues})
      }
    }
  }, [addresses, setFormInitVal, mode]);

  const submitHandler = useCallback(
    async (values: AccountFormikInputModel, cbOnErr: Function) => {
      const address: Address = {
        label: values.addressLabel,
        location: {
          lat: values.lat,
          lng: values.lng
        },
        residentialAddress: values.residentialAddress
      }
      try {
        if (mode === 'add') {
          await dispatch({
            type: 'ADD_ADDRESS',
            payload: address
          });
        } else {
          await dispatch({
            type: 'SET_ADDRESS',
            payload: address
          });
        }
        navigation.goBack();
      } catch (err) {
        Alert.alert('Address Error', 'There was an error updating address');
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
            {formInitVal &&
              <Formik
                initialValues={formInitVal}
                onSubmit={(values, actions,) => {
                  if (!values.lat) {
                    actions.setFieldError('lat', 'Location is required');
                    actions.setSubmitting(false);
                  }
                  else if (!values.lng) {
                    actions.setFieldError('lng', 'Location is required');
                    actions.setSubmitting(false);
                  }
                  else {
                    submitHandler(
                      values,
                      () => actions.setSubmitting(false)
                    )
                  }

                }}
                validationSchema={validationSchema}
              >{(formikProps) => (<>
                <AccountFormikInput
                  formikKey='addressLabel'
                  formikProps={formikProps}
                  placeholder='e.g. Secondary'
                  label='Address Label'
                  leftIcon={{ type: 'font-awesome', name: 'address-book', color: theme.colors?.primary }}
                  autoCapitalize='words'
                  disabled={formInitVal.addressLabel.toLowerCase() === 'default'}
                />
                <AccountFormikInput
                  formikKey='residentialAddress'
                  formikProps={formikProps}
                  placeholder='Residential Address'
                  label='Residential Address'
                  leftIcon={{ type: 'font-awesome', name: 'address-card-o', color: theme.colors?.primary }}
                  autoCapitalize='words'
                />
                <LocationInput
                  initialLocation={{
                    lat: formInitVal.lat,
                    lng: formInitVal.lng
                  }}
                  theme={theme}
                  errorMessage={
                    formikProps.errors.lat ?? formikProps.errors.lng
                  }
                  setFieldValue={formikProps.setFieldValue}
                />

                <View style={styles.bottomButtons}>
                  <Button
                    title='BACK'
                    type='outline'
                    disabled={formikProps.isSubmitting || isDeleting}
                    onPress={() => backHandler()}
                    buttonStyle={{ ...styles.backButton }}
                  />
                  <Button
                    title='SUBMIT'
                    onPress={() => formikProps.handleSubmit()}
                    loading={formikProps.isSubmitting}
                    disabled={isDeleting}
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
