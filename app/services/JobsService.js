import { AppState } from "../AppState.js"
import { Job } from "../models/Job.js"
import { api } from "./AxiosService.js"

class JobsService {
    constructor() {

    }

    async getJobs() {
        const response = await api.get('api/jobs')
        AppState.jobs = response.data.map(x => new Job(x))
    }

    async createJob(data) {
        let response = await api.post('https://sandbox.codeworksacademy.com/api/jobs', data)
        AppState.jobs.push(new Job(response.data))
    }

    async deleteJob(id) {
        await api.delete(`https://sandbox.codeworksacademy.com/api/jobs/${id}`)
        AppState.jobs.splice(AppState.jobs.findIndex(x => x.id == id), 1)
    }
}

export const jobsService = new JobsService()