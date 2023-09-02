import {
	Copyright,
	ExternalUrls,
	Image,
	Restrictions,
	ResumePoint,
} from './GeneralTypes';

export type Narrator = {
	name: string;
};

export type SimplifiedAudioBook = {
	authors: string[];
	available_markets: string[];
	copyrights: Copyright[];
	description: string;
	html_description: string;
	edition: string;
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	languages: string[];
	media_type: string;
	name: string;
	narrators: Narrator[];
	publisher: string;
	type: string;
	uri: string;
	total_chapters: number;
};

export type SimplifiedChapter = {
	audio_preview_url: string;
	available_markets: string[];
	chapter_number: number;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: ResumePoint;
	type: string;
	uri: string;
	restrictions: Restrictions;
};

export type ChapterItems = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SimplifiedChapter[];
};

export type AudioBook = SimplifiedAudioBook & {
	chapters: ChapterItems;
};

export type Chapter = SimplifiedChapter & {
	audiobook: SimplifiedAudioBook;
};

export type PaginatedAudioBooks = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SimplifiedAudioBook[];
};
