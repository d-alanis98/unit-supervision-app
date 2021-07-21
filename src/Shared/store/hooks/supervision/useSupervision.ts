import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '..';
//Domain
import { Unit } from '../../../../Unit/domain/Unit';
//Actions
import { 
    SupervisionFormData,
    setCurrentUnitAction,
    resetCurrentFormAction, 
    postSupervisionFormAction, 
    setCurrentSupervisionFormAction,
} from '../../reducers/supervisionDuck';


const useSupervision = () => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Store
    const { 
        units,
        forms,
        fetching,
        currentUnit,
        currentForm,
    } = useAppSelector(state => state.supervision);

    //Callbacks
    const setCurrentUnit = useCallback((unit: Unit | null) => {
        dispatch(setCurrentUnitAction(unit));
    }, [dispatch]);

    const postSupervisionForm = useCallback((formData: SupervisionFormData) => {
        dispatch(postSupervisionFormAction(formData));
    }, [dispatch]);

    const setCurrentSupervisionForm = useCallback(supervisionFormId => {
        dispatch(setCurrentSupervisionFormAction(supervisionFormId))
    }, [dispatch]);

    const resetCurrentSupervisionForm = useCallback(() => {
        dispatch(resetCurrentFormAction());
    }, [dispatch]);

    return {
        units,
        forms,
        fetching,
        currentUnit,
        currentForm,
        setCurrentUnit,
        postSupervisionForm,
        setCurrentSupervisionForm,
        resetCurrentSupervisionForm
    }
}

export default useSupervision;