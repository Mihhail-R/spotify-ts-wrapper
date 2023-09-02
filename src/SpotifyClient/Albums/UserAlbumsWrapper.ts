import { PaginatedAlbums } from '../../Types/Album';
import IHttpClient from '../IHttpClient';

export default class UserAlbumsWrapper {
	private readonly path: string = 'me/albums';
	constructor(private readonly client: IHttpClient) {
		this.client = client;
	}

	/**
	 * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
	 * Required authorization scope: user-library-read
	 */
	public async getUsersSavedAlbums(
		limit: number = 20,
		offset: number = 0,
		market?: string
	): Promise<PaginatedAlbums> {
		return this.client.sendGetRequest<PaginatedAlbums>(this.path, {
			limit,
			offset,
			market,
		});
	}

	/**
	 * Save one or more albums to the current user’s “Your Music” library.
	 * Required authorization scope: user-library-modify
	 */
	public async saveAlbumsForUser(ids: string[]): Promise<void> {
		await this.client.sendPutRequest(this.path, { ids });
	}

	/**
	 * Remove one or more albums from the current user’s “Your Music” library.
	 * Required authorization scope: user-library-modify
	 */
	public async removeAlbumsForUser(ids: string[]): Promise<void> {
		await this.client.sendDeleteRequest(this.path, { ids });
	}

	/**
	 * Check if one or more albums is already saved in the current Spotify user’s “Your Music” library.
	 * Required authorization scope: user-library-read
	 */
	public async checkUsersSavedAlbums(ids: string[]): Promise<boolean[]> {
		return this.client.sendGetRequest<boolean[]>(`${this.path}/contains`, {
			ids,
		});
	}
}
