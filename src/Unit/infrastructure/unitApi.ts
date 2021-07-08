import axios from 'axios';
//Domain
import SupervisionNotFound from '../../Supervision/domain/SupervisionNotFound';
//Configuration
import app from '../../../config/app';

export const getSupervisionUnits = async (domain: string) => {
    const response = await axios.get(
        `${ app.apiPath }/${ domain }/supervision/units`
    );
    if(!response)
        throw new SupervisionNotFound();
    return response.data;
}