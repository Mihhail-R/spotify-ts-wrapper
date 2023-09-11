import { AudioBook, Chapter, ChapterItems } from "../../Types/Audiobook";
import IHttpClient from "../IHttpClient";

export default class AudiobookWrapper {
  private readonly path: string = "audiobooks";
  constructor(protected readonly client: IHttpClient) {
    this.client = client;
  }

  public async getAudiobook(
    audiobookId: string,
    market?: string,
  ): Promise<AudioBook> {
    return await this.client.get<AudioBook>(`${this.path}/${audiobookId}`, {
      market,
    });
  }

  public async getAudiobooks(
    audiobookIds: string[],
    market?: string,
  ): Promise<{ audiobooks: AudioBook[] }> {
    return await this.client.get<{ audiobooks: AudioBook[] }>(`${this.path}`, {
      ids: audiobookIds.join(","),
      market,
    });
  }

  public async getAudioBookChapters(
    audiobookId: string,
    market?: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<ChapterItems> {
    return await this.client.get<ChapterItems>(
      `${this.path}/${audiobookId}/chapters`,
      {
        market,
        limit,
        offset,
      },
    );
  }

  public async getChapter(
    chapterId: string,
    market?: string,
  ): Promise<Chapter> {
    return await this.client.get<Chapter>(`/chapters/${chapterId}`, {
      market,
    });
  }

  public async getChapters(
    chapterIds: string[],
    market?: string,
  ): Promise<{ chapters: Chapter[] }> {
    return await this.client.get<{ chapters: Chapter[] }>("/chapters", {
      ids: chapterIds.join(","),
      market,
    });
  }
}
