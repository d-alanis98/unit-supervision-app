import React from 'react';
//Components
import ThemeSettings from './ThemeSettings/ThemeSettings';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
//Styled components
import { SettingsScreenContainer } from './SettingsScreen.styles';


const SettingsScreen: React.FC = () => (
    <ScreenContainer
        title = 'Ajustes'
    >
        <SettingsScreenContainer>
            <ThemeSettings />
        </SettingsScreenContainer>
    </ScreenContainer>
);

export default SettingsScreen;