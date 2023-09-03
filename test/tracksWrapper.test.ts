import {SpotifyClient} from "../src";
import BaseClient from "./BaseClient";
import TracksWrapper from "../src/SpotifyClient/Tracks/TracksWrapper";

describe('TracksWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let tracksWrapper: TracksWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		tracksWrapper = spotifyClient.getTracksWrapper();
	});

	it('Should get tracks', async () => {
		const result = await tracksWrapper.getTracks(
			['48bdKlibB8uVoJ4WtqVsO6'],
			'EE',
		);

		expect(result.tracks.length).toStrictEqual(1);
	});

	it('Should get a single track', async () => {
		const result = await tracksWrapper.getTrack('48bdKlibB8uVoJ4WtqVsO6', 'EE');

		expect(result.name).toStrictEqual('A New Era');
	});

	it('Should get audio features', async () => {
		const result = await tracksWrapper.getAudioFeatures('48bdKlibB8uVoJ4WtqVsO6');

		expect(result.tempo.toFixed(0)).toStrictEqual("186");
	});

	it('Should get audio analysis', async () => {
		const result = await tracksWrapper.getAudioAnalysis('48bdKlibB8uVoJ4WtqVsO6');

		expect(result.sections.length).toBeGreaterThan(10);
	});

	it('Should get audio features for tracks', async () => {
		const result = await tracksWrapper.getAudioFeaturesForTracks(
			['48bdKlibB8uVoJ4WtqVsO6'],
		);

		expect(result.audio_features.length).toStrictEqual(1);
	});
})
