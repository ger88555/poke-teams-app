import { HTTPCodes } from "../../constants"
import { ApiException } from "./ApiException"

export class AuthorizationException extends ApiException{
    constructor(message = "Unauthorized action.", ...params){
        super(HTTPCodes.forbidden, message, ...params)

        this.name = "AuthorizationException"
    }
}