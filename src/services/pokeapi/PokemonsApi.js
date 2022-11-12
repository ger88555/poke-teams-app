import { BasePokeApi } from "./BasePokeApi"
import axios from "axios"

export class PokemonsApi extends BasePokeApi {

    static async list(params){
        const request = async () => await axios.get("pokemon", { params })

        const { data } = await this.perform(request)
        
        return data
    }

    static async get(id){
        const request = async () => await axios.get(id)

        const { data } = await this.perform(request)
        
        return data
    }
}