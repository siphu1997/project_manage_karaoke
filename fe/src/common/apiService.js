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
    // this.token = "";
  }

  setToken = token => {
    // this.token = token;
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };
  checkLogin = (id, pw) => {
    const data = {
      username: id,
      password: pw
    };
    return this.axios.post("auth/login", JSON.stringify(data));
  };

  getDataUser = () => {
    // console.log(token);
    return this.axios.get("auth/me");
  };

  /**=====ROOM===== */
  getAllRoom = () => {
    return this.axios.get("rooms");
  };

  createNewRoom = data => {
    return this.axios.post("rooms", {
      ...data
    });
  };

  updateRoom = data => {
    return this.axios.put("rooms/" + data.id, {
      ...data
    });
  };

  deleteRoom = id => {
    return this.axios.delete("rooms/" + id);
  };

  /**=====ROOM TYPE===== */

  getAllRoomType = () => {
    return this.axios.get("roomtypes");
  };
  createNewRoomType = data => {
    return this.axios.post("roomtypes", {
      ...data
    });
  };

  updateRoomType = data => {
    return this.axios.put("roomtypes/" + data.id, {
      ...data
    });
  };

  deleteRoomType = id => {
    return this.axios.delete("roomtypes/" + id);
  };

  /**=====MANAGE_ACCOUNTS===== */
  getAllAcount = () => {
    return this.axios.get("users");
  };

  getAcountById = id => {
    return this.axios.get("users/" + id);
  };

  createNewAcount = data => {
    return this.axios.post("users", {
      ...data
    });
  };

  deleteAccount = id => {
    return this.axios.delete("users/" + id);
  };

  updateAcount = data => {
    return this.axios.put("users/" + data.id, {
      ...data
    });
  };

  /**=====MANAGE_ROLEs===== */
  getAllRole = () => {
    return this.axios.get("roles");
  };

  getRoleById = id => {
    return this.axios.get("roles/" + id);
  };

  /**=====ROOM MENU===== */

  getMenu = () => {
    return this.axios.get("menu");
  };
  createNewMenu = data => {
    return this.axios.post("menu", {
      ...data
    });
  };

  updateMenu = data => {
    return this.axios.put("menu/" + data.id, {
      ...data
    });
  };

  deleteMenu = id => {
    return this.axios.delete("menu/" + id);
  };
}

const appApi = new ApiService();
export default appApi;
