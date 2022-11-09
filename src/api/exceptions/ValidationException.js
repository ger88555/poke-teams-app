import { HTTPCodes } from "../../constants"
import { ApiException } from "./ApiException"

export class ValidationException extends ApiException{
    constructor(message = "Invalid data.", errors = {}, ...params){
        super(HTTPCodes.unprocessableEntity, message, ...params)

        this.name = "ValidationException"
        this.errors = errors
    }
}