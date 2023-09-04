import { PaginatedAlbums } from "../../Types/Album";
import { Artist } from "../../Types/Artist";
import { Track } from "../../Types/Track";
import IHttpClient from "../IHttpClient";

export default class ArtistsWrapper {
  private readonly path: string = "artists";
  constructor(private readonly client: IHttpClient) {
    this.client = client;
  }
  public async getArtist(artistId: string): Promise<Artist> {
    return await this.client.sendGetRequest<Artist>(`${this.path}/${artistId}`);
  }

  public async getArtists(artistIds: string[]): Promise<{ artists: Artist[] }> {
    return await this.client.sendGetRequest<{ artists: Artist[] }>(
      `${this.path}?ids=${artistIds.join(",")}`,
    );
  }

  public async getArtistAlbums(artistId: string): Promise<PaginatedAlbums> {
    return await this.client.sendGetRequest<PaginatedAlbums>(
      `${this.path}/${artistId}/albums`,
    );
  }

  public async getArtistTopTracks(
    artistId: string,
    market?: string,
  ): Promise<{ tracks: Track[] }> {
    return await this.client.sendGetRequest<{ tracks: Track[] }>(
      `${this.path}/${artistId}/top-tracks?market=${market}`,
    );
  }

  public async getArtistRelatedArtists(
    artistId: string,
  ): Promise<{ artists: Artist[] }> {
    return await this.client.sendGetRequest<{ artists: Artist[] }>(
      `${this.path}/${artistId}/related-artists`,
    );
  }
}
