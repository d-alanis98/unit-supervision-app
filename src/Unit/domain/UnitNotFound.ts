import ExceptionWithStatusCode from '../../Shared/domain/exceptions/ExceptionWithStatusCode';


export default class UnitNotFound extends ExceptionWithStatusCode {
    constructor() {
        super('Unidad no encontrada');

        this.statusCode = 404;
    }
}