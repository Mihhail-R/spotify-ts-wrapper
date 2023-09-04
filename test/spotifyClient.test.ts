import BaseClient from "./BaseClient";
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

describe('SpotifyClient', () => {
	const httpClient = new BaseClient();
	let spotifyClient: SpotifyClient;
	beforeAll(async () => {
		spotifyClient = new SpotifyClient(httpClient);
	});

	it('should be defined', () => {
		expect(spotifyClient).toBeDefined();
		expect(spotifyClient).toBeInstanceOf(SpotifyClient);
	});

	it('should get albums wrapper', () => {
		expect(spotifyClient.getAlbumsWrapper()).toBeInstanceOf(AlbumsWrapper);
	});

	it('should get artists wrapper', () => {
		expect(spotifyClient.getArtistWrapper()).toBeInstanceOf(ArtistsWrapper);
	});

	it('should get tracks wrapper', () => {
		expect(spotifyClient.getTracksWrapper()).toBeInstanceOf(TracksWrapper);
	});

	it('should get AudioBook wrapper', () => {
		expect(spotifyClient.getAudioBookWrapper()).toBeInstanceOf(AudiobookWrapper);
	});

	it('should get Misc wrapper', () => {
		expect(spotifyClient.getMiscWrapper()).toBeInstanceOf(MiscWrapper);
	});

	it('should get Search wrapper', () => {
		expect(spotifyClient.getSearchWrapper()).toBeInstanceOf(SearchWrapper);
	});

	it('should get User wrapper', () => {
		expect(spotifyClient.getUserWrapper()).toBeInstanceOf(UserWrapper);
	});

	it('should get Episodes wrapper', () => {
		expect(spotifyClient.getEpisodesWrapper()).toBeInstanceOf(EpisodesWrapper);
	});

	it('should get Shows wrapper', () => {
		expect(spotifyClient.getShowsWrapper()).toBeInstanceOf(ShowsWrapper);
	});

	it('should get Player wrapper', () => {
		expect(spotifyClient.getPlayerWrapper()).toBeInstanceOf(PlayerWrapper);
	});

	it('should get UserAlbums wrapper', () => {
		expect(spotifyClient.getUserAlbumsWrapper()).toBeInstanceOf(UserAlbumsWrapper);
	});

	it('should get UserTracks wrapper', () => {
		expect(spotifyClient.getUserTracksWrapper()).toBeInstanceOf(UserTracksWrapper);
	});

	it('should get Users wrapper', () => {
		expect(spotifyClient.getUsersWrapper()).toBeInstanceOf(UsersWrapper);
	});

	it('should get User Shows wrapper', () => {
		expect(spotifyClient.getUserShowsWrapper()).toBeInstanceOf(UserShowsWrapper);
	});

	it('should get User episodes wrapper', () => {
		expect(spotifyClient.getUserEpisodesWrapper()).toBeInstanceOf(UserEpisodesWrapper);
	});

	it('should get User audiobook wrapper', () => {
		expect(spotifyClient.getUserAudioBookWrapper()).toBeInstanceOf(UserAudiobookWrapper);
	});
});
