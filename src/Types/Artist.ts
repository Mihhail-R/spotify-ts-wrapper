import { ExternalUrls, Followers, Image, Paginated } from "./GeneralTypes";

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

export type PaginatedArtists = Paginated & {
  items: Artist[];
};
