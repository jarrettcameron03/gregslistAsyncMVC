import { AppState } from "../AppState.js";
import { jobsService } from "../services/JobsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class JobsController {
    constructor() {
        AppState.on('jobs', this.drawJobs)
        AppState.on('account', this.showJobForm)
        AppState.on('account', this.drawJobs)
        this.getJobs()
        this.showJobForm()
    }

    showJobForm() {
        if (AppState.account == null) return
        document.querySelector('#job-form').classList.remove('d-none')
    }

    async getJobs() {
        try {
            await jobsService.getJobs()
        } catch (error) {
            Pop.toast('Could not get jobs.', 'error')
        }
    }

    imageFailed(imageElm) {
        imageElm.src = "https://http.cat/images/404.jpg"
        imageElm.setAttribute('onerror', '')
    }

    drawJobs() {
        let jobContent = ''
        AppState.jobs.forEach(x => jobContent += x.jobsHTML)
        setHTML('jobs-container', jobContent)
    }

    async createJob() {
        try {
            event.preventDefault()
            const formData = getFormData(event.target)
            await jobsService.createJob(formData)
        } catch (error) {
            Pop.toast('Unable to create job.', 'error')
        }
    }

    async deleteJob(id) {
        try {
            let response = await Pop.confirm('Are you sure you want to delete this job?')
            if (!response) return
            await jobsService.deleteJob(id)
        } catch (error) {
            Pop.toast('Unable to delete job.', 'error')
        }
    }
}