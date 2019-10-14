import axios from "axios";

class ApiService {
  constructor() {
    // this.path = "";
    this.axios = axios.create({
      baseURL: "https://final-cd.herokuapp.com/api/",
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
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
    return this.axios.post("auth/login", JSON.stringify(data));
  };

  getDataUserWithToken = token => {
    // console.log(token);
    return this.axios.get("secured/users", {
      headers: {
        Authorization: `Basic ${token}`
      }
    });
  };
}

const appApi = new ApiService();
export default appApi;
