import { AnyAction } from 'redux';
//Domain
import { Unit } from '../../../Unit/domain/Unit';
import UnitNotFound from '../../../Unit/domain/UnitNotFound';
import { SupervisionForm, SupervisionFormWithQuestions } from '../../../Supervision/domain/Supervision';
//API
import { getSupervisionUnits } from '../../../Unit/infrastructure/unitApi';
import { getSupervisionFormData, postSupervisionForm } from '../../../Supervision/infrastructure/supervisionApi';
//Base action type
import { ThunkAppAction } from '../store';

/**
 * Constants
 */

//Action types
const GET_SUPERVISION_UNITS             = 'GET_SUPERVISION_UNITS';
const SET_SUPERVISION_FORMS             = 'SET_SUPERVITION_FORMS';
const GET_SUPERVISION_FORM_DATA         = 'GET_SUPERVISION_FORM_DATA';
const GET_SUPERVISION_UNITS_ERROR       = 'GET_SUPERVISION_UNITS_ERROR';
const SET_CURRENT_SUPERVISION_UNIT      = 'SET_CURRENT_SUPERVISION_UNIT';
const SET_CURRENT_SUPERVISION_FORM      = 'SET_CURRENT_SUPERVISION_FORM';
const GET_SUPERVISION_UNITS_SUCCESS     = 'GET_SUPERVISION_UNITS_SUCCESS';
const GET_SUPERVISION_FORM_DATA_ERROR   = 'GET_SUPERVISION_QUESTIONS_ERROR';
const GET_SUPERVISION_FORM_DATA_SUCCESS = 'GET_SUPERVISION_QUESTIONS_SUCCESS';
//Initial state contract
interface SupervisionState {
    forms: SupervisionForm[];
    units: Unit[],
    error?: string;
    fetching: Boolean;
    currentUnit: Unit | null,
    currentForm: SupervisionFormWithQuestions | null;
}
//Initial state
const initialState: SupervisionState = {
    forms: [],
    units: [],
    fetching: false,
    currentUnit: null,
    currentForm: null
};

/**
 * Reducer
 */
const reducer = (
    state = initialState, 
    action: AnyAction
): SupervisionState => {
    const { type, payload } = action;
    switch(type) {
        case GET_SUPERVISION_UNITS:
            return {
                ...state,
                fetching: true,
            };
        case SET_SUPERVISION_FORMS:
            return {
                ...state,
                forms: payload,
            };
        case GET_SUPERVISION_FORM_DATA:
            return {
                ...state,
                fetching: true,
            };
        case GET_SUPERVISION_UNITS_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case SET_CURRENT_SUPERVISION_UNIT:
            return {
                ...state,
                currentUnit: payload,
            };
        case SET_CURRENT_SUPERVISION_FORM:
            return {
                ...state,
                currentForm: payload,
            };
        case GET_SUPERVISION_UNITS_SUCCESS:
            return {
                ...state,
                units: payload,
                fetching: false,
            };
        case GET_SUPERVISION_FORM_DATA_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_SUPERVISION_FORM_DATA_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        default:
            return state;
    }
}

export default reducer;

/**
 * Actions
 */

export const getSupervisionUnitsAction = (): ThunkAppAction => async (dispatch, getState) => {
    dispatch({ type: GET_SUPERVISION_UNITS });
    try {
        //We get the domain
        const { domain } = getState().user;
        //We get the supervision forms via the API facade
        const units: Unit[] = await getSupervisionUnits(domain);
        dispatch({
            type: GET_SUPERVISION_UNITS_SUCCESS,
            payload: units,
        });
    } catch(error) {
        dispatch({
            type: GET_SUPERVISION_UNITS_ERROR,
            payload: error.message
        });
    }
}

export const setCurrentUnitAction = (unit: Unit | null): ThunkAppAction => (dispatch, _) => {
    dispatch({
        type: SET_CURRENT_SUPERVISION_UNIT,
        payload: unit,
    });
    setSupervisionFormsAction()(dispatch, _, null);
}

export const setSupervisionFormsAction = (): ThunkAppAction => (dispatch, getState) => {
    try {
        //We get the units
        const { currentUnit } = getState().supervision;
        //We validate the current unit
        if(!currentUnit)
            throw new UnitNotFound();
    
        const forms = currentUnit.route.supervision_forms;
        dispatch({
            type: SET_SUPERVISION_FORMS,
            payload: forms,
        });
    } catch(error) {
        dispatch({
            type: GET_SUPERVISION_UNITS_ERROR,
            payload: error.message
        });
    }
}

export const setCurrentSupervisionFormAction = (supervisionFormId: number): ThunkAppAction => async (dispatch, _) => {
    try {
        const supervisionFormData = await getSupervisionFormDataAction(supervisionFormId)(dispatch, _, null);
        dispatch({
            type: SET_CURRENT_SUPERVISION_FORM,
            payload: supervisionFormData
        });
    } catch(error) {
        dispatch({
            type: GET_SUPERVISION_FORM_DATA_ERROR,
            payload: error.message
        });
    }
}

export const getSupervisionFormDataAction = (
    supervisionFormId: number
): ThunkAppAction<Promise<SupervisionFormWithQuestions>> => async (dispatch, getState) => {
    dispatch({ type: GET_SUPERVISION_FORM_DATA });
    //We get domain
    const { domain } = getState().user;
    const supervisionFormData = await getSupervisionFormData(domain, supervisionFormId);
    dispatch({
        type: GET_SUPERVISION_FORM_DATA_SUCCESS,
        payload: supervisionFormData
    });

    return supervisionFormData;
}


export const resetCurrentFormAction = (): ThunkAppAction => (dispatch, _) => {
    dispatch({
        type: SET_CURRENT_SUPERVISION_FORM,
        payload: null,
    });
}

export const postSupervisionFormAction = (
    formData: SupervisionFormData
): ThunkAppAction => async (dispatch, getState) => {
    try {
        const { domain } = getState().user;
        const { forms, currentUnit, currentForm } = getState().supervision;
        //We validate the current entities
        if(!currentUnit || !currentForm)
            return;
        await postSupervisionForm({
            domain,
            id_unit: currentUnit.id_unit,
            formData,
            id_supervisionForm: currentForm.id_supervisionForm
        });
        //We reset the form
        alert('Formulario envíado con éxito');
        dispatch({
            type: SET_SUPERVISION_FORMS,
            payload: forms.filter(form => form.id_supervisionForm !== currentForm.id_supervisionForm),
        });
        resetCurrentFormAction()(dispatch, getState, null);
        } catch (error) {
        alert(error.message);
    }
}


export interface SupervisionFormData {
    [key: string]: string;
}