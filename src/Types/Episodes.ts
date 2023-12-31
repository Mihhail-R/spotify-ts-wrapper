import {
  Copyright,
  ExternalUrls,
  Image,
  Paginated,
  Restrictions,
  ResumePoint,
} from "./GeneralTypes";

export type SimplifiedEpisode = {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions: Restrictions;
};

export type SimplifiedShow = {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
};

export type PaginatedShows = Paginated & {
  items: SimplifiedShow[];
};

export type Episode = SimplifiedEpisode & {
  show: SimplifiedShow;
};

export type PaginatedEpisodes = Paginated & {
  items: SimplifiedEpisode[];
};

export type Show = SimplifiedShow & {
  episodes: PaginatedEpisodes;
};

export type SavedEpisode = {
  added_at: string;
  episode: Episode;
};

export type EpisodeItems = Paginated & {
  items: SavedEpisode[];
};

export type SavedShow = {
  added_at: string;
  show: SimplifiedShow;
};

export type ShowItems = Paginated & {
  items: SavedShow[];
};
