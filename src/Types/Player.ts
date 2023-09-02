import { Episode } from './Episodes';
import { ExternalUrls } from './GeneralTypes';
import { Track } from './Track';

export type Device = {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
};

export type Context = {
	type: string;
	href: string;
	external_urls: ExternalUrls;
	uri: string;
};

export type Actions = {
	interrupting_playback: boolean;
	pausing: boolean;
	resuming: boolean;
	seeking: boolean;
	skipping_next: boolean;
	skipping_prev: boolean;
	toggling_repeat_context: boolean;
	toggling_repeat_track: boolean;
	toggling_shuffle: boolean;
	transferring_playback: boolean;
};

export type Playback = {
	device: Device;
	repeat_state: string;
	shuffle_state: boolean;
	context: Context;
	timestamp: number;
	progress_ms: number;
	is_playing: boolean;
	item: Track | Episode | null;
	currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
	actions: Actions;
};

export type StartResumePlayback = {
	device_id?: string;
	context_uri?: string;
	offset?: {
		position: number;
	};
	uris?: string[];
	position_ms?: number;
};

export type Cursor = {
	after: string;
	before: string;
};

export type RecentlyPlayedItem = {
	track: Track;
	played_at: string;
	context: Context;
};

export type Queue = {
	currently_playing: Track | Episode | null;
	next: Track[] | Episode[];
};

export type RecentlyPlayed = {
	href: string;
	limit: number;
	next: string;
	total: number;
	cursors: Cursor;
	items: RecentlyPlayedItem[];
};
