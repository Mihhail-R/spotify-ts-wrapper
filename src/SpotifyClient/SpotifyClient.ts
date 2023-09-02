import AlbumsWrapper from './Albums/AlbumsWrapper';
import UserAlbumsWrapper from './Albums/UserAlbumsWrapper';
import ArtistsWrapper from './Artists/ArtistsWrapper';
import AudiobookWrapper from './Audiobooks/AudiobookWrapper';
import UserAudiobookWrapper from './Audiobooks/UserAudiobookWrapper';
import EpisodesWrapper from './Episodes/EpisodesWrapper';
import UserEpisodesWrapper from './Episodes/UserEpisodesWrapper';
import IHttpClient from './IHttpClient';
import MiscWrapper from './Misc/MiscWrapper';
import PlayerWrapper from './Player/PlayerWrapper';
import SearchWrapper from './Search/SearchWrapper';
import ShowsWrapper from './Shows/ShowsWrapper';
import UserShowsWrapper from './Shows/UserShowsWrapper';
import TracksWrapper from './Tracks/TracksWrapper';
import UserTracksWrapper from './Tracks/UserTracksWrapper';
import UsersWrapper from './Users/UsersWrapper';
import UserWrapper from './Users/UserWrapper';

export default class SpotifyClient {
	/**
	 * General wrappers that can be accessed without user authentication but with app authentication
	 */
	private artistWrapper: ArtistsWrapper;
	private albumsWrapper: AlbumsWrapper;
	private audiobookWrapper: AudiobookWrapper;
	private episodesWrapper: EpisodesWrapper;
	private searchWrapper: SearchWrapper;
	private miscWrapper: MiscWrapper;
	private showsWrapper: ShowsWrapper;
	private usersWrapper: UsersWrapper;
	private tracksWrapper: TracksWrapper;

	/**
	 * User specific wrappers, these cannot be accessed without user authentication and proper scopes
	 */
	private userAlbumsWrapper: UserAlbumsWrapper;
	private userAudiobookWrapper: UserAudiobookWrapper;
	private userEpisodesWrapper: UserEpisodesWrapper;
	private userWrapper: UserWrapper;
	private playerWrapper: PlayerWrapper;
	private userShowsWrapper: UserShowsWrapper;
	private userTracksWrapper: UserTracksWrapper;

	constructor(private readonly httpClient: IHttpClient) {
		this.httpClient = httpClient;
	}

	/**
	 * Get artist wrapper
	 * @returns ArtistsWrapper
	 */
	public getArtistWrapper(): ArtistsWrapper {
		if (!this.artistWrapper) {
			this.artistWrapper = new ArtistsWrapper(this.httpClient);
		}

		return this.artistWrapper;
	}

	/**
	 * Get albums wrapper
	 * @returns AlbumsWrapper
	 */
	public getAlbumsWrapper(): AlbumsWrapper {
		if (!this.albumsWrapper) {
			this.albumsWrapper = new AlbumsWrapper(this.httpClient);
		}

		return this.albumsWrapper;
	}

	/**
	 * Get user albums wrapper
	 * @returns UserAlbumsWrapper
	 */
	public getUserAlbumsWrapper(): UserAlbumsWrapper {
		if (!this.userAlbumsWrapper) {
			this.userAlbumsWrapper = new UserAlbumsWrapper(this.httpClient);
		}

		return this.userAlbumsWrapper;
	}

	/**
	 * Get audiobook wrapper
	 * @returns AudiobookWrapper
	 */
	public getAudioBookWrapper(): AudiobookWrapper {
		if (!this.audiobookWrapper) {
			this.audiobookWrapper = new AudiobookWrapper(this.httpClient);
		}

		return this.audiobookWrapper;
	}

	/**
	 * Get user audiobook wrapper
	 * @returns UserAudiobookWrapper
	 */
	public getUserAudioBookWrapper(): UserAudiobookWrapper {
		if (!this.userAudiobookWrapper) {
			this.userAudiobookWrapper = new UserAudiobookWrapper(
				this.httpClient
			);
		}

		return this.userAudiobookWrapper;
	}

	/**
	 * Get episodes wrapper
	 * @returns EpisodesWrapper
	 */
	public getEpisodesWrapper(): EpisodesWrapper {
		if (!this.episodesWrapper) {
			this.episodesWrapper = new EpisodesWrapper(this.httpClient);
		}

		return this.episodesWrapper;
	}

	/**
	 * Get search wrapper
	 * @returns SearchWrapper
	 */
	public getSearchWrapper(): SearchWrapper {
		if (!this.searchWrapper) {
			this.searchWrapper = new SearchWrapper(this.httpClient);
		}

		return this.searchWrapper;
	}

	/**
	 * Get misc wrapper
	 * @returns MiscWrapper
	 */
	public getMiscWrapper(): MiscWrapper {
		if (!this.miscWrapper) {
			this.miscWrapper = new MiscWrapper(this.httpClient);
		}

		return this.miscWrapper;
	}

	/**
	 * Get shows wrapper
	 * @returns ShowsWrapper
	 */
	public getShowsWrapper(): ShowsWrapper {
		if (!this.showsWrapper) {
			this.showsWrapper = new ShowsWrapper(this.httpClient);
		}

		return this.showsWrapper;
	}

	/**
	 * Get user audiobook wrapper
	 * @returns UserEpisodesWrapper
	 */
	public getUserEpisodesWrapper(): UserEpisodesWrapper {
		if (!this.userEpisodesWrapper) {
			this.userEpisodesWrapper = new UserEpisodesWrapper(this.httpClient);
		}

		return this.userEpisodesWrapper;
	}

	/**
	 * Get user wrapper
	 * @returns UserWrapper
	 */
	public getUserWrapper(): UserWrapper {
		if (!this.userWrapper) {
			this.userWrapper = new UserWrapper(this.httpClient);
		}

		return this.userWrapper;
	}

	/**
	 * Get player wrapper
	 * @returns PlayerWrapper
	 */
	public getPlayerWrapper(): PlayerWrapper {
		if (!this.playerWrapper) {
			this.playerWrapper = new PlayerWrapper(this.httpClient);
		}

		return this.playerWrapper;
	}

	/**
	 * Get user shows wrapper
	 * @returns ShowsWrapper
	 */
	public getUserShowsWrapper(): UserShowsWrapper {
		if (!this.userShowsWrapper) {
			this.userShowsWrapper = new UserShowsWrapper(this.httpClient);
		}

		return this.userShowsWrapper;
	}

	/**
	 * Get user tracks wrapper
	 * @returns UserTracksWrapper
	 */
	public getUserTracksWrapper(): UserTracksWrapper {
		if (!this.userTracksWrapper) {
			this.userTracksWrapper = new UserTracksWrapper(this.httpClient);
		}

		return this.userTracksWrapper;
	}

	/**
	 * Get users wrapper
	 * @returns UsersWrapper
	 */
	public getUsersWrapper(): UsersWrapper {
		if (!this.usersWrapper) {
			this.usersWrapper = new UsersWrapper(this.httpClient);
		}

		return this.usersWrapper;
	}

	/**
	 * Get tracks wrapper
	 * @returns TracksWrapper
	 */
	public getTracksWrapper(): TracksWrapper {
		if (!this.tracksWrapper) {
			this.tracksWrapper = new TracksWrapper(this.httpClient);
		}

		return this.tracksWrapper;
	}
}
