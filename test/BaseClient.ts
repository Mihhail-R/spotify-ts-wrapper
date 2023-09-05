import axios, {Axios, AxiosResponse} from "axios";

import IHttpClient from "../src/SpotifyClient/IHttpClient";
import {ClientCredentials} from "../src/Types/ClientCredentials";

import {SPOTIFY_AUTH_URL, SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "./config";


export default class BaseClient implements IHttpClient {
	protected readonly client: Axios;
	protected readonly spotifyClientId: string;
	protected readonly spotifySecret: string;
	protected readonly spotifyBaseUrl: string = 'https://api.spotify.com/v1/';

	constructor(
		spotifyBaseUrl: string = 'https://api.spotify.com/v1/',
		spotifyClientId: string = SPOTIFY_CLIENT_ID,
		spotifySecret: string = SPOTIFY_SECRET,
		client = new Axios(
			{
				baseURL: spotifyBaseUrl,
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				transformResponse: (data) => JSON.parse(data),
			}
		),
	) {
		this.spotifyBaseUrl = spotifyBaseUrl;
		this.spotifyClientId = spotifyClientId;
		this.spotifySecret = spotifySecret;
		this.client = client;
	}

	public async setAccessToken(): Promise<void> {
		try {
			const response: AxiosResponse<ClientCredentials> = await axios.post(SPOTIFY_AUTH_URL,
				{
					grant_type: "client_credentials",
				},
				{
					headers: {
						"Content-Type":"application/x-www-form-urlencoded",
						"Accept": "application/json",
						"Authorization": `Basic ${(Buffer.from(`${this.spotifyClientId}:${this.spotifySecret}`)).toString('base64')}`,
					},
					transformResponse: (data) => JSON.parse(data),
				});

			// @ts-ignore
			this.client.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;
		} catch (e) {
			console.error(e);

			throw e;
		}
	}

	public async get<T>(url: string, params: Record<string, unknown>): Promise<T> {
		const response: AxiosResponse<T> = await this.client.get(url, {
			params,
		});

		return response.data;
	}

	public async post<T>(url: string, data: Record<string, unknown>, params?: any): Promise<T> {
		const response: AxiosResponse<T> = await this.client.post(url, data, {
			params,
		});

		return response.data;
	}

	public async put<T>(url: string, data?: Record<string, unknown>, params?: any): Promise<T> {
		const response: AxiosResponse<T> = await this.client.put(url, data, {
			params,
		});

		return response.data;
	}

	public async delete<T>(url: string, params?: Record<string, unknown>): Promise<T> {
		const response: AxiosResponse<T> = await this.client.delete(url, {
			params
		});

		return response.data;
	}
}
