import React from 'react'
import Home from '../screens/Home';
import Search from '../screens/Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const RootTab = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home'
                } else if (route.name === 'Search') {
                    iconName = 'search'
                }
                return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
            },
            tabBarStyle: {
                backgroundColor: '#fff',
                borderTopColor: 'transparent',
                elevation: 5,
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
        })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    );
}

export default RootTab