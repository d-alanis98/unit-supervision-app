
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { HeaderBackButton } from '@react-navigation/stack';
//Styled components
import { HeaderContainer, HeaderTitle } from './Header.styles';

const Header: React.FC = () => (
    <HeaderContainer>
            <GoBackButton />
            <HeaderTitle>Supervisión</HeaderTitle>
    </HeaderContainer>
);

export default Header;

//Internal components
export const GoBackButton = () => {
    /**
     * Hooks
     */
    //Navigation
    const navigation = useNavigation();
    //Refs
    const canGoBack = React.useRef(navigation.canGoBack());
    //Effects
    React.useEffect(() => {
        canGoBack.current = navigation.canGoBack();
    }, [navigation]);
    //Render
    if(canGoBack.current)
        return <HeaderBackButton 
            tintColor = '#aaaaaa'
            style = {{ marginLeft: -5 }}
            onPress = { () => navigation.canGoBack() && navigation.goBack() }
        />;
    return null;
}