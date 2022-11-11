import { BasePokeApi } from "./BasePokeApi"
import axios from "axios"

export class RegionsApi extends BasePokeApi {

    static async list(params){
        const request = async () => await axios.get("region", { params })

        const { data } = await this.perform(request)
        
        return data
    }
}