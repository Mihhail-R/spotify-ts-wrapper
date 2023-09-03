import {SpotifyClient} from "../src";
import BaseClient from "./BaseClient";
import UsersWrapper from "../src/SpotifyClient/Users/UsersWrapper";

describe('UsersWrapper', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	let usersWrapper: UsersWrapper;

	beforeAll(async () => {
		await httpClient.setAccessToken();
		spotifyClient = new SpotifyClient(httpClient);
		usersWrapper = spotifyClient.getUsersWrapper();
	});

	it('Should get user', async () => {
		const result = await usersWrapper.getUsersProfile('0j5d51fqtl2pj8gkxwjh5o70z');

		expect(result.display_name).toStrictEqual('Misha');
	});

	it('Should', async () => {
		const result = await usersWrapper.checkIfUsersFollowPlaylist(
			'5C8BLxOTRF4JVX83W2TMXA',
			['0j5d51fqtl2pj8gkxwjh5o70z']
		);

		expect(result[0]).toStrictEqual(true);
	});
});
