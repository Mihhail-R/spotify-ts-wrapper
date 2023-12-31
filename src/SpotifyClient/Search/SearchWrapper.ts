import { AvailableType, Search } from "../../Types/Search";
import IHttpClient from "../IHttpClient";

export default class SearchWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async search<T extends AvailableType[]>(
    q: string,
    type: T,
    market: string,
    offset: number = 0,
    limit: number = 20,
    include_external: boolean = false,
  ): Promise<Search<T>> {
    const types = type
      .map((t) => t.toLowerCase().slice(-t.length, t.length - 1))
      .join(",");

    return await this.client.get<Search<T>>("search", {
      q,
      type: types,
      market,
      offset,
      limit,
      include_external: include_external ? "audio" : undefined,
    });
  }
}
