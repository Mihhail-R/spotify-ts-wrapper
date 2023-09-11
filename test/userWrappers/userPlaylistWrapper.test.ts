import {Axios} from "axios";
import UserPlaylistWrapper from "../../src/SpotifyClient/Playlist/UserPlaylistWrapper";

jest.mock("axios");

describe('UserPlaylistWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new UserPlaylistWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('should change playlist details', async () => {
		const playlistId = '37i9dQZF1DXcBWIGoYBM5M';
		const name = 'New Name';
		const public_ = true;
		const collaborative = false;
		const description = 'New Description';

		await spotifyClient.changePlaylistDetails({
			playlistId,
			name,
			public_,
			collaborative,
			description,
		});

		expect(axiosMock.put).toBeCalledWith(`playlists/${playlistId}`, {
			name,
			public: public_,
			collaborative,
			description,
		});
	});

	it('should update playlist items', async () => {
		const playlistId = '37i9dQZF1DXcBWIGoYBM5M';
		const rangeStart = 0;
		const rangeLength = 1;
		const insertBefore = 2;
		const snapshotId = 'snapshotId';

		await spotifyClient.updatePlaylistItems({
			playlistId,
			rangeStart,
			rangeLength,
			insertBefore,
			snapshotId,
		});

		expect(axiosMock.put).toBeCalledWith(`playlists/${playlistId}/tracks`, {
			rangeStart,
			rangeLength,
			insertBefore,
			snapshotId,
		});
	});

	it('should add items to playlist', async () => {
		const playlistId = '37i9dQZF1DXcBWIGoYBM5M';
		const uris = ['uri1', 'uri2'];
		const position = 0;

		await spotifyClient.addItemsToPlaylist(playlistId, uris, position);

		expect(axiosMock.post).toBeCalledWith(`playlists/${playlistId}/tracks`, {
			uris,
			position,
		});
	});

	it('should remove items from playlist', async () => {
		const playlistId = '37i9dQZF1DXcBWIGoYBM5M';
		const uris = ['uri1', 'uri2'];
		const snapshotId = 'snapshotId';

		await spotifyClient.removeItemsFromPlaylist(playlistId, uris, snapshotId);

		expect(axiosMock.delete).toBeCalledWith(`playlists/${playlistId}/tracks`, {
			uris,
			snapshotId,
		});
	});

	it('should get user playlists', async () => {
		const limit = 20;
		const offset = 0;

		await spotifyClient.getMyPlaylists(limit, offset);

		expect(axiosMock.get).toBeCalledWith("me/playlists", {
			limit,
			offset,
		});
	});

	it('should create playlist', async () => {
		const userId = 'userId';
		const name = 'name';
		const public_ = true;
		const collaborative = false;
		const description = 'description';

		await spotifyClient.createPlaylist(userId, name, public_, collaborative, description);

		expect(axiosMock.post).toBeCalledWith(`users/${userId}/playlists`, {
			name,
			public: public_,
			collaborative,
			description,
		});
	});

	it('should add cover image to user playlist', async () => {
		const playlistId = '37i9dQZF1DXcBWIGoYBM5M';
		const base64JpegImage = 'base64JpegImage';

		await spotifyClient.addCoverImageToPlaylist(playlistId, base64JpegImage);

		expect(axiosMock.put).toBeCalledWith(`playlists/${playlistId}/images`, {
			base64JpegImage,
		});
	});

	it('should get user playlists', async () => {
		const userId = 'userId';
		const limit = 20;
		const offset = 0;

		await spotifyClient.getUserPlaylists(userId, limit, offset);

		expect(axiosMock.get).toBeCalledWith(`users/${userId}/playlists`, {
			limit,
			offset,
		});
	});
});
