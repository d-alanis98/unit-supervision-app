import React, { useCallback, useState } from 'react';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import Button from '../../../Shared/components/Layout/Buttons/Button';
import Divider from '../../../Shared/components/Layout/Divider/Divider';
//Actions
import { loginAction } from '../../../Shared/store/reducers/userDuck';
//Hooks
import { useAppDispatch } from '../../../Shared/store/hooks';
//Styled components
import { LoginContainer, LoginFormContainer, LoginIllustration, LoginInput, RegisterLinkContainer } from './Login.styles';


const Login: React.FC = () => {
    //Hooks
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //State
    const [credentials, setCredentials] = useState<Credentials>(initialCredentials);

    const submit = useCallback(() => {
        dispatch(loginAction(credentials));
    }, [credentials]);

    const handleFieldChange = useCallback((field: string, text: string) => {
        setCredentials({
            ...credentials,
            [field]: text
        });
    }, [credentials]);

    return (
        <LoginContainer>
            <LoginFormContainer>
                <LoginTitle>Iniciar sesión</LoginTitle>

                <FormLabel>Dominio de la empresa: </FormLabel>
                <LoginInput 
                    placeholder = 'Dominio de la empresa'
                    onChangeText = { text => handleFieldChange('domain', text) }
                />
                <FormLabel>Número de empleado: </FormLabel>
                <LoginInput 
                    placeholder = 'Número de empleado'
                    onChangeText = { text => handleFieldChange('employeeNumber', text) }
                />

                <FormSubmitButton 
                    submit = { submit }
                    credentials = { credentials }
                />
                <Divider />
            </LoginFormContainer>
            <LoginIllustration 
                source = { require('../../../../assets/illustrations/clip-252.png') }
            />
        </LoginContainer>
    )
}

export default Login;

//Internal components

const LoginTitle: React.FC = ({ children }) => (
    <Label
        fontSize = { 24 }
        fontWeight = '500'
        style = {{ alignSelf: 'center' }}
    >
        { children }
    </Label>
)

const FormLabel: React.FC = ({ children }) => (
    <Label 
        fontSize = { 20 }
        fontWeight = '500'
        style = {{ marginTop: 20, marginBottom: 10 }}
    > 
    { children }
    </Label>
);


interface SubmitButtonProps {
    submit: () => void;
    credentials: Credentials;
}

const FormSubmitButton: React.FC<SubmitButtonProps> = ({ 
    submit,
    credentials
}) => (
    <Button 
        type = 'primary'
        width = '75%'
        margin = '20px'
        onPress = { submit }
        disabled = { !credentials.employeeNumber || !credentials.domain }
        accessibilityLabel = 'Enviar formulario de login'
    >
        Enviar
    </Button>
);

//Helpers

interface Credentials {
    domain: string;
    employeeNumber: string;
}

const initialCredentials: Credentials = { 
    domain: '',
    employeeNumber: ''
};