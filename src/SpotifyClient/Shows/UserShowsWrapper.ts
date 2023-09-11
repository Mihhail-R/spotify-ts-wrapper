import { ShowItems } from "../../Types/Episodes";
import IHttpClient from "../IHttpClient";

import ShowsWrapper from "./ShowsWrapper";

export default class UserShowsWrapper extends ShowsWrapper {
  constructor(protected readonly client: IHttpClient) {
    super(client);
  }

  public async getMyShows(): Promise<ShowItems> {
    return await this.client.get<ShowItems>("me/shows");
  }

  public async saveShows(ids: string[]): Promise<void> {
    const idsString = ids.join(",");
    await this.client.put("me/shows", {
      ids: idsString,
    });
  }

  public async removeShows(ids: string[]): Promise<void> {
    const idsString = ids.join(",");
    await this.client.delete("me/shows", {
      ids: idsString,
    });
  }

  public async checkShows(ids: string[]): Promise<boolean[]> {
    const idsString = ids.join(",");
    return await this.client.get<boolean[]>("me/shows/contains", {
      ids: idsString,
    });
  }
}
