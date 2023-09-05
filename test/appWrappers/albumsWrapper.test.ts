import AlbumsWrapper from '../../src/SpotifyClient/Albums/AlbumsWrapper';
import SpotifyClient from '../../src/SpotifyClient/SpotifyClient';

import BaseClient from '../util/BaseClient';

describe('AlbumsWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let albumsWrapper: AlbumsWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		albumsWrapper = spotifyClient.getAlbumsWrapper();
	});

	it('should get a single album', async () => {
		const result = await albumsWrapper.getAlbum('2KYHW0qffmoyIQe9JibNIu');

		expect(result.name).toStrictEqual('Zwielicht');
	});

	it('Should get multiple albums', async () => {
		const result = await albumsWrapper.getAlbums(['2KYHW0qffmoyIQe9JibNIu', '6y0igZArWVi6Iz0rj35c1Y']);

		expect(result.albums.length).toStrictEqual(2);
	});

	it('Should get album tracks', async () => {
		const result = await albumsWrapper.getAlbumTracks('2KYHW0qffmoyIQe9JibNIu');

		expect(result.items.length).toBeGreaterThan(1);
	});

	it('Should get new releases', async () => {
		const result = await albumsWrapper.getNewReleases();

		expect(result.albums.items.length).toBeGreaterThan(1);
	});
});