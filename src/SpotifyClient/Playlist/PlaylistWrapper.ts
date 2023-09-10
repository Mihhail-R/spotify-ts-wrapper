import { Image } from "../../Types/GeneralTypes";
import {
  PaginatedPlaylistTrack,
  PaginatedSimplifiedPlaylist,
  Playlist,
} from "../../Types/Playlist";
import IHttpClient from "../IHttpClient";

export default class PlaylistWrapper {
  constructor(protected readonly client: IHttpClient) {
    this.client = client;
  }

  public async getPlaylist(
    playlistId: string,
    market?: string,
    additional_types?: string,
  ): Promise<Playlist> {
    return await this.client.get<Playlist>(`playlists/${playlistId}`, {
      market,
      additional_types,
    });
  }

  public async getPlaylistItems(
    playlistId: string,
    limit = 20,
    offset = 0,
    market?: string,
  ): Promise<PaginatedPlaylistTrack> {
    return await this.client.get<PaginatedPlaylistTrack>(
      `playlists/${playlistId}/tracks`,
      {
        market,
        limit,
        offset,
      },
    );
  }

  public async getFeaturedPlaylist(
    limit = 20,
    offset = 0,
    country?: string,
    locale?: string,
    timestamp?: string,
  ): Promise<{ message?: string; playlists: PaginatedSimplifiedPlaylist }> {
    return await this.client.get<{
      message?: string;
      playlists: PaginatedSimplifiedPlaylist;
    }>("browse/featured-playlists", {
      country,
      locale,
      timestamp,
      limit,
      offset,
    });
  }

  public async getCategoryPlaylists(
    categoryId: string,
    limit = 20,
    offset = 0,
    country?: string,
    locale?: string,
  ): Promise<{ message?: string; playlists: PaginatedSimplifiedPlaylist }> {
    return await this.client.get<{
      message?: string;
      playlists: PaginatedSimplifiedPlaylist;
    }>(`browse/categories/${categoryId}/playlists`, {
      country,
      locale,
      limit,
      offset,
    });
  }

  public async getPlaylistCoverImage(playlistId: string): Promise<Image[]> {
    return await this.client.get<Image[]>(`playlists/${playlistId}/images`);
  }
}
