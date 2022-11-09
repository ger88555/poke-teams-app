import { HTTPCodes } from "../../constants"
import { ApiException } from "./ApiException"

export class InternalServerErrorException extends ApiException{
    constructor(message = "There was a problem while processing your request.", ...params){
        super(HTTPCodes.internalServerError, message, ...params)

        this.name = "InternalServerErrorException"
    }
}