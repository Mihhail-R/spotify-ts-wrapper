import { PaginatedEpisodes, Show, SimplifiedShow } from '../../Types/Episodes';
import IHttpClient from '../IHttpClient';

export default class ShowsWrapper {
	constructor(private readonly client: IHttpClient) {
		this.client = client;
	}

	public async getShow(showId: string): Promise<Show> {
		return await this.client.sendGetRequest<Show>(`shows/${showId}`);
	}

	public async getShows(
		showIds: string[]
	): Promise<{ shows: SimplifiedShow[] }> {
		return await this.client.sendGetRequest<{ shows: SimplifiedShow[] }>(
			`shows?ids=${showIds.join(',')}`
		);
	}

	public async getShowEpisodes(
		showId: string,
		limit: number = 20,
		offset: number = 0,
		market?: string
	): Promise<PaginatedEpisodes> {
		return await this.client.sendGetRequest<PaginatedEpisodes>(
			`shows/${showId}/episodes?limit=${limit}&offset=${offset}&market=${market}`
		);
	}
}
