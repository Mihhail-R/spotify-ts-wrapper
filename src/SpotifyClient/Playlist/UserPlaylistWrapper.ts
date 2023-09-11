import {
  ChangePlaylistDetails,
  PaginatedSimplifiedPlaylist,
  Playlist,
  UpdatePlaylistItems,
} from "../../Types/Playlist";
import IHttpClient from "../IHttpClient";

import PlaylistWrapper from "./PlaylistWrapper";

export default class UserPlaylistWrapper extends PlaylistWrapper {
  constructor(protected readonly client: IHttpClient) {
    super(client);
  }

  public async changePlaylistDetails({
    playlistId,
    name,
    public_,
    collaborative,
    description,
  }: ChangePlaylistDetails): Promise<void> {
    return await this.client.put<void>(`playlists/${playlistId}`, {
      name,
      public: public_,
      collaborative,
      description,
    });
  }

  public async updatePlaylistItems({
    playlistId,
    rangeStart,
    rangeLength,
    insertBefore,
    snapshotId,
  }: UpdatePlaylistItems): Promise<{ snapshot_id: string }> {
    return await this.client.put<{ snapshot_id: string }>(
      `playlists/${playlistId}/tracks`,
      {
        rangeStart,
        rangeLength,
        insertBefore,
        snapshotId,
      },
    );
  }

  public async addItemsToPlaylist(
    playlistId: string,
    uris: string[],
    position?: number,
  ): Promise<{ snapshot_id: string }> {
    return await this.client.post<{ snapshot_id: string }>(
      `playlists/${playlistId}/tracks`,
      {
        uris,
        position,
      },
    );
  }

  public async removeItemsFromPlaylist(
    playlistId: string,
    uris: string[],
    snapshotId?: string,
  ): Promise<{ snapshot_id: string }> {
    return await this.client.delete<{ snapshot_id: string }>(
      `playlists/${playlistId}/tracks`,
      {
        uris,
        snapshotId,
      },
    );
  }

  public async getMyPlaylists(
    limit = 20,
    offset = 0,
  ): Promise<PaginatedSimplifiedPlaylist> {
    return await this.client.get<PaginatedSimplifiedPlaylist>("me/playlists", {
      limit,
      offset,
    });
  }

  public async getUserPlaylists(
    userId: string,
    limit = 20,
    offset = 0,
  ): Promise<PaginatedSimplifiedPlaylist> {
    return await this.client.get<PaginatedSimplifiedPlaylist>(
      `users/${userId}/playlists`,
      {
        limit,
        offset,
      },
    );
  }

  public async createPlaylist(
    userId: string,
    name: string,
    public_?: boolean,
    collaborative?: boolean,
    description?: string,
  ): Promise<Playlist> {
    return await this.client.post<Playlist>(`users/${userId}/playlists`, {
      name,
      public: public_,
      collaborative,
      description,
    });
  }

  public async addCoverImageToPlaylist(
    playlistId: string,
    base64JpegImage: string,
  ): Promise<void> {
    return await this.client.put<void>(`playlists/${playlistId}/images`, {
      base64JpegImage,
    });
  }
}
