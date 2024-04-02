import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class HousesController {
    constructor() {
        AppState.on('houses', this.drawHouses)
        AppState.on('account', this.showHouseForm)
        AppState.on('account', this.drawHouses)
        this.getHouses()
        this.showHouseForm()
    }

    showHouseForm() {
        if (AppState.account == null) return
        document.querySelector('#house-form').classList.remove('d-none')
    }

    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.toast('Could not get houses.', 'error')
        }
    }

    imageFailed(imageElm) {
        imageElm.src = "https://http.cat/images/404.jpg"
        imageElm.setAttribute('onerror', '')
    }

    drawHouses() {
        let houseContent = ''
        AppState.houses.forEach(x => houseContent += x.houseHTML)
        setHTML('houses-container', houseContent)
    }

    async createHouse() {
        try {
            event.preventDefault()
            const formData = getFormData(event.target)
            await housesService.createHouse(formData)
        } catch (error) {
            Pop.toast('Unable to create house.', 'error')
        }
    }

    async deleteHouse(id) {
        try {
            let response = await Pop.confirm('Are you sure you want to delete this house?')
            if (!response) return
            await housesService.deleteHouse(id)
        } catch (error) {
            Pop.toast('Unable to delete house.', 'error')
        }
    }
}