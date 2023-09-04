import { AudioBook, Chapter, ChapterItems } from "../../Types/Audiobook";
import IHttpClient from "../IHttpClient";

export default class AudiobookWrapper {
  private readonly path: string = "audiobooks";
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }

  public async getAudiobook(
    audiobookId: string,
    market?: string,
  ): Promise<AudioBook> {
    return await this.client.sendGetRequest<AudioBook>(
      `${this.path}/${audiobookId}?market=${market}`,
    );
  }

  public async getAudiobooks(
    audiobookIds: string[],
    market?: string,
  ): Promise<{ audiobooks: AudioBook[] }> {
    return await this.client.sendGetRequest<{ audiobooks: AudioBook[] }>(
      `${this.path}?ids=${audiobookIds.join(",")}&market=${market}`,
    );
  }

  public async getAudioBookChapters(
    audiobookId: string,
    market?: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ChapterItems> {
    return await this.client.sendGetRequest<ChapterItems>(
      `${this.path}/${audiobookId}/chapters?limit=${limit}&offset=${offset}&market=${market}`,
    );
  }

  public async getChapter(
    chapterId: string,
    market?: string,
  ): Promise<Chapter> {
    return await this.client.sendGetRequest<Chapter>(
      `/chapters/${chapterId}?market=${market}`,
    );
  }

  public async getChapters(
    chapterIds: string[],
    market?: string,
  ): Promise<{ chapters: Chapter[] }> {
    return await this.client.sendGetRequest<{ chapters: Chapter[] }>(
      `/chapters?ids=${chapterIds.join(",")}&market=${market}`,
    );
  }
}
