import { PaginatedAudioBooks } from "../../Types/Audiobook";
import IHttpClient from "../IHttpClient";

export default class UserAudiobookWrapper {
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getUsersSavedAudioBooks(
    limit: number = 10,
    offset: number = 0,
  ): Promise<PaginatedAudioBooks> {
    return await this.client.sendGetRequest<PaginatedAudioBooks>(
      "me/audiobooks",
      {
        limit: limit,
        offset: offset,
      },
    );
  }

  public async saveUserAudioBook(audiobookIds: string[]): Promise<void> {
    return await this.client.sendPutRequest<void>("me/audiobooks", {
      audiobookIds,
    });
  }

  public async removeUserAudioBook(audiobookIds: string[]): Promise<void> {
    return await this.client.sendDeleteRequest<void>("me/audiobooks", {
      audiobookIds,
    });
  }

  public async checkUserSavedAudioBooks(
    audiobookIds: string[],
  ): Promise<boolean[]> {
    return await this.client.sendGetRequest<boolean[]>(
      "me/audiobooks/contains",
      {
        audiobookIds,
      },
    );
  }
}
