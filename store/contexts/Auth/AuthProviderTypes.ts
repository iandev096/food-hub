
export type AuthContextProps = {
  user: any,
  init: Function | null,
  login: (email: string, password: string) => any,
  logout: () => void,
  signup: (email: string, password: string) => any,
  isLoading: boolean,
}

export const authContextInit: AuthContextProps = {
  user: null,
  init:  null,
  login: () => { },
  logout: () => { },
  signup: () => { },
  isLoading: false
}

export const asyncStorageUserKey = '[[user]]';