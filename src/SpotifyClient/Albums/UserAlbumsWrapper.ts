import { PaginatedAlbums } from "../../Types/Album";
import IHttpClient from "../IHttpClient";

export default class UserAlbumsWrapper {
  private readonly path: string = "me/albums";
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  /**
   * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
   * Required authorization scope: user-library-read
   */
  public async getAlbums(
    limit: number = 20,
    offset: number = 0,
    market?: string,
  ): Promise<PaginatedAlbums> {
    return this.client.get<PaginatedAlbums>(this.path, {
      limit,
      offset,
      market,
    });
  }

  /**
   * Save one or more albums to the current user’s “Your Music” library.
   * Required authorization scope: user-library-modify
   */
  public async saveAlbums(ids: string[]): Promise<void> {
    await this.client.put(this.path, { ids });
  }

  /**
   * Remove one or more albums from the current user’s “Your Music” library.
   * Required authorization scope: user-library-modify
   */
  public async removeAlbums(ids: string[]): Promise<void> {
    await this.client.delete(this.path, { ids });
  }

  /**
   * Check if one or more albums is already saved in the current Spotify user’s “Your Music” library.
   * Required authorization scope: user-library-read
   */
  public async checkSavedAlbums(ids: string[]): Promise<boolean[]> {
    return this.client.get<boolean[]>(`${this.path}/contains`, {
      ids,
    });
  }
}
