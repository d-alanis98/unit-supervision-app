import styled from 'styled-components/native';
//Theme
import { darkTheme } from '../../../Theme/constants/theme';

export const TextInput = styled.TextInput`${({ theme }) => `
    width: 100%;
    height: 60px;
    color: ${ theme.fontColor };
    background-color: ${ theme.fontColor === darkTheme.fontColor 
        ? 'rgba(255,255,255, 0.09)'
        : 'rgba(0,0,0,0.05)'
    };
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 20px;
`}`;