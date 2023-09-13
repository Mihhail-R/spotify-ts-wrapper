import {SpotifyClient} from "../src";
import AlbumsWrapper from "../src/SpotifyClient/Albums/AlbumsWrapper";
import PlayerWrapper from "../src/SpotifyClient/Player/PlayerWrapper";
import ShowsWrapper from "../src/SpotifyClient/Shows/ShowsWrapper";
import EpisodesWrapper from "../src/SpotifyClient/Episodes/EpisodesWrapper";
import UserWrapper from "../src/SpotifyClient/Users/UserWrapper";
import SearchWrapper from "../src/SpotifyClient/Search/SearchWrapper";
import MiscWrapper from "../src/SpotifyClient/Misc/MiscWrapper";
import AudiobookWrapper from "../src/SpotifyClient/Audiobooks/AudiobookWrapper";
import TracksWrapper from "../src/SpotifyClient/Tracks/TracksWrapper";
import ArtistsWrapper from "../src/SpotifyClient/Artists/ArtistsWrapper";
import UserAlbumsWrapper from "../src/SpotifyClient/Albums/UserAlbumsWrapper";
import UserTracksWrapper from "../src/SpotifyClient/Tracks/UserTracksWrapper";
import UsersWrapper from "../src/SpotifyClient/Users/UsersWrapper";
import UserShowsWrapper from "../src/SpotifyClient/Shows/UserShowsWrapper";
import UserEpisodesWrapper from "../src/SpotifyClient/Episodes/UserEpisodesWrapper";
import UserAudiobookWrapper from "../src/SpotifyClient/Audiobooks/UserAudiobookWrapper";
import HttpClient from "../src/http/HttpClient";
import {SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} from "./util/config";
import UserPlaylistWrapper from "../src/SpotifyClient/Playlist/UserPlaylistWrapper";
import PlaylistWrapper from "../src/SpotifyClient/Playlist/PlaylistWrapper";

describe('SpotifyClient', () => {
	const httpClient = new HttpClient({
		baseUrl: 'https://api.spotify.com/v1/',
		authenticationUrl: 'https://accounts.spotify.com/api/token',
		clientId: SPOTIFY_CLIENT_ID,
		clientSecret: SPOTIFY_SECRET,
	});
	let spotifyClient: SpotifyClient;
	beforeAll(async () => {
		spotifyClient = new SpotifyClient(httpClient);
	});

	it('should be defined', () => {
		expect(spotifyClient).toBeDefined();
		expect(spotifyClient).toBeInstanceOf(SpotifyClient);
	});

	it('should get albums wrapper', () => {
		expect(spotifyClient.albumsWrapper).toBeInstanceOf(AlbumsWrapper);
	});

	it('should get artists wrapper', () => {
		expect(spotifyClient.artistWrapper).toBeInstanceOf(ArtistsWrapper);
	});

	it('should get tracks wrapper', () => {
		expect(spotifyClient.tracksWrapper).toBeInstanceOf(TracksWrapper);
	});

	it('should get AudioBook wrapper', () => {
		expect(spotifyClient.audiobookWrapper).toBeInstanceOf(AudiobookWrapper);
	});

	it('should get Misc wrapper', () => {
		expect(spotifyClient.miscWrapper).toBeInstanceOf(MiscWrapper);
	});

	it('should get Search wrapper', () => {
		expect(spotifyClient.searchWrapper).toBeInstanceOf(SearchWrapper);
	});

	it('should get User wrapper', () => {
		expect(spotifyClient.userWrapper).toBeInstanceOf(UserWrapper);
	});

	it('should get Episodes wrapper', () => {
		expect(spotifyClient.episodesWrapper).toBeInstanceOf(EpisodesWrapper);
	});

	it('should get Shows wrapper', () => {
		expect(spotifyClient.showsWrapper).toBeInstanceOf(ShowsWrapper);
	});

	it('should get Player wrapper', () => {
		expect(spotifyClient.playerWrapper).toBeInstanceOf(PlayerWrapper);
	});

	it('should get UserAlbums wrapper', () => {
		expect(spotifyClient.userAlbumsWrapper).toBeInstanceOf(UserAlbumsWrapper);
	});

	it('should get UserTracks wrapper', () => {
		expect(spotifyClient.userTracksWrapper).toBeInstanceOf(UserTracksWrapper);
	});

	it('should get Users wrapper', () => {
		expect(spotifyClient.usersWrapper).toBeInstanceOf(UsersWrapper);
	});

	it('should get User Shows wrapper', () => {
		expect(spotifyClient.userShowsWrapper).toBeInstanceOf(UserShowsWrapper);
	});

	it('should get User episodes wrapper', () => {
		expect(spotifyClient.userEpisodesWrapper).toBeInstanceOf(UserEpisodesWrapper);
	});

	it('should get User audiobook wrapper', () => {
		expect(spotifyClient.userAudiobookWrapper).toBeInstanceOf(UserAudiobookWrapper);
	});

	it('should get Playlist wrapper', () => {
		expect(spotifyClient.playlistWrapper).toBeInstanceOf(PlaylistWrapper);
	});

	it('should get User Playlist wrapper', () => {
		expect(spotifyClient.userPlaylistWrapper).toBeInstanceOf(UserPlaylistWrapper);
	});
});
