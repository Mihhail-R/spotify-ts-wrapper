import { EpisodeItems } from "../../Types/Episodes";
import IHttpClient from "../IHttpClient";

import EpisodesWrapper from "./EpisodesWrapper";

export default class UserEpisodesWrapper extends EpisodesWrapper {
  constructor(protected readonly client: IHttpClient) {
    super(client);
  }

  public async getSavedEpisodes(
    limit?: number,
    offset?: number,
    market?: string,
  ): Promise<EpisodeItems> {
    return this.client.get<EpisodeItems>("me/episodes", {
      limit,
      offset,
      market,
    });
  }

  public async saveEpisodes(ids: string[]): Promise<void> {
    return this.client.put("me/episodes", {
      ids: ids.join(","),
    });
  }

  public async removeSavedEpisodes(ids: string[]): Promise<void> {
    return this.client.delete("me/episodes", {
      ids: ids.join(","),
    });
  }

  public async checkSavedEpisodes(ids: string[]): Promise<boolean[]> {
    return this.client.get<boolean[]>("me/episodes/contains", {
      ids: ids.join(","),
    });
  }
}
