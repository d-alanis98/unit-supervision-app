import styled from 'styled-components/native';

//Size constants
export const HEADER_HEIGHT = 60;

//Styles
export const HeaderContainer = styled.View`${({ theme }) => `
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    height: ${ HEADER_HEIGHT }px;
    background-color: ${ theme.secondaryColor };
`}`;

export const HeaderTitle = styled.Text`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
    font-size: 22px;
`}`;

const logoSize = HEADER_HEIGHT - 10;

export const HeaderLogo = styled.Image`
    height: ${ logoSize}px;
    width: ${ logoSize }px;
    margin-right: 5px;
`;