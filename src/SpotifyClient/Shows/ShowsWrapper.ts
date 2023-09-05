import { PaginatedEpisodes, Show, SimplifiedShow } from "../../Types/Episodes";
import IHttpClient from "../IHttpClient";

export default class ShowsWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getShow(showId: string, market?: string): Promise<Show> {
    return await this.client.get<Show>(`shows/${showId}?market=${market}`);
  }

  public async getShows(
    showIds: string[],
    market?: string,
  ): Promise<{ shows: SimplifiedShow[] }> {
    return await this.client.get<{ shows: SimplifiedShow[] }>(
      `shows?ids=${showIds.join(",")}&market=${market}`,
    );
  }

  public async getShowEpisodes(
    showId: string,
    limit: number = 20,
    offset: number = 0,
    market?: string,
  ): Promise<PaginatedEpisodes> {
    return await this.client.get<PaginatedEpisodes>(
      `shows/${showId}/episodes?limit=${limit}&offset=${offset}&market=${market}`,
    );
  }
}
