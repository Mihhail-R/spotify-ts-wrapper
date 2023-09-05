import { Artist } from "./Artist";
import { ExternalUrls, Followers, Image, Paginated } from "./GeneralTypes";
import { Track } from "./Track";

export type User = {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
};

export type ExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

export type Me = User & {
  birthdate: string;
  country: string;
  email: string;
  explicit_content: ExplicitContent;
};

export type UserTopItemsTypes = "artists" | "tracks";

export type UserTopArtists = Paginated & {
  items: Artist[];
};

export type UserTopTracks = Paginated & {
  items: Track[];
};

export type UserTopItems<T extends UserTopItemsTypes> = T extends "artists"
  ? UserTopArtists
  : UserTopTracks;
