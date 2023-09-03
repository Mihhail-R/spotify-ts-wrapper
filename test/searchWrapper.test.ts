import {SpotifyClient} from "../src";
import BaseClient from "./BaseClient";
import SearchWrapper from "../src/SpotifyClient/Search/SearchWrapper";

describe('SearchWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let searchWrapper: SearchWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
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
	})
});
