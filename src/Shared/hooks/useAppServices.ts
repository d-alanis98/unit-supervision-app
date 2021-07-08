import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
//Actions
import { getSupervisionUnitsAction } from '../store/reducers/supervisionDuck';


const useAppServices = () => {
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Store
    const { domain } = useAppSelector(state => state.user);

    //Callbacks
    const getSupervisionUnits = useCallback(() => {
        dispatch(getSupervisionUnitsAction());
    }, [dispatch]);

    //Effects
    useEffect(() => {
        if(!domain)
            return;
        getSupervisionUnits();
    }, [
        domain,
        getSupervisionUnits
    ]);
}

export default useAppServices;