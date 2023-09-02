import { UserSavedTracks } from '../../Types/Track';
import IHttpClient from '../IHttpClient';

export default class UserTracksWrapper {
	constructor(private readonly client: IHttpClient) {
		this.client = client;
	}

	public async getTracks(
		limit: number = 20,
		offset: number = 0,
		market?: string
	): Promise<UserSavedTracks> {
		return await this.client.sendGetRequest<UserSavedTracks>(
			`me/tracks?limit=${limit}&offset=${offset}&market=${market}`
		);
	}

	public async saveTracks(ids: string[]): Promise<void> {
		return await this.client.sendPutRequest(
			`me/tracks?ids=${ids.join(',')}`,
			{ ids }
		);
	}

	public async removeSavedTracks(ids: string[]): Promise<void> {
		return await this.client.sendDeleteRequest(
			`me/tracks?ids=${ids.join(',')}`,
			{ ids }
		);
	}

	public async checkSavedTracks(ids: string[]): Promise<boolean[]> {
		return await this.client.sendGetRequest<boolean[]>(
			`me/tracks/contains?ids=${ids.join(',')}`
		);
	}
}
