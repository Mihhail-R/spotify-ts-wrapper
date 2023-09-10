import {
  ChangePlaylistDetails,
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
}
