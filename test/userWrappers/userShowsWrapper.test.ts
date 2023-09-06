import {Axios} from "axios";
import UserShowsWrapper from "../../src/SpotifyClient/Shows/UserShowsWrapper";
import {ShowItems} from "../../src/Types/Episodes";

jest.mock("axios");

describe('userShowsWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new UserShowsWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get users saved shows', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve({
			items: [
				{
					added_at: "2021-08-06T12:00:00Z",
					show: {
						id: "1"
					}
				},
			],
			next: null,
			total: 1,
			limit: 20,
			offset: 0,
			href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
			previous: null
		} as Partial<ShowItems>));

		const result = await spotifyClient.getShows();

		expect(result.items[0].show.id).toStrictEqual("1");
	});

	it('Should check if user follows shows', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve([true]));

		const result = await spotifyClient.checkShows(["1"]);

		expect(result[0]).toStrictEqual(true);
	});

	it('Should save shows', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.saveShows(["1"])).resolves.not.toThrow();
	});

	it('Should remove shows', async () => {
		axiosMock.delete.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.removeShows(["1"])).resolves.not.toThrow();
	});
});
