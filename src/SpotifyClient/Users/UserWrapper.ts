import { PaginatedArtists } from "../../Types/Artist";
import { Me, UserTopItems, UserTopItemsTypes } from "../../Types/User";
import IHttpClient from "../IHttpClient";

export default class UserWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }
  public async me(): Promise<Me> {
    return await this.client.get<Me>("me");
  }

  public async getTopItems<T extends UserTopItemsTypes>(
    type: UserTopItemsTypes = "artists",
    limit: number = 20,
    offset: number = 0,
    timeRange: "long_term" | "medium_term" | "short_term" = "medium_term",
  ): Promise<UserTopItems<T>> {
    if (type === "artists") {
      return await this.client.get<UserTopItems<T>>(
        `me/top/${type}?limit=${limit}&offset=${offset}&time_range=${timeRange}`,
      );
    }

    return await this.client.get<UserTopItems<T>>(
      `me/top/${type}?limit=${limit}&offset=${offset}&time_range=${timeRange}`,
    );
  }

  public async followPlaylist(
    playlistId: string,
    publicPlaylist: boolean = true,
  ): Promise<void> {
    return await this.client.put(`playlists/${playlistId}/followers`, {
      public: publicPlaylist,
    });
  }

  public async unfollowPlaylist(playlistId: string): Promise<void> {
    return await this.client.delete(`playlists/${playlistId}/followers`);
  }

  public async followArtist(artistId: string): Promise<void> {
    return await this.client.put(`me/following?type=artist&ids=${artistId}`);
  }

  public async unfollowArtist(artistId: string): Promise<void> {
    return await this.client.delete(`me/following?type=artist&ids=${artistId}`);
  }

  public async followedArtists(
    limit: number = 20,
    after?: string,
  ): Promise<{ artists: PaginatedArtists }> {
    return await this.client.get<{ artists: PaginatedArtists }>(
      `me/following?type=artist&limit=${limit}&after=${after}`,
    );
  }

  public async isFollowing(
    type: "artist" | "user",
    ids: string[],
  ): Promise<boolean[]> {
    return await this.client.get<boolean[]>(
      `me/following/contains?type=${type}&ids=${ids.join(",")}`,
    );
  }
}
