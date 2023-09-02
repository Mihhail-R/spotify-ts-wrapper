import { Album, PaginatedAlbums } from '../../Types/Album';
import { PaginatedTracks } from '../../Types/Track';
import IHttpClient from '../IHttpClient';

export default class AlbumsWrapper {
	private readonly path: string = 'albums';

	constructor(private readonly client: IHttpClient) {
		this.client = client;
	}

	/**
	 * Get Spotify catalog information for a single album.
	 * @param id The Spotify ID for the album.
	 * @param market An ISO 3166-1 alpha-2 country code.
	 */
	public async getAlbum(id: string, market?: string): Promise<Album> {
		return await this.client.sendGetRequest<Album>(`${this.path}/${id}`, {
			market,
		});
	}

	/**
	 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
	 * @param ids A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
	 * @param market An ISO 3166-1 alpha-2 country code.
	 */
	public async getAlbums(
		ids: string[],
		market?: string
	): Promise<{ albums: Album[] }> {
		return this.client.sendGetRequest<{ albums: Album[] }>(this.path, {
			ids: ids.join(','),
			market,
		});
	}

	/**
	 * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
	 * @param id The Spotify ID for the album.
	 * @param limit The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param offset The index of the first track to return. Default: 0 (the first object). Use with limit to get the next set of tracks.
	 * @param market An ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
	 */
	public async getAlbumTracks(
		id: string,
		limit: number = 20,
		offset: number = 0,
		market?: string
	): Promise<PaginatedTracks> {
		return this.client.sendGetRequest<PaginatedTracks>(
			`${this.path}/${id}/tracks`,
			{
				limit,
				offset,
				market,
			}
		);
	}

	/**
	 * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
	 * @param limit The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50.
	 * @param offset The index of the first track to return. Default: 0 (the first object). Use with limit to get the next set of tracks.
	 * @param country An ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
	 */
	public async getNewReleases(
		limit: number = 20,
		offset: number = 0,
		country?: string
	): Promise<{ albums: PaginatedAlbums }> {
		return this.client.sendGetRequest<{ albums: PaginatedAlbums }>(
			'browse/new-releases',
			{
				limit,
				offset,
				country,
			}
		);
	}
}
