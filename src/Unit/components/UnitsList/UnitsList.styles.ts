import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
//Theme
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';

export const UnitsListContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;
`;

export const UnitsListItem = styled.TouchableOpacity`
    width: 100%;
    margin: 15px 0;
    display: flex;
    padding: 20px;
    flex-direction: column;
    border-radius: 25px;
    background-color: ${ ({ theme }) => ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
`;

interface UnitListItemRowProps extends ViewProps {
    justifyContent?: string;
}

export const UnitListItemRow = styled.View<UnitListItemRowProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${ ({ justifyContent }) => justifyContent || 'flex-start' };
`;