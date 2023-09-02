import { Album, SimplifiedAlbum } from './Album';
import { Artist, SimplifiedArtist } from './Artist';
import {
	ExternalIds,
	ExternalUrls,
	LinkedFrom,
	Restrictions,
} from './GeneralTypes';

export type SimplifiedTrack = {
	artists: SimplifiedArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: LinkedFrom;
	restrictions: Restrictions;
	name: string;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
};

export type Track = SimplifiedTrack & {
	artists: Artist[];
	album: Album;
	popularity: number;
	external_ids: ExternalIds;
};

export type PaginatedTracks = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SimplifiedTrack[];
};

export type SavedTrack = {
	added_at: string;
	track: SimplifiedTrack;
};

export type UserSavedTracks = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: SavedTrack[];
};

export type AudioFeatures = {
	acousticness: number;
	analysis_url: string;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: string;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	track_href: string;
	type: string;
	uri: string;
	valence: number;
};

export type AnalysisMeta = {
	analyzer_version: string;
	platform: string;
	detailed_status: string;
	status_code: number;
	timestamp: number;
	analysis_time: number;
	input_process: string;
};

export type AnalysisTrack = {
	num_samples: number;
	duration: number;
	sample_md5: string;
	offset_seconds: number;
	window_seconds: number;
	analysis_sample_rate: number;
	analysis_channels: number;
	end_of_fade_in: number;
	start_of_fade_out: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	codestring: string;
	code_version: number;
	echoprintstring: string;
	echoprint_version: number;
	synchstring: string;
	synch_version: number;
	rhythmstring: string;
	rhythm_version: number;
};

export type AnalysisBar = {
	start: number;
	duration: number;
	confidence: number;
};

export type AnalysisBeat = {
	start: number;
	duration: number;
	confidence: number;
};

export type AnalysisSection = {
	start: number;
	duration: number;
	confidence: number;
	loudness: number;
	tempo: number;
	tempo_confidence: number;
	key: number;
	key_confidence: number;
	mode: number;
	mode_confidence: number;
	time_signature: number;
	time_signature_confidence: number;
};

export type AnalysisSegment = {
	start: number;
	duration: number;
	confidence: number;
	loudness_start: number;
	loudness_max: number;
	loudness_max_time: number;
	loudness_end: number;
	pitches: number[];
	timbre: number[];
};

export type AnalysisTatum = {
	start: number;
	duration: number;
	confidence: number;
};

export type AudioAnalysis = {
	meta: AnalysisMeta;
	track: AnalysisTrack;
	bars: AnalysisBar[];
	beats: AnalysisBeat[];
	sections: AnalysisSection[];
	segments: AnalysisSegment[];
	tatums: AnalysisTatum[];
};

export type TrackItems = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: Track[];
};
