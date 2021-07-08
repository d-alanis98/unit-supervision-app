import { SupervisionForm } from '../../Supervision/domain/Supervision';


export interface Unit {
    eco: string;
    route: Route;
    domain: string;
    id_unit: number;
    id_route: number;
    licence_plate: string;
    currentOperator: any;
}

export interface Route {
    name: string;
    id_route: number;
    id_system: number;
    supervision_forms: SupervisionForm[];
}