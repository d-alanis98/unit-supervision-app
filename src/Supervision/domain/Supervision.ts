export interface SupervisionForm {
    name: string;
    domain: string;
    id_supervisionForm: number;
}

export interface SupervisionFormWithQuestions
extends SupervisionForm {
    questions: SupervisionFormQuestion[];
};

export interface SupervisionFormQuestion {
    key: string;
    type: string;
    data: string;
    domain: string;
    question: SupervisionQuestionTypes | keyof SupervisionQuestionTypes;
    id_supervisionQuestion: number;
}

export enum SupervisionQuestionTypes {
    TEXT = 'text',
    NUMBER = 'number',
    OPTION = 'option',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'text_area'
};