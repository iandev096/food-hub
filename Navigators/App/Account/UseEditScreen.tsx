import { AppRouteProp, EditScreenAppStackParamList, ParamRouteAction, AppNavigationProp } from "../Index/app.types";
import React, { useEffect, useState } from "react";
import { HeaderRightButton } from "../../../UIComponents/HeaderRightButton";
import { Theme } from "react-native-elements";
import { Alert } from "react-native";

export function useEditScreen(
  screenName: string,
  route: AppRouteProp<keyof EditScreenAppStackParamList>,
  navigation: AppNavigationProp<keyof EditScreenAppStackParamList>,
  theme: Theme,
  onDelete: (addressLabel: string) => any
) {
  const [mode, setMode] = useState<ParamRouteAction>();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const action = route.params.action;
    if (action === 'add') {
      setMode('add');
      navigation.setOptions({ title: `Add ${screenName}` });
    } else if (action.editKey) {
      setMode({ editKey: action.editKey });
      navigation.setOptions({ title: `Edit ${screenName}` });
    }
  }, [route.params.action, setMode]);

  useEffect(() => {
    if (mode !== 'add' && mode) {
      const editKey = mode.editKey;
      navigation.setOptions({
        headerRight: () => <HeaderRightButton
          loading={isDeleting}
          disabled={editKey.toLowerCase() === 'default'}
          title='DELETE'
          color={theme.colors?.error}
          onPress={() => {
            setIsDeleting(true);
            onDelete(editKey)
              .then(() => navigation.goBack())
              .catch((err: any) => {
                setIsDeleting(false);
                Alert.alert('Error deleting Address', err.message)
              });
          }
          }
        />
      })
    }
  }, [mode, isDeleting]);

  return { mode, isDeleting };
}