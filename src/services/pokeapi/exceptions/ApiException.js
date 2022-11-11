import { DEFAULT_ERROR } from "../../../constants/api"

export class ApiException extends Error {
    constructor(code = 0, message = "", ...params){
        message = message || DEFAULT_ERROR

        super(message, ...params)

        this.name = "ApiError"
        this.code = code
    }
}