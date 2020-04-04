class ApiService {
    constructor(cfg) {
        this.serverUrl = cfg.backendUrl;
    }

    async sendGetRequest(url) {
        let method = "GET"
        const errorTitle = `Error performing ${method} ${url}`
        let fetchBody = {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
            // we need to add authorization here
        }
        let fetchResponse = await fetch(url, fetchBody)
        if (fetchResponse.ok) {
            return fetchResponse
        } else {
            let resp = fetchResponse.statusText
            throw Object.create({title: errorTitle, message: resp})
        }
    }

    async getWhatever() {
        return this.sendGetRequest(`${this.serverUrl}\\whatever`)
    }
}