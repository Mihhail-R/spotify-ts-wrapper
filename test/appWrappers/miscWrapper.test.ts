import {SpotifyClient} from "../../src";
import BaseClient from "../util/BaseClient";
import MiscWrapper from "../../src/SpotifyClient/Misc/MiscWrapper";

describe('MiscWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let miscWrapper: MiscWrapper;
	let categoryId: string;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		miscWrapper = spotifyClient.getMiscWrapper();
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
