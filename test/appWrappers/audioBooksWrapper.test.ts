import {SpotifyClient} from "../../src";
import AudiobookWrapper from "../../src/SpotifyClient/Audiobooks/AudiobookWrapper";
import HttpClient from "../../src/http/HttpClient";
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('AudioBookWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let audioBooksWrapper: AudiobookWrapper;

	beforeAll(async () => {
		await httpClient.authorizeApp();
		spotifyClient = new SpotifyClient(httpClient);
		audioBooksWrapper = spotifyClient.getAudioBookWrapper();
	});

	it('Should get audio book', async () => {
		const result = await audioBooksWrapper.getAudiobook('7iHfbu1YPACw6oZPAFJtqe', 'US');

		expect(result.name).toBeDefined();
	});

	it('Should get audio books', async () => {
		const result = await audioBooksWrapper.getAudiobooks(['7iHfbu1YPACw6oZPAFJtqe'], 'US');

		expect(result.audiobooks.length).toBeGreaterThan(0);
	});

	it('should get audioBook chapters', async () => {
		const result = await audioBooksWrapper.getAudioBookChapters('7iHfbu1YPACw6oZPAFJtqe', 'US');

		expect(result.items.length).toBeGreaterThan(0);
	});

	// For some reason, spotify just doesn't give results for this chapter, even though they exist on their website.
	// FIXME: mock? idk im tired at this point.
	// it('Should get chapter', async () => {
	// 	const result = await audioBooksWrapper.getChapter('0xbAAsgjaQeA0lmxSNDS6C', 'US');
	//
	// 	expect(result.name).toBeDefined();
	// });
	//
	// it('Should get chapters', async () => {
	// 	const result = await audioBooksWrapper.getChapters(['0xbAAsgjaQeA0lmxSNDS6C'], 'US');
	//
	// 	expect(result.chapters.length).toBeGreaterThan(0);
	// });
});
