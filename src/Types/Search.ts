import { PaginatedAlbums } from "./Album";
import { PaginatedArtists } from "./Artist";
import { PaginatedAudioBooks } from "./Audiobook";
import { PaginatedShows } from "./Episodes";
import { PaginatedTracks } from "./Track";

export type AvailableTypeMap = {
  albums: PaginatedAlbums;
  artists: PaginatedArtists;
  tracks: PaginatedTracks;
  playlists: any; // TODO add PaginatedPlaylists type
  shows: PaginatedShows;
  episodes: any; // TODO add PaginatedEpisodes type
  audiobooks: PaginatedAudioBooks;
};

export type AvailableType = keyof AvailableTypeMap;

export type Search<T extends AvailableType[]> = {
  [K in T[number]]: AvailableTypeMap[K];
};
