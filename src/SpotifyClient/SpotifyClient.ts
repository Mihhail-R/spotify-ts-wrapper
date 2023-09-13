import AlbumsWrapper from "./Albums/AlbumsWrapper";
import UserAlbumsWrapper from "./Albums/UserAlbumsWrapper";
import ArtistsWrapper from "./Artists/ArtistsWrapper";
import AudiobookWrapper from "./Audiobooks/AudiobookWrapper";
import UserAudiobookWrapper from "./Audiobooks/UserAudiobookWrapper";
import EpisodesWrapper from "./Episodes/EpisodesWrapper";
import UserEpisodesWrapper from "./Episodes/UserEpisodesWrapper";
import IHttpClient from "./IHttpClient";
import MiscWrapper from "./Misc/MiscWrapper";
import PlayerWrapper from "./Player/PlayerWrapper";
import PlaylistWrapper from "./Playlist/PlaylistWrapper";
import UserPlaylistWrapper from "./Playlist/UserPlaylistWrapper";
import SearchWrapper from "./Search/SearchWrapper";
import ShowsWrapper from "./Shows/ShowsWrapper";
import UserShowsWrapper from "./Shows/UserShowsWrapper";
import TracksWrapper from "./Tracks/TracksWrapper";
import UserTracksWrapper from "./Tracks/UserTracksWrapper";
import UsersWrapper from "./Users/UsersWrapper";
import UserWrapper from "./Users/UserWrapper";

export default class SpotifyClient {
  private readonly httpClient: IHttpClient;
  /**
   * General wrappers that can be accessed without user authentication but with app authentication
   */
  public artistWrapper: ArtistsWrapper;
  public albumsWrapper: AlbumsWrapper;
  public audiobookWrapper: AudiobookWrapper;
  public episodesWrapper: EpisodesWrapper;
  public searchWrapper: SearchWrapper;
  public miscWrapper: MiscWrapper;
  public showsWrapper: ShowsWrapper;
  public usersWrapper: UsersWrapper;
  public tracksWrapper: TracksWrapper;
  public playlistWrapper: PlaylistWrapper;

  /**
   * User specific wrappers, these cannot be accessed without user authentication and proper scopes
   */
  public userAlbumsWrapper: UserAlbumsWrapper;
  public userAudiobookWrapper: UserAudiobookWrapper;
  public userEpisodesWrapper: UserEpisodesWrapper;
  public userWrapper: UserWrapper;
  public playerWrapper: PlayerWrapper;
  public userShowsWrapper: UserShowsWrapper;
  public userTracksWrapper: UserTracksWrapper;
  public userPlaylistWrapper: UserPlaylistWrapper;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;

    this.artistWrapper = new ArtistsWrapper(this.httpClient);
    this.albumsWrapper = new AlbumsWrapper(this.httpClient);
    this.audiobookWrapper = new AudiobookWrapper(this.httpClient);
    this.episodesWrapper = new EpisodesWrapper(this.httpClient);
    this.searchWrapper = new SearchWrapper(this.httpClient);
    this.miscWrapper = new MiscWrapper(this.httpClient);
    this.showsWrapper = new ShowsWrapper(this.httpClient);
    this.usersWrapper = new UsersWrapper(this.httpClient);
    this.tracksWrapper = new TracksWrapper(this.httpClient);
    this.playlistWrapper = new PlaylistWrapper(this.httpClient);
    this.userAlbumsWrapper = new UserAlbumsWrapper(this.httpClient);
    this.userAudiobookWrapper = new UserAudiobookWrapper(this.httpClient);
    this.userEpisodesWrapper = new UserEpisodesWrapper(this.httpClient);
    this.userWrapper = new UserWrapper(this.httpClient);
    this.playerWrapper = new PlayerWrapper(this.httpClient);
    this.userShowsWrapper = new UserShowsWrapper(this.httpClient);
    this.userTracksWrapper = new UserTracksWrapper(this.httpClient);
    this.userPlaylistWrapper = new UserPlaylistWrapper(this.httpClient);
  }
}
