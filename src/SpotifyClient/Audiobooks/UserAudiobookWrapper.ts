import { PaginatedAudioBooks } from "../../Types/Audiobook";
import IHttpClient from "../IHttpClient";

export default class UserAudiobookWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getAudiobooks(
    limit: number = 10,
    offset: number = 0,
  ): Promise<PaginatedAudioBooks> {
    return await this.client.get<PaginatedAudioBooks>("me/audiobooks", {
      limit: limit,
      offset: offset,
    });
  }

  public async saveAudiobook(audiobookIds: string[]): Promise<void> {
    return await this.client.put<void>("me/audiobooks", {
      audiobookIds,
    });
  }

  public async removeAudiobook(audiobookIds: string[]): Promise<void> {
    return await this.client.delete<void>("me/audiobooks", {
      audiobookIds,
    });
  }

  public async savedAudiobooks(audiobookIds: string[]): Promise<boolean[]> {
    return await this.client.get<boolean[]>("me/audiobooks/contains", {
      audiobookIds,
    });
  }
}
