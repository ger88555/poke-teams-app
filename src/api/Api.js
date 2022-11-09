import { HTTPCodes } from "../constants"
import { ApiException, NotFoundException, AuthorizationException, AuthenticationException, ValidationException, InternalServerErrorException } from "./exceptions"

export class Api {
    /**
     * Perform an API call, and get the response.
     * 
     * @param {Promise} request Axios request object of the API call.
     * @param {Promise} messages Optional. Overrides for `ApiException` messages.
     * @returns {AxiosResponse} The API response, if successful.
     * 
     * @throws {ExpiredSessionException}
     * @throws {AuthorizationException}
     * @throws {NotFoundException}
     * @throws {ValidationException}
     * @throws {InternalServerErrorException}
     * @throws {ApiException}
     */
    static async perform(request, messages = {}){
        try{
            const result = await request()

            return result
        } catch(e){
            if (!e.response){
                throw e
            }

            return this.handleAPIError(e.response, messages)
        }
    }

    /**
     * Throw an `ApiException` that fits the response status.
     * 
     * @param {Object} response The unsuccessful axios response.
     * @param {Promise} messages Optional. Overrides for `ApiException` messages.
     */
    static handleAPIError(response, messages = {}){
        const { status, data } = response

        switch (status) {
        case HTTPCodes.unauthorized:
            throw new AuthenticationException(messages[typeof AuthenticationException] || data.message)

        case HTTPCodes.forbidden:
            throw new AuthorizationException(messages[typeof AuthorizationException] || data.message)

        case HTTPCodes.notFound:
            throw new NotFoundException(messages[typeof NotFoundException] || data.message)

        case HTTPCodes.unprocessableEntity:
            throw new ValidationException(messages[typeof ValidationException] || data.message, data.errors)

        case HTTPCodes.internalServerError:
            throw new InternalServerErrorException(messages[typeof InternalServerErrorException] || data.error || data.message)


        default:
            throw new ApiException(status)
        }
    }
}