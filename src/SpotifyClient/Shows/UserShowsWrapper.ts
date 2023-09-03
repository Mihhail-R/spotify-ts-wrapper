import { ShowItems } from "../../Types/Episodes";
import IHttpClient from "../IHttpClient";

export default class UserShowsWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getShows(): Promise<ShowItems> {
    return await this.client.sendGetRequest<ShowItems>("me/shows");
  }

  public async saveShows(ids: string[]): Promise<void> {
    const idsString = ids.join(",");
    await this.client.sendPutRequest(`me/shows?ids=${idsString}`);
  }

  public async removeShows(ids: string[]): Promise<void> {
    const idsString = ids.join(",");
    await this.client.sendDeleteRequest(`me/shows?ids=${idsString}`);
  }

  public async checkShows(ids: string[]): Promise<boolean[]> {
    const idsString = ids.join(",");
    return await this.client.sendGetRequest<boolean[]>(
      `me/shows/contains?ids=${idsString}`,
    );
  }
}
