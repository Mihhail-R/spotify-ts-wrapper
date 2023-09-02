import { AudioBook, Chapter, ChapterItems } from '../../Types/Audiobook';
import IHttpClient from '../IHttpClient';

export default class AudiobookWrapper {
	private readonly path: string = 'audiobooks';
	constructor(private readonly client: IHttpClient) {
		this.client = client;
	}

	public async getAudiobook(audiobookId: string): Promise<AudioBook> {
		return await this.client.sendGetRequest<AudioBook>(
			`${this.path}/${audiobookId}`
		);
	}

	public async getAudiobooks(
		audiobookIds: string[]
	): Promise<{ audiobooks: AudioBook[] }> {
		return await this.client.sendGetRequest<{ audiobooks: AudioBook[] }>(
			`${this.path}`,
			{
				ids: audiobookIds.join(','),
			}
		);
	}

	public async getAudioBookChapters(
		audiobookId: string
	): Promise<ChapterItems> {
		return await this.client.sendGetRequest<ChapterItems>(
			`${this.path}/${audiobookId}/chapters`
		);
	}

	public async getChapter(
		chapterId: string,
		market?: string
	): Promise<Chapter> {
		return await this.client.sendGetRequest<Chapter>(
			`/chapter/${chapterId}`,
			{
				market,
			}
		);
	}

	public async getChapters(
		chapterIds: string[],
		market?: string
	): Promise<{ chapters: Chapter[] }> {
		return await this.client.sendGetRequest<{ chapters: Chapter[] }>(
			'/chapters',
			{
				ids: chapterIds.join(','),
				market,
			}
		);
	}
}
