import IHttpClient from "../SpotifyClient/IHttpClient";
import { ClientCredentials } from "../Types/ClientCredentials";

import ClientConfig from "./ClientConfig";

export default class HttpClient implements IHttpClient {
  public baseUrl: string;
  public authenticationUrl: string;

  // private properties
  private clientId: string;
  private clientSecret: string;
  private accessToken: string;

  constructor({
    baseUrl,
    authenticationUrl,
    clientId,
    clientSecret,
  }: ClientConfig) {
    this.baseUrl = baseUrl;
    this.authenticationUrl = authenticationUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret || "";
  }
  public async authorizeApp(): Promise<void> {
    const response = await fetch(this.authenticationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${this.clientId}:${this.clientSecret}`,
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    }).then((response) => response.json() as Promise<ClientCredentials>);

    this.accessToken = response.access_token;
  }

  private createBaseUrl(endpoint: string): URL {
    return new URL(endpoint, this.baseUrl);
  }

  public async get<T>(endpoint: string, params?: any): Promise<T> {
    const url = this.createBaseUrl(endpoint);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
      );
    }

    return fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then((response) => response.json() as Promise<T>);
  }
  public async post<T>(endpoint: string, data?: any, params?: any): Promise<T> {
    const url = this.createBaseUrl(endpoint);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
      );
    }

    if (data) {
      Object.keys(data).forEach((key) =>
        url.searchParams.append(key, data[key]),
      );
    }

    return fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json() as Promise<T>);
  }
  public async put<T>(endpoint: string, data?: any, params?: any): Promise<T> {
    const url = this.createBaseUrl(endpoint);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
      );
    }

    if (data) {
      Object.keys(data).forEach((key) =>
        url.searchParams.append(key, data[key]),
      );
    }

    return fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json() as Promise<T>);
  }
  public async delete<T>(endpoint: string, params?: any): Promise<T> {
    const url = this.createBaseUrl(endpoint);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key]),
      );
    }

    return fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then((response) => response.json() as Promise<T>);
  }
}
