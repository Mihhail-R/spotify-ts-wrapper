import { UserSavedTracks } from "../../Types/Track";
import IHttpClient from "../IHttpClient";

import TracksWrapper from "./TracksWrapper";

export default class UserTracksWrapper extends TracksWrapper {
  constructor(protected readonly client: IHttpClient) {
    super(client);
  }

  public async getMyTracks(
    limit: number = 20,
    offset: number = 0,
    market?: string,
  ): Promise<UserSavedTracks> {
    return await this.client.get<UserSavedTracks>("me/tracks", {
      limit,
      offset,
      market,
    });
  }

  public async saveTracks(ids: string[]): Promise<void> {
    return await this.client.put("me/tracks", {
      ids,
    });
  }

  public async removeSavedTracks(ids: string[]): Promise<void> {
    return await this.client.delete("me/tracks", { ids });
  }

  public async checkSavedTracks(ids: string[]): Promise<boolean[]> {
    return await this.client.get<boolean[]>("me/tracks/contains", {
      ids: ids.join(","),
    });
  }
}
