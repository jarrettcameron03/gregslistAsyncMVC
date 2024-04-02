import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
    constructor() {

    }

    async getHouses() {
        const response = await api.get('https://sandbox.codeworksacademy.com/api/houses')
        AppState.houses = response.data.map(x => new House(x))
        /*AppState.houses.push(new House({
            bedrooms: 1,
            bathrooms: 1,
            year: 2001,
            price: 10,
            levels: 3,
            imgUrl: `x" onerror="console.log('run'); let x = document.createElement('marquee'); x.innerHTML='Ivana B Coding > You (XSS MOMENT?!?)'; x.setAttribute('style', 'z-index: 10; position: absolute;'); x.classList.add('bg-danger', 'fs-3', 'text-light'); document.body.appendChild(x)">`,
            creatorId: '3',
            creator: { name: 'yeahh', picture: 'https://google.com/' },
            description: ">"
        }))*/
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