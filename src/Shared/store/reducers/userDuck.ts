import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Domain
import { UserData, ValidUserTypes } from '../../../User/domain/User';
//Domain exceptions
import SessionNotFound from '../../../UserAuthentication/domain/exceptions/SessionNotFound';
//Thunk action base type
import { ThunkAppAction } from '../store';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Specification of the users reducer, containing action types, the
 * reducer itself and the action functions.
 */

/**
 * Constants
 */

//Action types
const LOGIN                 = 'LOGIN';
const LOGOUT                = 'LOGOUT';
const LOGIN_ERROR           = 'LOGIN_ERROR';
const LOGIN_SUCCESS         = 'LOGIN_SUCCESS';
//Other constants
const USER_KEY          = 'USER';
//Initial state
interface UserState {
    error?: string;
    domain: string;
    loading: boolean;
    loggedIn: boolean;
    employeeNumber: string;
};

const initialState: UserState = {
    domain: '',
    loading: false,
    loggedIn: false,
    employeeNumber: '',
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT:
            return initialState;
        case LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                ...payload
            };
        default:
            return state;
    }
}

export default reducer;

/**
 * Actions
 */

/**
 * Action to make the HTTP request to the login endpoint and handle the response, either dispatching the LOGIN_SUCCESS action
 * or the LOGIN_ERROR. It also saves the session data in the local storage.
 * @param {FormData|Object} data The credentials object or form data.
 * @returns 
 */
export let loginAction = (data: any): ThunkAppAction<Promise<void>> => async dispatch => {
    try {
        //We save the tokens in the storage
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
        //We dispatch the login success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
        
    } catch(error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message,
        });
    }
}

/**
 * Action to handle the session restoring, firstly looking for the session data in the storage and dispatching the 
 * LOGIN_SUCCESS action if it succeeds, otherwise it dispatchs the LOGIN_ERROR action with a custom exception SessionNotFound.
 * @returns 
 */
export let restoreSessionAction = (): ThunkAppAction => async dispatch => {
    try {
        //We get the data from the local storage
        const serializedData = await AsyncStorage.getItem(USER_KEY);
        //We validate the data existance
        if(!serializedData)
            throw new SessionNotFound();
        const parsedData = JSON.parse(serializedData);
        //We dispatch the success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: parsedData
        });
    } catch(error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message,
        })
    };
}


/**
 * Action to logout the user, clears the state and the storage.
 * @returns 
 */
export let logoutAction = (): ThunkAppAction => dispatch => {
    dispatch({
        type: LOGOUT,
    });
    clearStorage();
    //Create notification (logout)
}

/**
 * Action to logout the user with a session expired message.
 * @returns 
 */
export let sessionExpiredAction = (): ThunkAppAction => (dispatch, getState) => {
    logoutAction()(dispatch, getState, null);
    //Create notification actio (session expired)
} 

/**
 * Helpers
 */

/**
 * Function to clear the items in the storage corresponding to the user session.
 */
const clearStorage = async () => {
    await AsyncStorage.removeItem(USER_KEY);
}