import {ApiClientService} from "../src/services/ApiClientService";

describe('Apiclient', () => {
    test("initialization of an ApiClient", () => {
        const baseUrl = "http://localhost:3000/api"
        const apiClient = new ApiClientService({baseUrl})
        expect(apiClient).toBeDefined()
        expect(apiClient.getBaseUrl()).toEqual("http://localhost:3000/api")
    })
    //These test require you to run backend locally on port 3000
    test("getAllObservations returns all observations", async () => {
        const baseUrl = "http://localhost:3000/api"
        const apiClient = new ApiClientService({baseUrl})
        const queryUrl = "/observations"
        const observations = await apiClient.get(queryUrl)
        expect(observations).toBeDefined()
    })

})