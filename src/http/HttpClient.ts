import { fetch } from "undici";

import IHttpClient from "../SpotifyClient/IHttpClient";
import { ClientCredentials } from "../Types/ClientCredentials";

import ClientConfig from "./ClientConfig";

export default class HttpClient implements IHttpClient {
  public baseUrl: string;
  public authenticationUrl?: string;

  // private properties
  private clientId?: string;
  private clientSecret?: string;
  private accessToken?: string;

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
    if (!this.authenticationUrl) {
      throw new Error("Authentication url is not defined");
    }

    const result = await fetch(this.authenticationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${this.clientId}:${this.clientSecret}`,
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    const clientCredentials = (await result.json()) as ClientCredentials;

    this.accessToken = clientCredentials.access_token;
  }

  private createUrl(endpoint: string): URL {
    return new URL(endpoint, this.baseUrl);
  }

  private parseParams(params: any): URLSearchParams {
    const urlSearchParams = new URLSearchParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          return urlSearchParams.append(key, params[key]);
        }
      });
    }

    return urlSearchParams;
  }

  public async get<T>(endpoint: string, params?: any): Promise<T> {
    const baseUrl = this.createUrl(endpoint);
    let url = baseUrl.toString();

    if (params) {
      const urlSearchParams = this.parseParams(params);
      if (urlSearchParams.toString()) {
        url += `?${urlSearchParams.toString()}`;
      }
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return (await response.json()) as T;
  }

  public async post<T>(endpoint: string, data?: any, params?: any): Promise<T> {
    const baseUrl = this.createUrl(endpoint);
    let url = baseUrl.toString();

    if (params) {
      const urlSearchParams = this.parseParams(params);
      if (urlSearchParams.toString()) {
        url += `?${urlSearchParams.toString()}`;
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return (await response.json()) as T;
  }

  public async put<T>(endpoint: string, data?: any, params?: any): Promise<T> {
    const baseUrl = this.createUrl(endpoint);
    let url = baseUrl.toString();

    if (params) {
      const urlSearchParams = this.parseParams(params);
      if (urlSearchParams.toString()) {
        url += `?${urlSearchParams.toString()}`;
      }
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return (await response.json()) as T;
  }

  public async delete<T>(endpoint: string, params?: any): Promise<T> {
    const baseUrl = this.createUrl(endpoint);
    let url = baseUrl.toString();

    if (params) {
      const urlSearchParams = this.parseParams(params);
      if (urlSearchParams.toString()) {
        url += `?${urlSearchParams.toString()}`;
      }
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return (await response.json()) as T;
  }
}
