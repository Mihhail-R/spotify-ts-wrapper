import { Episode } from "../../Types/Episodes";
import IHttpClient from "../IHttpClient";

export default class EpisodesWrapper {
  private readonly path = "episodes";

  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getEpisode(id: string, market?: string): Promise<Episode> {
    return this.client.sendGetRequest<Episode>(`${this.path}/${id}`, {
      market,
    });
  }

  public async getEpisodes(
    ids: string[],
    market?: string,
  ): Promise<{ episodes: Episode[] }> {
    return this.client.sendGetRequest<{ episodes: Episode[] }>(`${this.path}`, {
      ids: ids.join(","),
      market,
    });
  }
}
