import {SpotifyClient} from "../../src";
import BaseClient from "../util/BaseClient";
import AudiobookWrapper from "../../src/SpotifyClient/Audiobooks/AudiobookWrapper";

describe('AudioBookWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let audioBooksWrapper: AudiobookWrapper;
	let chapterId: string;

	beforeAll(async () => {
		await httpClient.setAccessToken();
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

		chapterId = result.items[0].id;

		expect(result.items.length).toBeGreaterThan(0);
	});

	it('Should get chapter', async () => {
		const result = await audioBooksWrapper.getChapter(chapterId, 'US');

		expect(result.name).toBeDefined();
	});

	it('Should get chapters', async () => {
		const result = await audioBooksWrapper.getChapters([chapterId], 'US');

		expect(result.chapters.length).toBeGreaterThan(0);
	});
});
