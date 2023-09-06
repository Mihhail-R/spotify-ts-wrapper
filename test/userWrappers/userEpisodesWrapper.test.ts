import UserEpisodesWrapper from "../../src/SpotifyClient/Episodes/UserEpisodesWrapper";
import {Axios} from "axios";
import {SavedEpisode} from "../../src/Types/Episodes";

jest.mock("axios");

describe('userEpisodesWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new UserEpisodesWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get users saved episodes', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			items: [
				{
					added_at: "2021-08-06T12:00:00Z",
					episode: {
						id: "1"
					}
				}
			],
		} as Partial<SavedEpisode>));

		const result = await spotifyClient.getSavedEpisodes();

		expect(result.items[0].episode.id).toStrictEqual("1");
	});

	it('Should check if user follows episodes', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve([true]));

		const result = await spotifyClient.checkSavedEpisodes(["1"]);

		expect(result[0]).toStrictEqual(true);
	});

	it('Should save episodes', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.saveEpisodes(["1"])).resolves.not.toThrow();
	});

	it('Should remove episodes', async () => {
		axiosMock.delete.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.removeSavedEpisodes(["1"])).resolves.not.toThrow();
	});
});
