import { HTTPCodes } from "../../../constants"
import { ApiException } from "./ApiException"

export class NotFoundException extends ApiException{
    constructor(message = "Record not found.", ...params){
        super(HTTPCodes.notFound, message, ...params)

        this.name = "NotFoundException"
    }
}