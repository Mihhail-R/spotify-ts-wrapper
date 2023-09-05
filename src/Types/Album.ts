import { Artist } from "./Artist";
import {
  Copyright,
  ExternalIds,
  ExternalUrls,
  Image,
  Paginated,
  Restrictions,
} from "./GeneralTypes";
import { PaginatedTracks } from "./Track";

export type SimplifiedAlbum = {
  album_type: string;
  total_tracks: number;
  popularity: number;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  external_ids: ExternalIds;
};

export type PaginatedAlbums = Paginated & {
  items: SimplifiedAlbum[];
};

export type Album = SimplifiedAlbum & {
  genres: string[];
  copyrights: Copyright[];
  label: string;
  tracks: PaginatedTracks;
};
