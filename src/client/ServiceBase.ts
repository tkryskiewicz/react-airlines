import Axios, { AxiosInstance } from "axios";

export abstract class ServiceBase {
  protected readonly http: AxiosInstance;

  constructor() {
    this.http = Axios.create({
      baseURL: "http://localhost:5000",
    });
  }
}
