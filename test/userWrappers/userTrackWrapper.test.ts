import Axios from 'axios';
import UserTracksWrapper from "../../src/SpotifyClient/Tracks/UserTracksWrapper";
import userTrackMocks from "../mocks/userTrackMocks";

jest.mock('axios');

describe('userTrackWrapper', () => {
	const httpClient = Axios as jest.Mocked<typeof Axios>;

	const userTrackWrapper = new UserTracksWrapper(httpClient);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get user tracks', async () => {
		httpClient.get.mockImplementationOnce(() => Promise.resolve(userTrackMocks));

		const result = await userTrackWrapper.getTracks();

		expect(result.items.length).toBeGreaterThan(0);
	});

	it('Should save tracks', async () => {
		httpClient.put.mockImplementationOnce(() => Promise.resolve());

		const result = await userTrackWrapper.saveTracks(['1', '2']);

		expect(result).toBeUndefined();
	});

	it('Should remove tracks', async () => {
		httpClient.delete.mockImplementationOnce(() => Promise.resolve());

		const result = await userTrackWrapper.removeSavedTracks(['1', '2']);

		expect(result).toBeUndefined();
	});

	it('Should check tracks', async () => {
		httpClient.get.mockImplementationOnce(() => Promise.resolve([true, false]));

		const result = await userTrackWrapper.checkSavedTracks(['1', '2']);

		expect(result).toStrictEqual([true, false]);
	});
});
