import axios from "axios";

export class Actions {
  static async getCondos() {
    const response = await axios.get("http://localhost:5000/condos");
    const data = response.data;

    return data;
  }
}
