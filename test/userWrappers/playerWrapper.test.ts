import {Axios} from "axios";
import PlayerWrapper from "../../src/SpotifyClient/Player/PlayerWrapper";
import {Queue} from "../../src/Types/Player";

jest.mock("axios");

describe('playerWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new PlayerWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get users devices', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			devices: [
				{
					id: "1",
					is_active: true,
					is_private_session: false,
					is_restricted: false,
					name: "test",
					type: "Computer",
					volume_percent: 100
				}
			]
		}));

		const result = await spotifyClient.getAvailableDevices();

		expect(result.devices[0].id).toStrictEqual("1");
	});

	it('Should get users currently playing track', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			item: {
				id: "1"
			}
		}));

		const result = await spotifyClient.getCurrentlyPlaying();

		expect(result.item?.id).toStrictEqual("1");
	});

	it('Should get users recently played', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			items: [
				{
					track: {
						id: "1"
					}
				}
			]
		}));

		const result = await spotifyClient.getRecentlyPlayed();

		expect(result.items[0].track.id).toStrictEqual("1");
	});

	it('Should add to user\'s queue', async () => {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.addToQueue("1")).resolves.not.toThrow();
	});

	it('Should add to user\'s queue with device id', async () => {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.addToQueue("1", "1")).resolves.not.toThrow();
	});

	it('Should transfer playback to another device', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.transferPlayback(['1'], true)).resolves.not.toThrow();
	});

	it('Should start playback', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.startResumePlayback()).resolves.not.toThrow();
	});

	it('Should pause playback', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.pausePlayback()).resolves.not.toThrow();
	});

	it('Should skip to next track', async () => {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.skipToNext()).resolves.not.toThrow();
	});

	it('Should skip to previous track', async () => {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.skipToPrevious()).resolves.not.toThrow();
	});

	it('Should seek to position', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.seek(100)).resolves.not.toThrow();
	});

	it('Should set repeat state', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.setRepeatState("track")).resolves.not.toThrow();
	});

	it('Should set volume', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.setVolume(100)).resolves.not.toThrow();
	});

	it('Should toggle shuffle state', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.toggleShuffle(true)).resolves.not.toThrow();
	});

	it('Should start playback with deviceId', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.startResumePlayback({device_id: "1"})).resolves.not.toThrow();
	});

	it('Should pause playback with deviceId', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.pausePlayback("1")).resolves.not.toThrow();
	});

	it('Should skip to next track with deviceId', async () => {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.skipToNext("1")).resolves.not.toThrow();
	});

	it('Should skip to previous track with deviceId', async () => {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.skipToPrevious("1")).resolves.not.toThrow();
	});

	it('Should seek to position with deviceId', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.seek(100, "1")).resolves.not.toThrow();
	});

	it('Should set repeat state with deviceId', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.setRepeatState("track", "1")).resolves.not.toThrow();
	});

	it('Should set volume with deviceId', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.setVolume(100, "1")).resolves.not.toThrow();
	});

	it('Should toggle shuffle state with deviceId', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.toggleShuffle(true, "1")).resolves.not.toThrow();
	});

	it('Should get users queue', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			currently_playing: {
				type: "track",
				id: "1",
			},
			next: [
				{
					type: "track",
					id: "2",
				}
			],
		} as Partial<Queue>));

		const result = await spotifyClient.getUserQueue();

		expect(result.currently_playing?.type).toStrictEqual("track");
	});

	it('Should get users', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			devices: [
				{
					id: "1",
					is_active: true,
					is_private_session: false,
					is_restricted: false,
					name: "test",
					type: "Computer",
					volume_percent: 100
				}
			],
		}));

		const result = await spotifyClient.getPlaybackState();
	});
});
