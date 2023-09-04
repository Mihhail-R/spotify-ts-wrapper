import {SpotifyClient} from "../src";
import BaseClient from "./BaseClient";
import ArtistsWrapper from "../src/SpotifyClient/Artists/ArtistsWrapper";

describe('ArtistsWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let artistsWrapper: ArtistsWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		artistsWrapper = spotifyClient.getArtistWrapper();
	});

	it('Should get artist', async () => {
		const result = await artistsWrapper.getArtist('7F9ZL4TJNr8AoU0UUQX8ih');

		expect(result.name).toStrictEqual('Archspire');
	});

	it('Should get artists', async () => {
		const result = await artistsWrapper.getArtists(['7F9ZL4TJNr8AoU0UUQX8ih']);

		expect(result.artists.length).toBeGreaterThan(0);
	});

	it('Should get artist albums', async () => {
		const result = await artistsWrapper.getArtistAlbums('7F9ZL4TJNr8AoU0UUQX8ih');

		expect(result.items.length).toBeGreaterThan(0);
	});

	it('Should get artist top tracks', async () => {
		const result = await artistsWrapper.getArtistTopTracks('7F9ZL4TJNr8AoU0UUQX8ih', 'EE');

		expect(result.tracks.length).toBeGreaterThan(0);
	});

	it('Should get artist related artists', async () => {
		const result = await artistsWrapper.getArtistRelatedArtists('7F9ZL4TJNr8AoU0UUQX8ih');

		expect(result.artists.length).toBeGreaterThan(0);
	});
});
