import {SpotifyClient} from "../../src";
import ShowsWrapper from "../../src/SpotifyClient/Shows/ShowsWrapper";
import HttpClient from "../../src/http/HttpClient";
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('ShowsWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let showsWrapper: ShowsWrapper;

	beforeAll(async () => {
		await httpClient.authorizeApp();
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
