import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { CustomCard } from '../../UIComponents/CustomCard';
import { NormalText } from '../../UIComponents/NormalText';
import { Theme, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthFormikInput } from './AuthFormikInput';

interface SignupModalProps {
  isVisible: boolean;
  onClose: Function;
  onSignup: (email: string, password: string) => any;
  theme?: Theme,
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(7).required().label('Password')
});

export const SignupModal: React.FC<SignupModalProps> = ({ isVisible, onClose, onSignup, theme }) => {

  const submitHandler = async (email: string, password: string, cbOnErr: Function) => {
    try {
      await onSignup(email, password);
    } catch (err) {
      cbOnErr();
      Alert.alert('Signup Error', err.message || 'Please there was an error signing up', [{ text: 'OK', style: 'destructive' }]);
    }
  }

  return (
    <View>
      <Modal
        onBackdropPress={() => onClose()}
        isVisible={isVisible}
      >
        <CustomCard containerStyle={styles.modalCard}>
          <NormalText style={styles.modalTitle}>SIGNUP</NormalText>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
              submitHandler(
                values.email,
                values.password,
                () => actions.setSubmitting(false)
              );
            }}
            validationSchema={validationSchema}
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
                title='SIGNUP'
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