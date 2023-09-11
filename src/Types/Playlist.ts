import { Episode } from "./Episodes";
import { ExternalUrls, Followers, Image } from "./GeneralTypes";
import { Track } from "./Track";
import { User } from "./User";

export type PlaylistTrack = {
  added_at: string;
  added_by: User | null;
  is_local: boolean;
  track: Track | Episode;
};

export type PaginatedPlaylistTrack = {
  href: string;
  items: PlaylistTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SimplifiedPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: "playlist";
  uri: string;
};

export type PaginatedSimplifiedPlaylist = {
  href: string;
  items: SimplifiedPlaylist[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type Playlist = SimplifiedPlaylist & {
  followers: Followers;
  tracks: PaginatedPlaylistTrack;
};

export interface ChangePlaylistDetails {
  playlistId: string;
  name?: string;
  public_?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface UpdatePlaylistItems {
  playlistId: string;
  rangeStart?: number;
  rangeLength?: number;
  insertBefore?: number;
  snapshotId?: string;
}
