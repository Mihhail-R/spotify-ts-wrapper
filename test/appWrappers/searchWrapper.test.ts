import {SpotifyClient} from "../../src";
import SearchWrapper from "../../src/SpotifyClient/Search/SearchWrapper";
import HttpClient from "../../src/http/HttpClient";
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('SearchWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let searchWrapper: SearchWrapper;

	beforeAll(async () => {
		await httpClient.authorizeApp();
		spotifyClient = new SpotifyClient(httpClient);
		searchWrapper = spotifyClient.getSearchWrapper();
	});

	it('Should perform search', async () => {
		const result = await searchWrapper.search(
			'MentalCruelty', ['artists', 'albums'], 'EE'
		);

		expect(result).toBeDefined();
	});

	it('Should get artists from search', async () => {
		const result = await searchWrapper.search<['artists']>('Mental Cruelty', ['artists'], 'EE');

		expect(result.artists.items[0].name).toStrictEqual('Mental Cruelty');
	});

	it('Should get artists from search, with external included', async () => {
		const result = await searchWrapper.search<['artists']>(
			'Mental Cruelty', ['artists'], 'EE', 0, 20, true,
		);

		expect(result.artists.items[0].name).toStrictEqual('Mental Cruelty');
	})
});
