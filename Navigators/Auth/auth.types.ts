import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native";
import { FormikProps } from "formik";
import { InputProps } from "react-native-elements";

export type AuthParamList = {
  Auth: undefined,
  Login: undefined,
  Register: undefined,
}

export type AuthNavigationProp<T extends keyof AuthParamList> = StackNavigationProp<AuthParamList, T>;

export type AuthRouteProp<T extends keyof AuthParamList> = RouteProp<AuthParamList, T>;

export type AuthFormikKeys = { email: string, password: string }
export interface AuthFormInputProps extends InputProps {
  formikProps: FormikProps<AuthFormikKeys>,
  formikKey: keyof AuthFormikKeys
}