import { fetch } from "undici";

import IHttpClient from "../SpotifyClient/IHttpClient";
import {
  ClientCredentials,
  UserClientCredentials,
  UserScopes,
} from "../Types/ClientCredentials";

import { ClientConfigurations } from "./ClientConfig";

export default class HttpClient implements IHttpClient {
  public baseUrl: string;
  public authenticationUrl?: string;

  // private properties
  private clientId?: string;
  private clientSecret?: string;
  private accessToken?: string;

  /**
   * Create a new HttpClient
   * Provide either a token or clientId, clientSecret and authenticationUrl
   */
  constructor(config: ClientConfigurations) {
    this.baseUrl = config.baseUrl;
    if (config.token) {
      this.accessToken = config.token;
    } else {
      this.clientId = config.clientId;
      this.clientSecret = config.clientSecret;
      this.authenticationUrl = config.authenticationUrl;
    }
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

  private generateRandomString(length: number): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  /**
   * Authorize app scope with client credentials
   * Ref: https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
   */
  public async authorizeApp(): Promise<void> {
    if (this.accessToken) {
      return;
    }

    if (!this.authenticationUrl) {
      throw new Error("Authentication url is not defined");
    }

    try {
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

      if (result.status !== 200) {
        throw new Error("Failed to authorize app");
      }

      const clientCredentials = (await result.json()) as ClientCredentials;

      this.accessToken = clientCredentials.access_token;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Create user authentication url with client credentials
   * Use this url to redirect user to spotify login page
   * @param redirectUri
   * @param scopes
   */
  public createUserAuthUrl(redirectUri: string, scopes: UserScopes[]): string {
    if (!this.clientId) {
      throw new Error("Client id is not defined");
    }

    if (!this.authenticationUrl) {
      throw new Error("Authentication url is not defined");
    }

    let url = "https://accounts.spotify.com/authorize";

    const urlSearchParams = new URLSearchParams();
    const state = this.generateRandomString(16);

    urlSearchParams.append("client_id", this.clientId);
    urlSearchParams.append("response_type", "code");
    urlSearchParams.append("redirect_uri", redirectUri);
    urlSearchParams.append("scope", scopes.join(" "));
    urlSearchParams.append("state", state);

    url += `?${urlSearchParams.toString()}`;

    return url;
  }

  /**
   * Authorize user scope with client credentials
   * Returns UserClientCredentials, save access_token and refresh_token securely for later use
   * @param code
   * @param redirectUri
   */
  public async authorizeUser(
    redirectUri: string,
    code: string,
  ): Promise<UserClientCredentials> {
    if (!this.clientId) {
      throw new Error("Client id is not defined");
    }

    if (!this.clientSecret) {
      throw new Error("Client secret is not defined");
    }

    if (!this.authenticationUrl) {
      throw new Error("Authentication url is not defined");
    }

    try {
      const response = await fetch(this.authenticationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${this.clientId}:${this.clientSecret}`,
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
      });

      const data = (await response.json()) as UserClientCredentials;

      if (!data.access_token && data.error) {
        throw new Error(`${data.error}: ${data.error_description}`);
      }

      this.accessToken = data.access_token;

      return data;
    } catch (e) {
      throw e;
    }
  }

  private async genericRequest<T>(
    method: string,
    endpoint: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<T> {
    const baseUrl = this.createUrl(endpoint);
    let url = baseUrl.toString();

    if (params) {
      const urlSearchParams = this.parseParams(params);
      if (urlSearchParams.toString()) {
        url += `?${urlSearchParams.toString()}`;
      }
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return (await response.json()) as T;
  }

  /**
   * Send GET request
   * @param endpoint
   * @param params
   */
  public async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return await this.genericRequest("GET", endpoint, undefined, params);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Send POST request
   * @param endpoint
   * @param data
   * @param params
   */
  public async post<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return await this.genericRequest("POST", endpoint, data, params);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Send PUT request
   * @param endpoint
   * @param data
   * @param params
   */
  public async put<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return await this.genericRequest("PUT", endpoint, data, params);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Send DELETE request
   * @param endpoint
   * @param params
   */
  public async delete<T>(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return await this.genericRequest("DELETE", endpoint, undefined, params);
    } catch (e) {
      throw e;
    }
  }
}
