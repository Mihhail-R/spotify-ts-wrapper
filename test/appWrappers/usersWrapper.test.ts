import {SpotifyClient} from "../../src";
import UsersWrapper from "../../src/SpotifyClient/Users/UsersWrapper";
import { HttpClient } from '../../src';
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "../util/config";

describe('UsersWrapper', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	let usersWrapper: UsersWrapper;

	beforeAll(async () => {
		await httpClient.authorizeApp();
		spotifyClient = new SpotifyClient(httpClient);
		usersWrapper = spotifyClient.usersWrapper;
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
