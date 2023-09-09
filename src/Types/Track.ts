import { SimplifiedAlbum } from "./Album";
import { Artist, SimplifiedArtist } from "./Artist";
import {
  ExternalIds,
  ExternalUrls,
  LinkedFrom,
  Paginated,
  Restrictions,
} from "./GeneralTypes";

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
  album: SimplifiedAlbum;
  popularity: number;
  external_ids: ExternalIds;
};

export type PaginatedTracks = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedTrack[];
};

export type SavedTrack = {
  added_at: string;
  track: Track;
};

export type UserSavedTracks = Paginated & {
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

export type RecommendationSeed = {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
};

export type TrackRecommendations = {
  seeds: RecommendationSeed[];
  tracks: Track[];
};

/**
 * @see https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export interface TrackRecommendationInput {
  limit?: number;
  market?: string;
  seed_artists: string[];
  seed_genres: string[];
  seed_tracks: string[];
  // range from 0.0 to 1.0
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
}
