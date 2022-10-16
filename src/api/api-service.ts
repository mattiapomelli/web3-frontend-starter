import { ApiClient } from "./client";
import { Http } from "./http";

export class ApiService {
  protected client: ApiClient;
  protected http: Http;
  protected baseUrl: string;

  constructor(client: ApiClient, baseUrl: string) {
    this.client = client;
    this.http = this.client.http;
    this.baseUrl = baseUrl;
  }
}
