import { HttpClient } from '../../src';
import {SPOTIFY_AUTH_URL, SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";
import {SpotifyClient} from "../../src";
import PlaylistWrapper from "../../src/SpotifyClient/Playlist/PlaylistWrapper";

describe('PlaylistWrapper', () => {
	const client = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
		authenticationUrl: SPOTIFY_AUTH_URL,
	});
	let spotifyClient: SpotifyClient;
	let playlistWrapper: PlaylistWrapper;

	beforeAll(async () => {
		await client.authorizeApp();
		spotifyClient = new SpotifyClient(client);
		playlistWrapper = spotifyClient.playlistWrapper;
	});

	it('should get playlist', async () => {
		const playlist = await playlistWrapper.getPlaylist('37i9dQZF1DXcBWIGoYBM5M');
		expect(playlist).toBeDefined();
		expect(playlist.id).toBe('37i9dQZF1DXcBWIGoYBM5M');
	});

	it('should get playlist items', async () => {
		const playlistItems = await playlistWrapper.getPlaylistItems('37i9dQZF1DXcBWIGoYBM5M');
		expect(playlistItems).toBeDefined();
		expect(playlistItems.items.length).toBeGreaterThan(0);
	});

	it('should get featured playlist', async () => {
		const featuredPlaylist = await playlistWrapper.getFeaturedPlaylist();
		expect(featuredPlaylist).toBeDefined();
		expect(featuredPlaylist.playlists.items.length).toBeGreaterThan(0);
	});

	it('should get category playlists', async () => {
		const categoryPlaylists = await playlistWrapper.getCategoryPlaylists('toplists');
		expect(categoryPlaylists).toBeDefined();
		expect(categoryPlaylists.playlists.items.length).toBeGreaterThan(0);
	});

	it('should get playlist cover image', async () => {
		const playlistCoverImage = await playlistWrapper.getPlaylistCoverImage('37i9dQZF1DXcBWIGoYBM5M');
		expect(playlistCoverImage).toBeDefined();
		expect(playlistCoverImage.length).toBeGreaterThan(0);
	});
});
