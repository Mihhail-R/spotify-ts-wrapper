import { PaginatedAudioBooks } from "../../Types/Audiobook";
import IHttpClient from "../IHttpClient";

import AudiobookWrapper from "./AudiobookWrapper";

export default class UserAudiobookWrapper extends AudiobookWrapper {
  constructor(protected readonly client: IHttpClient) {
    super(client);
  }

  public async getMyAudiobooks(
    limit: number = 10,
    offset: number = 0,
  ): Promise<PaginatedAudioBooks> {
    return await this.client.get<PaginatedAudioBooks>("me/audiobooks", {
      limit: limit,
      offset: offset,
    });
  }

  public async saveAudiobook(audiobookIds: string[]): Promise<void> {
    return await this.client.put("me/audiobooks", {
      audiobookIds,
    });
  }

  public async removeAudiobook(audiobookIds: string[]): Promise<void> {
    return await this.client.delete("me/audiobooks", {
      audiobookIds,
    });
  }

  public async savedAudiobooks(audiobookIds: string[]): Promise<boolean[]> {
    return await this.client.get<boolean[]>("me/audiobooks/contains", {
      audiobookIds,
    });
  }
}
