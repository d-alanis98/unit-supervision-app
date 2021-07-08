import styled from 'styled-components/native';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import TouchableIcon from '../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';

export const CurrentSupervisionFormContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;


export const CurrentSupervisionFormRow = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const SupervisionLabel = Label;

export const SupervisionCenteredLabel = styled(Label)`
    font-size: 22px;
    margin: 5px auto;
`;


export const ResetCurrentSupervisionFormIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: 'redo'
    }))`
    font-size: 20px;
`;