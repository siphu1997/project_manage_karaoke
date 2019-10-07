import axios from "axios";

class ApiService {
  constructor() {
    // this.path = "";
    this.axios = axios.create({
      baseURL: "https://final-cd.herokuapp.com/api/",
      headers: {
        "Access-Control-Allow-Origin": "*/*",
        "Content-Type": "application/json"
      },
      withCredentials: "include"
    });
    this.token = "";
  }

  setToken = token => {
    this.token = token;
  };
  checkLogin = (id, pw) => {
    const data = {
      username: id,
      password: pw
    };
    return this.axios.post("auth/login", { data });
  };
}

const appApi = new ApiService();
export default appApi;
