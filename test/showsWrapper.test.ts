import {SpotifyClient} from "../src";
import BaseClient from "./BaseClient";
import ShowsWrapper from "../src/SpotifyClient/Shows/ShowsWrapper";

describe('ShowsWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let showsWrapper: ShowsWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		showsWrapper = spotifyClient.getShowsWrapper();
	});

	it('Should get a single show', async () => {
		const result = await showsWrapper.getShow('5exfRPDNCBHmntEkJrlLmX', 'EE');

		expect(result.name).toStrictEqual('The Ramsey Show');
	});

	it('Should get multiple shows', async () => {
		const result = await showsWrapper.getShows(
			['5exfRPDNCBHmntEkJrlLmX'],
			'EE'
		);

		expect(result.shows.length).toStrictEqual(1);
	});

	it('Should get show episodes', async () => {
		const result = await showsWrapper.getShowEpisodes(
			'5exfRPDNCBHmntEkJrlLmX',
			10,
			0,
			'EE'
		);

		expect(result.items.length).toBeGreaterThan(1);
	});
});
