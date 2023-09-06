import SpotifyClient from '../../src/SpotifyClient/SpotifyClient';

import BaseClient from '../util/BaseClient';
import EpisodesWrapper from "../../src/SpotifyClient/Episodes/EpisodesWrapper";

describe('episodesWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let episodesWrapper: EpisodesWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		episodesWrapper = spotifyClient.getEpisodesWrapper();
	});

	it('Should get episode', async () => {
		const result = await episodesWrapper.getEpisode('0Q86acNRm6V9GYx55SXKwf', 'ES');

		expect(result.id).toStrictEqual('0Q86acNRm6V9GYx55SXKwf');
	});

	it('Should get multiple episodes', async () => {
		const result = await episodesWrapper.getEpisodes(['77o6BIVlYM3msb4MMIL1jH', '0Q86acNRm6V9GYx55SXKwf'], 'ES');

		expect(result.episodes.length).toStrictEqual(2);
	});
});
