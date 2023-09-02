import SearchWrapper from '../src/SpotifyClient/Search/SearchWrapper';
import SpotifyClient from '../src/SpotifyClient/SpotifyClient';

import BaseClient from './BaseClient';

describe('episodesWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let searchWrapper: SearchWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		searchWrapper = spotifyClient.getSearchWrapper();
	});

	it('Should perform search', async () => {
		const result = await searchWrapper.search<['artists', 'albums']>(
			'MentalCruelty',
			['artists', 'albums'],
			'EE',
		);

		expect(result).toBeDefined();
		expect(result.albums.href).toBeDefined();
	});
});
