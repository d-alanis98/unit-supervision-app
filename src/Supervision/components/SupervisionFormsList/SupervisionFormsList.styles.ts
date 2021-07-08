import styled from 'styled-components/native';
//Theme
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';

export const SupervisionFormsListContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const SupervisionFormsListItem = styled.TouchableOpacity`
    width: 100%;
    margin: 20px 0;
    display: flex;
    padding: 15px 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: ${ ({ theme }) => ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
`;