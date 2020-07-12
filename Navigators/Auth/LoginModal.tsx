import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { CustomCard } from '../../UIComponents/CustomCard';
import { NormalText } from '../../UIComponents/NormalText';
import { Theme, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { AuthFormikInput } from './AuthFormikInput';

interface LoginModalProps {
  isVisible: boolean;
  onClose: Function;
  onLogin: (email: string, password: string) => any;
  theme?: Theme,
}

export const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose, onLogin, theme }) => {

  const submitHandler = async (email: string, password: string, cbOnErr: Function) => {
    try {
      await onLogin(email, password);
    } catch (err) {
      cbOnErr();
      Alert.alert('Login Error', err.message || 'Please there was an error signing up', [{ text: 'OK', style: 'destructive' }]);
    }
  }

  return (
    <View>
      <Modal
        onBackdropPress={() => onClose()}
        isVisible={isVisible}
      >
        <CustomCard containerStyle={styles.modalCard}>
          <NormalText style={styles.modalTitle}>LOGIN</NormalText>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
              submitHandler(
                values.email,
                values.password,
                () => actions.setSubmitting(false)
              );
            }}
          >{(formikProps) => (<>
            <AuthFormikInput
              formikKey='email'
              formikProps={formikProps}
              placeholder='Email'
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              autoCapitalize='none'
              autoCompleteType='email'
              keyboardType='email-address'
              autoFocus
            />
            <AuthFormikInput
              formikKey='password'
              formikProps={formikProps}
              placeholder='Password'
              leftIcon={{ type: 'font-awesome-5', name: 'lock' }}
              autoCapitalize='none'
              secureTextEntry={true}
            />
            <View style={styles.modalBottomButtons}>
              <Button
                title='CANCEL'
                type='outline'
                disabled={formikProps.isSubmitting}
                onPress={() => onClose()}
                buttonStyle={{ ...styles.cancelButton }}
              />
              <Button
                title='LOGIN'
                onPress={() => formikProps.handleSubmit()}
                loading={formikProps.isSubmitting}
              />
            </View>
          </>)}</Formik>
        </CustomCard>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalCard: {

  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20
  },
  modalBottomButtons: {
    marginTop: 40
  },
  cancelButton: {
    marginBottom: 6
  }
})