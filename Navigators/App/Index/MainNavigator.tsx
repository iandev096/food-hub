import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './AppStack';
import { AuthStack } from '../../Auth/AuthStack';
import { AuthContext } from '../../../store/contexts/Auth/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { Center } from '../../../UIComponents/Center';
import { ThemeContext } from 'react-native-elements';
import { auth } from 'firebase';

interface MainNavigatorProps {

}

export const MainNavigator: React.FC<MainNavigatorProps> = ({ }) => {
	const { user, init } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		setLoading(true);

		const unsubscribe = auth().onAuthStateChanged(function (user) {
			
			if (init && user) {

				init()
					.then(() => setLoading(false))
					.catch(() => setLoading(false))

			} else {
				setLoading(false)
			}
		});

		return () => {
			console.log('unsubscribing')
			unsubscribe();
		}
	}, [init])

	if (loading) {
		return (
			<Center>
				<ActivityIndicator size='large' color={theme.colors?.primary} />
			</Center>
		);
	}
	return (
		<NavigationContainer>
			{user ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
}