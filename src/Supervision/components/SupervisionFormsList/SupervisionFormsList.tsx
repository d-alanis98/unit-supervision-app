import React from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
//Styled components
import { 
    SupervisionFormsListItem, 
    SupervisionFormsListContainer,
} from './SupervisionFormsList.styles';
//Hooks
import useSupervision from '../../../Shared/store/hooks/supervision/useSupervision';


const SupervisionFormsList: React.FC = () => {
    /**
     * Hooks
     */
    //Supervision
    const { 
        forms,
        setCurrentSupervisionForm
    } = useSupervision();

    return (
        <SupervisionFormsListContainer>
            <Label>Formularios de inspección</Label>
            {
                forms.map(form => (
                    <SupervisionFormsListItem
                        key = { form.id_supervisionForm }
                        onPress = { () => setCurrentSupervisionForm(form.id_supervisionForm) }
                    >
                        <Label>{ form.name }</Label>
                    </SupervisionFormsListItem>
                ))
            }
        </SupervisionFormsListContainer>
    );
}

export default SupervisionFormsList;