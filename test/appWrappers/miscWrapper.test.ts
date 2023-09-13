import {SpotifyClient} from "../../src";
import MiscWrapper from "../../src/SpotifyClient/Misc/MiscWrapper";
import { HttpClient } from '../../src';
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('MiscWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let miscWrapper: MiscWrapper;
	let categoryId: string;

	beforeAll(async () => {
		await httpClient.authorizeApp();
		spotifyClient = new SpotifyClient(httpClient);
		miscWrapper = spotifyClient.miscWrapper;
	});

	it('Should get available markets', async () => {
		const result = await miscWrapper.getAvailableMarkets();

		expect(result.markets.length).toBeGreaterThan(1);
	});

	it('Should get genre seeds', async () => {
		const result = await miscWrapper.getAvailableGenreSeeds();

		expect(result.genres.length).toBeGreaterThan(1);
	});

	it('Should get categories', async () => {
		const result = await miscWrapper.getCategories();

		categoryId = result.categories.items[0].id;

		expect(result.categories.items.length).toBeGreaterThan(1);
	});

	it('Should get category', async () => {
		const result = await miscWrapper.getCategory(categoryId);

		expect(result.name).toBeDefined();
	});
})
