import { fetchAdapter } from "@/adapters/fetchAdapter";

export class Actions {
  static async getCondos() {
    const response = await fetchAdapter({ method: "GET", path: "/condos" });
    console.log("1234");
    const data = response.data();
    console.log("data: ", data);

    return data;
  }
}
