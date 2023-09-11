import {SpotifyClient} from "../../src";
import TracksWrapper from "../../src/SpotifyClient/Tracks/TracksWrapper";
import { HttpClient } from '../../src';
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('TracksWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let tracksWrapper: TracksWrapper;

	beforeAll(async () => {
		await httpClient.authorizeApp();
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

	it('Should get recommendations', async () => {
		const result = await tracksWrapper.getRecommendations({
			seed_artists: ['69lt02nubfNbPdrvH4tJxx', '7F9ZL4TJNr8AoU0UUQX8ih'],
			seed_genres: ['heavy-metal', 'death-metal'],
			seed_tracks: ['74p4l00JKebWPlAfpqi9Xq'],
			min_tempo: 180,
			max_popularity: 10,
		});

		expect(result.tracks.length).toBeGreaterThan(0);
	});

	it('Should throw error if more than 5 seeds are provided', async () => {
		const result = tracksWrapper.getRecommendations({
			seed_artists: ['69lt02nubfNbPdrvH4tJxx', '7F9ZL4TJNr8AoU0UUQX8ih'],
			seed_genres: ['heavy-metal', 'death-metal', 'metal', 'rock', 'pop'],
			seed_tracks: ['74p4l00JKebWPlAfpqi9Xq'],
		});

		await expect(result).rejects.toThrowError("The total number of seed tracks, artists and genres cannot be greater than 5");
	});
})
