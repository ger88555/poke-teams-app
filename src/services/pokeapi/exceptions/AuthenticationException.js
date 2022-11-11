import { HTTPCodes } from "../../../constants"
import { ApiException } from "./ApiException"

export class AuthenticationException extends ApiException{
    constructor(message = "Session expired.", ...params){
        super(HTTPCodes.unauthorized, message, ...params)

        this.name = "AuthenticationException"
    }
}