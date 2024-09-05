import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RootTab from './RootTab'
import Details from '../screens/Details'

const Stack = createNativeStackNavigator()

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName="RootTab">
                <Stack.Screen name="RootTab" component={RootTab} />
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack