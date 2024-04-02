import { AppState } from "../AppState.js"

export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.creator = data.creator
    }

    get houseHTML() {
        return /*html*/`
        <div class="col-lg-3 col-md-4 col-6 my-4">
            <div class="card">
                <img class="card-img-top" src="${this.imgUrl}" alt="" onerror="app.HousesController.imageFailed(this)">
                <div class="card-body">
                    <h4 class="card-title">$${this.price}</h4>
                    <p class="card-text fw-bold"><img class="me-2 profile-picture profile-picture-xs rounded rounded-pill" src="${this.creator.picture}" alt=""> ${this.creator.name}</p>
                    <p class="card-text">${this.bedrooms} Bed | ${this.bathrooms} Bath | ${this.levels} Levels<br>Built In: ${this.year}</p>
                    <details>
                        <summary>Description ${this.DeleteButton}</summary>
                        ${this.description}
                    </details>

                </div>
            </div>
        </div>
        `
    }

    get DeleteButton() {
        if (this.creatorId == AppState.account?.id) {
            return `<button onclick="app.HousesController.deleteHouse('${this.id}')" class="d-inline float-end btn btn-danger" title="Delete House"><i class="mdi mdi-delete-forever"></i></button>`
        }
        return ''
    }
}