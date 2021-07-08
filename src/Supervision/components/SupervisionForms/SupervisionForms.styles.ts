import styled from'styled-components/native';
//Components
import LoadingText from '../../../Shared/components/Loaders/LoadingText';

export const SupervisionFormsContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

export const SupervisionFormsLoader = styled(LoadingText)
    .attrs(props => ({
        ...(props as Object),
        text: 'Obteniendo información...'
    }))`
    margin: 20px 0;
`