import { FormikProps } from "formik";
import { InputProps, Theme } from "react-native-elements";

export type AccountFormikKeys = {
  firstName: string,
  lastName: string,
  mobile: string,
  email: string,

  addressLabel: string,
  residentialAddress: string,
  lat: number,
  lng: number,

  creditCardNumber: string,
  defaultPayment: boolean,
  nameOfInstitution: string,
  nameOnCard: string,
}
export interface AccountFormInputProps extends InputProps {
  formikProps: FormikProps<AccountFormikKeys>,
  formikKey: keyof AccountFormikKeys,
}

export class AccountFormikInputModel implements AccountFormikKeys {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public mobile: string = '',
    public email: string = '',

    public addressLabel: string = '',
    public residentialAddress: string = '',
    public lat: number = 0,
    public lng: number = 0,

    public creditCardNumber: string = '',
    public defaultPayment: boolean = false,
    public nameOfInstitution: string = '',
    public nameOnCard: string = '',
  ) { }
}

