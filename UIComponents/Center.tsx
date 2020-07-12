import React from 'react'
import { View, ViewProps } from 'react-native';

interface CenterProps extends ViewProps {

}

export const Center: React.FC<CenterProps> = ({ children }) => {
	return (
		<View style={{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			
		}}>
			{children}
		</View>
	);
}