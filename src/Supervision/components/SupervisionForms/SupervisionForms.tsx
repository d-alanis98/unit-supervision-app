import React from 'react';
//Components
import SupervisionFormsList from '../SupervisionFormsList/SupervisionFormsList';
import CurrentSupervisionForm from '../CurrentSupervisionForm/CurrentSupervisionForm';
//Styled components
import { 
    SupervisionFormsLoader,
    SupervisionFormsContainer 
} from './SupervisionForms.styles';
//Hooks
import useSupervision from '../../../Shared/store/hooks/supervision/useSupervision';

const SupervisionForms: React.FC = () => (
    <SupervisionFormsContainer>
        <SupervisionFormRenderer />
    </SupervisionFormsContainer>
);

export default SupervisionForms;

/**
 * Internal components
 */
const SupervisionFormRenderer: React.FC = () => {
    /**
     * Hooks
     */
    //Supervision
    const { 
        fetching,
        currentForm,
    } = useSupervision();


    if(fetching)
        return <SupervisionFormsLoader /> 

    return currentForm
        ? <CurrentSupervisionForm />
        : <SupervisionFormsList />;

} 