import UserAlbumsWrapper from "../../src/SpotifyClient/Albums/UserAlbumsWrapper";
import {Axios} from "axios";

jest.mock("axios");

describe('userAlbumWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new UserAlbumsWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get users saved albums', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			items: [
				{
					id: "1"
				}
			]
		}));

		const result = await spotifyClient.getAlbums();

		expect(result.items[0].id).toStrictEqual("1");
	});

	it('Should save albums for user', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		const result = await spotifyClient.saveAlbums(['1']);

		expect(result).toBeUndefined();
	});

	it('Should remove albums for user', async () => {
		axiosMock.delete.mockImplementationOnce(() => Promise.resolve());

		const result = await spotifyClient.removeAlbums(['1']);

		expect(result).toBeUndefined();
	});

	it('Should check if albums are saved for user', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve([true]));

		const result = await spotifyClient.checkSavedAlbums(['1']);

		expect(result[0]).toStrictEqual(true);
	});
});
