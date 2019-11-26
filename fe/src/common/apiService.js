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
    this.axios.defaults.headers.common["Authorization"] = `Basic ${token}`;
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
    return this.axios.get("secured/users");
  };

  getAllRoom = () => {
    return this.axios.get("secured/rooms");
  };

  getAllRoomType = () => {
    return this.axios.get("secured/roomtypes");
  };

  /**=====ROOM===== */
  createNewRoom = (roomName, roomTypeId) => {
    return this.axios.post("secured/rooms", {
      room_name: roomName,
      roomtype: {
        roomtype_id: roomTypeId
      }
    });
  };

  updateRoom = data => {
    return this.axios.put("secured/rooms/" + data.room_id, {
      ...data
    });
  };

  deleteRoom = id => {
    return this.axios.delete("secured/rooms/" + id);
  };
}

const appApi = new ApiService();
export default appApi;
