import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
//Components
import Screens from './Screens';
import StatusBar from './src/Shared/components/StatusBar/StatusBar';
//Store
import store from './src/Shared/store/store';
import { useAppSelector } from './src/Shared/store/hooks';
//Hooks
import useAppServices from './src/Shared/hooks/useAppServices';
//Theme
import { ThemeProvider } from 'styled-components/native';
//Styles
import styles from './App.styles';


const App: React.FC = () => {
    //HOOKS
    //Store, to get the redux state
    const { theme: themeToApply } = useAppSelector(state => state.theme);
    //App services to register
    useAppServices();
    //Render
    return (
        <ThemeProvider
            theme = { themeToApply }
        >
            <View 
                style = { styles.container }
            >    
                <StatusBar 
                    theme = { themeToApply }
                />
                <Screens />
            </View>
        </ThemeProvider>
    );
}

//We wrap the app in the state provider
const AppWithStateProvider = () => <Provider store = { store }><App /></Provider>; 
//We wrap the app in the navigation provider
const AppWithNavigationProvider = () => (
    <NavigationContainer>
        <AppWithStateProvider />
    </NavigationContainer>
);
export default AppWithNavigationProvider;


