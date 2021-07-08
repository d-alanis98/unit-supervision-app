import React, { useState, useCallback } from 'react';
//Domain
import { 
    SupervisionFormQuestion, 
    SupervisionQuestionTypes 
} from '../../domain/Supervision';
//Components
import Button from '../../../Shared/components/Layout/Buttons/Button';
//Styled components
import { 
    SupervisionLabel,
    SupervisionCenteredLabel,
    CurrentSupervisionFormRow,
    CurrentSupervisionFormContainer,
    ResetCurrentSupervisionFormIcon 
} from './CurrentSupervisionForm.styles';
import {
    TextInput
} from '../../../Shared/components/Layout/Input/Inputs/Inputs.styles'
//Hooks
import useSupervision from '../../../Shared/store/hooks/supervision/useSupervision';
//Types
import { SupervisionFormData } from '../../../Shared/store/reducers/supervisionDuck';

const CurrentSupervisionForm: React.FC = () => {
    /**
     * Hooks
     */
    //Supervision
    const { 
        currentForm,
        postSupervisionForm,
        resetCurrentSupervisionForm 
    } = useSupervision();
    //Local state
    const [formData, setFormData] = useState<SupervisionFormData>({});

    //Callbacks

    const submit = useCallback(() => {
        postSupervisionForm(formData);
    }, [
        formData,
        postSupervisionForm
    ]);

    const handleQuestionChange = (
        questionKey: string, 
        questionAnswer: string
    ) => {
        setFormData({
            ...formData,
            [questionKey]: questionAnswer
        });
    }

    if(!currentForm)
        return null;

    return (
        <CurrentSupervisionFormContainer>
            <CurrentSupervisionFormRow>
                <ResetCurrentSupervisionFormIcon 
                    onPress = { resetCurrentSupervisionForm }
                />
                <SupervisionCenteredLabel fontWeight='bold'>{ currentForm.name }</SupervisionCenteredLabel>
            </CurrentSupervisionFormRow>
            <SupervisionCenteredLabel>Preguntas</SupervisionCenteredLabel>
            {
                currentForm.questions.map(question => (
                    <QuestionRenderer 
                        key = { question.id_supervisionQuestion }
                        question = { question }
                        handleQuestionChange = { handleQuestionChange }
                    />
                ))
            }
            <SubmitButton 
                submit = { submit }
                formData = { formData }
                questions = { currentForm.questions }
            />
        </CurrentSupervisionFormContainer>
    );
}

export default CurrentSupervisionForm;

/**
 * Internal components
 * 
 */

interface QuestionRendererProps {
    question: SupervisionFormQuestion;
    handleQuestionChange: (questionKey: string, questionAnswer: string) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
    question,
    handleQuestionChange
}) => (
    <>
        <SupervisionLabel>
            { question.question }
        </SupervisionLabel>
        <QuestionTypeInputRenderer 
            question = { question }
            handleQuestionChange = { handleQuestionChange }
        />
    </>
)

const QuestionTypeInputRenderer: React.FC<QuestionRendererProps> = ({
    question,
    handleQuestionChange
}) => {
    switch(question.type) {
        case SupervisionQuestionTypes.TEXT:
            return <TextInput 
                placeholder = 'Respuesta'
                onChangeText = { text => handleQuestionChange(question.key, text) }
            />
        case SupervisionQuestionTypes.TEXTAREA:
            return <TextInput 
                multiline
                placeholder = 'Respuesta'
                onChangeText = { text => handleQuestionChange(question.key, text) }
                numberOfLines = { 4 }
            />
        default:
            return <TextInput 
                placeholder = 'Respuesta'
                onChangeText = { text => handleQuestionChange(question.key, text) }
            />
    }
}


interface SubmitButtonProps {
    submit: () => void;
    formData: SupervisionFormData;
    questions: SupervisionFormQuestion[];
}
const SubmitButton: React.FC<SubmitButtonProps> = ({
    submit,
    formData,
    questions
}) => {
    /**
     * Hooks
     */
    //Callbacks
    const isValidated = useCallback(() => (
        Object.keys(formData).length === questions.length
    ), [
        formData,
        questions
    ]);

    return (
        <Button
            type = 'primary'
            width = '75%'
            margin = '20px'
            onPress = { submit }
            disabled = { !isValidated() }
            accessibilityLabel = 'Enviar respuestas'
        >
            Enviar respuestas
        </Button>
    );
}