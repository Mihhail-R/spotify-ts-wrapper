import SpotifyClient from '../../src/SpotifyClient/SpotifyClient';

import EpisodesWrapper from "../../src/SpotifyClient/Episodes/EpisodesWrapper";
import { HttpClient } from '../../src';
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('episodesWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let episodesWrapper: EpisodesWrapper;

	beforeAll(async () => {
		await httpClient.authorizeApp();
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
