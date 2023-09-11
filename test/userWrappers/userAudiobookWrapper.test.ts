import UserAudiobookWrapper from "../../src/SpotifyClient/Audiobooks/UserAudiobookWrapper";
import {Axios} from "axios";

jest.mock("axios");

describe('userAudiobookWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new UserAudiobookWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get users saved audiobooks', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			items: [
				{
					id: "1",
				}
			],
		}));

		const result = await spotifyClient.getMyAudiobooks();

		expect(result.items[0].id).toStrictEqual("1");
	});

	it('Should check if user follows audiobooks', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve([true]));

		const result = await spotifyClient.savedAudiobooks(["1"]);

		expect(result[0]).toStrictEqual(true);
	});

	it('Should save audiobooks', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.saveAudiobook(["1"])).resolves.not.toThrow();
	});

	it('Should remove audiobooks', async () => {
		axiosMock.delete.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.removeAudiobook(["1"])).resolves.not.toThrow();
	});
});
