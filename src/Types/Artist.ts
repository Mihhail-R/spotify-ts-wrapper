import { ExternalUrls, Followers, Image } from "./GeneralTypes";

export type SimplifiedArtist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Artist = SimplifiedArtist & {
  followers: Followers;
  genres: string[];
  popularity: number;
  images: Image[];
};

export type PaginatedArtists = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[];
};
