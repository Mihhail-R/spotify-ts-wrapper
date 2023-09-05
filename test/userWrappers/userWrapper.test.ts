import {Axios} from "axios";
import {getFollowedArtistsMock, meMock, userTopItemsMock} from "../mocks/userMocks";
import UserWrapper from "../../src/SpotifyClient/Users/UserWrapper";

jest.mock("axios");

describe('UserWrapper', () => {
	const axiosMock = new Axios() as jest.Mocked<Axios>;

	const spotifyClient = new UserWrapper(axiosMock);

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('Should get me', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve(meMock));

		const result = await spotifyClient.me();

		expect(result.id).toStrictEqual("1");
	});

	it('Should get top artists', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve(userTopItemsMock));

		const result = await spotifyClient.getTopItems("artists");

		expect(result.items[0].id).toStrictEqual("1");
	});

	it('Should get followed artists', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve(getFollowedArtistsMock));

		const result = await spotifyClient.followedArtists();

		expect(result.artists.items[0].id).toStrictEqual("1");
	});

	it('Should check if user follows artists', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve([true]));

		const result = await spotifyClient.isFollowing("artist", ["1"]);

		expect(result[0]).toStrictEqual(true);
	});

	it('Should check if user follows user', async () => {
		axiosMock.get.mockImplementationOnce(() => Promise.resolve([true]));

		const result = await spotifyClient.isFollowing("user", ["1"]);

		expect(result[0]).toStrictEqual(true);
	});

	it('Should follow artists', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.followArtist("1")).resolves.not.toThrow();
	});

	it('Should follow playlist', async () => {
		axiosMock.put.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.followPlaylist("1")).resolves.not.toThrow();
	});

	it('Should unfollow artists', async () => {
		axiosMock.delete.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.unfollowArtist("1")).resolves.not.toThrow();
	});

	it('Should unfollow playlist', async () => {
		axiosMock.delete.mockImplementationOnce(() => Promise.resolve());

		await expect(spotifyClient.unfollowPlaylist("1")).resolves.not.toThrow();
	});
});
