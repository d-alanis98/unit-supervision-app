import React from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
//Styled components
import { 
    SupervisionFormsListItem, 
    SupervisionFormsListContainer,
} from './SupervisionFormsList.styles';
import { 
    CurrentSupervisionFormRow,
    ResetCurrentSupervisionFormIcon 
} from '../CurrentSupervisionForm/CurrentSupervisionForm.styles';
//Hooks
import useSupervision from '../../../Shared/store/hooks/supervision/useSupervision';


const SupervisionFormsList: React.FC = () => {
    /**
     * Hooks
     */
    //Supervision
    const { 
        forms,
        setCurrentUnit,
        setCurrentSupervisionForm
    } = useSupervision();

    return (
        <SupervisionFormsListContainer>
            <CurrentSupervisionFormRow>
                <ResetCurrentSupervisionFormIcon
                    onPress = { () => setCurrentUnit(null) }
                />
                <Label>Formularios de inspección</Label>
            </CurrentSupervisionFormRow>
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