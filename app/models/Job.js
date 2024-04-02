import { AppState } from "../AppState.js"

export class Job {
    constructor(data) {
        this.company = data.company
        this.jobTitle = data.jobTitle
        this.hours = data.hours
        this.rate = data.rate
        this.description = data.description
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.id = data.id
    }

    get jobsHTML() {
        return /*html*/`
        <div class="col-lg-3 col-md-4 col-6 my-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${this.jobTitle}</h4>
                    <p class="card-text fw-bold"><img class="me-2 profile-picture profile-picture-xs rounded rounded-pill" src="${this.creator.picture}" alt=""> ${this.creator.name}</p>
                    <p class="card-text">At ${this.company}<br>Pays $${this.rate.toFixed(2)}/hr<br>Hours: ${this.hours}</p>
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
            return `<button onclick="app.JobsController.deleteJob('${this.id}')" class="d-inline float-end btn btn-danger" title="Delete Job"><i class="mdi mdi-delete-forever"></i></button>`
        }
        return ''
    }
}