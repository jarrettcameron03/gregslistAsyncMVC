import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
    constructor() {

    }

    async getHouses() {
        const response = await api.get('https://sandbox.codeworksacademy.com/api/houses')
        AppState.houses = response.data.map(x => new House(x))
    }

    async createHouse(data) {
        let response = await api.post('https://sandbox.codeworksacademy.com/api/houses', data)
        AppState.houses.push(new House(response.data))
    }

    async deleteHouse(id) {
        await api.delete(`https://sandbox.codeworksacademy.com/api/houses/${id}`)
        AppState.houses.splice(AppState.houses.findIndex(x => x.id == id), 1)
    }
}

export const housesService = new HousesService()