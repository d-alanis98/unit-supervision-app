import ExceptionWithStatusCode from '../../Shared/domain/exceptions/ExceptionWithStatusCode';


export default class SupervisionNotFound extends ExceptionWithStatusCode {
    constructor() {
        super('Supervision not found');
        this.statusCode = 404;
    }
}