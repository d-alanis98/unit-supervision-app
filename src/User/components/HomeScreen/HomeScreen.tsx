import React from 'react';
//Components
import UnitsList from '../../../Unit/components/UnitsList/UnitsList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer';
import SupervisionForms from '../../../Supervision/components/SupervisionForms/SupervisionForms';
//Hooks
import useSupervision from '../../../Shared/store/hooks/supervision/useSupervision';


const HomeScreen: React.FC = () => (
    <ScreenContainer>
        <SupervisionRenderer />
    </ScreenContainer>
);

export default HomeScreen;

/**
 * Internal components
 */
const SupervisionRenderer: React.FC = () => {
    /**
     * Hooks
     */
    //Store
    const { currentUnit } = useSupervision();

    return currentUnit
        ? <SupervisionForms />
        : <UnitsList />;
}