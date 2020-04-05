export default class ApiService {
  constructor(auth, cfg) {
      console.log("api service", auth, cfg)
    this.serverUrl = cfg.backendUrl;
    this.loginUrl = cfg.authUrl;
    this.auth = auth;
  }

  async sendRequest(url, method = "GET", data = null, auth = true) {
    const errorTitle = `Error performing ${method} ${url}`;
    let fetchBody = {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (auth) {
      fetchBody = {
        ...fetchBody,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${this.auth.token}`,
        },
      };
    }
    if (data !== null) {
      fetchBody = { ...fetchBody, body: JSON.stringify(data) };
    }
    let fetchResponse = await fetch(url, fetchBody);
    if (fetchResponse.ok) {
      return fetchResponse;
    } else {
      let resp = fetchResponse.statusText;
      throw Object.create({ title: errorTitle, message: resp });
    }
  }

  login = async (body) => {
      console.log(this.loginUrl, this.backendUrl)
    return this.sendRequest(
      `${this.loginUrl}/auth/login`,
      "POST",
      body,
      false
    );
  };

  getCurrentUser = async () => {
    return this.sendRequest(`${this.serverUrl}/auth/current`, "GET");
  };

  registerHost = async (body) => {
    return this.sendRequest(
      `${this.serverUrl}/auth/register/host`,
      "POST",
      body,
      false
    );
  };

  registerGuest = async (body) => {
    return this.sendRequest(
      `${this.serverUrl}/auth/register/guest`,
      "POST",
      body,
      false
    );
  };

  getAll = async (url) => {
    console.log("getAll", url)
    return this.sendRequest(`${this.serverUrl}/${url}`)
  }

  postFromBody = async (url, body) => {
    return this.sendRequest(`${this.serverUrl}/${url}`, "POST", body)
  }

  postOperation = async (url, operation, id) => {
    return this.sendRequest(`${this.serverUrl}/${url}/${operation}/${id}`)
  }
}
