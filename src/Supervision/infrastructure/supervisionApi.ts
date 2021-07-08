import axios from 'axios';
//Domain
import SupervisionNotFound from '../domain/SupervisionNotFound';
//Configuration
import app from '../../../config/app';
//Types
import { SupervisionFormData } from '../../Shared/store/reducers/supervisionDuck';

export const getSupervisionFormData = async (
    domain: string,
    supervisionFormId: number
) => {
    const response = await axios.get(
        `${ app.apiPath }/${ domain }/supervision/${ supervisionFormId }`
    );
    if(!response)
        throw new SupervisionNotFound();
    return response.data;
}

interface PostSupervisionForm {
    domain: string;
    id_unit: number;
    formData: SupervisionFormData;
    id_supervisionForm: number;

}

export const postSupervisionForm = async ({
    domain,
    id_unit,
    formData,
    id_supervisionForm,
}: PostSupervisionForm) => {
    const response = await axios.post(
        `${ app.apiPath }/${ domain }/supervision/save`,
        {
            id_unit,
            id_supervisionForm,
            key: Object.entries(formData).map(([key, value]) => ({
                [key]: value
            }))
        }
    );

    if(!response)
        throw new SupervisionNotFound();
    return response.data;
}