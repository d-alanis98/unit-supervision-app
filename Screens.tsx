import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//Components
import Login from './src/UserAuthentication/components/Login/Login';
import Navigation from './src/Shared/components/Navigation/components/Navigation';
import HomeScreen from './src/User/components/HomeScreen/HomeScreen';
import SettingsScreen from './src/User/components/SettingsScreen/SettingsScreen';
//Hooks
import { useAppSelector } from './src/Shared/store/hooks';
//Context
import CurrentScreenContext from './src/Shared/components/Screens/context/CurrentScreenContext';

const { Screen, Navigator } = createBottomTabNavigator();

const Screens: React.FC = () => {
    /**
     * Hooks
     */
    //State
    const [currentScreen, setCurrentScreen] = useState<string>();
    //Redux store selector
    const {
        user: { loggedIn }, 
        theme: { theme } 
    } = useAppSelector(state => state);


    return (
        <CurrentScreenContext.Provider
            value = {{
                currentScreen,
                setCurrentScreen
            }}
        >
            <Navigator 
                tabBar = { (props) => <Navigation navigation = { props.navigation }/> }
                tabBarOptions = {{ style: styles.navigationContainer }}
                sceneContainerStyle = { { backgroundColor: theme.backgroundColor } }
                initialRouteName = { loggedIn ? 'Home' : 'Login' }
            >
                {
                    loggedIn
                        ? <>
                            <Screen 
                                name = 'Home'
                                component = { HomeScreen }
                            />
                            <Screen 
                                name = 'Settings'
                                component = { SettingsScreen }
                            />
                        </>
                        : (
                            <Screen 
                                name = 'Login'
                                component = { Login }
                            />
                        )
                }
            </Navigator>
        </CurrentScreenContext.Provider>
    );
}

export default Screens;

//Styles
const styles = StyleSheet.create({
    navigationContainer: {
        padding: 0,
        margin: 0,
    }
})